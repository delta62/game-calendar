import { h } from 'preact'

import './theme-picker.scss'

export interface Props {
    onToggle(state: 'light' | 'dark'): void
}

const ThemePicker = ({ onToggle }: Props) => (
    <div class="theme-picker">
        <span class="theme-picker-option light" onClick={() => onToggle('light')}></span>
        <span class="theme-picker-option dark" onClick={() => onToggle('dark')}></span>
    </div>
)

export default ThemePicker
