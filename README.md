# Web Viewer for VS Code 🌐

A customizable web viewer extension that displays web pages directly in your VS Code explorer sidebar. Browse websites, documentation, or any web content without leaving your development environment.

![Web Viewer Demo](https://github.com/user-attachments/assets/94f848ba-0643-48a4-aa7d-6ce85326899f)

## Installation 💻

1. Open Visual Studio Code
2. Press `Ctrl+P` (Windows/Linux) or `Cmd+P` (macOS)
3. Type `ext install web-viewer-vscode`
4. Press Enter

## Features ✨

- **🌐 Configurable URL**: Set any web URL to display in the sidebar
- **🔄 Interactive Controls**: Built-in URL bar and refresh functionality  
- **⚙️ JavaScript Control**: Enable or disable JavaScript execution
- **🔄 Auto-refresh**: Optional automatic page refresh at configurable intervals
- **💾 State Persistence**: URL settings persist across VS Code sessions
- **🎨 VS Code Integration**: Seamlessly integrated with VS Code's theme and UI

## How to Use 📝

1. After installation, find the "Web Viewer" panel in the VS Code explorer sidebar
2. Configure your desired URL in the settings (see Configuration section below)
3. Use the URL bar to navigate to different pages
4. Click "Refresh" to reload the current page
5. The extension will remember your last URL across VS Code sessions

## Configuration ⚙️

You can customize the web viewer settings in VS Code settings:

1. Open `File > Preferences > Settings` from the VS Code menu
2. Type "Web Viewer" in the search bar
3. Adjust any of the following settings:

| Setting | Description | Default |
|---------|-------------|---------|
| URL | The web page URL to display | https://www.example.com |
| Enable JavaScript | Allow JavaScript execution in the web viewer | true |
| Refresh Interval | Auto-refresh interval in seconds (0 to disable) | 0 |

### settings.json

You can also configure the extension directly in your `settings.json` file:

```json
{
  "webViewer.url": "https://www.google.com",
  "webViewer.enableJavascript": true,
  "webViewer.refreshInterval": 0
}
```

## Use Cases 🎯

- **Documentation Browsing**: Keep documentation websites open while coding
- **Dashboard Monitoring**: Display monitoring dashboards or analytics
- **Reference Material**: Quick access to online references and resources
- **Code Previews**: Preview web applications during development
- **News & Updates**: Stay updated with tech news or team communications

## Requirements 📋

- Visual Studio Code version 1.97.0 or higher
- Internet connection for loading external web content

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support 💬

If you encounter any issues or have suggestions, please [open an issue](https://github.com/GHOST117s/VS_code_Pomodoro/issues) on GitHub.

---

**Enjoy browsing the web right from your VS Code sidebar! 🌐**