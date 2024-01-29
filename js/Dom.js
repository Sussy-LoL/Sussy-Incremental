var texts = [
    "为什么增量游戏都有新闻?",
    "这是一句谎话",
    "听着,别再玩这些增量游戏了!它们是蜥蜴人的骗ju",
    "你说得对,但是Sussy Incremental是一款由Sussy lol开发的增量游戏",
    "我需要一个新闻生成器!",
    "新闻，啊！新闻！",
    "<a href='https://www.bilibili.com/video/BV1GJ411x7h7'>点击此处以增加114514嫌疑</a>"
]
function updateDoc() {
    game.lastUpdate = new Date();
    document.getElementById("showp").innerText = game.sus.toString();
    updateGe();
    updateUp();
    updateAc();
    updateAb();
    updateTi();
}
function switchLock(ele = Element,c = Boolean) {
    ele.classList.add(c?"unlock":"lock");
    ele.classList.remove(c?"lock":"unlock");
}
function updateGe() {
    let i;
    for(i = 0;i < game.Ge.normal.length;i++) {
        document.getElementById("g"+(i+1)+"n").innerText = dcgame.Ge.normal[i];
        document.getElementById("g"+(i+1)+"N").innerText = game.Ge.normal[i][1].toString() + " ( +" + game.Ge.normal[i][0].toString() + ")";
        document.getElementById("g"+(i+1)+"c").innerText = "价格: " + game.Ge.normal[i][3].toString();
        document.getElementById("g"+(i+1)+"t").innerText = game.Ge.normal[i][2].toString() + "x";
        let x = document.getElementById("g"+(i+1)+"b");
        let y = document.getElementById("g"+(i+1)+"bm");
        if(game.sus.gte(game.Ge.normal[i][3])) {x.disabled = false;y.disabled = false;}
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
            x.innerText = dcgame.u.normal.cost[i][j].toString();
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

            tar.innerText = dcgame.achivment.normal[i][j];
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
        i.innerText = game.automation.count.toString();
        y.innerText = `重置以获得${getARgain().toString()}个自动购买器, 下一个在${getARcost(true).toString()}嫌疑`;
        y.style.display = "block";
        x.innerText = game.automation.autobuyer.toString();
        k.style.display = "block";
        //z.style.display = "inline-block";
    }
    else {
        j.style.display = "none";
        y.style.display = "none";
        k.style.display = "none";
        z.style.display = "none";
    }
}
function updateTi() {
    let a = document.getElementById("lt");
    a.innerText = game.lastUpdate.toLocaleString("zh-CN", {timezone: "UTC"});
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
function startNew() {
    let newsText = document.getElementById("newtext");
    newsText.innerHTML = texts[Math.floor(Math.random() * texts.length)];
    let p = 50 + document.body.clientWidth;
    let l = -50 - (newsText.innerText.length * 16);
    setInterval(function () {
        p -= 1;
        if (p <= l) {
            newsText.innerHTML = texts[Math.floor(Math.random() * texts.length)];
            l = -50 - (newsText.innerText.length * 16);
            p = 50 + document.body.clientWidth;
        }
        newsText.style.left = p.toFixed(1) + "px";
    }, 10);
}