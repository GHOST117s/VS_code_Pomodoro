import * as vscode from 'vscode';
import * as l10n from '@vscode/l10n';
import { getPomodoroTimerHtml } from './pomodoro-timer-html';

export function activate(context: vscode.ExtensionContext) {
    const provider = new PomodoroTimerViewProvider(context.extensionUri);

    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(
            PomodoroTimerViewProvider.viewType,
            provider
        )
    );

    // Listen for configuration changes
    vscode.workspace.onDidChangeConfiguration(event => {
        if (event.affectsConfiguration('pomodoroTimer')) {
            vscode.window.showInformationMessage(
                l10n.t('Configuration changed. Please reload the window to apply changes.'),
                l10n.t('Reload')
            ).then(selection => {
                if (selection === l10n.t('Reload')) {
                    vscode.commands.executeCommand('workbench.action.reloadWindow');
                }
            });
        }
    });
}

class PomodoroTimerViewProvider implements vscode.WebviewViewProvider {
    public static readonly viewType = 'pomodoroTimer.pomodoroTimerView';

    constructor(private readonly _extensionUri: vscode.Uri) { }

    public resolveWebviewView(
        webviewView: vscode.WebviewView,
        context: vscode.WebviewViewResolveContext,
        _token: vscode.CancellationToken,
    ) {
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._extensionUri]
        };

        // Handle messages from the webview
        webviewView.webview.onDidReceiveMessage(
            message => {
                switch (message.command) {
                    case 'showNotification':
                        const config = vscode.workspace.getConfiguration('pomodoroTimer');
                        if (config.get('showNotifications')) {
                            vscode.window.showInformationMessage(message.text);
                        }
                        break;
                }
            },
            undefined,
            []
        );

        webviewView.webview.html = this._getHtmlForWebview();
    }

    private _getHtmlForWebview() {
        return getPomodoroTimerHtml();
    }
}

export function deactivate() { }
