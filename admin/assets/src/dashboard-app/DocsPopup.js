import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Docs from "./pages/docs/Docs";
import { __ } from "@wordpress/i18n";

const DocsPopup = () => {
	const [open, setOpen] = useState(false);
	return (
		<div>
			<button onClick={() => setOpen(true)} className="text-xs sm:text-sm font-medium sm:leading-[0.875rem] text-slate-600">
				{ __( 'Knowledge Base', 'astra' ) }
			</button>
			<Transition.Root show={open} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={setOpen}>
					<div className="fixed inset-0 top-8 z-10 overflow-y-auto ast-kb-section">
						<div className="flex min-h-screen h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ast-kb-inner-wrap">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
								enterTo="opacity-100 translate-y-0 sm:scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 translate-y-0 sm:scale-100"
								leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							>
								<Dialog.Panel className="relative transform bg-white text-left transition-all min-h-screen w-full h-full lg:ml-40">
									<Docs setOpen={setOpen} />
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
		</div>
	);
};

export default DocsPopup;
