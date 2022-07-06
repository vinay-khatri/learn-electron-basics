const {app, BrowserWindow, webContents, session} = require('electron')

// Electron has two type of process - Main Process and Renderer Process
// Main process executes the code direct from main.js file
// Renderer process executes the code from html file
// With "remote" module we can use exclusive main process modules and methods from rendere process.
// remote module provides a simple inter-process communication(IPC) between main process and renderer process.
// NOTE - in new Electron versions from 2020 its mendatory to set enableRemoteModule to true for IPC
function createWindow() {

    // BrowserWindow
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 600,
        minHeight: 400,
        // frame: false,
        webPreferences: {
            // nodeIntegration must be set to true for using node js modules inside renderer process(html file)
            // NOTE: enableRemoteModule must be true for using remote module inside renderer process
            nodeIntegration: true,
            enableRemoteModule: true
        }
    })

    // load the html file in window
    mainWindow.loadFile('index.html')
    mainWindow.webContents.openDevTools()
}

// app
// controls your application event lifecycle.
app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})