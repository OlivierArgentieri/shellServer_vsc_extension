import * as vscode from 'vscode' // vscode api

export function activate(context: vscode.ExtensionContext) {
    console.log("extension loaded")

    let disposable = vscode.commands.registerCommand('extension.helloworld', () => {
        vscode.window.showInformationMessage('Hello World');
    })

    context.subscriptions.push(disposable)
}

export function deactivate() {}
