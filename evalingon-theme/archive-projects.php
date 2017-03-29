<?php /* Template Name: Frontpage */ get_header(); ?>
<?php get_template_part('nav-standalone'); ?>

<main role="main" class="mo-colorwrapper mo-colorwrapper--small-padding ">
    <!-- section -->
    <section class="mo-grid mo-grid--content">
      <h1 class="mo-h2">Work</h1>
    </section>
</main> 

<?php $count = 0; ?>
    <?php if (have_posts()): while (have_posts()) : the_post();  $count++; ?>
      <!-- article -->
      <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

  <a href=" <?php the_permalink(); ?>" class="mo-fluid-block <?php if( $count % 2 === 0 )  : ?>mo-fluid-block--odd<?php endif; ?>">
    <?php if( $count % 2 === 0 )  : ?>
    <span class="mo-fluid-block__image">
      <span class="mo-fluid-block__overlay"></span>
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
      <span class="mo-fluid-block__overlay"></span>
      <?php the_post_thumbnail('large'); ?>
    </span>
    <?php endif; ?>
  </a>
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
  </main>
<?php get_footer(); ?>