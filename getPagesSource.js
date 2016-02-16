
function DOMtoString(document_root) {
    var html = '',
        node = document_root.firstChild;

    var imgs = document_root.getElementsByTagName('img');
    
    // console.log(imgs);

    for(var i=0;i<imgs.length;i++){
        var img = imgs[i];
        img.addEventListener('mouseover', function(){addNewImage(this)}, false);
        

        buildAd(img);
        
        var width = img.width > 400 ? 400 : img.width;
        var height = img.height > 400 ? 400 : img.height;
        var imgHTML = '<img src="' + img.src +'" width="' + width + '" height="' + height + '">';
        // console.log(imgHTML);
        html += imgHTML;
    }
    // return html;

    console.log(getCookie("myImgs"));
    return getCookie("myImgs");

}


function addNewImage(img){


    var width = img.width > 400 ? 400 : img.width;
        var height = img.height > 400 ? 400 : img.height;
        var imgHTML = '<img src="' + img.src +'" width="' + width + '" height="' + height + '">';

        
        
    if(getCookie("myImgs").indexOf(imgHTML) == -1){
        setCookie("myImgs", imgHTML, 10);
   


        return chrome.runtime.sendMessage({
                action: "addNewImage",
                source: imgHTML
        });
    }
}




function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    var oldCookie = "";
    if(getCookie(cname).length > 0) oldCookie = getCookie(cname);
    
    if(oldCookie.indexOf(cvalue) == -1){
        oldCookie += cvalue;
        document.cookie = cname + "=" + oldCookie + "; " + expires;
    }
}


function buildAd(img){
        var _parent = img.parentElement;
        var pWidth = _parent.offsetWidth;
        var pHeight = _parent.offsetHeight;
        
        

        var div = document.createElement("DIV");        // Create a <button> element
        div.setAttribute("style","width:"+pWidth+"px; height:30%; position:absolute; bottom:0px; left:0px; background-color:white; display:none;");
        var t = document.createTextNode("CLICK ME");       // Create a text node
        div.appendChild(t); 

        //Add Events
        img.addEventListener('mouseover', function(){show(div)}, false);
        img.addEventListener('mouseout', function(){hide(div)}, false);

        div.addEventListener('mouseover', function(){show(this)}, false);
        div.addEventListener('mouseout', function(){hide(this)}, false);

                                       // Append the text to <button>
        _parent.appendChild(div);
}

function show(target){
        target.style.display = 'block';
}

function hide(target){
        target.style.display = 'none';
} 

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});