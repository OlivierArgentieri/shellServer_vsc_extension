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
function send_to(text, port = 2017) {
    return __awaiter(this, void 0, void 0, function* () {
        client.connect(port, '127.0.0.1', () => {
            console.log('Connected');
            client.write(text);
            client.close();
        });
        client.on('close', () => {
            console.log("CLOSED");
            client.destroy();
            client.removeAllListeners();
        });
    });
}
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    let tempPort = -1;
    let setPortDisposable = vscode.commands.registerCommand('sendto-vsc.setport', function (event) {
        return __awaiter(this, void 0, void 0, function* () {
            yield vscode.window.showInputBox().then((value) => {
                tempPort = Number(value);
            });
            console.log(tempPort);
        });
    });
    let sendToDisposable = vscode.commands.registerCommand('sendto-vsc.sendto', () => {
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }
        let selection = editor.selection;
        let text = editor.document.getText(selection);
        tempPort !== -1 ? send_to(text, tempPort).catch((err) => console.log(`err : ${err}`)) : send_to(text).catch((err) => console.log(`err : ${err}`));
    });
    context.subscriptions.push(setPortDisposable);
    context.subscriptions.push(sendToDisposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map