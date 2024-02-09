function buyGe(n = 0, type = "normal") {
    if(type == "normal") {
        let x = document.getElementById("g"+(n+1)+"b");
        if(!x.disabled) {
            if(!hasUp(0,2)) game.sus = game.sus.sub(game.Ge.normal[n][3]);
            game.Ge.normal[n][0] = game.Ge.normal[n][0].add(new EN(1));
            game.Ge.normal[n][1] = game.Ge.normal[n][1].add(new EN(1));
        }
    }
    else if(type == "auto") {
        let y = document.getElementById("ag"+(n+1)+"b");
        if(!y.disabled) {
            if(!hasUp(0,2)) game.automation.autobuyer = game.automation.autobuyer.sub(game.Ge.normal[n][3]);
            game.Ge.auto[n][0] = game.Ge.auto[n][0].add(new EN(1));
            game.Ge.auto[n][1] = game.Ge.auto[n][1].add(new EN(1));
        }
    }
}
function buyMaxGe(n = 0, type = "normal") {
    if(type == "normal") {
        let x = document.getElementById("g"+(n+1)+"b");
        if(!x.disabled) {
            let time = EN.floor(EN.div(game.sus,game.Ge.normal[n][3]));
            if(!hasUp(0,2)) game.sus = game.sus.sub(EN.mul(game.Ge.normal[n][3],time));
            game.Ge.normal[n][0] = game.Ge.normal[n][0].add(time);
            game.Ge.normal[n][1] = game.Ge.normal[n][1].add(time);
        }
    }
    else if(type == "auto") {
        let y = document.getElementById("g"+(n+1)+"b");
        if(!y.disabled) {
            let time = EN.floor(EN.div(game.automation.autobuyer,game.Ge.auto[n][3]));
            if(!hasUp(0,2)) game.automation.autobuyer = game.automation.autobuyer.sub(EN.mul(game.Ge.auto[n][3],time));
            game.Ge.auto[n][0] = game.Ge.auto[n][0].add(time);
            game.Ge.auto[n][1] = game.Ge.auto[n][1].add(time);
        }
    }
}
function buyMaxAll() {
    let i;
    let s = 0;
    for(i = game.Ge.normal.length-1;i >= 0;i--) {
        buyMaxGe(i);
        buyMaxGe(i,"auto");
    }
}
function getGe() {
    getNormalGe();
    getAutoGe();
}
function getNormalGe() {
    let i;
    let s = 0;
    if(reseting) return;
    for(i = 0;i < game.Ge.normal.length;i++) {
        let base = EN.floor(EN.div(game.Ge.normal[i][1],new EN(10)));
        game.Ge.normal[i][2] = EN.add(EN.mul(2,base),1);
        if(hasUp(0,0)) game.Ge.normal[i][2] = EN.pow(new EN(1.0001),base);
        //game.Ge.normal[i][3] = EN.pow(2,base);
        if(i == 0) game.sus = game.sus.add(game.Ge.normal[i][1].mul(game.Ge.normal[i][2]));
        else game.Ge.normal[i-1][1] = game.Ge.normal[i-1][1].add(game.Ge.normal[i][1].mul(game.Ge.normal[i][2]));
    }
    if(game.automation.autobuyer.gte(new EN(1))) {
        getAuto();
    }
}
function getAutoGe() {
    let i;
    let s = 0;
    if(reseting) return;
    for(i = 0;i < game.Ge.auto.length;i++) {
        let base = EN.floor(EN.div(game.Ge.auto[i][1],new EN(10)));
        game.Ge.auto[i][2] = EN.add(EN.mul(2,base),1);
        //if(hasUp(0,0)) game.Ge.auto[i][2] = EN.pow(new EN(1.0001),base);
        //game.Ge.normal[i][3] = EN.pow(2,base);
        if(i == 0) game.automation.autobuyer = game.automation.autobuyer.add(game.Ge.auto[i][1].mul(game.Ge.auto[i][2]));
        else game.Ge.auto[i-1][1] = game.Ge.auto[i-1][1].add(game.Ge.auto[i][1].mul(game.Ge.auto[i][2]));
    }
}
function getAuto() {
    let i,n = 0,x; //n是最大的解锁普通生成器
    if(reseting) return;
    for(i = 0;i < game.Ge.normal.length;i++) {
        x = document.getElementById("g"+(i+1)+"b") ?? 1;
        if(x != 1) {
            if(!x.disabled) { 
                n = i;
            }
        }
    }
    if(hasUp(0,0)) {
        let eexp = new EN.slog(game.Ge.normal[n][0],10);
        eexp = eexp.add(new EN(n+1).times(game.automation.autobuyer));
        game.Ge.normal[n][0] = new EN.arrow(10,2,eexp);
        game.Ge.normal[n][1] = new EN.arrow(10,2,eexp);
    }
    else {
        let exp = new EN.logBase(game.Ge.normal[n][0],10);
        exp = exp.times(EN.times(new EN(2).pow(n+1),game.automation.autobuyer));
        game.Ge.normal[n][0] = new EN(10).pow(exp);
        game.Ge.normal[n][1] = new EN(10).pow(exp);
    }
    if(game.Ge.normal[n][0].lte(1)) buyMaxGe(n);
}
function buyUp(row = 0,l = 0) {
    let cost = dcgame.u.normal.cost[row][l];
    let lock = game.u.normal[row][l];
    if(game.sus.gte(cost) && !hasUp(row,l)) {
        game.u.normal[row][l] = !lock;
        game.sus = game.sus.sub(cost);
    }
    if(debuging) console.log("value: " + l + " " + cost.toString() + " " + lock + " " + hasUp(row,n));
}
function hasUp(row = 0,n = 0) {
    return game.u.normal[row][n];
}
function checkAchivment() {
    if(game.sus.gte(0) && !hasAchivment(0,0)) addAchivment(0,0);
    if(game.sus.gte("1e5000") && !hasAchivment(0,1)) addAchivment(0,1);
    if(hasUp(0,0) && !hasAchivment(0,2)) addAchivment(0,2);
    if(hasUp(0,1) && !hasAchivment(0,3)) addAchivment(0,3);
    if(hasUp(0,2) && !hasAchivment(0,4)) addAchivment(0,4);
}
function addAchivment(row = 0,n = 0) {
    notify.success("达成成就: " + dcgame.achivment.normal.name[row][n],2000);
    game.achivment.normal[row][n] = true;
}
function hasAchivment(row = 0,n = 0) {
    return game.achivment.normal[row][n];
}
function getARcost(getNext = false) {
    //let orginalCost = new EN("10^^3000");
    let down_sus = getARgain().add(getNext?1:0);
    if(debuging) console.log(down_sus.toString());
    return (new EN.arrow(10,2,EN.times(EN.pow(1.05,down_sus),3000)));
}
function getARgain() {
    let down_sus = new EN.floor(EN.logBase(EN.max(EN.div(EN.slog(game.sus,10),3000),1),1.05));
    return down_sus;
}
function AutomationReset() {
    let g = getARgain();
    if(g.neq(0)) {
        if(debuging) console.log("Automation Reseting...");
        reseting = true;
        document.body.style.animation = "2500ms ease-out 0s 1 normal autobuy-reset";
        if(!game.automation.unlock) game.automation.unlock = true;
        let a = setTimeout(() => {
            //console.log("yee");
            game.Ge.normal = utils.deepClone(fgame.Ge.normal);
            game.sus = new EN(fgame.sus);
            game.u.normal = utils.deepClone(fgame.u.normal);
            game.u.normal[0][1] = true;
            game.automation.autobuyer = game.automation.autobuyer.add(g);
            game.automation.count = game.automation.count.add(1);
            reseting = false;
        },1250);
        let b = setTimeout(() => {
            document.body.style.animation = "none";
            clearTimeout(a);
            clearTimeout(b);
        },2500);
    }
}