// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
const net = require('net')

var client = new net.Socket();

client.setEncoding('utf8');



// send to async command to create cnx and send omd
async function send_to(text: string, port:number = 2017) {
	client.connect(port, '127.0.0.1', () => {
		console.log('Connected');
		client.write(text);
		client.close()
	});
	client.on('close', () =>{
		console.log("CLOSED")
		client.destroy()
		client.removeAllListeners()
	})
}


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let tempPort = -1;
	let setPortDisposable = vscode.commands.registerCommand('sendto-vsc.setport', async function (event) {
		await vscode.window.showInputBox().then((value:any) =>{
			tempPort = Number(value)
		});
		console.log(tempPort);
	});

	let sendToDisposable = vscode.commands.registerCommand('sendto-vsc.sendto', () => {
		let editor = vscode.window.activeTextEditor;
		if (!editor) {
			return; // No open text editor
		}

		let selection = editor.selection;
		let text = editor.document.getText(selection);
		tempPort !== -1 ? send_to(text, tempPort).catch((err) => console.log(`err : ${err}`)) : send_to(text).catch((err) => console.log(`err : ${err}`))
	});


	context.subscriptions.push(setPortDisposable);
	context.subscriptions.push(sendToDisposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
