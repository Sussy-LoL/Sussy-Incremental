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
    document.getElementById("showp").innerText = game.sus.toString();
    updateGe();
    updateUp();
    updateAc();
}
function switchLock(ele = Element,c = Boolean) {
    ele.classList.add(c?"unlock":"lock");
    ele.classList.remove(c?"lock":"unlock");
}
function updateGe() {
    let i;
    let s = 0;
    for(i = 0;i < game.Ge.length;i++) {
        if(game.Ge[i][5]) s++;
    }
    for(i = 0;i < s;i++) {
        document.getElementById("g"+(i+1)+"n").innerText = game.Ge[i][0];
        document.getElementById("g"+(i+1)+"N").innerText = game.Ge[i][2].toString() + " ( +" + game.Ge[i][1].toString() + ")";
        document.getElementById("g"+(i+1)+"c").innerText = "价格: " + game.Ge[i][4].toString();
        document.getElementById("g"+(i+1)+"t").innerText = game.Ge[i][3].toString() + "x";
        let x = document.getElementById("g"+(i+1)+"b");
        let y = document.getElementById("g"+(i+1)+"bm");
        if(game.sus.gte(game.Ge[i][4])) {x.disabled = false;y.disabled = false;}
        else {x.disabled = true;y.disabled = true;}
        if(!x.disabled) {switchLock(x,1);switchLock(y,1);}
        else {switchLock(x,0);switchLock(y,0);}
    }
}
function updateUp() {
    let i;
    let j;
    let tar;
    for(i = 0;i < game.u.length;i++) {
        for(j = 0;j < game.u[i].length / 2;j++) {
            tar = document.getElementById("nu"+(i+1)+""+(j+1));
            if(tar == undefined) return;
            let x = document.getElementById("nub"+(i+1)+""+(j+1));
            x.innerText = game.u[i][j*2].toString();
            if(debuging) console.log(i + " " + j + " " + hasUp(i,j));
            if(hasUp(i,j)) {tar.classList.add("unlock");}
            else {tar.classList.remove("unlock");tar.classList.add("lock");}
        }
    }
}
function updateAc() {
    let i;
    let j;
    let tar;
    for(i = 0;i < game.achivment.normal.length;i++) {
        for(j = 0;j < game.achivment.normal[i].length / 2;j++) {
            tar = document.getElementById("na"+(i+1)+""+(j+1));
            if(tar == undefined) return;

            tar.innerText = game.achivment.normal[i][j*2];
            if(debuging) console.log(i + " " + j + " " + hasAchivment(i,j));
            if(hasAchivment(i,j)) {tar.classList.add("unlock");}
            else {tar.classList.remove("unlock");tar.classList.add("lock");}
        }
    }
}
function pageshow(str = "") {
    let x = document.getElementsByClassName("chosen");
    let i;
    for(i = 0;i < x.length;i++) {
        x[i].style.display = x[i].id == str?"block":"none";
        if(debuging) console.log(x[i] + " display:" + x[i].style.display)
    }
    if(debuging) console.log("切换了id为" + str + "的元素");
}
function subshow(str = "") {
    let x = document.getElementById(str);
    x = x.parentElement.getElementsByClassName("chosen1");
    let i;
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