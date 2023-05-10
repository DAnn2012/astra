import { Switch } from '@headlessui/react'
import apiFetch from '@wordpress/api-fetch';
import ToolTip from './ToolTip';
import { useSelector, useDispatch } from 'react-redux';
import { __ } from '@wordpress/i18n';

const classNames = ( ...classes ) => ( classes.filter( Boolean ).join( ' ' ) );

const ExtensionCard = ( props ) => {

	const {
		title,
		title_url,
		links,
		condition = true,
		deprecated = true,
	} = props.moduleInfo;

	const slug = props.slug;

	const dispatch = useDispatch();

	const blocksStatuses = useSelector( ( state ) => state.blocksStatuses );

	const moduleActivationStatus = ( blocksStatuses && undefined !== blocksStatuses[slug] && slug == blocksStatuses[slug] ) ? true : false;

	function getAddonTitleColorClass( condition ) {
		if( condition || ! astra_admin.pro_available ) {
			return 'text-slate-800';
		} else {
			return 'text-[#475569]';
		}
	}

	function getAddonLinksColorClass( condition, classes ) {
		if( condition || ! astra_admin.pro_available ) {
			return classes;
		} else {
			return 'text-[#CBD5E1] ' + classes;
		}
	}

	function getWrapperClass( condition, addon ) {
		if( condition || 'white-label' === addon ) {
			return 'ast-addon-active';
		} else {
			return 'ast-addon-inactive';
		}
	}

	return (
		<div
			key={slug}
			className={ classNames(
				! astra_admin.pro_available || ! condition
				? classNames( ! astra_admin.pro_available ? 'group' : '', 'bg-slate-50' )
				: `bg-white ${getWrapperClass( moduleActivationStatus, slug )} `,
				'box-border relative border rounded-md h-20 z-0 px-4 py-3 flex items-start gap-x-4 snap-start hover:shadow-md transition astra-icon-transition'
			) }
		>

			<div className="flex-1 min-w-0">
				<div className={`flex items-center text-base font-medium leading-7 ${getAddonTitleColorClass(condition)}`}>
					{ title }
					{ deprecated && (
						<div className="inline-block align-top max-h-4 px-1.5 py-1 ml-1.5 text-[10px] leading-[10px] border border-slate-200 text-slate-400 rounded">
							{ __( 'Legacy', 'astra' ) }
						</div>
					) }
					<div className='group'>
						{ ( astra_admin.pro_available && ! condition ) && (
							<span className='group inline-block align-middle ml-1 leading-none opacity-30 text-base dashicons dashicons-info'>
							</span>
						) }
						{ ( astra_admin.pro_available && ! condition ) && (
							<div className="w-max max-w-[17.125rem] absolute -top-[2.8rem] left-4 rounded-[0.1875rem] z-10 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-300 ease-in-out">
								<div
									id="pro-tooltip-top"
									role="tooltip"
									className="text-left inline-block z-10 h-fit px-2.5 py-1.5 text-[0.75rem] leading-[1rem] text-white bg-slate-800 rounded-sm shadow-sm opacity-1 tooltip"
								>
									{ __( `${title} plugin needs to be installed / activated to enable this module.`, 'astra' ) }
								</div>
								<div
									className="ml-8 mr-auto w-2 h-2 flex -mt-1 rotate-45 bg-slate-800 overflow-hidden"
								></div>
							</div>
						) }
					</div>
				</div>
				{links.map( ( link ) => (
					<a
						key={Math.floor(Math.random() * 100000)}
						className={ classNames(
							getAddonLinksColorClass(condition, link.link_class),
							( astra_admin.pro_available && ! condition ) ? 'focus-visible:text-slate-500 active:text-slate-500 focus:text-slate-400 text-slate-400 text-base truncate pointer-events-none' : 'focus-visible:text-slate-500 active:text-slate-500 focus:text-slate-400 text-slate-400 text-base truncate'
						) }
						href={ link.link_url }
						target={ link.target_blank ? "_blank" : "_self" }
						rel="noreferrer"
					>
						{link.link_text}
					</a>
				))}
			</div>
			{
				<div
					className={ classNames(
						! astra_admin.pro_available ? 'text-[0.625rem] leading-[1rem] font-medium text-white bg-slate-800 border border-slate-800 rounded-[0.1875rem]' : 'self-center',
						( astra_admin.pro_available && ! condition ) ? 'relative inline-flex flex-shrink-0 py-[0rem] px-1.5 opacity-30 pointer-events-none' : 'relative inline-flex flex-shrink-0 py-[0rem] px-1.5'
					) }
				>
					{ ! astra_admin.pro_available && __( 'PRO', 'astra' ) }
					{ ( astra_admin.pro_available && 'white-label' !== slug ) &&
						<Switch
								checked={ moduleActivationStatus }
								onChange={ () => {
									let status = false;
									let moduleId = slug;
									let moduleStatus = moduleActivationStatus ? 'deactivate' : 'activate';

									if ( ! moduleActivationStatus ) {
										status = slug;
									}

									const optionsClone = { ...blocksStatuses };
									optionsClone[ slug ] = status;

									dispatch( {type:'UPDATE_BLOCK_STATUSES', payload: optionsClone} );

									const formData = new window.FormData();

									formData.append( 'action', 'astra_addon_update_module_status' );
									formData.append( 'security', astra_addon_admin.update_nonce );
									formData.append( 'module_status', moduleStatus ); // activate/deactivate.
									formData.append( 'module_id', moduleId );

									apiFetch( {
										url: astra_admin.ajax_url,
										method: 'POST',
										body: formData,
									} ).then( ( data ) => {
										if ( data.success ) {
											dispatch( {type: 'UPDATE_SETTINGS_SAVED_NOTIFICATION', payload: moduleStatus === 'activate' ?  __( 'Successfully Activated!', 'astra' ) : __( 'Successfully Deactivated!', 'astra' ) } );

											const reFormData = new window.FormData();

											reFormData.append( 'action', 'astra_refresh_assets_files' );
											reFormData.append( 'security', astra_addon_admin.update_nonce );

											apiFetch( {
												url: astra_admin.ajax_url,
												method: 'POST',
												body: reFormData,
											} ).then( ( data ) => {
												// Do nothing.
											} );
										}
									} );
								} }
								className={ classNames(
									moduleActivationStatus ? 'bg-astra' : 'bg-slate-200',
									'group relative inline-flex h-4 w-9 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-astra focus:ring-offset-2'
								) }
							>
								<span aria-hidden="true" className="pointer-events-none absolute h-full w-full rounded-md bg-white" />
								<span
									aria-hidden="true"
									className={ classNames(
										moduleActivationStatus ? 'bg-astra' : 'bg-gray-200',
										'pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out'
									) }
								/>
								<span
									aria-hidden="true"
									className={ classNames(
										moduleActivationStatus ? 'translate-x-5' : 'translate-x-0',
										'toggle-bubble pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out'
									) }
								/>
						</Switch>
					}
				</div>
			}
			{
				! astra_admin.pro_available && <ToolTip />
			}
		</div>
	);
};

export default ExtensionCard;
