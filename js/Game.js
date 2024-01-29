var debuging = false;
var reseting = false;
var game = fgame;
document.addEventListener("keydown",hotkeys);
function hotkeys(event) {
    switch(event.key) {
        case 'm':
            buyMaxAll();
    }
}
function sg() {
    startNew();
    pageshow("mp");
    subshow("ng");
    document.getElementById("change").innerText = changelog;
    if(game.firstUpdate == 0) game.firstUpdate = new Date();
    document.getElementById("st").innerText = game.firstUpdate.toLocaleString("zh-CN", {timezone: "UTC"});
    game.lastUpdate = new Date();
    if((JSON.parse(JSON.parse(localStorage.getItem("SI-save")).version ?? 0)) < 0.37) reset();
    else load();
    var doc = setInterval("updateDoc()",25);
    var ge = setInterval("getGe()",25);
    var gc = setInterval("checkGlitch()",25);
    var ac = setInterval("checkAchivment()",25);
    //var cg = setInterval();
}