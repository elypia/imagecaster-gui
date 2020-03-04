const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    title: 'ImageCaster',
    icon: path.join(__dirname, '/../build/favicon.ico'),
    backgroundColor: '#303030',

    // Default size, and what we're optimizing UI around.
    width: 1280,
    height: 720,

    // Smallest reasonable size we'll allow.
    minWidth: 512,
    minHeight: 288
  });

  const startUrl = url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true
  });

  mainWindow.loadURL(startUrl);

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin')
    app.quit()
});

app.on('activate', () => {
  if (mainWindow === null)
    createWindow()
});
