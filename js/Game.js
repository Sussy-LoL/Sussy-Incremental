var EN = ExpantaNum;
var debuging = false;
var game = {
    sus: new EN(10),
    Ge: [
        ["第一生成器",new EN(0),new EN(0),new EN(1),new EN(10),true], //0生成器名 1购买数量 2数量 3倍数 4价格 5解锁
        ["第二生成器",new EN(0),new EN(0),new EN(1),new EN(1e20),true],
        ["第三生成器",new EN(0),new EN(0),new EN(1),new EN("ee500"),true],
        ["第四生成器",new EN(0),new EN(0),new EN(1),new EN("10^^200"),true],
    ]
}
let keycode;
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
    //load();
    setInterval("updateDoc()",25);
    setInterval("getGe()",25);
}