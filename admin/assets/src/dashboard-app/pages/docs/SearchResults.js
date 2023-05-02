import Astra_Admin_Icons from "@Common/block-icons";
import ReactHtmlParser from 'react-html-parser';

const SearchResults = ({ data }) => {
	return (
		<div>
			{data &&
				data.map((item, key) => (
					<a
						href={item.url + '?utm_source=dashboard&utm_medium=free-theme&utm_campaign=knowledge'}
						target="blank"
						className="flex items-center justify-between text-slate-800 rounded-md p-2 pl-0 hover:bg-gray-50 group cursor-pointer"
						key={key}
					>
						<div className="flex items-center ast-kb-caret">
							{Astra_Admin_Icons["caret"]}

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
	);
};

export default SearchResults;
