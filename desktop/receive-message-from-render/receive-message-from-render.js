"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.receiveMessageFromRender = void 0;
const electron_1 = require("electron");
const update_handler_1 = require("../update-handler/update-handler");
function receiveMessageFromRender() {
    electron_1.ipcMain.on('checkForUpdate', (event, data) => {
        (0, update_handler_1.updateHandler)();
    });
}
exports.receiveMessageFromRender = receiveMessageFromRender;
//# sourceMappingURL=receive-message-from-render.js.map