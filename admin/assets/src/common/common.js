// When the route changes, we need to update wp-admin's menu with the correct submenu & menu link.
window.astWpMenuClassChange = function ( path ) {
	const pageSlug = astra_admin.home_slug;
	let pageUrl = 'admin.php?page=' + pageSlug;
	// http://localhost/astra/wp-admin/admin.php?page=astra&path=
	if ( 'custom-layouts' === path ) {
		pageUrl = 'admin.php?page=' + pageSlug + '&path=custom-layouts';
	} else if ( 'spectra' === path ) {
		pageUrl = 'admin.php?page=' + pageSlug + '&path=spectra';
	}

	document.querySelector( 'body' ).classList.remove( 'ast-admin-settings-page' );
	if( 'settings' === path ) {
		document.querySelector( 'body' ).classList.add( 'ast-admin-settings-page' );
	}

	const currentItemsSelector = `.wp-submenu-wrap li > a[href$="${ pageUrl }"]`;

	const currentItems = document.querySelectorAll( currentItemsSelector );

	/* Remove current */
	Array.from( document.getElementsByClassName( 'current' ) ).forEach(
		function ( item ) {
			if ( item.parentElement.classList.contains( 'wp-submenu' ) ) {
				item.classList.remove( 'current' );
			}
		}
	);

	/* Add current */
	Array.from( currentItems ).forEach( function ( item ) {
		item.parentElement.classList.add( 'current' );
	} );
};
