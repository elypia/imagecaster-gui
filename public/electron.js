const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let apiProcess = null;

const path = require('path');
const url = require('url');

let mainWindow;

// TODO: Make this into TypeScript
// TODO: Don't include electron.js when running website?
function startApi() {
  let proc = require('child_process').spawn;

  let executable = "imagecaster-server";

  if (process.platform === 'win32')
    executable += ".exe";

  let serverPath = path.join(process.resourcesPath, `..${path.sep}imagecaster${path.sep}${executable}`);
  console.log(`Running instance of imagecaster-server from: %s`, serverPath);

  apiProcess = proc(serverPath);

  apiProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);

    if (mainWindow == null)
      createWindow();
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    title: 'ImageCaster',
    icon: path.join(__dirname, `${path.sep}..${path.sep}build${path.sep}favicon.ico`),
    backgroundColor: '#303030',

    // Default size, and what we're optimizing UI around.
    width: 1280,
    height: 720,

    // Smallest reasonable size we'll allow.
    minWidth: 512,
    minHeight: 288
  });

  const startUrl = url.format({
    pathname: path.join(__dirname, `${path.sep}..${path.sep}build${path.sep}index.html`),
    protocol: 'file:',
    slashes: true
  });

  mainWindow.loadURL(startUrl);

  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', startApi);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin')
    app.quit()
});

app.on('activate', () => {
  if (mainWindow === null)
    createWindow()
});
