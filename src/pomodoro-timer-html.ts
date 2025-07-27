import * as vscode from 'vscode';

export function getPomodoroTimerHtml(): string {
    const config = vscode.workspace.getConfiguration('pomodoroTimer');
    const workDuration = config.get('workDuration', 25);
    const breakDuration = config.get('breakDuration', 5);
    const longBreakDuration = config.get('longBreakDuration', 15);
    const longBreakInterval = config.get('longBreakInterval', 4);
    const backgroundColor = config.get('backgroundColor', '#e74c3c');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pomodoro Timer</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, ${backgroundColor}22, ${backgroundColor}11);
            color: var(--vscode-foreground);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        .pomodoro-container {
            background: var(--vscode-editor-background);
            border-radius: 20px;
            padding: 30px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            text-align: center;
            max-width: 350px;
            width: 100%;
            border: 1px solid var(--vscode-widget-border);
        }

        .timer-display {
            font-size: 48px;
            font-weight: 700;
            margin: 20px 0;
            color: ${backgroundColor};
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            font-family: 'Courier New', monospace;
        }

        .session-info {
            font-size: 18px;
            margin: 15px 0;
            color: var(--vscode-descriptionForeground);
            font-weight: 500;
        }

        .session-counter {
            font-size: 14px;
            margin: 10px 0;
            color: var(--vscode-descriptionForeground);
        }

        .controls {
            display: flex;
            gap: 10px;
            justify-content: center;
            margin: 20px 0;
            flex-wrap: wrap;
        }

        .btn {
            padding: 12px 20px;
            border: none;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            color: white;
            min-width: 80px;
        }

        .btn-primary {
            background: ${backgroundColor};
        }

        .btn-secondary {
            background: var(--vscode-button-secondaryBackground);
            color: var(--vscode-button-secondaryForeground);
        }

        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .btn:active {
            transform: translateY(0);
        }

        .btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }

        .progress-ring {
            position: relative;
            width: 200px;
            height: 200px;
            margin: 20px auto;
        }

        .progress-ring-circle {
            width: 100%;
            height: 100%;
            fill: transparent;
            stroke: var(--vscode-widget-border);
            stroke-width: 8;
            stroke-linecap: round;
            transform: rotate(-90deg);
            transform-origin: 50% 50%;
        }

        .progress-ring-progress {
            stroke: ${backgroundColor};
            stroke-dasharray: 565.48;
            stroke-dashoffset: 565.48;
            transition: stroke-dashoffset 0.5s ease;
        }

        .progress-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
        }

        .status-indicator {
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            margin-right: 8px;
            animation: pulse 2s infinite;
        }

        .status-work {
            background: ${backgroundColor};
        }

        .status-break {
            background: #27ae60;
        }

        .status-long-break {
            background: #f39c12;
        }

        @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
        }

        .stats {
            margin-top: 20px;
            padding: 15px;
            background: var(--vscode-input-background);
            border-radius: 8px;
            border: 1px solid var(--vscode-input-border);
        }

        .stats-item {
            display: flex;
            justify-content: space-between;
            margin: 5px 0;
            font-size: 12px;
        }

        @media (max-width: 300px) {
            .pomodoro-container {
                padding: 15px;
            }
            .timer-display {
                font-size: 36px;
            }
            .progress-ring {
                width: 150px;
                height: 150px;
            }
        }
    </style>
