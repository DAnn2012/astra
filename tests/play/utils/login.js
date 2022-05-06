exports.loginToSite = class loginToSite {
	constructor( page ) {
		this.page = page;
	}
	async loginAsAdmin() {
		await this.page.goto( '/wp-admin/', { waitUntil: 'networkidle' } );
		await this.page.locator( '#user_login' ).click();
		await this.page.locator( '#user_login' ).fill( 'admin' );
		await this.page.locator( '#user_pass' ).fill( 'password' );
		await this.page.locator( '#wp-submit' ).click();
		await this.page.goto( '/wp-admin/' );
	}
};
