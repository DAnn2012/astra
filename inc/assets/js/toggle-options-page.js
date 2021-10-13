/**
 * Astra Option Page settings
 *
 * @package Astra
 * @since  x.x.x
 */

(function( $ ) {
	$( document ).ready(function() {
		$(document).on('click', '#ast-full-site-editing', function(){
			var _this = $(this)
			var status = _this.data('value');

			console.log(status);

			if ( 'disable' == status ) {
				newString = 'Disable Full Site Editing';
				newStatus = 'enable';
			} else {
				newString = 'Enable Full Site Editing';
				newStatus = 'disable';
			}

			_this.removeClass('install-now installed button-disabled updated-message')
				.addClass('updating-message');

				$.ajax({
				url: astra.ajaxUrl,
				type: 'POST',
				data: {
					'action': 'astra_fse_support',
					'status': newStatus,
				},
			})
			.done(function(result) {
				if (result.success) {
					_this.html(newString).data('value', newStatus).removeClass('updating-message');
				} else {
					_this.removeClass('updating-message');

				}
			});
		});
	});
})( jQuery );
