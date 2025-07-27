import { getPomodoroTimerHtml } from './pomodoro-timer-html';


export function getWebviewContent(): string {
    return getPomodoroTimerHtml();
}
