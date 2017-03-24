<?php /* Template Name: Frontpage */ get_header(); ?>
<?php get_template_part('nav'); ?>

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

<div class="mo-fluid-block-wrapper">
<?php
$args = array( 'post_type' => 'projects', 'posts_per_page' => 4 );
$loop = new WP_Query( $args );
$count = 0;
while ( $loop->have_posts() ) : $loop->the_post();
$count++;
?>
  <a href=" <?php the_permalink(); ?>" class="mo-fluid-block <?php if( $count % 2 === 0 )  : ?>mo-fluid-block--odd<?php endif; ?>">
    <?php if( $count % 2 === 0 )  : ?>
    <span class="mo-fluid-block__image">
      <?php the_post_thumbnail('large'); ?>
    </span>
    <?php endif; ?>
    <span class="mo-fluid-block__content">
      <span class="mo-fluid-block__content-mobile">
        <h2><?php the_title(); ?></h2>
      </span>
        <p><?php the_excerpt(); ?></p>
        <span class="mo-button mo-button--blue-zodiac">Read more</span>
    </span>
    <?php if( $count % 2 !== 0 )  : ?>
    <span class="mo-fluid-block__image">
      <?php the_post_thumbnail('large'); ?>
    </span>
    <?php endif; ?>
  </a>
<?php endwhile; ?>
</div>

<div class="mo-colorwrapper mo-colorwrapper--burnt-sienna">
  <div class="mo-grid mo-grid--content">
<?php
$args = array( 'post_type' => 'podcasts', 'posts_per_page' => 1 );
$loop = new WP_Query( $args );
$count = 0;
while ( $loop->have_posts() ) : $loop->the_post();
$count++;
?>
      <h2><?php the_title(); ?></h2>
      <p><?php the_content(); ?></p>
      <a  href="<?php the_permalink(); ?>" class="mo-button mo-button--blue-zodiac">Read more</a>
<?php endwhile; ?>
</div>
</div>

<?php if(!function_exists('dynamic_sidebar') || !dynamic_sidebar('widget-area-1')) ?>

<?php get_footer(); ?>