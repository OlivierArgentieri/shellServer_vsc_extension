// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import Telnet from 'telnet-client';

const params = {
	host: '127.0.0.1',
	port: 2017,
	shellPrompt: '/ #',
	timeout: 1500
}

// send to async command to create cnx and send omd
async function init() {
	const _con = new Telnet()
	try {
		await _con.connect(params)
		await _con.send("print('Aaaaa') #test ")

	} catch(err){
		console.log(err)
	}
}

// send to async command to create cnx and send omd
async function send_to(text: string) {
	const _con = new Telnet()
	try {
		await _con.connect(params)
	} catch(err){
		console.log(err)
	}
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('first-addons.helloWorld', () => {
		init()
		.then((a) => console.log("ok"))
		.catch((err) => console.log(`err : ${err}`))
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

// this method is called when your extension is deactivated
export function deactivate() {}
