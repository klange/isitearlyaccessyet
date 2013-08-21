var n=14;

window.onload = function() {
    var b=Math.floor(Math.random()*n)+1;
    document.getElementById("base").style.backgroundImage = "url(bgs/" + b + ".jpg)";
}
