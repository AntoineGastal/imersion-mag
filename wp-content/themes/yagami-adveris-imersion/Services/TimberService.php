<?php
/**
* Class name: TimberService()
*
* This class contains methods provided to timber templates
*
* @author : Kevin Vacherot <kevin.vacherot@adveris.fr>
*/

namespace Services;

class TimberService
{
    /**
    * svg() allows to get code from an SVG file  
    *
    * @param bool  $url  SVG file url
    *
    * @return string  SVG code 
    */
    public static function svg($url){
        $login = "adveris";
        $password = "panda";
          
        $context = stream_context_create(array (
            'http' => array (
                'header' => 'Authorization: Basic ' . base64_encode("$login:$password")
            )
        ));

        $baseUrl = dirname(dirname(ROOT));
        $toReplace = get_site_url() . '/wp-content';
        $finalUrl = str_replace($toReplace, $baseUrl, $url);

        return file_get_contents($finalUrl, false, $context);
    }
}
