<!doctype html>
<html <?php language_attributes(); ?> class="no-js">
	<head>
		<meta charset="<?php bloginfo('charset'); ?>">
		<title><?php wp_title(''); ?><?php if(wp_title('', false)) { echo ' :'; } ?> <?php bloginfo('name'); ?></title>

		<link href="//www.google-analytics.com" rel="dns-prefetch">
    <link href="<?php echo get_template_directory_uri(); ?>/favicon.ico" rel="shortcut icon">

		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="description" content="<?php bloginfo('description'); ?>">
    <meta property="og:type" content="website"/>
    <link rel="icon" type="image/png" href="./favicon-32x32.png" sizes="32x32" />
    <link rel="icon" type="image/png" href="./favicon-16x16.png" sizes="16x16" />
  
    <meta property="og:title" content="Eva Lingon"/>
    <meta property="twitter:title" content="Eva Lingon Ltd. Oy Ab is a production company founded by Tage Rönnqvist and Rasmus Tåg in 2011." />
    <meta name="description" content="Eva Lingon Ltd. Oy Ab is a production company founded by Tage Rönnqvist and Rasmus Tåg in 2011." />
    <meta property="og:description" content="Eva Lingon Ltd. Oy Ab is a production company founded by Tage Rönnqvist and Rasmus Tåg in 2011." />
    <meta property="twitter:description" content="Eva Lingon Ltd. Oy Ab is a production company founded by Tage Rönnqvist and Rasmus Tåg in 2011." />
    <meta property="og:site_name" content="Evalingon.com" />
    <meta name="twitter:site" content="Evalingon.com" />
    <meta property="og:image" content="" />
    <meta property="twitter:image" content="" />
    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,400i,700,900" rel="stylesheet">
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NNTT9FC');</script>
		<?php wp_head(); ?>
		<script>
        conditionizr.config({
            assets: '<?php echo get_template_directory_uri(); ?>',
            tests: {}
        });
    </script>
	</head>
	<body <?php body_class(); ?>>
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NNTT9FC"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
