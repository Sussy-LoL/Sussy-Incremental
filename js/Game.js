var EN = ExpantaNum;
var debuging = false;
var changelog = '1.修改倍数判断\n\n2.增加了更新内容\n3.增加了存读档选项'
const fgame = {
    sus: new EN(10),
    Ge: [
        ["第一生成器",new EN(0),new EN(0),new EN(1),new EN(10),true], //0生成器名 1购买数量 2数量 3倍数 4价格 5解锁
        ["第二生成器",new EN(0),new EN(0),new EN(1),new EN(1e20),true],
        ["第三生成器",new EN(0),new EN(0),new EN(1),new EN("ee500"),true],
        ["第四生成器",new EN(0),new EN(0),new EN(1),new EN("10^^200"),true],
    ],
    u: [
        [new EN("e1e20"),false,new EN("e1e200"),false,new EN("10^^2000000"),false],
        [new EN("e1e20"),false,new EN("e1e200"),false,new EN("eee2000"),false],
    ]
};
var game = fgame;
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
    document.getElementById("change").innerText = changelog;
    //load();
    var doc = setInterval("updateDoc()",25);
    var ge = setInterval("getGe()",25);
    var autob = setInterval("checkAB()",25);
}