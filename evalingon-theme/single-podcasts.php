<?php get_header(); ?>
<?php get_template_part('nav-standalone'); ?>

	<?php if (have_posts()): while (have_posts()) : the_post(); ?>

  <!-- post thumbnail -->
  <?php if ( has_post_thumbnail()) : // Check if Thumbnail exists ?>
  <div class="mo-fluid-block-wrapper">
    <div href="#" class="mo-fluid-block mo-fluid-block--first">
      <span class="mo-fluid-block__image mo-fluid-block__image--full">
        <?php the_post_thumbnail('large'); ?>
      </span>
    </div>
  </div>
  <?php endif; ?>
  
  <main role="main" class="mo-colorwrapper mo-colorwrapper--small-padding">
    <section class="mo-grid mo-grid--content">
      <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>


			<!-- post title -->
			<h1>
				<a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>"><?php the_title(); ?></a>
			</h1>
			<!-- /post title -->

			<p><?php the_excerpt();?></p>
      
      <?php the_content(); // Dynamic Content ?>
      
      <a href="/podcasts" class="mo-button mo-button--blue-zodiac">See all podcasts</a>
<br />
			<?php edit_post_link(); // Always handy to have Edit Post Links available ?>

			<?php comments_template(); ?>

		</article>
  </section>
</main>

<?php endwhile; ?>
<?php else: ?>

<main role="main" class="mo-colorwrapper mo-colorwrapper--small-padding">
  <section class="mo-grid mo-grid--content">
		<article>

			<h1><?php _e( 'Sorry, nothing to display.', 'html5blank' ); ?></h1>

		</article>
  </section>
</main>

<?php endif; ?>

<?php get_footer(); ?>
