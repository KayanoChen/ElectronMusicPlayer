const fs = require('fs')
const {dialog} = require('electron');
const path = require('path')
const {parse} = require('id3-parser')

exports.newAudioFilesDialog = function newAudioFilesDialog(){
    const audioFilesPath = dialog.showOpenDialog({
        properties:['openFile','multiSelections'],
        message:'选择歌曲文件'
    })
    if(audioFilesPath!=null && audioFilesPath !='undefined')
        return addMusicFiles(audioFilesPath)
}

function addMusicFiles(audioFilesPath){
    let musicList = [];
    audioFilesPath.forEach((filePath)=>{
        if(fs.existsSync(filePath)){

            try {
                let stats = fs.statSync(filePath)
                if (stats.isFile() &&
                    (path.extname(filePath) == '.mp3'
                        || path.extname(filePath) == '.flac'
                        || path.extname(filePath) == '.wav')
                    || path.extname(filePath) == '.ogg') {
                    var tags = parse(fs.readFileSync(filePath))
                    if(tags!=false){
                        musicList.push(new musicInfo(path.basename(filePath),filePath,tags.image.data,tags.artist,tags.title))
                    }else{
                        musicList.push(new musicInfo(path.basename(filePath),filePath,null,'未知','未知'))
                    }
                }
            }catch (e) {
                console.error(e)
            }
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