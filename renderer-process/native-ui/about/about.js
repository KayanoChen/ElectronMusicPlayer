const about = document.querySelector('#about')
const znAboutLink = document.querySelector('link[rel="import"][href="../../templates/about/about-zn.html"]')
const enAboutLink = document.querySelector('link[rel="import"][href="../../templates/about/about-en.html"]')

var language = GetQueryString('language')
if(language=='zn'){
    addZnAboutTemplate()
}else if(language=='en'){
    addEnAboutTemplate()
}

function GetQueryString(name)
{
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

function addZnAboutTemplate(){
    document.title = "关于"
    let template = znAboutLink.import.querySelector('#about-zn')
    let clone = document.importNode(template.content,true)
    about.appendChild(clone)
}
function addEnAboutTemplate() {
    document.title = "About"
    let template = enAboutLink.import.querySelector('#about-en')
    let clone = document.importNode(template.content, true)
    about.appendChild(clone)
}
