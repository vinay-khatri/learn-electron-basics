// This file will be run by renderer process so we need remote module for accessing main proccess modules and methods.
const {app, BrowserWindow, webContents, session } = require('electron').remote

// BrowserWindow
// creating a new BrowserWindow
document.querySelector('#new-window').addEventListener('click', (e) => {
    const win = new BrowserWindow({
        height: 600,
        width: 800,
        webPreferences: {
            nodeIntegration: true,
        }
    });
    win.loadFile('./html/new-window.html');
})

// child window - useful for creating modals
document.querySelector('#child-window').addEventListener('click', e => {
    const win = BrowserWindow.getFocusedWindow()
    const childWindow = new BrowserWindow({
        width: 400,
        height: 300,
        frame: false,
        parent: win,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
        }
    })
    childWindow.loadFile('./html/child-window.html')
})

// BrowserWindow that loads url (loadURL)
document.querySelector('#web-window').addEventListener('click', (e) => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        // we can set bckground similar to the content it will load so it doesn't give a flicker effect
        // and feels like a native app. This is called showing windows-gracefully.
        backgroundColor: '#2C92F9',
        show: false,
        webPreferences: {
            nodeIntegration: true,
        }
    })
    // loadURL and show it once it fetched the data
    win.loadURL('https://www.google.com/')
    win.once('ready-to-show', () => {
        win.show()
    })

})

// webContents (event emitter)
// Responsible for rendering and controling web pages
// Gives us lots of events to better control the state of web pages inside our BrowserWindow
document.querySelector('#web-events').addEventListener('click', e => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        webPreferences: {
            nodeIntegration: true,
        }
    })
    win.loadURL('https://www.github.com/')
    // webContents can be accessed as property on BrowserWindow or from the webContents module itself
    const wc = win.webContents
    // this event will fire when web page starts loading from url
    wc.on('did-start-loading', () => {
        console.log('Web Page Loading Started')
    })
    // this event will fire when web page is fetched and fully loaded with all its resources.
    wc.on('did-finish-load', () => {
        win.show()
    })
})


// session
// electron provides a common session to all browser windows of our app
// It persists data even after app close.
// it can be accessed from session module or as property of webContents.
document.querySelector('#default-session').addEventListener('click', e => {
    let mainWin = BrowserWindow.getFocusedWindow()
    let win = new BrowserWindow({width: 800, height: 600})
    win.loadFile('./html/default-session.html')
})

// custom session
// we can create our custom sessions using session module or partition property of webPreferences
// To persist data in custom sessions we have to pass persist keyword with colon while creating session.
document.querySelector('#custom-session').addEventListener('click', e => {

    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences : {
            // persist: is crucial to keep data stored even when app closed
            partition: 'persist:part1'
        }
    })
    win.loadFile('./html/custom-session.html')
    // 2nd method is using session module and then using fromPartition method
    // let customSessionA = session.fromPartition('persist:part2')
    // then set session property of webPreferences to customSessionA
})

// deleting data from session
// we can use methods like clearStorageData() or clearCache() or clearAuthCache() on session
// sessionA.clearStorageData()
// session module also provides many other useful functionality like throttling the network etc.


// Download & progress bar
// session downloadItem
document.querySelector('#download-item').addEventListener('click', e => {
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
        }
    })
    win.loadFile('./html/download-item.html')
    // Go to download-item html file where rest of script is written and executed
})
