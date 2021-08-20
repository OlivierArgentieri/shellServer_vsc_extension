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
const net = require('net');
var client = new net.Socket();
client.setEncoding('utf8');
// send to async command to create cnx and send omd
function init(text) {
    return __awaiter(this, void 0, void 0, function* () {
        client.connect(2017, '127.0.0.1', function () {
            console.log('Connected');
            client.write(text);
            client.close();
        });
        client.on('close', () => {
            console.log("CLOSED");
        });
    });
}
function send_to(text) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(text);
        client.write('print("deux")');
        client.write(Buffer.from(text, 'utf-8').toString());
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
        init("")
            .then((a) => console.log("ok initialize cnx"))
            .catch((err) => console.log(`err : ${err}`));
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
    });
    let sendToDisposable = vscode.commands.registerCommand('first-addons.sendto', () => {
        var editor = vscode.window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }
        var selection = editor.selection;
        var text = editor.document.getText(selection);
        init(text)
            .then(() => console.log("ok"))
            .catch((err) => console.log(`err : ${err}`));
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage(text);
    });
    context.subscriptions.push(disposable);
    context.subscriptions.push(sendToDisposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map