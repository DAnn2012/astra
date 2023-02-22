import { __ } from '@wordpress/i18n';
import Astra_Admin_Icons from '@Common/block-icons';
import apiFetch from '@wordpress/api-fetch';

const StarterTemplates = () => {

	if ( astra_admin.starter_templates_data.is_available ) {
		window.open(
			astra_admin.starter_templates_data.redirection,
			'_self'
		);
		return;
	}

	const handlePluginActionTrigger = (e) => {
		let action = e.target.dataset.action;
		const formData = new window.FormData();

		switch (action) {
			case 'astra_recommended_plugin_activate':
				activatePlugin( e );
				break;

			case 'astra_recommended_plugin_install':
				formData.append( 'action', 'astra_recommended_plugin_install' );
				formData.append( '_ajax_nonce', astra_admin.plugin_installer_nonce );
				formData.append( 'slug', e.target.dataset.slug );

				e.target.innerText = astra_admin.plugin_installing_text;

				apiFetch( {
					url: astra_admin.ajax_url,
					method: 'POST',
					body: formData,
				} ).then( ( response ) => {
					if ( response.success ) {
						e.target.innerText = astra_admin.plugin_installed_text;
						activatePlugin( e );
					}
				} );
				break;

			default:
				// Do nothing.
				break;
		}
	};

	const activatePlugin = (e) => {
		const formData = new window.FormData();
		formData.append( 'action', 'astra_recommended_plugin_activate' );
		formData.append( 'security', astra_admin.plugin_manager_nonce );
		formData.append( 'init', e.target.dataset.init );
		e.target.innerText = astra_admin.plugin_activating_text;

		apiFetch( {
			url: astra_admin.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( ( response ) => {
			if( response.success ) {
				e.target.className = '';
				e.target.className = 'text-[#4AB866] pointer-events-none capitalize text-sm leading-[0.875rem] font-medium rounded-md';
				e.target.innerText = astra_admin.plugin_activated_text;
				window.location = astra_admin.starter_templates_data.redirection;
			}
		} );
	};


	const getAction = ( status ) => {
		if (status === "activated") {
			return "";
		} else if (status === "installed") {
			return "astra_recommended_plugin_activate";
		} else {
			return "astra_recommended_plugin_install";
		}
	};

	const getTitle = ( status ) => {
		if (status === "activated") {
			return __( 'Activated', 'astra' );
		} else if (status === "installed") {
			return __( 'Activate', 'astra' );
		} else {
			return __( 'Install & Activate', 'astra' );
		}
	}

	const onLearnMoreGuideClick = () => {
		window.open(
			'https://wpastra.com/starter-templates/?utm_source=wp&utm_medium=dashboard',
			'_blank'
		);
	};

	return (
		<main className="relative tablet:my-16">
			<div className="w-full blur-[8px]">
				{ Astra_Admin_Icons['starter-canvas'] }
			</div>

			{ /* Model Component section */ }
			<div>
				<div className="max-w-[39rem] h-max bg-white m-auto shadow-overlay-modal text-center rounded-lg p-8 absolute inset-3 top-[150%] sm:top-0 sm:inset-0">
					<div>
						<div className="mx-auto flex items-center justify-center">
							{ Astra_Admin_Icons['starter-logo'] }
						</div>
						<div className="mt-3 text-center sm:mt-6">
							<h4
								className="text-2xl font-semibold leading-7 text-slate-800"
								id="modal-title"
							>
								{ astra_admin.starter_templates_data.title }
							</h4>
							<div className="mt-2">
								<p className="text-sm text-slate-500">
									{ __( 'Create professional designed pixel perfect websites in minutes. Get access to 280+ pre-made full website templates for your favorite page builder.', 'astra' ) }
								</p>
							</div>
						</div>
					</div>
					<div className="text-center mt-5 sm:mt-6">
						<button
							type="button"
							className="w-auto justify-center rounded-md border border-transparent bg-astra px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-astra-hover focus:outline-none focus:ring-2 focus:ring-astra-hover focus:ring-offset-2 sm:text-sm"
							data-slug={astra_admin.starter_templates_data.slug}
							data-init={astra_admin.starter_templates_data.path}
							data-action={getAction(astra_admin.starter_templates_data.status)}
							onClick={ handlePluginActionTrigger }
						>
							{ getTitle(astra_admin.starter_templates_data.status) }
						</button>
						<div>
							<button
								className="w-auto justify-center mt-4 text-astra"
								onClick={onLearnMoreGuideClick}
							>
							{ __( 'Learn More', 'astra' ) }
							</button>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default StarterTemplates;
