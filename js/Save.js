function EncodeObj(obj = {}) {
    return btoa(encodeURIComponent(JSON.stringify(obj)));
}
function DecodeStr(str = "") {
    return JSON.parse(decodeURIComponent(atob(str)));
}
function save() {
    //fixN()
	localStorage.setItem("SI-save",EncodeObj(game));
    notify.done("已存档!",2000);
}
function loadFromString(str = "") {
    utils.merge(game, DecodeStr(str));
    game = utils.mergeType(game, fgame);
    return;
}
function load(){
	if(localStorage.getItem("SI-save")==null) {
        notify.error("读档失败!您尚未存档!",2000);
		return;
	}
	else{
		loadFromString(localStorage.getItem("SI-save"));
        notify.done("读档成功!",2000);
    }
    //fixN();
    return;
}/*
function fixN(){
    if(game.firstUpdate != 0) game.firstUpdate = new Date(game.firstUpdate);
    else game.firstUpdate = new Date();
    game.achivment = utils.deepClone(fgame.achivment);
    game.u = utils.deepClone(fgame.u);
    return;
}
*/
function hardreset(){
    let confirmation = confirm("确定要重置整个游戏吗？\n只建议在版本更新或想重玩游戏时使用该功能！");
    if(confirmation==true){
        reset();
    }
}
function reset(){
    localStorage.setItem("SI-save",EncodeObj(fgame));
    load();
    location.reload();
}
function exportgame(){
    save();
    notify.done("已导出");
    copyText = EncodeObj(game);
    navigator.clipboard.writeText(copyText);
}
function importgame(){
    localStorage.setItem("SI-save",EncodeObj(DecodeStr(prompt("请输入你的存档"))));
    load();
}