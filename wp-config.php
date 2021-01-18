<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings ** //
/** The name of the database for WordPress */
//define( 'DB_NAME', 'ag-bdd-2050-online' );
define( 'DB_NAME', 'ag-imersiv' );


/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', 'root' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',          'j@TH.-578$f.S^K6&.o :+R|e<%@}CTv-|*r1. DFf75hLa`0uMUy]krlD,6r{yV' );
define( 'SECURE_AUTH_KEY',   'C0Rr$Ah?zg3pwN6^<|V+:pdKf(]vkz*kz_~U6f?jR/u~~19^bA{cl)`C&M+!b&%]' );
define( 'LOGGED_IN_KEY',     'gj:vcgE#@!=eF{GX}KI;V<REL{b EAWr8s9,G=Y3MPh]vF?`{.?AP)2i^mi;yQ2n' );
define( 'NONCE_KEY',         '#uk[?Z~BSc.1dqQ6+nm3/I,1uVQ32z9stNkf`C.y0Pp]VmE5bzsU.wZdK)ET=%=e' );
define( 'AUTH_SALT',         'cmoNR(/+RFicPwE+jWOZ0Oez3AL/dYY82A]~uz9;/9%xSloKMk{V~l4<JJIlfs(5' );
define( 'SECURE_AUTH_SALT',  'Hk?v%B1)MuIr4UH+scat)ORQJ6Y|Jy02yK_yoY}|5s?S$^?A]G}6q@o(V[P?H9,o' );
define( 'LOGGED_IN_SALT',    'pWJXuA!uZTXjA/BM0{.J?_:R^K6A9n|n!wo}^gfIujp x=S)0|]lb43rR>Q38YH.' );
define( 'NONCE_SALT',        'lM;04A7h5}zEYaj`5H AE,yBM]p@ae!8|Sw4B#bdv8{FKDyJ3[iU6^UpUZuB9Om2' );
define( 'WP_CACHE_KEY_SALT', '2}t:fN4j`EE8;+FO/AZT#>V~M4O|O>]m_W.(nC%ZDr@*L(YMsjNNe~p:St+*IC=Q' );

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'ag_';


define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', true );


/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) )
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
