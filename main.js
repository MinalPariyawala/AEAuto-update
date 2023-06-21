"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.win = void 0;
const receive_message_from_render_1 = require("./desktop/receive-message-from-render/receive-message-from-render");
const shortcut_register_1 = require("./desktop/shortcut-register/shortcut-register");
const update_handler_1 = require("./desktop/update-handler/update-handler");
const electron_1 = require("electron");
const path = require("path");
const url = require("url");
const args = process.argv.slice(1);
const serve = args.some(function (val) {
    return val === '--serve';
});
try {
    electron_1.app.on('ready', createWindow);
    electron_1.app.on('window-all-closed', () => {
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
            electron_1.app.quit();
        }
    });
    electron_1.app.on('activate', () => {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (exports.win === null) {
            createWindow();
        }
    });
    electron_1.app.on('will-quit', () => {
        electron_1.globalShortcut.unregisterAll();
    });
}
catch (e) {
    // writeLog('debug', e);
}
function createWindow() {
    const size = electron_1.screen.getPrimaryDisplay().workAreaSize;
    exports.win = new electron_1.BrowserWindow({
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
        exports.win.loadURL('http://localhost:4200');
    }
    else {
        exports.win.loadURL(url.format({
            pathname: path.join(__dirname, 'dist/angular-electron-autoUpdater/index.html'),
            protocol: 'file:',
            slashes: true
        }));
    }
    exports.win.setMenuBarVisibility(false);
    exports.win.on('closed', function () {
        exports.win = null;
    });
    electron_1.app.requestSingleInstanceLock(); // Run only one electron application window
    (0, update_handler_1.updateHandler)();
    (0, receive_message_from_render_1.receiveMessageFromRender)();
    (0, shortcut_register_1.shortcutRegister)();
}
//# sourceMappingURL=main.js.map