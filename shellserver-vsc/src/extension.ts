// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
const net = require('net');

var client = new net.Socket();

client.setEncoding('utf8');

const PAYLOAD = `
import __main__
import traceback

namespace = __main__.__dict__.get('_vsc_sendto_plugin')
if not namespace:
    namespace = __main__.__dict__.copy()
    __main__.__dict__['_vsc_sendto_plugin'] = namespace
try:
    {xtype}({cmd!r}, __main__.__dict__, __main__.__dict__)
except:
    traceback.print_exc()
`;


// send to async command to create cnx and send omd
async function send_to(cmd: string, port:number = 2017) {
	const xtype = 'exec'; // 'exec' or 'eval'
	if (!cmd) {
		return;
	}
	const payload = PAYLOAD
		.replace('{xtype}', xtype)
		.replace('{cmd!r}', JSON.stringify(cmd));
	const text = Buffer.from(payload, 'utf8');

	client.connect(port, '127.0.0.1', () => {
		console.log('Connected');
		client.write(text, (err: any) => {
			client.end();
			client.destroy();
		});
	});
	client.on('close', () =>{
		console.log("CLOSED");
		client.destroy();
		client.removeAllListeners();
	});
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let tempPort = -1;
	let setPortDisposable = vscode.commands.registerCommand('shellserver-vsc.setport', async function (event) {
		await vscode.window.showInputBox().then((value:any) =>{
			if(!isNaN(value)) {
				tempPort = Number(value);
			}
		});
		console.log(tempPort);
	});

	let sendToDisposable = vscode.commands.registerCommand('shellserver-vsc.sendto', () => {
		let editor = vscode.window.activeTextEditor;
		if (!editor) {
			return; // No open text editor
		}

		let selection = editor.selection;
		let text = editor.document.getText(selection);tempPort !== -1 ? send_to(text, tempPort).catch((err) => console.log(`err : ${err}`)) : send_to(text).catch((err) => console.log(`err : ${err}`));
	});
	context.subscriptions.push(setPortDisposable);
	context.subscriptions.push(sendToDisposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
