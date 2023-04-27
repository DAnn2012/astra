import { useState, useEffect } from "react";
import { __ } from "@wordpress/i18n";
import SubSection from "./SubSection";
import Subcategory from "./Subcategory";
import UpgradeToPro from "./UpgradeToPro";
import Astra_Admin_Icons from "@Common/block-icons";
import SearchResults from "./SearchResults";

const Docs = ({ setOpen }) => {
	const [searchKeyword, setSearchKeyword] = useState("");
	const [searchResults, setSearchResults] = useState(null);

	useEffect(() => {
		filterDocs();
	}, [searchKeyword]);

	function filterDocs() {
		if (searchKeyword === "") {
			setSearchResults(null);
		} else {
			const data = astra_admin.astra_docs_data.docs.filter((item) =>
				item.title.toLowerCase().includes(searchKeyword)
			);
			setSearchResults(data);
		}
	}

	function checkDocsAvailability( catItem, key ) {
		const docAvailed = astra_admin.astra_docs_data.docs.filter((doc) => {
			return doc.category.includes(catItem[0]);
		});
		if ( docAvailed.length ) {
			return <SubSection item={catItem} key={key} />
		} else {
			return 'astra-pro-modules' === catItem[0] ? <Subcategory item={catItem} key={key} /> : '';
		}
	}

	return (
		<main className="bg-white">
			<div className="">
				<h1 className="sr-only"> {__("Welcome to KB Docs", "astra")} </h1>
				<div className="w-full flex justify-between items-center bg-gray-50 py-5 px-6">
					<a
						href={astra_admin.astra_base_url}
						className="flex-shrink-0 flex items-center ast-box-shadow-none"
					>
						<img
							className="lg:block mr-3 h-[2.6rem] w-auto ast-box-shadow-none"
							src={astra_admin.logo_url}
							alt="Workflow"
						/>
					</a>
					<div className="max-w-5xl mx-auto w-full relative">
						<input
							type="search"
							placeholder="Search"
							className="w-full ast-docs-search-fields text-base"
							onChange={(e) => setSearchKeyword(e.target.value)}
						/>
						<div className="absolute top-1/2 -translate-y-1/2 left-4">
							{searchKeyword ? (
								Astra_Admin_Icons['close']
							) : (
								Astra_Admin_Icons['search']
							)}
						</div>
					</div>
					<div>
						<button onClick={() => setOpen(false)}>
							{ Astra_Admin_Icons['popupclose'] }
						</button>
					</div>
				</div>

				<div className="sm:max-w-5xl mx-auto w-full flex flex-col">
					<div className="flex flex-col lg:flex-row gap-8 pt-10">
						<div className="w-full px-6 lg:px-0 lg:w-2/3 mb-5">
							{(searchResults && searchResults.length > 0) && (
								<div className="mb-8">
									<SearchResults data={searchResults} />
								</div>
							)}
							{/* Docs subsections */}
							{ Object.entries(
									astra_admin.astra_docs_data.categories
								).map((item, key) => (
									checkDocsAvailability( item, key )
							)) }
							{
								( ! astra_admin.pro_available && astra_admin.upgrade_notice	) &&
								<div className="mt-10">
									<UpgradeToPro />
								</div>
							}
						</div>
						<div className="w-full px-6 lg:px-0 lg:w-1/3">
							<section aria-labelledby="section-2-title">
								<h2 className="sr-only" id="section-2-title">
									{__("Pro Support", "astra")}
								</h2>
								<div className="relative box-border border border-sky-500 rounded-md bg-white shadow-sm overflow-hidden transition hover:shadow-hover mb-5">
									<div className="p-6">
										{ Astra_Admin_Icons['support'] }

										<div className="absolute top-7 right-6 text-[0.625rem] leading-[1rem] text-white bg-slate-800 font-medium rounded-[0.1875rem] py-[0rem] px-1.5 self-start">
											{__("PRO", "astra")}
										</div>

										<h3 className="relative flex items-center text-slate-800 text-base font-medium pb-2 mt-4">
											<span className="flex-1">
												{__(
													"Priority Support",
													"astra"
												)}
											</span>
										</h3>
										<p className="text-slate-500 text-sm pb-5 pr-12">
											{__(
												"We aim to answer all priority support requests within 2-3 hours.",
												"astra"
											)}
										</p>
										<a
											className="text-sm text-astra focus:text-astra focus-visible:text-astra-hover active:text-astra-hover hover:text-astra-hover no-underline"
											href="https://wpastra.com/support/?utm_source=dashboard&utm_medium=free-theme&utm_campaign=priority-support"
											target="_blank"
											rel="noreferrer"
										>
											{__("Learn More →", "astra")}
										</a>
									</div>
								</div>
							</section>
							<section aria-labelledby="section-2-title">
								<h2 className="sr-only" id="section-2-title">
									{__("View Documentation", "astra")}
								</h2>
								<div className="box-border rounded-md bg-white border border-slate-200 shadow-sm overflow-hidden transition hover:shadow-hover mb-5">
									<div className="p-6">
										{ Astra_Admin_Icons['book'] }

										<h3 className="text-slate-800 text-base font-medium pb-2 mt-4">
											{__("View Documentation", "astra")}
										</h3>
										<p className="text-slate-500 text-sm pb-5">
											{__(
												`Browse documentation, reference material, and tutorials for ${astra_admin.theme_name} Theme.`,
												"astra"
											)}
										</p>
										<a
											className="flex items-center text-sm text-astra focus:text-astra focus-visible:text-astra-hover active:text-astra-hover hover:text-astra-hover no-underline"
											href="https://wpastra.com/docs/?utm_source=dashboard&utm_medium=free-theme&utm_campaign=knowledge"
											target="_blank"
											rel="noreferrer"
										>
											<span className="mr-2">
												{__(
													"View All Documentation",
													"astra"
												)}
											</span>
											{Astra_Admin_Icons["redirect"]}
										</a>
									</div>
								</div>
							</section>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default Docs;
