<?php
/**
 * The template for displaying archive pages
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package WordPress
 * @subpackage Twenty_Seventeen
 * @since 1.0
 * @version 1.0
 */

get_header(); ?>

<div class="wrap">

	<?php if ( have_posts() ) : ?>

		<?php

		$show_blog_archive_title = (bool)get_theme_mod( 'sed_show_blog_archive_title' , '1' );

		$show_blog_archive_description = (bool)get_theme_mod( 'sed_show_blog_archive_description' , '1' );

		if( $show_blog_archive_title === true || $show_blog_archive_description === true || site_editor_app_on() ) {

			$hide_class = ($show_blog_archive_title === false && $show_blog_archive_description === false) ? "hide" : "";
		?>

			<header class="page-header <?php echo esc_attr( $hide_class ) ;?>">

				<?php

				if( $show_blog_archive_title === true || site_editor_app_on() ) {

					$hide_class = ($show_blog_archive_title === false) ? "hide" : "";

					the_archive_title('<h1 class="page-title '. esc_attr( $hide_class ) .'">', '</h1>');

				}

				if( $show_blog_archive_description === true || site_editor_app_on() ) {

					$hide_class = ($show_blog_archive_description === false) ? "hide" : "";

					the_archive_description( '<div class="taxonomy-description '. esc_attr( $hide_class ) .'">', '</div>' );

				}

				?>

			</header><!-- .page-header -->

		<?php } ?>

	<?php endif; ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

		<?php
		
		The_Grid('wonderland custom post type', true);  

		?>

		</main><!-- #main -->
	</div><!-- #primary -->
	<?php get_sidebar(); ?>
</div><!-- .wrap -->

<?php get_footer();
