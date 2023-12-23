function save(){
	localStorage.setItem("save",JSON.stringify(game));
	
}
function load(){
	if(JSON.parse(localStorage.getItem("save"))==null) {
			return;
		}
	else{
		game = JSON.parse(localStorage.getItem("save"));
	}
    fixN()
}
function fixN(){
    for(let i = 0;i < game.Ge.length;i++) {
        game.Ge[i][1] = new EN(game.Ge[i][1]);
        game.Ge[i][2] = new EN(game.Ge[i][2]);
        game.Ge[i][3] = new EN(game.Ge[i][3]);
        game.Ge[i][4] = new EN(game.Ge[i][4]);
    }
    game.sus = new EN(game.sus);
}
function hardreset(){
    let confirmation = confirm("确定要重置整个游戏吗？\n只建议在版本更新或想重玩游戏时使用该功能！");
    if(confirmation==true){
        game = fgame;
        localStorage.setItem("save",JSON.stringify(game));
        load();
        location.reload();
    }
}
function exportgame(){
    save();
    copyText = btoa(encodeURIComponent(JSON.stringify(game)));
    navigator.clipboard.writeText(copyText);
}
function importgame(){
    game = JSON.parse(decodeURIComponent(atob(prompt("请输入你的存档"))));
    localStorage.setItem("save",JSON.stringify(game));
    load();
}