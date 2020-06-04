<?php
/**
* Class name: WordpressManager()
*
* This class is a Singleton meant to set all wordpress features
*
* @author : Kevin Vacherot <kevin.vacherot@adveris.fr>
*/

namespace Managers;

use \Services\ConfigurationService;

class WordpressManager
{
	/**
    * @var object  Unique instance of WordpressManager Class (Singleton)
    */
    private static $instance;

    /**
    * @var array  Array that contains all configurations for WordpressManager
    */
    private $configuration = array();


    /**
	* __Constructor:
	*
	* Contructor is private, WordpressManager class can only be instanciated through the Load() method
	*
	* @return void
	*/
    private function __construct(){
    	$this->configuration = $this->get_configuration();
    	$this->wordpress();
    }


	/**
	* Method called by __constructor()
	*
	* WordpressManager() class is a singleton.
	*
	* Load() method ensure that only one instance of WordpressManager is loaded
	* The instance is then stored in $instance property
	*
	* @return object  WordpressManager instance.
	*/
	private static function load(){
		if (!self::$instance instanceof self) {
            self::$instance = new self;
        }

        return self::$instance;
	}


	/**
	* Method called from AppKernel()
	*
	* Register() method is the entry point of WordpressManager class
	*
	* @return object  WordpressManager instance.
	*/
	public static function register(){
		return self::load();
	}


	/**
	* Method called by __constructor():
	*
	* wordpress() method inits Theme features
	* 
	* @return void
	*/
	private function wordpress() {
		add_filter('query_vars', array($this, 'add_query_vars'));
		add_filter('upload_mimes', array($this, 'allow_upload_svg'));
		add_filter('image_resize_dimensions', array($this, 'thumbnail_upscale'), 10, 6 );
		add_filter('the_content', array($this, 'filter_ptags_on_images'));
        add_filter('show_admin_bar', array($this, 'show_admin_bar'));
        add_filter('mce_buttons_2', array($this, 'my_mce_buttons_2'));
        add_filter('tiny_mce_before_init', array($this, 'my_mce_before_init_insert_formats'));

		add_action('after_setup_theme', array($this, 'after_setup_theme'));
		add_action('init', array($this, 'register_cpts'));
		add_action('init', array($this, 'register_taxonomies'));
        add_action('after_switch_theme', array($this, 'flush_rewrite_rules'));
        add_action('admin_init', array($this, 'admin_init'));
        add_filter( 'gform_ajax_spinner_url', array($this, 'custom_spinner_image'), 10, 2 );
        
        $this->addImageSizes();
	}


	/**
	* Method called by wordpress():
	*
	* register_cpts() method manage all CPTs registration
	*
	* @return object CPTManager instance
	*/
	public function register_cpts(){
		$cpt_config = $this->configuration['cpt'];
		if($cpt_config && is_array($cpt_config)){
			foreach($cpt_config as $key => $value){
				register_post_type($key, $value['registration']);
			}
		}

		return $this;
	}


	/**
	* Method called by wordpress():
	*
	* register_taxonomies() method manage all Taxonomies registration
	*
	* @return object TaxonomyManager instance
	*/
	public function register_taxonomies(){
		$taxonomy_config = $this->configuration['taxonomy'];
		if($taxonomy_config && is_array($taxonomy_config)){
			foreach($taxonomy_config as $key => $value){
				register_taxonomy($key, $value['posts'], $value['registration']);
			}
		}

		return $this;
	}


	/**
	* Method called by wordpress():
	*
	* After_setup_theme() method manage after_setup_theme hook
	* It activates theme's needed features 
	* 
	* @return void
	*/
	public function after_setup_theme(){
		foreach ($this->configuration['wordpress']['remove_action'] as $key => $value) {
			remove_action($key, $value);
		}

		foreach ($this->configuration['wordpress']['theme_supports'] as $key => $value) {
			if(!is_array($value)){
				add_theme_support($value);
			} else {
				add_theme_support($value['support'],$value['arg']);
			}
		}

		register_nav_menus($this->configuration['wordpress']['menus']);
	}


	/**
	* Method called by wordpress():
	*
	* add_query_vars() method allows to add query vars
	* 
	* @return array  Array containing query vars
	*/
	public function add_query_vars($vars){
		foreach ($this->configuration['wordpress']['query_vars'] as $key => $value) {
			$vars[] = $value;
		}

		return $vars;
	}


	/**
	* Method called by wordpress():
	*
	* allow_upload_svg() method allows to allow svg upload
	* 
	* @return array  Array containing mimes
	*/
	public function allow_upload_svg($mimes){
		$mimes['svg'] = 'image/svg+xml';

		return $mimes;
    }
    

