<?php get_header(); ?>
<?php get_template_part('nav-standalone'); ?>

<main role="main" class="mo-colorwrapper mo-colorwrapper--small-padding ">
    <!-- section -->
    <section class="mo-grid mo-grid--content">

			<!-- article -->
			<article id="post-404">

				<h1 class="mo-h2" style="margin-bottom: 20px;"><?php _e( 'Page not found', 'html5blank' ); ?></h1>
        <svg xmlns="http://www.w3.org/2000/svg" width="90" height="120" viewBox="0 0 90 120"><title>Thumbs down!</title><path d="M45 0h7.5v7.5H45zM30 0h7.5v7.5H30zm7.5 0H45v7.5h-7.5zm-15 0H30v7.5h-7.5zM15 0h7.5v7.5H15zm37.5 7.5H60V15h-7.5zm7.5 0h7.5V15H60zm-52.5 0H15V15H7.5zM75 15h7.5v7.5H75zm7.5 0H90v7.5h-7.5zm-15 0H75v7.5h-7.5zm-60 0H15v7.5H7.5zm7.5 0h7.5v7.5H15zm67.5 7.5H90V30h-7.5zm-30 0H60V30h-7.5zm7.5 0h7.5V30H60zm-15 0h7.5V30H45zm-7.5 0H45V30h-7.5zM0 22.5h7.5V30H0zM75 30h7.5v7.5H75zM7.5 30H15v7.5H7.5zM0 30h7.5v7.5H0zm15 0h7.5v7.5H15zm67.5 7.5H90V45h-7.5zm-30 0H60V45h-7.5zm7.5 0h7.5V45H60zm-15 0h7.5V45H45zm-7.5 0H45V45h-7.5zM0 37.5h7.5V45H0zM82.5 45H90v7.5h-7.5zM0 45h7.5v7.5H0zm82.5 7.5H90V60h-7.5zm-30 0H60V60h-7.5zm7.5 0h7.5V60H60zm-15 0h7.5V60H45zm-7.5 0H45V60h-7.5zm-30 0H15V60H7.5zm-7.5 0h7.5V60H0zm15 0h7.5V60H15zM82.5 60H90v7.5h-7.5zM0 60h7.5v7.5H0zm75 7.5h7.5V75H75zm7.5 0H90V75h-7.5zM0 67.5h7.5V75H0zM67.5 75H75v7.5h-7.5zM30 75h7.5v7.5H30zM7.5 75H15v7.5H7.5zm15 0H30v7.5h-7.5zM15 75h7.5v7.5H15zm45 7.5h7.5V90H60zm-37.5 0H30V90h-7.5zm30 7.5H60v7.5h-7.5zM45 90h7.5v7.5H45zm-30 0h7.5v7.5H15zm22.5 15H45v7.5h-7.5zM15 105h7.5v7.5H15zm0-7.5h7.5v7.5H15zm22.5 0H45v7.5h-7.5zm-7.5 15h7.5v7.5H30zm-7.5 0H30v7.5h-7.5z"></path></svg>
        <p>Look’s like you’ve hit a dead end. The page you are looking for may have been moved, deleted, or possibly never existed.</p>
        <p><a href="<?php echo home_url(); ?>">Go back to the homepage</a> or email us at <a href="mailto: info@evalingon.com">info@evalingon.com</a>.</p>
				
			</article>
			<!-- /article -->

		</section>
		<!-- /section -->
	</main>
<?php get_footer(); ?>
