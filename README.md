# Pomodoro - VS Code Extension ⌚

**Pomodoro** adds a tab with an analog clock to the explorer view, displaying the current time.

### Demo

<p align="center"><img src="https://github.com/user-attachments/assets/e2af6f72-d1a0-4ccf-b08a-30030e22b630" style="filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5));"/></p>

## Installation 💻

1. Open Visual Studio Code.
2. Press `Ctrl+P` (Windows/Linux) or `Cmd+P` (macOS).
3. Type `ext install analog-clock`.
4. Press Enter.

## Features ✨

A simple and easy-to-use analog clock with the following features:

- **Size Setting**: Choose between small and large sizes.
- **Emboss Effect**: Add a 3D effect to the clock.
- **Date Display**: Toggle the display of the date (year, month, day, and day of the week).
- **Time Display**: Toggle the display of digital time.
- **Background Color**: Set your preferred color in HEX format.

## Usage 💡

1. After installation, click the "Explorer" icon in the VSCode sidebar.
2. The "Analog Clock" tab will appear at the bottom of the explorer view.
3. Click the tab to display the analog clock.

### Customize Settings

You can customize the settings via the following methods or through [settings.json](#settingsjson):

1. Open `File > Preferences > Settings` from the VSCode menu.
2. Type "Analog Clock" in the search bar.
3. The following settings will be displayed:
   - ⚙️ Size: Choose between small or large.
   - 💫 Emboss Effect: Enable/disable the emboss effect.
   - 📅 Date Display: Show/hide the date.
   - 🕒 Time Display: Show/hide the digital time.
   - 🎨 Background Color: Specify the color in HEX format.

*Note: After changing settings, you need to reload VSCode to apply the changes.*

<img src="https://github.com/user-attachments/assets/8853cb89-7aad-4873-ac41-b9a8da4bd33f" style="filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5));"/>

## Settings ⚙️

### settings.json
You can change the extension [settings](https://code.visualstudio.com/docs/customization/userandworkspace) in the `settings.json` file:

- `analogClock.size`: Change the clock size. Options are `Large` or `Small`.
- `analogClock.enableEmboss`: Enable or disable the emboss effect.
- `analogClock.showDate`: Enable or disable the date display.
- `analogClock.showTime`: Enable or disable the time display.
- `analogClock.backgroundColor`: Set the background color in HEX format.

Example
```json
// settings.json
{
  "analogClock.backgroundColor": "#ff5733cc",
  "analogClock.enableEmboss": true,
  "analogClock.showDate": true,
  "analogClock.showTime": true,
  "analogClock.size": "Large"
}
```

# Pomodoro Timer for VS Code

A beautiful and feature-rich Pomodoro timer extension for Visual Studio Code that helps you stay focused and productive using the Pomodoro Technique.

## Features

- **Elegant Interface**: Clean, modern design that integrates seamlessly with VS Code's sidebar
- **Customizable Timers**: Configure work sessions, short breaks, and long breaks
- **Visual Progress**: Circular progress indicator with smooth animations
- **Session Tracking**: Keep track of completed sessions and current progress
- **Smart Notifications**: Get notified when sessions complete (can be disabled)
- **Persistent State**: Timer continues running even when you switch files or restart VS Code
- **Responsive Design**: Adapts to different sidebar widths

## How to Use

1. Install the extension
2. Open the Explorer sidebar in VS Code
3. Find the "Pomodoro Timer" panel
4. Click "Start" to begin your first work session
5. Use the controls to pause, reset, or skip sessions as needed

## Configuration

You can customize the timer settings in VS Code settings:

- **Work Duration**: Length of work sessions (1-60 minutes, default: 25)
- **Break Duration**: Length of short breaks (1-30 minutes, default: 5)
- **Long Break Duration**: Length of long breaks (1-60 minutes, default: 15)
- **Long Break Interval**: Number of work sessions before a long break (2-10, default: 4)
- **Show Notifications**: Enable/disable completion notifications (default: true)
- **Background Color**: Customize the timer's accent color (HEX format, default: #e74c3c)

## The Pomodoro Technique

The Pomodoro Technique is a time management method that uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks. These intervals are named "pomodoros". The method is based on the idea that frequent breaks can improve mental agility.

## License

MIT License - see LICENSE file for details.
