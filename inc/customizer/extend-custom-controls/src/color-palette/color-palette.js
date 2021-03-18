import PropTypes from "prop-types";
import AstraColorPickerControl from "../common/astra-color-picker-control";
import isJSON from "../common/astra-common-functions";
import { useEffect, useState } from "react";
import {
	Dashicon,
	Button,
	Popover,
	TabPanel,
	TextareaControl,
	ClipboardButton,
	TextControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";

const ColorPaletteComponent = (props) => {
	let value = props.control.setting.get();

	let defaultValue = props.control.params.default;

	const { label } = props.control.params;

	const [state, setState] = value
		? useState(props.control.setting.get())
		: useState(defaultValue);

	useEffect(() => {
		// If settings are changed externally.
		if (state !== value) {
			setState(value);
		}
	}, [props]);

	let labelHtml = null;

	if (label) {
		labelHtml = <span className="customize-control-title">{label}</span>;
	}

	const handleChangeComplete = (color, patterntype, index) => {
		let value;

		if (typeof color === "string") {
			value = color;
		} else if (
			undefined !== color.rgb &&
			undefined !== color.rgb.a &&
			1 !== color.rgb.a
		) {
			value =
				"rgba(" +
				color.rgb.r +
				"," +
				color.rgb.g +
				"," +
				color.rgb.b +
				"," +
				color.rgb.a +
				")";
		} else {
			value = color.hex;
		}

		updateValues(value, patterntype, index);
	};

	const updateValues = (value, patterntype, index) => {
		let obj = {
			...state,
		};

		let palette = {
			...obj[patterntype],
		};
		let palette_index = {
			...palette[index],
		};

		palette_index[0] = value;
		palette[index] = palette_index;
		obj[patterntype] = palette;

		var newcolor = obj[obj.patterntype][index][0];

		setState(obj);

		props.control.setting.set(obj);
	};

	const editLabel = (value, index) => {
		let obj = {
			...state,
		};

		let palette = {
			...obj[obj.patterntype],
		};
		let palette_index = {
			...palette[index],
		};

		palette_index[1] = value;
		palette[index] = palette_index;
		obj[obj.patterntype] = palette;

		setState(obj);
		props.control.setting.set(obj);
	};

	const addNewColorToPalette = () => {
		var label = `Custom Color ${
			Object.keys(state[state.patterntype]).length - 4
		}`;
		var new_color_array = ["#ffffff", label];

		let obj = {
			...state,
		};

		let respectivePalette = {
			...obj[obj.patterntype],
		};
		respectivePalette[
			Object.keys(respectivePalette).length
		] = new_color_array;

		obj[obj.patterntype] = respectivePalette;

		setState(obj);
		props.control.setting.set(obj);
	};

	const deleteCustomPalette = (index, item) => {
		let obj = {
			...state,
		};

		var result = Object.keys(obj.pattern1).map((key) => obj.pattern1[key]);
		const filteredItems = result
			.slice(0, index)
			.concat(result.slice(index + 1, result.length));
		obj.pattern1 = filteredItems;

		setState(obj);
		props.control.setting.set(obj);
	};

	var patternhtml = (
		<>
			<div className="ast-color-palette1-wrap">
				{Object.keys(state.pattern1).map((item, index) => {
					return (
						<div
							className={`ast-color-picker-palette-${index + 1} `}
							key={index}
						>
							<TextControl
								className="ast-color-palette-label"
								value={state.pattern1[index][1]}
								onChange={(value) => editLabel(value, index)}
							/>
							<span
								title={
									index <= 4
										? __(
												"This color can't be deleted",
												"astra"
										  )
										: ""
								}
							>
								<Button
									className="ast-palette-delete"
									disabled={index <= 4 ? true : false}
									onClick={() => {
										deleteCustomPalette(index, item);
									}}
								>
									<Dashicon icon="trash" />
								</Button>
							</span>
							<AstraColorPickerControl
								color={
									undefined !== state.pattern1 &&
									state.pattern1
										? state.pattern1[index][0]
										: ""
								}
								onChangeComplete={(color, backgroundType) =>
									handleChangeComplete(
										color,
										"pattern1",
										index
									)
								}
								backgroundType={"color"}
								allowGradient={false}
								allowImage={false}
								disablePalette={true}
								colorIndicator={
									undefined !== state.pattern1 &&
									state.pattern1
										? state.pattern1[index][0]
										: ""
								}
							/>
						</div>
					);
				})}
				<Button
					className="ast-add-new-color"
					isPrimary
					onClick={() => addNewColorToPalette()}
				>
					<Dashicon icon="plus" />
					<span> Add New Color</span>
				</Button>
				<Button
					className="ast-palette-import"
					isPrimary
					onClick={() => {
						state.isVisible ? toggleClose() : toggleVisible();
					}}
				>
					<Dashicon icon="open-folder" /> Presets
				</Button>
			</div>
		</>
	);

	const renderOperationButtons = () => {
		return (
			<span className="customize-control-title">
				<>
					<div className="ast-color-btn-reset-wrap">
						<button
							className="ast-reset-btn components-button components-circular-option-picker__clear is-secondary is-small"
							disabled={
								JSON.stringify(state) ===
								JSON.stringify(defaultValue)
							}
							onClick={(e) => {
								e.preventDefault();
								let value = JSON.parse(
									JSON.stringify(defaultValue)
								);

								if (undefined === value || "" === value) {
									value = "";
									wp.customize.previewer.refresh();
								}

								resetValue(value);
							}}
						>
							<Dashicon
								icon="image-rotate"
								style={{
									width: 12,
									height: 12,
									fontSize: 12,
								}}
							/>
						</button>
					</div>
				</>
			</span>
		);
	};

	const resetValue = (value) => {
		setState(value);
		props.control.setting.set(value);
	};

	const toggleVisible = () => {
		let obj = {
			...state,
		};
		obj["isVisible"] = true;
		setState(obj);
	};
	const toggleClose = () => {
		let obj = {
			...state,
		};
		obj["isVisible"] = false;
		if (state.isVisible === true) {
			setState(obj);
		}
	};

	const updateRootCss = (e) => {
		Object.values(e.detail.palette.pattern1).map((item, index) => {
			var maindiv = document.getElementById("customize-preview");
			var iframe = maindiv.getElementsByTagName("iframe")[0];
			var innerDoc =
				iframe.contentDocument || iframe.contentWindow.document;
			innerDoc.documentElement.style.setProperty(
				"--ast-global-palette" + index,
				item[0]
			);
			document.documentElement.style.setProperty(
				"--ast-global-palette" + index,
				item[0]
			);
		});
	};
	document.addEventListener(
		"UpdatePaletteStateInIframe",
		updateRootCss,
		false
	); //Updating the root css for iframe.

	const handlePresetPalette = (item) => {
		var obj = {
			...state,
		};

		var patternArray = {
			...obj.pattern1,
		};

		Object.keys(patternArray).map((index) => {
			if (obj.presetPalette[item][index]) {
				var patternArrayIndex = {
					...patternArray[index],
				};
				patternArrayIndex[0] = obj.presetPalette[item][index];
				patternArray[index] = patternArrayIndex;
			}
		});

		obj["pattern1"] = patternArray;
		obj["importError"] = false;
		obj["isVisible"] = false;
		obj["customImportText"] = "";

		setState(obj);
		props.control.setting.set(obj);
	};

	const addcustomImportText = (text) => {
		let obj = {
			...state,
		};
		obj["customImportText"] = text;
		setState(obj);
	};

	const handleTextImport = () => {
		const importText = state.customImportText;

		if (!importText) {
			setState((prevState) => ({
				...prevState,
				importError: true,
			}));
			return;
		}

		if (
			isJSON(importText) &&
			Object.keys(JSON.parse(importText)).length === 5
		) {
			var customImportText = JSON.parse(importText);

			let obj = {
				...state,
			};
			var patternArray = {
				...obj.pattern1,
			};

			Object.keys(patternArray).map((index) => {
				if (customImportText[index]) {
					var patternArrayIndex = {
						...patternArray[index],
					};
					patternArrayIndex[0] = customImportText[index];
					patternArray[index] = patternArrayIndex;
				}
			});

			obj.presetPalette.push(customImportText); //Keep copy of imported palette.
			obj["pattern1"] = patternArray;
			obj["importError"] = false;
			obj["isVisible"] = false;
			obj["customImportText"] = "";

			setState(obj);
			props.control.setting.set(obj);
		} else {
			setState((prevState) => ({
				...prevState,
				importError: true,
			}));
		}
	};

	const exportCopied = (item) => {
		setState((prevState) => ({
			...prevState,
			exportCopied: item,
		}));
	};

	const exportCopiedComplete = () => {
		setState((prevState) => ({
			...prevState,
			exportCopied: "",
		}));
	};

	const deletePalette = (index, item) => {
		let obj = {
			...state,
		};

		const filteredItems = obj.presetPalette
			.slice(0, index)
			.concat(
				obj.presetPalette.slice(index + 1, obj.presetPalette.length)
			);

		obj.presetPalette = filteredItems;

		setState(obj);
		props.control.setting.set(obj);
	};

	return (
		<>
			<label className="customizer-text">{labelHtml}</label>
			{renderOperationButtons()}

			<div className="ast-color-palette-wrapper">{patternhtml}</div>
			<input
				type="hidden"
				data-palette={JSON.stringify(state[state.patterntype])}
				id="ast-color-palette-hidden"
			/>

			<div className="ast-palette-import-wrap">
				{state.isVisible && (
					<Popover
						position={"bottom center"}
						onClose={toggleClose}
						className="ast-global-palette-import"
					>
						<TabPanel
							className="ast-palette-popover-tabs"
							activeClass="active-tab"
							initialTabName={"import"}
							tabs={[
								{
									name: "import",
									title: __("Select a palette", "astra"),
									className:
										"ast-color-presets palette-popupbutton",
								},
								{
									name: "custom",
									title: __("Import", "astra"),
									className: "ast-import palette-popupbutton",
								},
							]}
						>
							{(tab) => {
								let tabout;
								if (tab.name) {
									if ("import" === tab.name) {
										tabout = (
											<>
												{Object.keys(
													state.presetPalette
												).map((item, index) => {
													return (
														<div key={index}>
															<Button
																className="ast-palette-item"
																onClick={() =>
																	handlePresetPalette(
																		item
																	)
																}
																tabIndex={0}
																key={index}
															>
																{Object.keys(
																	state
																		.presetPalette[
																		item
																	]
																).map(
																	(
																		color,
																		subIndex
																	) => {
																		return (
																			<div
																				key={
																					subIndex
																				}
																				style={{
																					width: 25,
																					height: 25,
																					marginBottom: 0,
																					transform:
																						"scale(1)",
																					transition:
																						"100ms transform ease",
																				}}
																				className="ast-palette-individual-item-wrap"
																			>
																				<span
																					className="ast-palette-individual-item"
																					style={{
																						color: `${state.presetPalette[item][color]}`,
																					}}
																				></span>
																			</div>
																		);
																	}
																)}
															</Button>
															<ClipboardButton
																text={JSON.stringify(
																	state
																		.presetPalette[
																		item
																	]
																)}
																onCopy={() =>
																	exportCopied(
																		item
																	)
																}
																onFinishCopy={() =>
																	exportCopiedComplete(
																		item
																	)
																}
																className="ast-palette-export"
															>
																{state.exportCopied ===
																item ? (
																	<Dashicon icon="yes" />
																) : (
																	<Dashicon icon="admin-page" />
																)}
															</ClipboardButton>

															<Button
																className="ast-palette-delete"
																onClick={() => {
																	deletePalette(
																		index,
																		item
																	);
																}}
																key={`delete-${index}`}
															>
																<Dashicon icon="trash" />
															</Button>
														</div>
													);
												})}
											</>
										);
									} else {
										tabout = (
											<>
												<div>
													<h4>
														{__(
															"Required Format",
															"astra"
														)}
													</h4>
													<p className="palette-format">{`["#733492","#AC238C","#24B460","#C0C2BA","#CBCB38"]`}</p>
												</div>
												<TextareaControl
													label={__(
														"Import color set from text data.",
														"astra"
													)}
													help={__(
														"Follow required format given above.",
														"astra"
													)}
													value={
														state.customImportText
													}
													onChange={(text) =>
														addcustomImportText(
															text
														)
													}
												/>
												{state.importError && (
													<p style={{ color: "red" }}>
														{__(
															"Error with Import data",
															"astra"
														)}
													</p>
												)}
												<Button
													className="ast-import-button"
													isPrimary
													disabled={
														state.customImportText
															? false
															: true
													}
													onClick={() =>
														handleTextImport()
													}
												>
													{__("Import", "astra")}
												</Button>
											</>
										);
									}
								}
								return <div>{tabout}</div>;
							}}
						</TabPanel>
					</Popover>
				)}
			</div>
		</>
	);
};

ColorPaletteComponent.propTypes = {
	control: PropTypes.object.isRequired,
};

export default ColorPaletteComponent;
