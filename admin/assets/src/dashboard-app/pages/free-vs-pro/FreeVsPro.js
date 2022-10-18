import { __ } from "@wordpress/i18n";
import { features } from "./data";
import Astra_Admin_Icons from '@Common/block-icons';


const FreeVsPro = () => {
	const checkStatus = (value) => {
		if (value === "yes") {
			return Astra_Admin_Icons['check'];
		} else if (value === "no") {
			return Astra_Admin_Icons['xclose'];
		} else {
			return value;
		}
	};

	const onGetAstraPro = () => {
		window.open(
			'https://wpastra.com/pro',
			'_blank'
		);
	};

	return (
		<main className="py-[2.43rem]">
			<div className="max-w-3xl mx-auto px-6 lg:max-w-7xl">
				<h1 className="sr-only"> Astra Free Vs Pro </h1>
				<div className="md:flex md:flex-row md:justify-between md:items-center">
					<h2 className="text-lg sm:text-2xl font-semibold capitalize mb-3 sm:mb-0">
						{ __( 'Astra Free vs Pro', 'astra' ) }
					</h2>
					<button onClick={ onGetAstraPro } className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-astra focus-visible:bg-astra-hover hover:bg-astra-hover focus:outline-none">
						{ __( 'Get Astra Pro Now', 'astra' ) }
					</button>
				</div>
				{ /* Free VS Pro Data Table */ }
				<div className="mt-8 flex flex-col">
					<div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
							<div className="overflow-hidden shadow-overlay-light md:rounded-lg">
								<table className="min-w-full divide-y divide-slate-200">
									<thead className="bg-white">
										<tr>
											<th
												scope="col"
												className="py-3.5 pl-4 pr-3 text-left text-base font-medium text-slate-800 sm:pl-8"
											>
												Features
											</th>
											<th
												scope="col"
												className="px-3 py-3.5 text-center text-base font-medium text-slate-800"
											>
												Free
											</th>
											<th
												scope="col"
												className="px-3 py-3.5 text-center text-base font-medium text-slate-800"
											>
												Pro
											</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-slate-200 bg-white">
										{ features.map( ( feature, key ) => (
											<tr key={key}>
												<td className="whitespace-nowrap py-4 pl-4 pr-3 text-base text-slate-600 sm:pl-8">
													{ feature.name }
												</td>
												<td className="whitespace-nowrap capitalize px-3 py-4 text-base text-center text-slate-600">
													<div className="flex justify-center">
														{ checkStatus(feature.free) }
													</div>
												</td>
												<td className="whitespace-nowrap capitalize px-3 py-4 text-base text-center text-slate-600">
													<div className="flex justify-center">
														{ checkStatus(feature.pro) }
													</div>
												</td>
											</tr>
										) ) }
									</tbody>
								</table>
								<div className="flex items-center justify-center text-astra hover:text-astra-hover text-base font-medium text-center bg-white py-4 border-t border-t-slate-200">
									<button onClick={ onGetAstraPro } className="flex items-center justify-center">
										<span className="mr-2">
											{__(
												"See all Astra Pro features",
												"astra"
											)}
										</span>
										{ Astra_Admin_Icons['redirect'] }
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>

				<section className="mt-6 py-10 flex flex-col bg-slate-200 items-center justify-center shadow-overlay-light rounded-md">
					<div className="mb-3">
						<span className="py-0.5 px-1 text-[0.625rem] text-white bg-slate-800 rounded-[0.1875rem]">
							{__("PRO", "astra")}
						</span>
					</div>
					<h4 className="text-2xl font-semibold text-slate-800 mb-3">
						{__("Do More with Astra Pro", "astra")}
					</h4>
					<div className="max-w-2xl text-center text-base text-slate-600 mb-7">
						{__( "Get access to powerful features for painless WordPress designing, without the high costs. With all the time you will save, it’s a product that pays for itself!", "astra" )}
					</div>
					<button onClick={ onGetAstraPro } className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-astra focus-visible:bg-astra-hover hover:bg-astra-hover focus:outline-none">
						{__("Get Astra Pro Now", "astra")}
					</button>
				</section>
			</div>
		</main>
	);
};

export default FreeVsPro;
