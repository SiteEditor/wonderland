<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
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

	<?php

	$show_blog_archive_title = (bool)get_theme_mod( 'sed_show_blog_archive_title' , '1' );

	if( $show_blog_archive_title === true || site_editor_app_on() ) {

		$hide_class = ($show_blog_archive_title === false) ? "hide" : "";

		?>

		<?php if (is_home() && !is_front_page()) : ?>
			<header class="page-header <?php echo esc_attr( $hide_class ) ;?>">
				<h1 class="page-title"><?php single_post_title(); ?></h1>
			</header>
		<?php else : ?>
			<header class="page-header <?php echo esc_attr( $hide_class ) ;?>">
				<h2 class="page-title"><?php _e('Blog', 'twentyseventeen'); ?></h2>
			</header>
		<?php endif; ?>

	<?php

	}

	?>

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
