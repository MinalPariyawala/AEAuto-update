import { sendMessageToRender } from '../send-message-to-render/send-message-to-render';
import { autoUpdater } from 'electron-updater';
import { MessageBoxOptions, dialog } from 'electron';
import { writeLog } from '../write-log/write-log';

export function updateHandler() {
    const returnData = {
        error: { status: -1, msg: 'Detect update query exception' },
        checking: { status: 1, msg: 'Checking for app updates' },
        updateAva: { status: 2, msg: 'New version detected, downloading, please wait' },
        updateNotAva: { status: 0, msg: 'The version you are using now is the latest version, no need to update!' },
    };

    autoUpdater.checkForUpdates();

    //  Update error
    autoUpdater.on('error', message => {
        // log.error('' + returnData.error.msg);
        writeLog('error', returnData.error.msg)
        sendMessageToRender('message', returnData.error.msg);
    });

    //  Checking for updates
    autoUpdater.on('checking-for-update', () => {
        // log.warn('' + returnData.checking.msg);
        writeLog('warn', returnData.checking.msg)
        sendMessageToRender('message', returnData.checking.msg);
    });

    //  New version found
    autoUpdater.on('update-available', () => {
        // log.warn('' + returnData.updateAva.msg);
        writeLog('warn', returnData.updateAva.msg)

        sendMessageToRender('message', returnData.updateAva.msg);
    });

    //  Currently the latest version
    autoUpdater.on('update-not-available', info => {
        // log.warn('' + returnData.updateNotAva.msg);
        writeLog('error', returnData.updateNotAva.msg)

        sendMessageToRender('message', returnData.updateNotAva.msg);
    });

    // Update package download progress time
    autoUpdater.on('download-progress', (progressObj) => {
        // log.warn(JSON.stringify(progressObj));
        writeLog('warn', progressObj)
        sendMessageToRender('downloadProgress', progressObj.percent.toString());
    });

    // Trigger an event after the update package download is complete
    autoUpdater.on('update-downloaded', (event) => {
        writeLog('info', event);
        // log.info('A new version has been downloaded');
        writeLog('info', 'A new version has been downloaded');
        autoUpdater.quitAndInstall()
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
