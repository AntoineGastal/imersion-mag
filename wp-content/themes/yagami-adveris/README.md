# Yagami Starter Theme

Yagami is a micro framework built with a "symfony-like" design pattern and a modern frontend workflow.
As it comes with a real MVC approach, an advanced Webpack configuration, and couple of built-in features, 
Yagami embodies a helpful tool to develop websites and web applications faster using WordPress.

# Summary
- [Features](https://git.adveris.fr/adveris/yagami-theme#features)
- [Requirements](https://git.adveris.fr/adveris/yagami-theme#requirements)
- [Getting started](https://git.adveris.fr/adveris/yagami-theme#getting-started)
  - [Theme Installation](https://git.adveris.fr/adveris/yagami-theme#theme-installation)
  - [Theme and plugins activation](https://git.adveris.fr/adveris/yagami-theme#theme-and-plugins-activation)
  - [Theme Structure](https://git.adveris.fr/adveris/yagami-theme#theme-structure)
  - [Theme Development](https://git.adveris.fr/adveris/yagami-theme#theme-development)
- [Templating](https://git.adveris.fr/adveris/yagami-theme#templating)
  - [Routing](https://git.adveris.fr/adveris/yagami-theme#routing)
  - [Create a Controller](https://git.adveris.fr/adveris/yagami-theme#create-a-controller)
  - [Create a method](https://git.adveris.fr/adveris/yagami-theme#create-a-method)
  - [Create a view](https://git.adveris.fr/adveris/yagami-theme#create-a-view)
- [Built-in features](https://git.adveris.fr/adveris/yagami-theme#built-in-features)
  - [CPT registration](https://git.adveris.fr/adveris/yagami-theme#cpt-registration)
  - [Taxonomy registration](https://git.adveris.fr/adveris/yagami-theme#taxonomy-registration)
  - [Custom image sizes registration](https://git.adveris.fr/adveris/yagami-theme#custom-image-sizes-registration)
  - [ACF options pages registration](https://git.adveris.fr/adveris/yagami-theme#acf-options-pages-registration)
  - [Menus registration](https://git.adveris.fr/adveris/yagami-theme#menus-registration)
  - [Others](https://git.adveris.fr/adveris/yagami-theme#others)
- [Other tasks]()
  - [Add hooks and features]()
  - [WPML strings]()
  - [Use the Debug toolbar]()
  - [Ajax]()
- [Frontend Workflow](https://git.adveris.fr/adveris/yagami-theme#frontend-workflow)
  - [Webpack features](https://git.adveris.fr/adveris/yagami-theme#webpack-features) (configuration file)
  - [Dependency management](https://git.adveris.fr/adveris/yagami-theme#dependency-management)
  - [Javascript](https://git.adveris.fr/adveris/yagami-theme#handle-javascript-files)
  - [SASS workflow](https://git.adveris.fr/adveris/yagami-theme#sass-workflow)
  - [Build commands](https://git.adveris.fr/adveris/yagami-theme#build-commands)


# Features

- [Symfony-like](https://git.adveris.fr/adveris/yagami-theme#workflow) Workflow:
  - [Routing](app/config/routing.yml)
  - [Controllers](controllers/)
  - [Views](views/) with [TWIG](https://twig.symfony.com/) as a template engine: [Timber plugin](https://timber.github.io/docs/)
  - Debug Toolbar
- [Webpack](https://webpack.js.org/) (Module Bundler):
  - Compile assets
  - Optimize images
  - Concatenate files
  - Minify and uglify JS & CSS files
  - [SASS](https://sass-lang.com/) (CSS Pre-Processor)
  - [Babel](https://babeljs.io/) to transpile Javascript ES6 to ES2015
  - [BrowserSync](https://www.browsersync.io/) for synchronized browser testing
  - [ESLint](https://eslint.org/) & [StyleLint](https://stylelint.io/) for Code linting
- Ready to use tools:
  - [JQuery](https://jquery.com/)
  - [Fontawesome pro](https://fontawesome.com/icons?d=gallery) ([svg javascript core](https://fontawesome.com/how-to-use/on-the-web/advanced/svg-javascript-core))
  - [iziModal](http://izimodal.marcelodolce.com/)
  - [Swiper.js](http://idangero.us/swiper/api/)
  - [Greensock](https://greensock.com/docs)
  - [Scrollmagic](http://scrollmagic.io/examples/)
  - [Smooth scrollbar](https://idiotwu.github.io/smooth-scrollbar/)
  - [Ryuk](): The SASS framework (including a lightweight version of [Bootstrap 4](https://getbootstrap.com/docs/4.1/getting-started/introduction/))
- [YAML configuration files](app/config/) & [Managers](managers/) to handle routing and others tasks


# Requirements
- [Node.js](https://nodejs.org/en/)
- [Npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/lang/en/) (recommended) for packages management
- [Wordpress](https://fr.wordpress.org/) with the following plugins:
  - [Timber plugin](https://timber.github.io/docs/) 
  - [ACF plugin](https://www.advancedcustomfields.com/pro/) 

<br/>

------

<br/>

# Getting started

We will assume that you already have a Wordpress project installed on your machine.

#### Theme Installation
```bash
# Step inside Wordpress themes/ folder
$ cd wp-content/themes

# Run the following command to install Yagami
$ git clone https://git.adveris.fr/adveris/yagami-theme.git && cd yagami-theme && rm -rf .git && rm .gitignore 
```


#### Theme structure
```
├── app/                
├── controllers/        
├── managers/           
├── services/           
├── templates/          
├── views/              
├── web/                
├── ajax.php            
├── functions.php       
├── index.php           
├── Readme.md           
├── screenshot.jpg      
└── style.css           
```

#### Theme and plugins activation
- Go to the **Wordpress admin** area and **activate the theme**: `Yagami`
- Install those **required plugins**:
  - [Timber](https://timber.github.io/docs/) 
  - [ACF pro](https://www.advancedcustomfields.com/pro/) 



#### Theme development
- Update `browserSync.proxy` in [web/webpack.yaml](web/webpack.yaml) settings
- Run dev environment:

```bash
# Install Yarn if not installed
$ brew install yarn

# Set FontAwesome TOKEN in yout npm config if never done
$ npm config set "@fortawesome:registry" https://npm.fontawesome.com/
$ npm config set "//npm.fontawesome.com/:_authToken" 429B72CD-07FE-4D4D-A466-1970049FE38B

# Step inside Yagami's web/ folder
$ cd web/

# Install node dependencies running
$ yarn install

# Compile assets and run dev environment
$ yarn start
```

<br/>

------

<br/>


# Templating 

Yagami's templating system relies on it's `Routing mecanism`.<br/>
Basically, when the [template_redirect hook](https://codex.wordpress.org/Plugin_API/Action_Reference/template_redirect) fires, 
the Router parses its `routing configuration files` to find out the `controller::method combination` responsible for the rendering of the page.<br/><br/>
**NB**: *Yagami actualy uses the same [conditional tags](https://codex.wordpress.org/Conditional_Tags) that wordpress uses to determine which template page to load, according to [Wordpress template hierarchy](https://developer.wordpress.org/files/2014/10/Screenshot-2019-01-23-00.20.04.png)*.<br/>
<br/>

#### Routing
As explained, routing basically consists in specifying which `controller::method combination` will render each template.

- **Standard routing**: [app/config/routing.yml](app/config/routing.yml):

```yaml
#Find the conditional tag that fits the template page you want to render.
is_page:
    # Specify argument case if needed
    page-d-exemple:
        controller: PageController::pageExemple # Controller::method being called
    # Defaut
    default:
        controller: PageController::page # Controller::method being called
```


- **CPT routing**: [app/config/cpt-routes.yml](app/config/cpt-routes.yml):

```yaml
#For a CPT "projects"
projects:
  archive: ProjectsController::archive
  single: ProjectsController::single
  taxs:
    types: ProjectsController::types
```


- **Template routing**: Inside the [templates/](templates/) directory, create a `special.php` file, and specify `Controller::method` as following:

```php
<?php
/*
* TEMPLATE NAME: Special
*/

return array('controller' => 'TemplatesController::special');
```
<br/>


#### Create a controller
Inside the [controllers/](controllers/) directory, create a `PageController.php` file, and paste the following code:

```php
<?php 

namespace Controllers;

use \TimberPost;
use \Timber\PostQuery;
use \Timber;

class PageController extends AppController
{
    public function __construct(){
        parent::__construct();
    }
}
```
<br/>


#### Create a method
Inside the `PageController.php` file, add the `pageExempleAction` method as following:

```php
<?php 

namespace Controllers;

use \TimberPost;
use \Timber\PostQuery;
use \Timber;

class PageController extends AppController
{
    public function __construct(){
        parent::__construct();
    }

    public function pageExempleAction(){
        // Business logic goes here...

        $this->render('pages/page-exemple.twig', array(
            'post' => new TimberPost()
        ));
    }
}
```
<br/>


#### Create a view

Inside the [views/](views/) directory, create the `pages/page-exemple.twig`, and add the minimum HTML markup:

```twig
{% extends 'layout.twig' %}

{% block content %}
    <div id="page-exemple">
        {# Your HTML goes here... #}
    </div>
{% endblock %}
```



<br/>

------

<br/>

# Built-in features

All the following features doesn't need any line of code. You can manage those tasks using only [YAML configurion files](app/config/).

#### CPT registration

- To register a Custom Post Type, you just need to add a configuration bloc as below in the  [app/config/cpt.yml](app/config/cpt.yml) file:

```yaml
# Example: Registering a CPT called "projects"
projects:
    registration:
        labels:
            name: Projects
            singular_name: Project
            add_new: Ajouter un project
            add_new_item: Ajouter project
            edit_item: Modifier project
            new_item: Nouveau
            all_items: Tous les projects
            view_item: Voir l'élément
            search_item: Rechercher un project
            not_found: Aucun project
            not_fonud_in_trash: Aucun project trouvé dans la corbeille
            menu_name: Projects
        public: true
        publicly_queryable: true
        show_ui: true
        show_in_menu: true
        query_var: projects
        rewrite:
            slug: projects
        capability_type: post
        has_archive: true
        hierarchical: false
        menu_position: 5
        menu_icon: dashicons-admin-site
        exclude_from_search: false
        supports: 
            - title
            - editor
            - thumbnail

# Example: Registering another CPT called "tutorials"
tutorials:
    registration:
        labels:
            name: Tutorials
            ...
```
<br/>


#### Taxonomy registration

- To register a Taxonomy, you just need to add a configuration bloc as below in the  [app/config/tanonomy.yml](app/config/tanonomy.yml) file:

```yaml
# Example: Registering a Taxonomy "types", linked to "projects" CPT
types:
    posts:
        - projects
    registration:
        labels:
            name: Types 
            singular_name: Type
            menu_name: Types
            all_items: Tous les types
            edit_item: Modifier un type
            update_item: Mettre à jour
            add_new_item: Ajouter un type
            search_items: Rechercher un type
            new_item_name: Nouveau libellé du type
            not_found: Aucun type trouvé
        public: true
        publicly_queryable: true
        hierarchical: true
        query_var: true
        rewrite: 
            slug: type
        show_admin_column: true
```
<br/>


#### Custom image sizes registration

- To register a Custom image sizes, you just need add lines as below in the [app/config/wordpress.yml](app/config/wordpress.yml) file:

```yaml
# Example: Registering custom image sizes: "square_sm" and "landscape_lg"
images_sizes:
    square_sm:
        w: 300
        h: 300  
        crop: ['center', 'center']
    landscape_lg:
        w: 1280
        h: 700  
        crop: ['top', 'center']
```
<br/>


#### ACF options pages registration

- To register ACF optons, you just need add configuration blocs as below in the [app/config/acf.yml](app/config/acf.yml) file:

```yaml
# Example: Registering 2 option pages with submenus
options:
    options_page:
        page: 
            page_title: Page d'options 1
            menu_title: Options 1
            menu_slug: options-1
            capability: edit_posts
        sub_menus:
            - { page_title: Configuration P1 Sub Menu 1, menu_title: Sub Menu 1 }
            - { page_title: Configuration P1 Sub Menu 2, menu_title: Sub Menu 2 }
            - { page_title: Configuration P1 Sub Menu 3, menu_title: Sub Menu 3 }
    
    options_page_2:
        page: 
            page_title: Page d'options 2
            menu_title: Options 2
            menu_slug: options-2
            capability: edit_posts
        sub_menus:
            - { page_title: Configuration P2 Sub Menu 1, menu_title: Sub Menu 2 1 }
            - { page_title: Configuration P2 Sub Menu 2, menu_title: Sub Menu 2 2 }
            - { page_title: Configuration P2 Sub Menu 3, menu_title: Sub Menu 2 3 }
```
<br/>


#### Menus registration

- To register Wordpress menus, you just need add lines as below in the [app/config/wordpress.yml](app/config/wordpress.yml) file:

```yaml
# Example: Registering 2 menus: "primary" and "secondary"
menus:
    primary: Menu Principal
    secondary: Menu Secondaire
```
<br/>


#### Others

- Other stuffs are also configurable in [app/config/wordpress.yml](app/config/wordpress.yml) file:

```yaml
show_admin_bar: false

clear_head_for_yoast: true

query_vars:
  - custom_var_1
  - custom_var_2

theme_supports:
  - title-tag
  - post-formats
  - post-thumbnails
  - menus
  - { support: html5, arg: [comment-list, comment-form, search-form, gallery, caption] }

remove_action:
  wp_head: wp_generator
```


<br/>

------

<br/>

# Frontend workflow

#### Webpack features 

All the following features are configurable through the [web/webpack.yaml](web/webpack.yaml) configuration file.

- [BrowserSync](https://www.browsersync.io/): Automatically reloads the page each time you press `cmd + s` on "watched files" and allows synchronized browser testing 

```yaml
    # BrowserSync enable livereload feature
    browserSync:
        use: true # set to false if you don't want to use it
        proxy: http://localhost:8888/yagami/ # The url to watch: EX: http://my-project.adveris.fr
        watch: # Additional files you want to watch 
            - ../views/**/*.twig
            - ../controllers/*.php
```
<br/>


- [ESLint](https://eslint.org/) & [StyleLint](https://stylelint.io/): Code linting to fit standards in term of best practices and prevent errors

```yaml
    linters:
        scss: false
        js: false
```
<br/>


#### Dependency management

- **Install a dependency** with `yarn`

```bash
# Step inside Yagami's web/ folder
$ cd web/

# Install the package in node_modules directory, and register it in package.json
$ yarn add swiper
```

- **Import dependencies**: All dependencies have to be imported **only once**, from the [web/src/js/app.js](web/src/js/app.js) file

```js
/* Import the dependency */
import Swiper from 'swiper';
```
<br/>



#### Handle Javascript files

- **Create** the file `web/src/js/pages/filename.js` file, and add the following code:

```js
export default {
    init: (app) => {
        // Your code goes here
    }
}

```
<br/>


- **Import** the created file from [web/src/js/app.js](web/src/js/app.js)

```js
import filename from './pages/filename.js';
```
<br/>


- **load** the file using the router in [web/src/js/app.js](web/src/js/app.js)

```js
const routes = new Router([
    // add an entry to load a file
    {
        'file': filename, // Imported file
        'dependencies': [app], // To inject dependencies into the file
        'resolve': '#page-selector' // If you want your js to execute only on a specific page
    },
]);
```
<br/>


#### Handle Javascript files: Full example

- Load a contact.js file which needs Swiper as a dependency

```bash
# From your terminal

$ cd web/
$ yarn add swiper
```


```js
/* From web/src/js/app.js */

import Swiper from 'swiper';
import contact from './pages/contact.js';

const routes = new Router([
    {
        'file': contact,
        'dependencies': [app, Swiper],
        'resolve': '#page-contact'
    },
]);
```


```js
/* web/src/js/pages/contact.js */

export default {
    init: (app, Swiper) => {
        // Your code goes here
    }
}
```


<br/>

------

<br/>

# SASS workflow

The [Sass folder] consists of 2 main directories: `ryuk` and `theme`.
- **Ryuk** is a Sass framework which: Sets the global aspect of your website, and, generates almost all css classes you need to build your pages.
- **Theme** contains SASS files that are specific to your application.

#### Ryuk (Sass framework)

To configure Ryuk, you only need to update [web/src/sass/ryuk/variables/](web/src/sass/ryuk/variables/) files: 
- [bg-img.scss](web/src/sass/ryuk/variables/_bg-img.scss): `.bg-img{size}`
- [buttons.scss](web/src/sass/ryuk/variables/_buttons.scss): `.bg-img{size}`
- [colors.scss](web/src/sass/ryuk/variables/_colors.scss): `.c-{color}` `.bg-{color}`
- [links.scss](web/src/sass/ryuk/variables/_links.scss): `.link-{color}` `.links-{color}`
- [sections.scss](web/src/sass/ryuk/variables/_sections.scss): `.section`
- [spaces.scss](web/src/sass/ryuk/variables/_spaces.scss) `.mb-{size}` `.sm-down-mb-{size}` `.sm-up-pb-{size}`
- [text.scss](web/src/sass/ryuk/variables/_text.scss) `.title-{size}` `.fs-{size}` `.fw-{weight}` `.ff-{family}`


#### Theme 

```
├── theme/
│   ├── base/
│   │   ├── _default.scss/      # → Set generic tags with Ryuk variables
│   │   └── _fonts.scss/        # → Fonts importations
│   ├── components/             # → SASS files for specific elements
│   │   └── _buttons.scss/      
│   ├── pages/                  # → SASS files for specific pages
│   │    └── _home.scss_/        
│   └── _theme.scss             # → All SASS files importation
│
```

<br/>

------

<br/>

# Build commands

```bash
# Run for production
$ yarn build
```