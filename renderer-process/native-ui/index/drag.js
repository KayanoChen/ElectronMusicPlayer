const holder = document.querySelector('#main')
const {parse} = require('id3-parser')
holder.ondragover = () => {
    return false;
};

holder.ondragleave = () => {
    return false;
};

holder.ondragend = () => {
    return false;
};

holder.ondrop = (e) => {
    e.preventDefault();
    var filesPath = []
    for (let f of e.dataTransfer.files) {
        filesPath.push(f.path)
    }
    let musicList = addMusicFiles(filesPath)
    let musicList4Aplayer = []
    musicList.forEach((tag)=>{
        var pos = tag.filePath.lastIndexOf('.')
        var lrc = tag.filePath.substring(0,pos)+'.lrc'
        if(fs.existsSync(lrc)){

        }else{
            lrc = path.join('file:',__dirname,'./../../assets/lrc/default.lrc')
        }
        musicList4Aplayer.push(new audio(tag.fileName,tag.artist,tag.filePath,arrayBufferToBase64(tag.imageBuffer),lrc))
    })
    initAplayer(musicList4Aplayer)
};

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