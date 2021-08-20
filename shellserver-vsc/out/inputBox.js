"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showInputBox = void 0;
const vscode_1 = require("vscode");
function showInputBox() {
    return __awaiter(this, void 0, void 0, function* () {
        const port = yield vscode_1.window.showInputBox({
            value: '',
            placeHolder: 'Enter port'
        });
        if (!port)
            return;
        vscode_1.window.showInformationMessage(`Createg: ${port}`);
        const termName = 'aaa';
        const term = vscode_1.window.createTerminal(termName);
        term.show(true);
        vscode_1.window.onDidCloseTerminal(event => {
            if (term && event.name === termName) {
                term.dispose();
            }
        });
    });
}
exports.showInputBox = showInputBox;
vscode.createInputBox();
// const searchQuery = await vscode.window.showInputBox({
//     placeHolder: "Search query",
//     prompt: "Search my snippets on Codever",
//     value: selectedText
//   });
//# sourceMappingURL=inputBox.js.map