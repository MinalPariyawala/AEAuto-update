"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shortcutRegister = void 0;
const electron_1 = require("electron");
const update_handler_1 = require("../update-handler/update-handler");
const main_1 = require("../../main");
function shortcutRegister() {
    /*Turn on debug mode*/
    electron_1.globalShortcut.register('Command+Control+Alt+Shift+D', () => {
        main_1.win.webContents.openDevTools();
    });
    /*Manually check for updates*/
    electron_1.globalShortcut.register('Command+Control+Alt+Shift+U', () => {
        (0, update_handler_1.updateHandler)();
    });
}
exports.shortcutRegister = shortcutRegister;
//# sourceMappingURL=shortcut-register.js.map