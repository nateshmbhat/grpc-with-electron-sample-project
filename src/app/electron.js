const {
    app,
    BrowserWindow
} = require('electron');
const path = require('path')
const DEVELOPMENT = 'development',
    PRODUCTION = 'production';
const isDev = process.env.NODE_ENV === DEVELOPMENT;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
    app.quit();
}
require('electron-reload')(__dirname);

function createWindow() {
    const mode = process.env.NODE_ENV;
    mainWindow = new BrowserWindow({
        width: 900,
        height: 680,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }
    });
    if (isDev) {
        console.log('Running development environment : ')
        mainWindow.loadURL(`http://localhost:8080`);
    } else {
        console.log('Running production environment : ')
        mainWindow.loadURL(`file://${path.join(__dirname, '../public/index.html')}`);
    }
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});