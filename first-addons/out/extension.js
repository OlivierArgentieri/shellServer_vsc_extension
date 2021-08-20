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
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const telnet_client_1 = require("telnet-client");
const params = {
    host: '127.0.0.1',
    port: 2017,
    shellPrompt: '/ #',
    timeout: 1500
};
// send to async command to create cnx and send omd
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const _con = new telnet_client_1.default();
        try {
            yield _con.connect(params);
            yield _con.send("print('Aaaaa') #test ");
        }
        catch (err) {
            console.log(err);
        }
    });
}
// send to async command to create cnx and send omd
function send_to(text) {
    return __awaiter(this, void 0, void 0, function* () {
        const _con = new telnet_client_1.default();
        try {
            yield _con.connect(params);
        }
        catch (err) {
            console.log(err);
        }
    });
}
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('first-addons.helloWorld', () => {
        init()
            .then((a) => console.log("ok"))
            .catch((err) => console.log(`err : ${err}`));
        var editor = vscode.window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }
        var selection = editor.selection;
        var text = editor.document.getText(selection);
        console.log(text);
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage(text);
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map