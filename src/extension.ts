import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

class PomodoroViewProvider implements vscode.WebviewViewProvider {
    public static readonly viewType = 'pomodoroView';
    private _extensionPath: string;

    constructor(private readonly context: vscode.ExtensionContext) {
        this._extensionPath = context.extensionPath;
    }

    resolveWebviewView(
        webviewView: vscode.WebviewView,
        context: vscode.WebviewViewResolveContext,
        _token: vscode.CancellationToken
    ) {
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [
                vscode.Uri.file(path.join(this._extensionPath, 'src', 'webview'))
            ]
        };

        const webviewPath = path.join(this._extensionPath, 'src', 'webview');
        const htmlPath = path.join(webviewPath, 'flipClock.html');
        let html = fs.readFileSync(htmlPath, 'utf8');

        // Fix resource URIs for CSS and JS
        const cssUri = webviewView.webview.asWebviewUri(vscode.Uri.file(path.join(webviewPath, 'flipClock.css')));
        const jsUri = webviewView.webview.asWebviewUri(vscode.Uri.file(path.join(webviewPath, 'flipClock.js')));
        html = html.replace('flipClock.css', cssUri.toString());
        html = html.replace('flipClock.js', jsUri.toString());

        webviewView.webview.html = html;
    }
}

export function activate(context: vscode.ExtensionContext) {
    // Register the sidebar view provider
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(
            PomodoroViewProvider.viewType,
            new PomodoroViewProvider(context)
        )
    );

    // (Optional) Keep the command for opening as a panel if you want
    // const disposable = vscode.commands.registerCommand('pomodoro.showFlipClock', ...);
    // context.subscriptions.push(disposable);
}

export function deactivate() {}
