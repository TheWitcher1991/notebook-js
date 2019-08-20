'use strict';

if (require.main !== module) {
    require('update-electron-app')({
      logger: require('electron-log')
    })
}

const path = require('path')
const glob = require('glob')
const {app, BrowserWindow} = require('electron')

const debug = /--debug/.test(process.argv[2])

if (process.mas) app.setName('NoteBook-js')

let mainWindow = null

function initialize () {

    loadDemos()

    function createWindow () {
        const windowOptions = {
            width: 768,
            minWidth: 320,
            height: 600,
            center: true,
            resizable: false,
            title: 'Блокнот',
            title: app.getName()
        }

        if (process.platform === 'linux') {
            windowOptions.icon = path.join(__dirname, '/assets/app-icon/png/512.png')
        }

        mainWindow = new BrowserWindow(windowOptions)
        mainWindow.setMenuBarVisibility(false)
        mainWindow.loadURL(path.join('file://', __dirname, '/public/index.html'))

        if (debug) {
            mainWindow.webContents.openDevTools()
            mainWindow.maximize()
            require('devtron').install()
        }

        mainWindow.on('closed', () => {
            mainWindow = null
        })
    }

    app.on('ready', () => {
        createWindow()
    })
    
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') app.quit()
    })
    
    app.on('activate', () => {
        if (mainWindow === null) createWindow()
    })
}

function loadDemos () {
    const files = glob.sync(path.join(__dirname, 'public/components/**/*.js'))
    files.forEach((file) => {require(file)})
}

initialize()