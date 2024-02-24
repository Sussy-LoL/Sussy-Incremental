function save(){
    fixN()
	localStorage.setItem("SI-save",JSON.stringify(game));
    notify.done("已存档!",2000);
}
function load(){
	if(JSON.parse(localStorage.getItem("SI-save"))==null) {
        notify.error("读档失败!您尚未存档!",2000);
		return;
	}
	else{
		game = JSON.parse(localStorage.getItem("SI-save"));
        notify.done("读档成功!",2000);
	}
    fixN()
}
function fixN(){
    let i;
    //let j;
    for(i = 0;i < game.Ge.normal.length;i++) {
        game.Ge.normal[i][0] = new EN(game.Ge.normal[i][0]);
        game.Ge.normal[i][1] = new EN(game.Ge.normal[i][1]);
        game.Ge.normal[i][2] = new EN(game.Ge.normal[i][2]);
        game.Ge.normal[i][3] = new EN(game.Ge.normal[i][3]);
    }
    for(i = 0;i < game.Ge.auto.length;i++) {
        game.Ge.auto[i][0] = new EN(game.Ge.auto[i][0]);
        game.Ge.auto[i][1] = new EN(game.Ge.auto[i][1]);
        game.Ge.auto[i][2] = new EN(game.Ge.auto[i][2]);
        game.Ge.auto[i][3] = new EN(game.Ge.auto[i][3]);
    }
    game.sus = new EN(game.sus);
    game.automation.autobuyer = new EN(game.automation.autobuyer);
    game.automation.count = new EN(game.automation.count);
    if(game.firstUpdate != 0) game.firstUpdate = new Date(game.firstUpdate);
    else game.firstUpdate = new Date();
    game.achivment = utils.deepClone(fgame.achivment);
    game.u = utils.deepClone(fgame.u);
}
function hardreset(){
    let confirmation = confirm("确定要重置整个游戏吗？\n只建议在版本更新或想重玩游戏时使用该功能！");
    if(confirmation==true){
        reset();
    }
}
function reset(){
    game = fgame;
    localStorage.setItem("SI-save",JSON.stringify(game));
    load();
    location.reload();
}
function exportgame(){
    save();
    notify.done("已导出")
    copyText = btoa(encodeURIComponent(JSON.stringify(game)));
    navigator.clipboard.writeText(copyText);
}
function importgame(){
    game = JSON.parse(decodeURIComponent(atob(prompt("请输入你的存档"))));
    localStorage.setItem("SI-save",JSON.stringify(game));
    load();
}