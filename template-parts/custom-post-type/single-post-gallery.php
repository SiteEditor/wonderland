<?php
/**
 * Template part for displaying posts
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package WordPress
 * @subpackage Twenty_Seventeen
 * @since 1.0
 * @version 1.2
 */


//

$post_gallery = get_post_meta( get_the_ID() , 'wpcf-sed-images-gallery' , false );
$post_gallery = array_filter($post_gallery);

?>

<div id="post-<?php the_ID(); ?>" <?php post_class(); ?>> 

	<div class="custom-post-type-single">
	    <div class="single-wrapper">

		    <div class="single-slider-wrapper-outer">

		        <div class="single-slider-wrapper">

			        <!--<div class="single-img">        	
			        	<?php //if ( '' !== get_the_post_thumbnail() ) : ?>
			                <?php //the_post_thumbnail( 'twentyseventeen-featured-image' ); ?>
			            <?php //endif; ?>
			        </div>-->                                    
			        <?php

			        if ( '' !== get_the_post_thumbnail() ) : 

			        	$thumbnail = get_the_post_thumbnail_url();

			        	array_unshift($post_gallery,$thumbnail); 

			    	endif;

		            foreach ( $post_gallery As $image_url ) {

		                $attachment_id = sed_theme_get_attachment_id_by_url( $image_url );

		                $img = get_sed_attachment_image_html( $attachment_id , '' , 'full' );

		                if ( ! $img ) {
		                    $img = array();
		                    $img['thumbnail'] = '<img class="sed-image-placeholder sed-image" src="' . sed_placeholder_img_src() . '" />';
		                }

		                ?>
		                <div class="slide-item">

		                    <?php echo $img['thumbnail'];?>

		                </div>
		                <?php

		            }
		            ?>

	            </div>

		        <div class="single-content">
		            <div class="single-content-inner">
						<div class="single-heading">
				            <h4><?php the_title(); ?></h4>
				        </div>
						<div>  
							<?php
								/* translators: %s: Name of current post */
								the_content( sprintf(
									__( 'Continue reading<span class="screen-reader-text"> "%s"</span>', 'twentyseventeen' ),
									get_the_title()
								) );
							?>
						</div><!-- the_content -->     
		            </div>
		            <a class="single-home-url" href="<?php echo esc_url( home_url( '/' ) ); ?>"> <?php echo __('Back', 'wonderland'); ?> <i class="fa fa-angle-left"></i> </a>
		        </div>
		        
		    </div>  

	    </div>  
	</div>  

</div><!-- #post-## -->         