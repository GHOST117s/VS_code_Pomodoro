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
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
class PomodoroViewProvider {
    constructor(context) {
        this.context = context;
        this._extensionPath = context.extensionPath;
    }
    resolveWebviewView(webviewView, context, _token) {
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
PomodoroViewProvider.viewType = 'pomodoroView';
function activate(context) {
    // Register the sidebar view provider
    context.subscriptions.push(vscode.window.registerWebviewViewProvider(PomodoroViewProvider.viewType, new PomodoroViewProvider(context)));
    // (Optional) Keep the command for opening as a panel if you want
    // const disposable = vscode.commands.registerCommand('pomodoro.showFlipClock', ...);
    // context.subscriptions.push(disposable);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map