const {BrowserWindow , dialog, shell} = require('electron').remote;
const path = require('path')
const fs = require('fs')
const znAbout = document.querySelector('#zn-about')
const enAbout = document.querySelector('#en-about')
const github = document.querySelector("#github")
const mainDiv = document.querySelector("#main-div")

const dragLink = document.querySelector('link[rel="import"][href="../../templates/drag/drag.html"]')
const audioLink = document.querySelector('link[rel="import"][href="../../templates/audio/audio.html"]')

let dragTemplate = dragLink.import.querySelector('#drag')
let audioTemplate = audioLink.import.querySelector('#audio')

function initDragTemplate(){

    let clone = document.importNode(dragTemplate.content,true)
    while(mainDiv.hasChildNodes()) //当elem下还存在子节点时 循环继续
    {
        mainDiv.removeChild(mainDiv.firstChild);
    }
    mainDiv.appendChild(clone)
}
initDragTemplate();

function initAudioTemplate(){

    let clone = document.importNode(audioTemplate.content,true)
    while(mainDiv.hasChildNodes()) //当elem下还存在子节点时 循环继续
    {
        mainDiv.removeChild(mainDiv.firstChild);
    }
    mainDiv.appendChild(clone)
}

znAbout.addEventListener('click',()=>{
    newAboutWindow('zn')
})
enAbout.addEventListener('click',()=>{
    newAboutWindow('en')
})
function newAboutWindow(language){
    const mainWindow = BrowserWindow.fromId(1)
    let aboutWindow = new BrowserWindow({
        width: 400,
        height: 140,
        listMaxHeight: 10,
        show: false,
        resizable: false,
        parent: mainWindow
    })
    aboutWindow.loadURL(path.join('file:',__dirname,'./../../sections/about/about.html?language='+language))
    // aboutWindow.webContents.openDevTools()
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

github.addEventListener("click",()=>{
    shell.openExternal("https://github.com/kayanochen")
})
