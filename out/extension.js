"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const l10n = __importStar(require("@vscode/l10n"));
const pomodoro_timer_html_1 = require("./pomodoro-timer-html");
function activate(context) {
    const provider = new PomodoroTimerViewProvider(context.extensionUri);
    context.subscriptions.push(vscode.window.registerWebviewViewProvider(PomodoroTimerViewProvider.viewType, provider));
    // Listen for configuration changes
    vscode.workspace.onDidChangeConfiguration(event => {
        if (event.affectsConfiguration('pomodoroTimer')) {
            vscode.window.showInformationMessage(l10n.t('Configuration changed. Please reload the window to apply changes.'), l10n.t('Reload')).then(selection => {
                if (selection === l10n.t('Reload')) {
                    vscode.commands.executeCommand('workbench.action.reloadWindow');
                }
            });
        }
    });
}
class PomodoroTimerViewProvider {
    _extensionUri;
    static viewType = 'pomodoroTimer.pomodoroTimerView';
    constructor(_extensionUri) {
        this._extensionUri = _extensionUri;
    }
    resolveWebviewView(webviewView, context, _token) {
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._extensionUri]
        };
        // Handle messages from the webview
        webviewView.webview.onDidReceiveMessage(message => {
            switch (message.command) {
                case 'showNotification':
                    const config = vscode.workspace.getConfiguration('pomodoroTimer');
                    if (config.get('showNotifications')) {
                        vscode.window.showInformationMessage(message.text);
                    }
                    break;
            }
        }, undefined, []);
        webviewView.webview.html = this._getHtmlForWebview();
    }
    _getHtmlForWebview() {
        return (0, pomodoro_timer_html_1.getPomodoroTimerHtml)();
    }
}
function deactivate() { }
//# sourceMappingURL=extension.js.map