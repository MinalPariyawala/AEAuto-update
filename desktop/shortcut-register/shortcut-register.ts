import { globalShortcut } from 'electron';
import { updateHandler } from '../update-handler/update-handler';
import { win } from '../../main';

export function shortcutRegister() {
    /*Turn on debug mode*/
    globalShortcut.register('Command+Control+Alt+Shift+D', () => {
        win.webContents.openDevTools();
    });

    /*Manually check for updates*/
    globalShortcut.register('Command+Control+Alt+Shift+U', () => {
        updateHandler();
    });
}
