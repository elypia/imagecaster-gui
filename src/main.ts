import {app, BrowserWindow} from 'electron';

/** The browser context. */
let window: BrowserWindow | null;

function createWindow() {
  window = new BrowserWindow({
    title: 'ImageCaster',
    icon: 'public/favicon.ico',
    width: 1280,
    height: 720
  });

  window.loadURL(`file://${__dirname + 'build/index.html'}`);

  window.on('closed', () => {
    window = null
  })
}

app.on('ready', () => createWindow());

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin')
    app.quit()
});

app.on('activate', () => {
  if (window === null)
    createWindow()
});
