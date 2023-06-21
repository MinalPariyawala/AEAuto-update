"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessageToRender = void 0;
const main_1 = require("../../main");
function sendMessageToRender(channel, text) {
    main_1.win.webContents.on('did-finish-load', () => {
        main_1.win.webContents.send(channel, text);
    });
}
exports.sendMessageToRender = sendMessageToRender;
//# sourceMappingURL=send-message-to-render.js.map