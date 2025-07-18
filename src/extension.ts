import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('pomodoro.showFlipClock', () => {
        const panel = vscode.window.createWebviewPanel(
            'pomodoroFlipClock',
            'Pomodoro Flip Clock',
            vscode.ViewColumn.One,
            {
                enableScripts: true,
                localResourceRoots: [
                    vscode.Uri.file(path.join(context.extensionPath, 'src', 'webview'))
                ]
            }
        );

        const webviewPath = path.join(context.extensionPath, 'src', 'webview');
        const htmlPath = path.join(webviewPath, 'flipClock.html');
        let html = fs.readFileSync(htmlPath, 'utf8');

        // Fix resource URIs for CSS and JS
        const cssUri = panel.webview.asWebviewUri(vscode.Uri.file(path.join(webviewPath, 'flipClock.css')));
        const jsUri = panel.webview.asWebviewUri(vscode.Uri.file(path.join(webviewPath, 'flipClock.js')));
        html = html.replace('flipClock.css', cssUri.toString());
        html = html.replace('flipClock.js', jsUri.toString());

        panel.webview.html = html;
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
