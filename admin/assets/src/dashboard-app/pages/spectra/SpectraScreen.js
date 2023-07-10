import { __ } from "@wordpress/i18n";
import { useLocation } from "react-router-dom";
import Astra_Admin_Icons from "@Common/block-icons";
import apiFetch from '@wordpress/api-fetch';

const spectraFeatures = [
	{
		title: __( 'Super Fast and Stable', 'astra' ),
		description: __( 'Spectra works with the native WordPress editor with no dependency on external code. So, it is fast and stable.', 'astra' ),
		icon: 'superfast',
	},
	{
		title: __( 'Secure and Integrated', 'astra' ),
		description: __( 'Clean code written using the latest standards to maximize security and work flawlessly with any WordPress plugin.', 'astra' ),
		icon: 'secure',
	},
	{
		title: __( 'Native WordPress Interface', 'astra' ),
		description: __( 'Spectra Integrates into the same WordPress editor, making it super intuitive website builder.', 'astra' ),
		icon: 'nativewp',
	},
	{
		title: __( 'Google Will Love and Rank', 'astra' ),
		description: __( 'Score 100% in CWV. Clean code output and lightning-fast load times keep visitors and search engines happy.', 'astra' ),
		icon: 'googlelove',
	},
	{
		title: __( 'Zero Bloat, No Dependencies', 'astra' ),
		description: __( 'Fewer external scripts and dependencies keep the code clean, resulting in small file sizes and faster loading times.', 'astra' ),
		icon: 'zerobloat',
	},
	{
		title: __( 'Just-in-time Compiler', 'astra' ),
		description: __( 'Loads assets dynamically on demand. Assets are loaded for only those blocks that are used on a page.', 'astra' ),
		icon: 'compiler',
	},
];

const SpectraScreen = () => {
	const query = new URLSearchParams(useLocation()?.search);
	const allowAutoPlay = "1" === query.get("astra-activation-redirect") ? 1 : 0;
	const videoID = 'GLNzTxArR6Y';

	const handleSpectraPluginAction = (e) => {

		let spectraPluginStatus = astra_admin.spectra_plugin_status;
		const formData = new window.FormData();

		if ( 'install' === spectraPluginStatus ) {
			formData.append( 'action', 'astra_recommended_plugin_install' );
			formData.append( 'slug', 'ultimate-addons-for-gutenberg' );
			formData.append( 'init', 'ultimate-addons-for-gutenberg/ultimate-addons-for-gutenberg.php' );
			formData.append( '_ajax_nonce', astra_admin.plugin_installer_nonce );

			e.target.innerText = astra_admin.plugin_installing_text;

			apiFetch( {
				url: astra_admin.ajax_url,
				method: 'POST',
				body: formData,
			} ).then( ( data ) => {
				if ( data.success ) {
					e.target.innerText = astra_admin.plugin_installed_text;
					activatePlugin(e);
				}
			} );
		} else if ( 'installed' === spectraPluginStatus ) {
			activatePlugin(e);
		} else {
			// Do nothing.
		}
	};

	const activatePlugin = (e) => {
		const formData = new window.FormData();
		formData.append( 'action', 'astra_recommended_plugin_activate' );
		formData.append( 'security', astra_admin.plugin_manager_nonce );
		formData.append( 'init', 'ultimate-addons-for-gutenberg/ultimate-addons-for-gutenberg.php' );
		e.target.innerText = astra_admin.plugin_activating_text;

		apiFetch( {
			url: astra_admin.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( ( data ) => {
			if( data.success ) {
				e.target.innerText = astra_admin.plugin_activated_text;
				window.location = `${astra_admin.admin_base_url}options-general.php?page=spectra`;
			}
		} );
	};

	const getSpectraPluginTitle = () => {
		if ( 'install' === astra_admin.spectra_plugin_status ) {
			return <> <span className="mr-3"> {__("Install Spectra - It’s free", "astra")} </span> {Astra_Admin_Icons["download"]} </>;
		} else if ( 'installed' === astra_admin.spectra_plugin_status ) {
			return __("Activate Spectra", "astra");
		} else {
			return __("Explore Spectra", "astra");
		}
	}

	return (
		<main className="bg-white pb-14 pt-20">
			<div className="mx-auto px-6 max-w-[45rem]">
				<h1 className="sr-only"> {__("Spectra - WordPress Free Page Builder", "astra")} </h1>
				<div className="flex flex-col items-center">
					<div className="absolute top-0 tablet:none">
						{Astra_Admin_Icons['spectraBackgroundLogo']}
					</div>
				</div>
				<div className="relative flex flex-col items-center">
					{Astra_Admin_Icons["spectra-logo"]}
					<h2 className="text-4xl sm:text-[2.5rem] text-slate-800 font-semibold capitalize mb-2 mt-7">
						{`${astra_admin.theme_name} + Spectra = `}
						<span className="text-[1em] leading-[1em]">
							{Astra_Admin_Icons['heart-logo']}
						</span>
					</h2>
					<p className="text-base leading-[1.625rem] mb-7">
						{
							__( 'Spectra is 100% beginner friendly and enhances the default WordPress block editor.', 'astra' )
						}
					</p>
					<button
						className={`inline-flex w-[35%] justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-astra focus-visible:bg-astra-hover hover:bg-astra-hover hover:text-white focus:text-white active:text-white focus:outline-none mr-4`}
						onClick={ handleSpectraPluginAction }
					>
						{ getSpectraPluginTitle() }
					</button>
					{
						astra_admin.show_banner_video && <div className="relative pb-[25.375rem] mt-12 w-full">
							{/* Added rel=0 query parameter at the end to disable YouTube recommendations */}
							<iframe
								className="absolute inset-0 w-full h-full rounded-md"
								src={`https://www.youtube-nocookie.com/embed/${videoID}?showinfo=0&autoplay=${allowAutoPlay}&mute=${allowAutoPlay}&rel=0`}
								allow="autoplay"
								title="YouTube video player"
								frameBorder="0"
								allowFullScreen
							></iframe>
						</div>
					}
				</div>

				<div className="grid grid-cols-2 gap-12 mt-16 px-0 sm:px-8">
					{spectraFeatures.map((feature, key) => (
						<div key={key}>
							<div> { Astra_Admin_Icons[feature.icon] } </div>
							<h4 className="text-base leading-[1.625rem] text-slate-800 font-medium mt-4 mb-1">
								{feature.title}
							</h4>
							<p className="text-sm leading-[1.375rem] text-slate-600">
								{feature.description}
							</p>
						</div>
					))}
				</div>

				<div className="flex flex-col items-center justify-center mt-20 mx-0 sm:mx-[4.5rem]">
					<h3 className="text-[2rem] leading-10 font-semibold text-slate-800 mb-6 text-center">
						{__(
							"Build Ultra High Performance Websites, Without Coding",
							"astra"
						)}
					</h3>
					<button
						className={`inline-flex w-[45%] justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-astra focus-visible:bg-astra-hover hover:bg-astra-hover hover:text-white focus:text-white active:text-white focus:outline-none mr-4`}
						onClick={ handleSpectraPluginAction }
					>
						{ getSpectraPluginTitle() }
					</button>
				</div>
			</div>
		</main>
	);
};

export default SpectraScreen;