    /**
	* Method called by wordpress():
	*
	* thumbnail_upscale() allows to force custom image size generation
	* 
	* @return void
	*/
	public function thumbnail_upscale(  $default, $orig_w, $orig_h, $new_w, $new_h, $crop ){
		if ( !$crop ) return null;

		$aspect_ratio = $orig_w / $orig_h;
		$size_ratio   = max($new_w / $orig_w, $new_h / $orig_h);
		$crop_w       = round($new_w / $size_ratio);
		$crop_h       = round($new_h / $size_ratio);
		$s_x          = floor( ($orig_w - $crop_w) / 2 );
		$s_y          = floor( ($orig_h - $crop_h) / 2 );

		return array( 0, 0, (int) $s_x, (int) $s_y, (int) $new_w, (int) $new_h, (int) $crop_w, (int) $crop_h );
    }


	/**
	* Method called by wordpress():
	*
	* show_admin_bar() method handle admin topbar visibility
	* 
	* @return void
	*/
	public function show_admin_bar(){
		$show_admin_bar = true;

		if(isset($this->configuration['wordpress']['show_admin_bar'])){
			$show_admin_bar = $this->configuration['wordpress']['show_admin_bar'];
		}
		
		
		return $show_admin_bar;
	}


	/**
	* Method called by wordpress():
	*
	* filter_ptags_on_images() method remove p tags around images
	* 
	* @return void
	*/
	public function filter_ptags_on_images($content){
		$content = preg_replace('/<p>\s*(<a .*>)?\s*(<img .* \/>)\s*(<\/a>)?\s*<\/p>/iU', '\1\2\3', $content);
		$content = preg_replace('/<p>\s*(<script.*>*.<\/script>)\s*<\/p>/iU', '\1', $content);
		$content = preg_replace('/<p>\s*(<iframe.*>*.<\/iframe>)\s*<\/p>/iU', '\1', $content);

		return $content;
	}

	
	/**
	* Method called by wordpress():
	*
	* addImageSizes() method adds custom image sizes
	* 
	* @return void
	*/
	private function addImageSizes(){
		if(function_exists( 'add_image_size')){
			if(isset($this->configuration['wordpress']['images_sizes'])){
				$image_sizes = $this->configuration['wordpress']['images_sizes'];
				
				foreach ($image_sizes as $key => $value) {
					add_image_size($key, $value['w'], $value['h'], $value['crop']);
				}
			}
		}
    }
    

    /**
	* Method called by wordpress():
	*
	* my_mce_buttons_2() method adds format button for wysiwig
	* 
	* @return void
	*/
    public function my_mce_buttons_2( $buttons ) {
        array_unshift( $buttons, 'styleselect' );
        return $buttons;
    }


    /**
	* Method called by wordpress():
	*
	* custom_spinner_image() method relace default loader icon for ajax gravity form
	* 
	* @return void
	*/
    public function custom_spinner_image($image_src, $form) {
        return get_template_directory_uri() . "/web/src/img/svg-loaders/puff-black.svg";
    }


    /**
	* Method called by wordpress():
	*
	* my_mce_before_init_insert_formats() method allows add custom style to wysiwig editor
	*
	* @return void
	*/
    public function my_mce_before_init_insert_formats( $init_array ) {
        $style_formats = array(
            array(
                'title' => 'Span block',
                'inline' => 'span',
                'classes' => 'span-block',
                'wrapper' => true,
            ),
            array(
                'title' => 'Couleur Noir',
                'inline' => 'span',
                'classes' => 'c-black',
                'wrapper' => true,
            )
        );

        $init_array['style_formats'] = json_encode( $style_formats );

        return $init_array;
    }


    /**
	* Method called by wordpress():
	*
	* admin_init() method allows to link a custom css file to admin editor
	*
	* @return void
	*/
    public function admin_init() {
        add_editor_style('web/dist/css/editor.css');
    }


	/**
	* Method called by wordpress():
	*
	* Flush_rewrite_rules() method allows automatic rewrite rules flushing 
	*
	* @return void
	*/
	public function flush_rewrite_rules(){
		flush_rewrite_rules();
	}


	/**
	* Method called by __constructor()
	*
	* get_configuration() method allows to parse YAML files which contain configurations for this Manager
	* The retrieved array is then stored in $this->configuration property
	*
	* @return array  Array containaing configurations for this Manager
	*/
    private function get_configuration(){
        return array(
        	'cpt' => ConfigurationService::parseYamlFile('cpt'),
        	'taxonomy' => ConfigurationService::parseYamlFile('taxonomy'),
        	'wordpress' => ConfigurationService::parseYamlFile('wordpress')
        );
    }
}