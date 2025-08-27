import * as vscode from 'vscode';
import * as l10n from '@vscode/l10n';
import { getWebViewerHtml } from './web-viewer-html';

export function activate(context: vscode.ExtensionContext) {
    const provider = new WebViewerProvider(context.extensionUri);

    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(
            WebViewerProvider.viewType,
            provider
        )
    );

    // Listen for configuration changes
    vscode.workspace.onDidChangeConfiguration(event => {
        if (event.affectsConfiguration('webViewer')) {
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

class WebViewerProvider implements vscode.WebviewViewProvider {
    public static readonly viewType = 'webViewer.webViewerView';

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
                    case 'updateUrl':
                        const config = vscode.workspace.getConfiguration('webViewer');
                        config.update('url', message.url, vscode.ConfigurationTarget.Global);
                        break;
                }
            },
            undefined,
            []
        );

        webviewView.webview.html = this._getHtmlForWebview();
    }

    private _getHtmlForWebview() {
        return getWebViewerHtml();
    }
}

export function deactivate() { }
