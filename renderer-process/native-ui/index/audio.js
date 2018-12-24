const APlayer = require('aplayer')
const {ipcRenderer} = require('electron')
const {arrayBufferToBase64} = require('./../../assets/js/imagebuffer.js')
var ap;
//初始化播放器
function initAplayer(musicList){
    initAudioTemplate()
    ap = new APlayer({
        container: document.querySelector('#audio-player'),
        // theme:'#FADFA3',
        listMaxHeight: 10,
        lrcType: 3,
        mini:false,
        audio:musicList
    });
    //绑定事件
    ap.on('error',()=>{
        ap.notice('该文件无法播放',2000,1)
        // ap.skipForward()//切换下一首
    })
    ap.on('ended',()=>{
        ap.notice('自动播放下一首',2000,1)
    })
}


//监听main-process消息
ipcRenderer.on('musicList', (event, arg) => {

    let musicList4Aplayer = [];
    if(arg!=null&&arg.size!=0) {
        arg.forEach((tag) => {
            var pos = tag.filePath.lastIndexOf('.')
            var lrc = tag.filePath.substring(0, pos) + '.lrc'
            if(fs.existsSync(lrc)){

            }else{
                lrc = path.join('file:',__dirname,'./../../assets/lrc/default.lrc')
            }
            musicList4Aplayer.push(new audio(tag.fileName, tag.artist, tag.filePath, arrayBufferToBase64(tag.imageBuffer), lrc))
        })

        if (ap == null || ap == 'undefined') {
            initAplayer(musicList4Aplayer)
        } else {
            ap.list.clear()
            ap.list.add(musicList4Aplayer)//set list
        }
    }else{
        initDragTemplate()
    }

})

//监听main-process消息



function audio(name,artist,url,cover,lrc){
    this.name = name;
    this.artist = artist;
    this.url = url;
    this.cover = cover;
    this.lrc = lrc
}



