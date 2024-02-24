function updateDoc() {
    game.lastUpdate = new Date();
    document.getElementById("showp").innerText = format(game.sus);
    updateGe();
    updateUp();
    updateAc();
    updateAb();
    updateTi();
    updateC();
}
function switchLock(ele = Element,c = Boolean) {
    ele.classList.add(c?"unlock":"lock");
    ele.classList.remove(c?"lock":"unlock");
}
function updateGe() {
    NormalGe();
    AutomationGe();
}
function NormalGe() {
    let i;
    for(i = 0;i < game.Ge.normal.length;i++) {
        document.getElementById("g"+(i+1)+"n").innerText = dcgame.Ge.normal[i];
        document.getElementById("g"+(i+1)+"N").innerText = format(game.Ge.normal[i][1]) + " (+" + format(game.Ge.normal[i][0]) + ")";
        document.getElementById("g"+(i+1)+"c").innerText = "价格: " + format(game.Ge.normal[i][3]);
        document.getElementById("g"+(i+1)+"t").innerText = format(game.Ge.normal[i][2]) + "x";
        let x = document.getElementById("g"+(i+1)+"b");
        let y = document.getElementById("g"+(i+1)+"bm");
        if(game.sus.gte(game.Ge.normal[i][3])) {x.disabled = false;y.disabled = false;}
        else {x.disabled = true;y.disabled = true;}
        if(!x.disabled) {switchLock(x,1);switchLock(y,1);}
        else {switchLock(x,0);switchLock(y,0);}
    }
}
function AutomationGe() {
    let i;
    for(i = 0;i < game.Ge.auto.length;i++) {
        document.getElementById("ag"+(i+1)+"n").innerText = dcgame.Ge.auto[i];
        document.getElementById("ag"+(i+1)+"N").innerText = format(game.Ge.auto[i][1]) + " (+" + format(game.Ge.auto[i][0]) + ")";
        document.getElementById("ag"+(i+1)+"c").innerText = `价格: ${format(game.Ge.auto[i][3])}自动购买器`;
        document.getElementById("ag"+(i+1)+"t").innerText = format(game.Ge.auto[i][2]) + "x";
        let x = document.getElementById("ag"+(i+1)+"b");
        let y = document.getElementById("ag"+(i+1)+"bm");
        if(game.automation.autobuyer.gte(game.Ge.auto[i][3])) {x.disabled = false;y.disabled = false;}
        else {x.disabled = true;y.disabled = true;}
        if(!x.disabled) {switchLock(x,1);switchLock(y,1);}
        else {switchLock(x,0);switchLock(y,0);}
    }
}
function updateUp() {
    let i,j,tar;
    for(i = 0;i < game.u.normal.length;i++) {
        for(j = 0;j < game.u.normal[i].length;j++) {
            tar = document.getElementById("nu"+(i+1)+""+(j+1));
            if(tar == undefined) return;
            let tar1 = document.getElementById("nut"+(i+1)+""+(j+1)),x = document.getElementById("nub"+(i+1)+""+(j+1));
            tar1.innerText = dcgame.u.normal.name[i][j];
            x.innerText = format(dcgame.u.normal.cost[i][j]);
            if(debuging) console.log(i + " " + j + " " + hasUp(i,j));
            if(hasUp(i,j)) {tar.classList.add("unlock");}
            else {tar.classList.remove("unlock");tar.classList.add("lock");}
        }
    }
}
function updateAc() {
    let i,j,tar;
    for(i = 0;i < game.achivment.normal.length;i++) {
        for(j = 0;j < game.achivment.normal[i].length;j++) {
            tar = document.getElementById("na"+(i+1)+""+(j+1));
            if(tar == undefined) return;

            tar.innerText = dcgame.achivment.normal.name[i][j];
            if(debuging) console.log(i + " " + j + " " + hasAchivment(i,j));
            if(hasAchivment(i,j)) {tar.classList.add("unlock");}
            else {tar.classList.remove("unlock");tar.classList.add("lock");}
        }
    }
}
function updateAb() {
    let x = document.getElementById("showa"),y = document.getElementById("abr"),z = document.getElementById("abb"),k = document.getElementById("abs");
    let i = document.getElementById("art"),j = document.getElementById("arb");
    if(game.sus.gte(new EN("10^^3000")) && !game.automation.unlock && hasUp(0,1)) {
        NotifyN("恭喜,你可以获得自动购买器了!");
        game.automation.unlock = true;
    }
    if(game.automation.unlock) {
        j.style.display = "block";
        i.innerText = format(game.automation.count);
        y.innerText = `重置以获得${format(getARgain())}个自动购买器, 下一个在${format(getARcost(true))}嫌疑`;
        y.style.display = "block";
        x.innerText = format(game.automation.autobuyer);
        k.style.display = "block";
        z.style.display = "initial";
    }
    else {
        j.style.display = "none";
        y.style.display = "none";
        k.style.display = "none";
        z.style.display = "none";
    }
}
function updateC() {
    let x = document.getElementById("showc"),y = document.getElementById("cr"),k = document.getElementById("cs");
    let i = document.getElementById("crt"),j = document.getElementById("crb");
    if(game.sus.gte(new EN(10).arrow(2)(new EN(10).arrow(2)(1))) && !game.choclate.unlock && hasUp(0,1)) {
        NotifyN("恭喜,你可以获得巧克力了!");
        game.choclate.unlock = true;
    }
    if(game.choclate.unlock) {
        j.style.display = "block";
        i.innerText = format(game.choclate.count);
        y.innerText = `重置以获得${format(getCRgain())}个巧克力, 下一个在${format(getCRcost(true))}嫌疑`;
        y.style.display = "block";
        x.innerText = format(game.choclate.choc);
        k.style.display = "block";
        //z.style.display = "initial";
    }
    else {
        j.style.display = "none";
        y.style.display = "none";
        k.style.display = "none";
        //z.style.display = "none";
    }
}
function updateTi() {
    let a = document.getElementById("lt"),b = document.getElementById("st");
    a.innerText = game.lastUpdate.toLocaleString("zh-CN", {timezone: "UTC"});
    b.innerText = game.firstUpdate.toLocaleString("zh-CN", {timezone: "UTC"});
}
function pageshow(str = "") {
    let x = document.getElementsByClassName("chosen"),i;
    for(i = 0;i < x.length;i++) {
        x[i].style.display = x[i].id == str?"block":"none";
        if(debuging) console.log(x[i] + " display:" + x[i].style.display)
    }
    if(debuging) console.log("切换了id为" + str + "的元素");
}
function subshow(str = "") {
    let x = document.getElementById(str),i;
    x = x.parentElement.getElementsByClassName("chosen1");
    for(i = 0;i < x.length;i++) {
        x[i].style.display = x[i].id == str?"block":"none";
        if(debuging) console.log(x[i] + " display:" + x[i].style.display)
    }
    if(debuging) console.log("切换了id为" + str + "的元素");
}