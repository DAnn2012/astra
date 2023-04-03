import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

const VideoPopup = ({ allowAutoPlay, videoPopup, toggleVideoPopup }) => {
	const videoID = 'TBZd9oligCw';

	return (
		<Transition.Root show={videoPopup} as={Fragment}>
			<Dialog as="div" className="relative z-[10000]" onClick={ toggleVideoPopup } onClose={ toggleVideoPopup } >
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-slate-800 bg-opacity-90 transition-opacity" />
				</Transition.Child>

				<div className="fixed inset-0 z-[10000] overflow-y-auto">
					<div className="flex min-h-full justify-center p-4 text-center items-center lg:p-0">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<div className="relative w-[24rem] md:w-[34rem] lg:w-[60rem] h-[14rem] md:h-[19rem] lg:h-[34rem]">
								{/* Added rel=0 query paramter at the end to disable YouTube recommendations */}
								<iframe
									className="absolute inset-0 w-full h-full border-0 rounded-md"
									src={`https://www.youtube-nocookie.com/embed/${videoID}?showinfo=0&autoplay=${ videoPopup ? 1 : 0 }&rel=0`}
									allow="autoplay"
									title="YouTube video player"
									frameBorder="0"
									allowFullScreen
								></iframe>
							</div>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
};

export default VideoPopup;
