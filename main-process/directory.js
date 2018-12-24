const fs = require('fs')
const {dialog} = require('electron');
const path = require('path')
const {parse} = require('id3-parser')

exports.newAudioDirDialog = function newAudioDirDialog(){
    const audioDir = dialog.showOpenDialog({
        properties:['openDirectory'],
        message:'选择歌曲文件夹'
    })
    if(audioDir!=null && audioDir !='undefined')
        return addMusicFiles(audioDir)
}

function addMusicFiles(audioDir){
    let musicList = [];
    audioDir.forEach((filePath)=>{
        if(fs.existsSync(filePath)){
            let musicFiles = fs.readdirSync(filePath)
            musicFiles.forEach((fileName)=>{
                let fullPath = path.join(filePath,fileName)
                try {
                    let stats = fs.statSync(fullPath)
                    if (stats.isFile() &&
                        (path.extname(fullPath) == '.mp3'
                            || path.extname(fullPath) == '.flac'
                            || path.extname(fullPath) == '.wav')
                        || path.extname(fullPath) == '.ogg') {
                        var tags = parse(fs.readFileSync(fullPath))
                        if(tags!=false){
                            musicList.push(new musicInfo(fileName,fullPath,tags.image.data,tags.artist,tags.title))
                        }else{
                            musicList.push(new musicInfo(fileName,fullPath,null,'未知','未知'))
                        }
                    }
                }catch (e) {
                }
            })
        }
    })
    return musicList
}

function musicInfo(fileName,filePath,imageBuffer,artist,title){
    this.fileName = fileName;
    this.filePath = filePath;
    this.imageBuffer = imageBuffer;
    this.artist = artist;
    this.title = title;
}