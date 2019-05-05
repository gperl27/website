"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
var styled_react_modal_1 = require("styled-react-modal");
var StyledRoot = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  height: 100%;\n"], ["\n  height: 100%;\n"])));
exports.ProviderWrapper = function (props) { return (react_1.default.createElement(StyledRoot, null,
    react_1.default.createElement(styled_react_modal_1.ModalProvider, null, props.children))); };
var templateObject_1;
//# sourceMappingURL=ProviderWrapper.js.map