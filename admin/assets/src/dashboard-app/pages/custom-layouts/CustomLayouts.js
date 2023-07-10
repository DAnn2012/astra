import { __ } from "@wordpress/i18n";
import { useLocation } from 'react-router-dom';
import Astra_Admin_Icons from "@Common/block-icons";
import apiFetch from '@wordpress/api-fetch';

const CustomLayouts = () => {
	const query = new URLSearchParams( useLocation()?.search );
	const allowAutoPlay = '1' === query.get( 'astra-activation-redirect' ) ? 1 : 0;
	const videoID = 'FWRkzJQwcKU';

	const getAstraProTitle = () => {
		return astra_admin.pro_installed_status ? __( 'Activate Now' ) : __( 'Upgrade Now' );
	}

	const onGetAstraPro = ( e ) => {
		if( astra_admin.pro_installed_status ) {
			const formData = new window.FormData();
			formData.append( 'action', 'astra_recommended_plugin_activate' );
			formData.append( 'security', astra_admin.plugin_manager_nonce );
			formData.append( 'init', 'astra-addon/astra-addon.php' );
			e.target.innerText = astra_admin.plugin_activating_text;

			apiFetch( {
				url: astra_admin.ajax_url,
				method: 'POST',
				body: formData,
			} ).then( ( data ) => {
				if( data.success ) {
					window.open( astra_admin.astra_base_url, '_self' );
				}
			} );
		} else {
			window.open(
				astra_admin.upgrade_url,
				'_blank'
			);
		}
	};

	const onFreeVsProClick = () => {
		window.open(
			astra_admin.free_vs_pro_link,
			'_self'
		);
	};

	return (
		<main className="relative">
			<div className="w-full absolute inset-0 blur-md">
				{Astra_Admin_Icons['custom-layout']}
			</div>

			{/* Model Component section */}
			<div className="relative z-10 pt-[4rem]">
				<div className="max-w-[39rem] h-max bg-white m-auto shadow-overlay-modal text-center rounded-lg p-8">
					<div>
						<div className="mx-auto flex items-center justify-center">
							{Astra_Admin_Icons["astra-logo"]}
						</div>
						<div className="mt-3 text-center sm:mt-5">
							<h4
								className="text-2xl font-semibold leading-7 text-slate-800"
								id="modal-title"
							>
								{ __( 'Custom Layouts', 'astra' ) }
							</h4>
							<div className="mt-2">
								<p className="text-sm leading-[1.375rem] text-slate-500 text-center">
									{ __( 'Upgrade to Astra Pro to get access to Custom Layouts, which allow you to create a unique header, footer, 404 pages, and custom content.', 'astra' ) }
								</p>
							</div>
							{
								astra_admin.show_banner_video && <div className="relative pb-[17.5rem] mt-5">
									{/* Added rel=0 query parameter at the end to disable YouTube recommendations. */}
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
					</div>
					<div className="text-center mt-5">
						<button
							type="button"
							className="w-auto justify-center rounded-md border border-transparent bg-astra px-[2.9375rem] py-[0.6875rem] text-base leading-4 font-medium text-white shadow-sm hover:bg-astra-hover focus:outline-none focus:ring-2 focus:ring-astra-hover focus:ring-offset-2"
							onClick={ onGetAstraPro }
						>
							{ getAstraProTitle() }
						</button>
						<div>
							<button
								className="w-auto justify-center mt-4 text-base leading-4 text-astra font-medium"
								onClick={ onFreeVsProClick }
							>
								{ __( 'Free vs Pro', 'astra' ) }
							</button>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default CustomLayouts;
