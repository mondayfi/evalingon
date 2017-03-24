<?php get_header(); ?>
<?php get_template_part('nav-standalone'); ?>


<?php if ( has_post_thumbnail() ) : ?>
  <div class="mo-fluid-block-wrapper">
    <div href="#" class="mo-fluid-block mo-fluid-block--first">
      <span class="mo-fluid-block__image mo-fluid-block__image--full">
        <?php the_post_thumbnail('large'); ?>
      </span>
    </div>
  </div>
<?php endif; ?>

	<main role="main" class="mo-colorwrapper">
		<!-- section -->
		<section class="mo-grid mo-grid--content">

			<h1 class="mo-h2"><?php the_title(); ?></h1>

		<?php if (have_posts()): while (have_posts()) : the_post(); ?>

			<!-- article -->
			<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

				<?php the_content(); ?>

				<br class="clear">

				<?php edit_post_link(); ?>

			</article>
			<!-- /article -->

		<?php endwhile; ?>

		<?php else: ?>

			<!-- article -->
			<article>

				<h2><?php _e( 'Sorry, nothing to display.', 'html5blank' ); ?></h2>

			</article>
			<!-- /article -->

		<?php endif; ?>

		</section>
		<!-- /section -->
	</main>

<?php get_footer(); ?>