</head>
<body>
    <div class="pomodoro-container">
        <div class="session-info">
            <span class="status-indicator status-work"></span>
            <span id="sessionType">Work Session</span>
        </div>
        
        <div class="progress-ring">
            <svg class="progress-ring-circle">
                <circle cx="100" cy="100" r="90" class="progress-ring-circle" />
                <circle cx="100" cy="100" r="90" class="progress-ring-progress" id="progressCircle" />
            </svg>
            <div class="progress-content">
                <div class="timer-display" id="timerDisplay">25:00</div>
            </div>
        </div>

        <div class="session-counter" id="sessionCounter">Session 1 of 4</div>

        <div class="controls">
            <button class="btn btn-primary" id="startBtn">Start</button>
            <button class="btn btn-secondary" id="pauseBtn" disabled>Pause</button>
            <button class="btn btn-secondary" id="resetBtn">Reset</button>
            <button class="btn btn-secondary" id="skipBtn">Skip</button>
        </div>

        <div class="stats">
            <div class="stats-item">
                <span>Work Duration:</span>
                <span>${workDuration} min</span>
            </div>
            <div class="stats-item">
                <span>Break Duration:</span>
                <span>${breakDuration} min</span>
            </div>
            <div class="stats-item">
                <span>Long Break:</span>
                <span>${longBreakDuration} min</span>
            </div>
            <div class="stats-item">
                <span>Completed Today:</span>
                <span id="completedSessions">0</span>
            </div>
        </div>
    </div>

    <script>
        const vscode = acquireVsCodeApi();
        
        class PomodoroTimer {
            constructor() {
                this.workDuration = ${workDuration} * 60;
                this.breakDuration = ${breakDuration} * 60;
                this.longBreakDuration = ${longBreakDuration} * 60;
                this.longBreakInterval = ${longBreakInterval};
                
                this.currentTime = this.workDuration;
                this.isRunning = false;
                this.currentSession = 1;
                this.completedSessions = 0;
                this.isWorkSession = true;
                this.interval = null;
                
                this.initializeElements();
                this.setupEventListeners();
                this.updateDisplay();
                this.loadState();
            }

            initializeElements() {
                this.timerDisplay = document.getElementById('timerDisplay');
                this.sessionType = document.getElementById('sessionType');
                this.sessionCounter = document.getElementById('sessionCounter');
                this.startBtn = document.getElementById('startBtn');
                this.pauseBtn = document.getElementById('pauseBtn');
                this.resetBtn = document.getElementById('resetBtn');
                this.skipBtn = document.getElementById('skipBtn');
                this.progressCircle = document.getElementById('progressCircle');
                this.completedSessionsEl = document.getElementById('completedSessions');
                this.statusIndicator = document.querySelector('.status-indicator');
            }

            setupEventListeners() {
                this.startBtn.addEventListener('click', () => this.start());
                this.pauseBtn.addEventListener('click', () => this.pause());
                this.resetBtn.addEventListener('click', () => this.reset());
                this.skipBtn.addEventListener('click', () => this.skip());
            }

            start() {
                this.isRunning = true;
                this.startBtn.disabled = true;
                this.pauseBtn.disabled = false;
                
                this.interval = setInterval(() => {
                    this.currentTime--;
                    this.updateDisplay();
                    this.saveState();
                    
                    if (this.currentTime <= 0) {
                        this.complete();
                    }
                }, 1000);
            }

            pause() {
                this.isRunning = false;
                this.startBtn.disabled = false;
                this.pauseBtn.disabled = true;
                clearInterval(this.interval);
                this.saveState();
            }

            reset() {
                this.pause();
                this.currentTime = this.isWorkSession ? this.workDuration : 
                    (this.currentSession % this.longBreakInterval === 0 ? this.longBreakDuration : this.breakDuration);
                this.updateDisplay();
                this.saveState();
            }

            skip() {
                this.pause();
                this.complete();
            }

            complete() {
                this.pause();
                
                if (this.isWorkSession) {
                    this.completedSessions++;
                    vscode.postMessage({
                        command: 'showNotification',
                        text: \`Work session completed! Time for a \${this.currentSession % this.longBreakInterval === 0 ? 'long' : 'short'} break.\`
                    });
                    
                    this.isWorkSession = false;
                    this.currentTime = this.currentSession % this.longBreakInterval === 0 ? 
                        this.longBreakDuration : this.breakDuration;
                } else {
                    vscode.postMessage({
                        command: 'showNotification',
                        text: 'Break time finished! Ready for the next work session?'
                    });
                    
                    this.isWorkSession = true;
                    this.currentSession++;
                    this.currentTime = this.workDuration;
                }
                
                this.updateDisplay();
                this.saveState();
            }

            updateDisplay() {
                const minutes = Math.floor(this.currentTime / 60);
                const seconds = this.currentTime % 60;
                this.timerDisplay.textContent = \`\${minutes.toString().padStart(2, '0')}:\${seconds.toString().padStart(2, '0')}\`;
                
                const totalTime = this.isWorkSession ? this.workDuration : 
                    (this.currentSession % this.longBreakInterval === 0 ? this.longBreakDuration : this.breakDuration);
                const progress = ((totalTime - this.currentTime) / totalTime) * 565.48;
                this.progressCircle.style.strokeDashoffset = 565.48 - progress;
                
                if (this.isWorkSession) {
                    this.sessionType.textContent = 'Work Session';
                    this.statusIndicator.className = 'status-indicator status-work';
                } else if (this.currentSession % this.longBreakInterval === 0) {
                    this.sessionType.textContent = 'Long Break';
                    this.statusIndicator.className = 'status-indicator status-long-break';
                } else {
                    this.sessionType.textContent = 'Short Break';
                    this.statusIndicator.className = 'status-indicator status-break';
                }
                
                this.sessionCounter.textContent = \`Session \${this.currentSession} of \${this.longBreakInterval}\`;
                this.completedSessionsEl.textContent = this.completedSessions.toString();
            }

            saveState() {
                const state = {
                    currentTime: this.currentTime,
                    isRunning: this.isRunning,
                    currentSession: this.currentSession,
                    completedSessions: this.completedSessions,
                    isWorkSession: this.isWorkSession,
                    timestamp: Date.now()
                };
                vscode.setState(state);
            }

            loadState() {
                const state = vscode.getState();
                if (state) {
                    const timeDiff = Math.floor((Date.now() - state.timestamp) / 1000);
                    
                    this.currentSession = state.currentSession;
                    this.completedSessions = state.completedSessions;
                    this.isWorkSession = state.isWorkSession;
                    
                    if (state.isRunning && timeDiff < state.currentTime) {
                        this.currentTime = state.currentTime - timeDiff;
                        this.start();
                    } else {
                        this.currentTime = state.currentTime;
                    }
                    
                    this.updateDisplay();
                }
            }
        }

        new PomodoroTimer();
    </script>
</body>
</html>`;
}