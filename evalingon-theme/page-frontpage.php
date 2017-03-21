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
  <a href="#" class="mo-fluid-block mo-fluid-block--first">
    <span class="mo-fluid-block__image">
      <img src="<?php echo get_template_directory_uri(); ?>/images/fluid-block-1-mobile.jpg" alt="fluid block">
    </span>
    <span class="mo-fluid-block__content">
      <span class="mo-fluid-block__content-mobile">
        <h2>Project Title</h2>
      </span>
      <p>Donec v olutpat iaculis tellus, sed suscipit justo luctus vel.</p>
      <span class="mo-button mo-button--blue-zodiac">Read more</span>
    </span>
  </a>
  <a href="#" class="mo-fluid-block mo-fluid-block--second">
      <div class="mo-fluid-block__content">
      <span class="mo-fluid-block__content-mobile">
        <h2>Project Title</h2>
      </span>
      <p>Donec v olutpat iaculis tellus, sed suscipit justo luctus vel.</p>
      <span class="mo-button">Read more</span>
    </div> 
    <div class="mo-fluid-block__image">
      <img src="<?php echo get_template_directory_uri(); ?>/images/fluid-block-2-mobile.jpg" alt="fluid block">
    </div>
  </a>

  <a href="#" class="mo-fluid-block mo-fluid-block--third">
    <div class="mo-fluid-block__image">
      <img src="<?php echo get_template_directory_uri(); ?>/images/fluid-block-1-mobile.jpg" alt="fluid block">
    </div>
    <div class="mo-fluid-block__content">
      <span class="mo-fluid-block__content-mobile">
        <h2>Project Title</h2>
      </span>
      <p>Donec v olutpat iaculis tellus, sed suscipit justo luctus vel.</p>
      <span href="#" class="mo-button">Read more</span>
    </div> 
  </a>

  <a href="#" class="mo-fluid-block mo-fluid-block--fourth">
    <div class="mo-fluid-block__content">
      <span class="mo-fluid-block__content-mobile">
        <h2>Project Title</h2>
      </span>
      <p>Donec v olutpat iaculis tellus, sed suscipit justo luctus vel.</p>
      <span href="#" class="mo-button">Read more</span>
    </div> 
    <div class="mo-fluid-block__image">
      <img src="<?php echo get_template_directory_uri(); ?>/images/fluid-block-2-mobile.jpg" alt="fluid block">
    </div>
  </a>
</div>

<div class="mo-colorwrapper mo-colorwrapper--burnt-sienna">
  <div class="mo-grid mo-grid--content">
    <h2 class="title-margin">We also have a podcast</h2>
<iframe width="100%" height="140" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/302509566&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>

    <a href="#" class="mo-button mo-button--blue-zodiac">More episodes</a>
  </div>
</div>

<div class="mo-colorwrapper mo-colorwrapper--barley-white ">
  <div class="mo-grid mo-grid--content">    
    <div class="mo-citation">
          <div class="mo-citation__item">
            <div class="mo-citation__bubble">
              <div class="mo-citation__bubble-inner">
                <div class="mo-citation__bubble-quote">“</div>
                <div class="mo-citation__bubble-content">Donec volutpat iaculis tellus, sed suscipit justo luctus vel.</div>
              </div>
            </div>
            <div class="mo-citation__person">
              <div class="mo-citation__person-image">
                <img src="<?php echo get_template_directory_uri(); ?>/images/johndoe.png" alt="">
              </div>
              <div class="mo-citation__person-content">
              <h2>John Doe</h2>
              <p>CEO, Company</p>
              </div>
            </div>
          </div>
    </div>
    
  </div>
</div>

<div class="mo-colorwrapper mo-colorwrapper--blue-zodiac">
  <div class="mo-grid">

    <ul class="mo-logo-wall">
      <li class="mo-logo-wall__item"><img src="<?php echo get_template_directory_uri(); ?>/images/logo1.jpg" alt="" class="mo-logo-wall__logo"></li>
      <li class="mo-logo-wall__item"><img src="<?php echo get_template_directory_uri(); ?>/images/logo2.jpg" alt="" class="mo-logo-wall__logo"></li>
      <li class="mo-logo-wall__item"><img src="<?php echo get_template_directory_uri(); ?>/images/logo3.jpg" alt="" class="mo-logo-wall__logo"></li>
      <li class="mo-logo-wall__item"><img src="<?php echo get_template_directory_uri(); ?>/images/logo4.jpg" alt="" class="mo-logo-wall__logo"></li>
      <li class="mo-logo-wall__item"><img src="<?php echo get_template_directory_uri(); ?>/images/logo5.jpg" alt="" class="mo-logo-wall__logo"></li>
    </ul>
  </div>
</div>

<?php get_footer(); ?>
