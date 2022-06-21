import svgIcons from "../../../../assets/svg/svgs.json";
import { coreControl } from './core/control';
import { headingControl } from './heading/control';
import { hiddenControl } from './hidden/control';
import { descriptionControl } from './description/control';
import { textInputControl } from './text-input/control';
import { linkControl } from './link/control';
import { dividerControl } from './divider/control';
import { settingsGroupControl } from './settings-group/control';
import { colorControl } from './color/control';
import { responsiveColorControl } from './responsive-color/control'
import { responsiveBackgroundControl } from './responsive-background/control';
import { backgroundControl } from './background/control';
import { sortableControl } from './sortable/control';
import { borderControl } from './border/control';
import { customizerLinkControl } from './customizer-link/control';
import { responsiveControl } from './responsive/control';
import { responsiveSliderControl } from './responsive-slider/control';
import { sliderControl } from './slider/control';
import { radioImageControl } from './radio-image/control';
import { responsiveSpacingControl }  from './responsive-spacing/control';
import { selectControl } from './select/control';
import { astFontFamilyControl } from './ast-font-family/control';
import { astFontWeightControl } from './ast-font-weight/control';
import { responsiveSelectControl } from './responsive-select/control';
import { BuilderHeaderControl } from './builder-layout/builder-header-control'
import { BuilderControl } from './builder-layout/control';
import { SocialControl } from './social-icons/control';
import { ListIconsControl } from './list-icons/control';
import { EditorControl } from './html-editor/control';
import { DraggableControl } from './draggable/control';
import { HeaderTypeButtonControl } from './header-type-button/control';
import { RowLayoutControl } from './row-layout/control';
import { toggleControl } from './toggle-control/control';
import { colorGroupControl } from './color-group/control';
import { selectorControl } from './selector/control';
import { buttonPresetControl } from './button-presets/control.js';
import { typographyPresetControl } from './typography-presets/control.js';
import { colorPaletteControl } from './color-palette/control.js';
import { boxShadowControl }  from './box-shadow/control.js';
import { responsiveToggleControl } from './responsive-toggle-control/control';
import { inputWithDropdown } from './ast-input-with-dropdown/control';
import { astFontVariantControl } from './ast-font-variant/control';
import { astGroupTitleControl } from './ast-group-title/control';
import { astMenuSelect } from './ast-menu-select/control';
import { multiSelectorControl } from './multi-selector/control';
import { responsiveLogoControl } from './responsive-logo/control';

window.svgIcons = svgIcons;
wp.customize.controlConstructor['ast-heading'] = headingControl;
wp.customize.controlConstructor['ast-hidden'] = hiddenControl;
wp.customize.controlConstructor['ast-description'] = descriptionControl;
wp.customize.controlConstructor['ast-text-input'] = textInputControl;
wp.customize.controlConstructor['ast-link'] = linkControl;
wp.customize.controlConstructor['ast-divider'] = dividerControl;
wp.customize.controlConstructor['ast-settings-group'] = settingsGroupControl;
wp.customize.controlConstructor['ast-color'] = colorControl;
wp.customize.controlConstructor['ast-customizer-link'] = customizerLinkControl;
wp.customize.controlConstructor['ast-slider'] = sliderControl;
wp.customize.controlConstructor['ast-radio-image'] = radioImageControl;
wp.customize.controlConstructor['ast-select'] = selectControl;
wp.customize.controlConstructor['ast-header-type-button'] = HeaderTypeButtonControl;
wp.customize.controlConstructor['ast-builder-header-control'] = BuilderHeaderControl;
wp.customize.controlConstructor['ast-sortable'] = sortableControl;
wp.customize.controlConstructor['ast-font-family'] = astFontFamilyControl;
wp.customize.controlConstructor['ast-font-weight'] = astFontWeightControl;
wp.customize.controlConstructor['ast-responsive-select'] = responsiveSelectControl;
wp.customize.controlConstructor['ast-responsive-slider'] = responsiveSliderControl;
wp.customize.controlConstructor['ast-responsive-spacing'] = responsiveSpacingControl;
wp.customize.controlConstructor['ast-border'] = borderControl;
wp.customize.controlConstructor['ast-responsive'] = responsiveControl;
wp.customize.controlConstructor['ast-responsive-color'] = responsiveColorControl;
wp.customize.controlConstructor['ast-responsive-background'] = responsiveBackgroundControl;
wp.customize.controlConstructor['ast-background'] = backgroundControl;
wp.customize.controlConstructor['ast-social-icons'] = SocialControl;
wp.customize.controlConstructor['ast-list-icons'] = ListIconsControl;
wp.customize.controlConstructor['ast-html-editor'] = EditorControl;
wp.customize.controlConstructor['ast-builder'] = BuilderControl;
wp.customize.controlConstructor['ast-draggable-items'] = DraggableControl;
wp.customize.controlConstructor['ast-row-layout'] = RowLayoutControl;
wp.customize.controlConstructor['ast-toggle-control'] = toggleControl;
wp.customize.controlConstructor['ast-color-group'] = colorGroupControl;
wp.customize.controlConstructor['ast-selector'] = selectorControl;
wp.customize.controlConstructor['ast-button-presets'] = buttonPresetControl;
wp.customize.controlConstructor['ast-typography-presets'] = typographyPresetControl;
wp.customize.controlConstructor['ast-color-palette'] = colorPaletteControl;
wp.customize.controlConstructor['ast-responsive-toggle-control'] = responsiveToggleControl;
wp.customize.controlConstructor['ast-input-with-dropdown'] = inputWithDropdown;
wp.customize.controlConstructor['ast-font-variant'] = astFontVariantControl;
wp.customize.controlConstructor['ast-group-title'] = astGroupTitleControl;
wp.customize.controlConstructor['ast-menu-select'] = astMenuSelect;
wp.customize.controlConstructor['ast-multi-selector'] = multiSelectorControl;
wp.customize.controlConstructor['ast-responsive-logo'] = responsiveLogoControl;

wp.customize.controlConstructor['ast-box-shadow'] = boxShadowControl;
import { Base } from './customizer';
import { ControlBase } from './control-customizer';
