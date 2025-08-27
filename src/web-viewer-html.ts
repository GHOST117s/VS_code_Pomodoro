import * as vscode from 'vscode';

export function getWebViewerHtml(): string {
    const config = vscode.workspace.getConfiguration('webViewer');
    const url = config.get('url', 'https://www.example.com');
    const enableJavascript = config.get('enableJavascript', true);
    const refreshInterval = config.get('refreshInterval', 0);

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Web Viewer</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            width: 100vw;
            height: 100vh;
            overflow: hidden;
            background: var(--vscode-editor-background);
            color: var(--vscode-foreground);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .web-viewer-container {
            width: 100%;
            height: 100vh;
            display: flex;
            flex-direction: column;
        }

        .url-bar {
            background: var(--vscode-editorWidget-background);
            border-bottom: 1px solid var(--vscode-widget-border);
            padding: 8px 12px;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 12px;
        }

        .url-input {
            flex: 1;
            background: var(--vscode-input-background);
            border: 1px solid var(--vscode-input-border);
            color: var(--vscode-input-foreground);
            padding: 4px 8px;
            border-radius: 3px;
            font-size: 12px;
        }

        .refresh-btn {
            background: var(--vscode-button-background);
            color: var(--vscode-button-foreground);
            border: none;
            padding: 4px 12px;
            border-radius: 3px;
            cursor: pointer;
            font-size: 12px;
        }

        .refresh-btn:hover {
            background: var(--vscode-button-hoverBackground);
        }

        .iframe-container {
            flex: 1;
            width: 100%;
            height: calc(100vh - 40px);
            position: relative;
        }

        .web-iframe {
            width: 100%;
            height: 100%;
            border: none;
            background: white;
        }

        .error-message {
            padding: 20px;
            text-align: center;
            color: var(--vscode-errorForeground);
            background: var(--vscode-editorError-background);
            border: 1px solid var(--vscode-errorBorder);
            margin: 10px;
            border-radius: 3px;
        }

        .loading {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            color: var(--vscode-foreground);
        }
    </style>
</head>
<body>
    <div class="web-viewer-container">
        <div class="url-bar">
            <input type="text" class="url-input" id="urlInput" value="${url}" placeholder="Enter URL...">
            <button class="refresh-btn" id="refreshBtn">Refresh</button>
        </div>
        <div class="iframe-container">
            <div class="loading" id="loading">Loading...</div>
            <iframe class="web-iframe" id="webIframe" src="${url}" ${enableJavascript ? '' : 'sandbox="allow-same-origin"'}></iframe>
        </div>
    </div>

    <script>
        (function() {
            const vscode = acquireVsCodeApi();
            const iframe = document.getElementById('webIframe');
            const urlInput = document.getElementById('urlInput');
            const refreshBtn = document.getElementById('refreshBtn');
            const loading = document.getElementById('loading');

            let refreshTimer = null;

            // Setup auto-refresh if configured
            const refreshInterval = ${refreshInterval};
            if (refreshInterval > 0) {
                refreshTimer = setInterval(() => {
                    iframe.src = iframe.src;
                }, refreshInterval * 1000);
            }

            // Handle iframe load events
            iframe.addEventListener('load', () => {
                loading.style.display = 'none';
                iframe.style.display = 'block';
            });

            iframe.addEventListener('error', () => {
                loading.innerHTML = '<div class="error-message">Failed to load the webpage. Please check the URL and try again.</div>';
            });

            // Handle refresh button
            refreshBtn.addEventListener('click', () => {
                loading.style.display = 'flex';
                loading.innerHTML = 'Loading...';
                iframe.style.display = 'none';
                iframe.src = urlInput.value;
                
                // Notify extension of URL change
                vscode.postMessage({
                    command: 'updateUrl',
                    url: urlInput.value
                });
            });

            // Handle URL input
            urlInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    refreshBtn.click();
                }
            });

            // Handle URL input changes
            urlInput.addEventListener('blur', () => {
                vscode.postMessage({
                    command: 'updateUrl',
                    url: urlInput.value
                });
            });

            // Initial iframe setup
            iframe.style.display = 'none';
        })();
    </script>
</body>
</html>`;
}