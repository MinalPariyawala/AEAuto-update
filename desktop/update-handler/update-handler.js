"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHandler = void 0;
const send_message_to_render_1 = require("../send-message-to-render/send-message-to-render");
const electron_updater_1 = require("electron-updater");
const write_log_1 = require("../write-log/write-log");
function updateHandler() {
    const returnData = {
        error: { status: -1, msg: 'Detect update query exception' },
        checking: { status: 1, msg: 'Checking for app updates' },
        updateAva: { status: 2, msg: 'New version detected, downloading, please wait' },
        updateNotAva: { status: 0, msg: 'The version you are using now is the latest version, no need to update!' },
    };
    electron_updater_1.autoUpdater.checkForUpdates();
    //  Update error
    electron_updater_1.autoUpdater.on('error', message => {
        // log.error('' + returnData.error.msg);
        (0, write_log_1.writeLog)('error', returnData.error.msg);
        (0, send_message_to_render_1.sendMessageToRender)('message', returnData.error.msg);
    });
    //  Checking for updates
    electron_updater_1.autoUpdater.on('checking-for-update', () => {
        // log.warn('' + returnData.checking.msg);
        (0, write_log_1.writeLog)('warn', returnData.checking.msg);
        (0, send_message_to_render_1.sendMessageToRender)('message', returnData.checking.msg);
    });
    //  New version found
    electron_updater_1.autoUpdater.on('update-available', () => {
        // log.warn('' + returnData.updateAva.msg);
        (0, write_log_1.writeLog)('warn', returnData.updateAva.msg);
        (0, send_message_to_render_1.sendMessageToRender)('message', returnData.updateAva.msg);
    });
    //  Currently the latest version
    electron_updater_1.autoUpdater.on('update-not-available', info => {
        // log.warn('' + returnData.updateNotAva.msg);
        (0, write_log_1.writeLog)('error', returnData.updateNotAva.msg);
        (0, send_message_to_render_1.sendMessageToRender)('message', returnData.updateNotAva.msg);
    });
    // Update package download progress time
    electron_updater_1.autoUpdater.on('download-progress', (progressObj) => {
        // log.warn(JSON.stringify(progressObj));
        (0, write_log_1.writeLog)('warn', progressObj);
        (0, send_message_to_render_1.sendMessageToRender)('downloadProgress', progressObj.percent.toString());
    });
    // Trigger an event after the update package download is complete
    electron_updater_1.autoUpdater.on('update-downloaded', (event) => {
        (0, write_log_1.writeLog)('info', event);
        // log.info('A new version has been downloaded');
        (0, write_log_1.writeLog)('info', 'A new version has been downloaded');
        electron_updater_1.autoUpdater.quitAndInstall();
        // const dialogOpts: any = {
        //     buttons: ['Close', 'Later'],
        //     title: 'Version update prompt',
        //     message: process.platform === 'win32' ? event.releaseNotes : event.releaseName,
        //     detail: 'The new version has been downloaded, please close the program to install the new version!'
        // };
        // dialog.showMessageBox(dialogOpts, (response: number) => {
        //     if (response === 0) {
        //         autoUpdater.quitAndInstall();
        //     }
        // });
    });
}
exports.updateHandler = updateHandler;
//# sourceMappingURL=update-handler.js.map