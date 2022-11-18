<?php
/**
 * Template for Single Page
 *
 * @package     Astra
 * @author      Astra
 * @copyright   Copyright (c) 2022, Astra
 * @link        https://wpastra.com/
 * @since       Astra x.x.x
 */

if ( apply_filters( 'astra_display_single_layout1_header_banner', true ) ) { ?>

	<header class="entry-header <?php astra_entry_header_class(); ?>">
		<?php astra_banner_elements_order(); ?>
	</header> <!-- .entry-header -->

<?php } ?>

<div class="entry-content clear"
	<?php
			echo astra_attr(
				'article-entry-content-page',
				array(
					'class' => '',
				)
			);
	?>
>

	<?php astra_entry_content_before(); ?>

	<?php the_content(); ?>

	<?php astra_entry_content_after(); ?>

	<?php
		wp_link_pages(
			array(
				'before'      => '<div class="page-links">' . esc_html( astra_default_strings( 'string-single-page-links-before', false ) ),
				'after'       => '</div>',
				'link_before' => '<span class="page-link">',
				'link_after'  => '</span>',
			)
		);
		?>

</div><!-- .entry-content .clear -->
