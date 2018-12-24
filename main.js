const {BrowserWindow , app, dialog, Menu, shell} = require('electron');
const path = require('path')
const {newAudioDirDialog} = require('./main-process/directory')
const {newAudioFilesDialog} = require('./main-process/file')
let mainWindow;
app.on('window-all-closed',()=>{
    app.quit();
})
app.on('ready',()=>{
    mainWindow = new BrowserWindow({
        width:800,
        height:600,
        maxWidth:800,
        maxHeight:600,
        title:'Kayano Music Box',
        show: false,
        minHeight:450,
        minWidth:450
    })
    mainWindow.id=1;
    mainWindow.loadFile('./sections/index/index.html');
    // mainWindow.webContents.openDevTools();
    mainWindow.webContents.on('crashed', ()=>{
        const options = {
            type: 'info',
            title: '糟糕',
            message: '进程已经崩溃',
            buttons: ['重载', '关闭']
        }
        dialog.showMessageBox(options, (index) => {
            if (index === 0) mainWindow.reload()
            else mainWindow.close()
        })
    })
    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })

    const menu = Menu.buildFromTemplate(template4mac)
    Menu.setApplicationMenu(menu)


})

function newAboutWindow(language){
    const mainWindow = BrowserWindow.fromId(1)
    let aboutWindow = new BrowserWindow({
        width: 400,
        height: 140,
        show: false,
        resizable: false,
        parent: mainWindow
    })
    aboutWindow.setMenuBarVisibility(false)
    aboutWindow.loadURL(path.join('file:',__dirname,'./sections/about/about.html?language='+language))
    aboutWindow.once('ready-to-show', () => {
        aboutWindow.show()
    })
    aboutWindow.on('closed',()=>{
        aboutWindow=null;
    });
    aboutWindow.webContents.on('crashed', ()=>{
        const options = {
            type: 'info',
            title: '糟糕',
            message: '进程已经崩溃',
            buttons: ['重载', '关闭']
        }
        dialog.showMessageBox(options, (index) => {
            if (index === 0) aboutWindow.reload()
            else aboutWindow.close()
        })
    })
}

function newTestWindow(){
    const mainWindow = BrowserWindow.fromId(1)
    let testWindow = new BrowserWindow({
        width: 500,
        height: 400,
        show: false,
        resizable: false,
        parent: mainWindow
    })
    testWindow.setMenuBarVisibility(false)
    testWindow.loadURL(path.join('file:',__dirname,'./sections/test/test.html'))
    testWindow.webContents.openDevTools()
    testWindow.once('ready-to-show', () => {
        testWindow.show()
    })
    testWindow.on('closed',()=>{
        testWindow=null;
    });
    testWindow.webContents.on('crashed', ()=>{
        const options = {
            type: 'info',
            title: '糟糕',
            message: '进程已经崩溃',
            buttons: ['重载', '关闭']
        }
        dialog.showMessageBox(options, (index) => {
            if (index === 0) testWindow.reload()
            else testWindow.close()
        })
    })
}

var template4mac = [
        {
            label: '文件',
            submenu: [
                {
                    label: '打开文件',
                    icon:'./assets/image/openfolder_16x16.png',
                    click: function () {
                        let musicList = newAudioFilesDialog()
                        mainWindow.webContents.send('musicList', musicList);
                    }
                },
                {
                    label: '打开文件夹',
                    icon:'./assets/image/openfolder_16x16.png',
                    click: function () {
                        let musicList = newAudioDirDialog()
                        mainWindow.webContents.send('musicList', musicList);
                    }
                },
                {
                    label: '退出',
                    icon:'./assets/image/quit_16x16.png',
                    role: 'quit',
                    click:function () {
                        app.quit()
                    }
                }
            ]
        },
        {
            label: '关于',
            submenu: [
                {
                    label: '关于',
                    icon:'./assets/image/about_16x16.png',
                    click: function () {
                        newAboutWindow('zn')
                    }
                },
                {
                    label: 'About',
                    icon:'./assets/image/about_16x16.png',
                    click: function () {
                        newAboutWindow('en')
                    }
                },
                {
                    label: 'Github',
                    icon:'./assets/image/link_16x16.png',
                    click: function () {
                        shell.openExternal("https://github.com/kayanochen")
                    }
                }
                // ,
                // {
                //     label: '打开测试页面',
                //     click: function () {
                //         newTestWindow();
                //     }
                // }
            ]
        }
];

var template4win = [
    {
        label: '文件',
        submenu: [
            {
                label: '打开文件',
                // icon:'./assets/image/openfolder_16x16.png',
                click: function () {
                    let musicList = newAudioFilesDialog()
                    mainWindow.webContents.send('musicList', musicList);
                }
            },
            {
                label: '打开文件夹',
                // icon:'./assets/image/openfolder_16x16.png',
                click: function () {
                    let musicList = newAudioDirDialog()
                    mainWindow.webContents.send('musicList', musicList);
                }
            },
            {
                label: '退出',
                // icon:'./assets/image/quit_16x16.png',
                role: 'quit',
                click:function () {
                    app.quit()
                }
            }
        ]
    },
    {
        label: '关于',
        submenu: [
            {
                label: '关于',
                // icon:'./assets/image/about_16x16.png',
                click: function () {
                    newAboutWindow('zn')
                }
            },
            {
                label: 'About',
                // icon:'./assets/image/about_16x16.png',
                click: function () {
                    newAboutWindow('en')
                }
            },
            {
                label: 'Github',
                // icon:'./assets/image/link_16x16.png',
                click: function () {
                    shell.openExternal("https://github.com/kayanochen")
                }
            }
            // ,
            // {
            //     label: '打开测试页面',
            //     click: function () {
            //         newTestWindow();
            //     }
            // }
        ]
    }
];