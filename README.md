# VS Code Pomodoro Extension

A simple and effective Pomodoro timer extension for Visual Studio Code. Boost your productivity by working in focused intervals, followed by short breaks, directly within your editor.

## Features

- Start, pause, and reset Pomodoro sessions
- Customizable work and break durations
- Desktop notifications for session transitions
- Status bar timer display
- Optional sound alerts

## How to Use

1. Install the extension from the VS Code Marketplace.
2. Use the command palette (`Ctrl+Shift+P` or `Cmd+Shift+P`) and search for:
   - `Pomodoro: Start`
   - `Pomodoro: Pause`
   - `Pomodoro: Reset`
   - `Pomodoro: Configure Durations`
3. The timer will appear in the status bar. Notifications will alert you when it's time to take a break or resume work.

## Configuration

You can customize the following settings in your VS Code `settings.json`:

- `pomodoro.workDuration`: Work session length in minutes (default: 25)
- `pomodoro.breakDuration`: Short break length in minutes (default: 5)
- `pomodoro.longBreakDuration`: Long break length in minutes (default: 15)
- `pomodoro.sessionsBeforeLongBreak`: Number of sessions before a long break (default: 4)
- `pomodoro.enableSound`: Enable/disable sound notifications (default: true)

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)