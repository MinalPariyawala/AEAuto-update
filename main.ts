import { receiveMessageFromRender } from './desktop/receive-message-from-render/receive-message-from-render';
import { shortcutRegister } from './desktop/shortcut-register/shortcut-register';
import { updateHandler } from './desktop/update-handler/update-handler';
import { app, BrowserWindow, screen, globalShortcut } from 'electron';
import * as path from 'path';
import * as url from 'url';

export let win: any;
const args = process.argv.slice(1);
const serve = args.some(function (val) {
    return val === '--serve';
});

try {
    app.on('ready', createWindow);
    app.on('window-all-closed', () => {
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });
    app.on('activate', () => {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (win === null) {
            createWindow();
        }
    });
    app.on('will-quit', () => {
        globalShortcut.unregisterAll();
    });
} catch (e) {
    // writeLog('debug', e);
}

function createWindow() {
    const size = screen.getPrimaryDisplay().workAreaSize;

    win = new BrowserWindow({
        x: 0,
        y: 0,
        width: size.width,
        height: size.height,
        webPreferences: { webSecurity: false }
    });
    if (serve) {
        require('electron-reload')(__dirname, {
            electron: require(__dirname + '/node_modules/electron')
        });
        win.loadURL('http://localhost:4200');
    } else {
        win.loadURL(url.format({
            pathname: path.join(__dirname, 'dist/index.html'),
            protocol: 'file:',
            slashes: true
        }));
    }

    win.setMenuBarVisibility(false);

    win.on('closed', function () {
        win = null;
    });
    app.requestSingleInstanceLock();  // Run only one electron application window
    updateHandler();
    receiveMessageFromRender();
    shortcutRegister();
}