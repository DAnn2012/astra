import { useState } from "react";
import Astra_Admin_Icons from "@Common/block-icons";
import ReactHtmlParser from "react-html-parser";

const SubSection = ({ item }) => {
	const [sectionData, setSectionData] = useState(false);

	const subItems = astra_admin.astra_docs_data.docs.filter((doc) => {
		return doc.category.includes(item[0]);
	});

	const toggleSection = () => {
		setSectionData(!sectionData);
	};

	return (
		<div className="py-5 border-t border-slate-200">
			<button
				onClick={toggleSection}
				className="w-full flex justify-between items-center"
			>
				<div className="flex items-center">
					{Astra_Admin_Icons["bookmark"]}

					<h4 className="text-base font-medium leading-[1.625rem] text-slate-800 ml-2">
						{ReactHtmlParser(item[1].name)}
					</h4>
				</div>
				<div
					className={` ${
						sectionData ? "rotate-0" : "-rotate-90"
					} transition-rotate duration-300 ease-in-out`}
				>
					{Astra_Admin_Icons["expand"]}
				</div>
			</button>
			{/* Sub Section Items */}
			{sectionData && (
				<div className="mt-5">
					<div className="space-y-1 mb-5">
						{/* Single Item */}
						{subItems.splice(0, 5).map((item, key) => (
							<a
								href={item.url + '?utm_source=dashboard&utm_medium=free-theme&utm_campaign=knowledge'}
								target="_blank"
								className="flex items-center justify-between text-slate-800 rounded-md p-2 pl-0 hover:bg-gray-50 group cursor-pointer focus:outline-0"
								key={key}
							>
								<div className="flex items-center ast-kb-caret">
									<span>
										{Astra_Admin_Icons["caret"]}
									</span>

									<div className="text-base leading-[1.625rem] text-slate-800 ml-2">
										{ReactHtmlParser(item.title)}
									</div>
								</div>
								<div className="text-slate-600 invisible group-hover:visible">
									{Astra_Admin_Icons["redirect"]}
								</div>
							</a>
						))}
					</div>

					<a
						href={`https://wpastra.com/docs-category/${item[0]}/?utm_source=dashboard&utm_medium=free-theme&utm_campaign=knowledge`}
						target="_blank"
						className="text-base font-medium leading-4 text-astra flex items-center"
					>
						<span className="mr-2">
							{`View all ${ReactHtmlParser(item[1].name)} docs`}
						</span>
						{Astra_Admin_Icons["redirect"]}
					</a>
				</div>
			)}
		</div>
	);
};

export default SubSection;
