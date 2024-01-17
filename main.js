const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    mainWindow.loadURL(
        isDev
            ? 'http://locahost:3000'
            : `file://${path.join(__dirname, 'frontend/build/index.html')}`
    );

    mainWindow.on('closed', () => app.quit());
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});