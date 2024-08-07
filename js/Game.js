var debuging = false;
var reseting = false;
var game = utils.deepClone(fgame);
document.addEventListener("keydown",hotkeys);
function hotkeys(event) {
    switch(event.key) {
        case 'm':
            buyMaxAll();
    }
}
function sg() {
    InitGame();
    load();
    if (game.firstUpdate == 0) game.firstUpdate = new Date();
    var update = setInterval("smallUpdate()",25);
    //var cg = setInterval();
}
function smallUpdate() {
    updateDoc();
    getGe();
    checkGlitch();
    checkAchivment();
}
function InitGame() {
    addButtons({ refer: "mp", content: "生成器", id: "", tar: "buttons" },
        { refer: "up", content: "升级", id: "", tar: "buttons" },
        { refer: "ap", content: "成就", id: "", tar: "buttons" },
        { refer: "sp", content: "设置", id: "", tar: "buttons" });
    InitAchivment();
    InitGenerator();
    InitUpgrade();
    startNew();
    pageshow("mp");
    document.getElementById("change").innerText = changelog;
}
function addButtons(...e) {
    e.forEach((ele) => {
        addButton(ele.refer, ele.content, ele.id, ele.tar);
    }
    );
}
function addButton(refer = "", content = "", id = "",tar = "buttons") {
    let target_div = document.getElementById(tar), button = document.createElement("button");
    button.id = id;
    button.type = "button";
    button.classList.add("chs");
    button.textContent = content;
    button.setAttribute("onclick", `pageshow('${refer}')`);
    target_div.appendChild(button);
    return button;
}
function addSubButton(refer = "", content = "", id = "") {
    let button = addButton(refer, content, id, "subbuttons");
    button.setAttribute("onclick", `subshow('${refer}')`);
    return button;
}
function InitAchivment() {
    let i,j,target_div = document.getElementById("na");
    let table = document.createElement("table"),tbody = document.createElement("tbody");
    let row_template = document.createElement("tr"),elem_template = document.createElement("td");
    for(i = 0;i < game.achivment.normal.length;i++) {
        let row = row_template.cloneNode();
        for(j = 0;j < game.achivment.normal[i].length;j++) {
            let elem = elem_template.cloneNode();
            elem.textContent = "";
            elem.classList.add("na","lock")
            elem.id = `na${i+1}${j+1}`;
            row.appendChild(elem);
        }
        tbody.appendChild(row);
    }
    table.appendChild(tbody);
    target_div.appendChild(table);
    $(".na").hover(function() {
        let row = $(this).attr("id").charAt(2),n = $(this).attr("id").substr(3)
        row = parseInt(row) - 1;
        n = parseInt(n) - 1;
        let tooltip = dcgame.achivment.normal.tooltip[row][n];
        $("#natt").html(`${tooltip}`);
    })
}
function InitGenerator() {
    InitNormalGenerator();
    InitAutomationGenerator();
}
function InitNormalGenerator() {
    let i,target_div = document.getElementById("ng");
    let div_template = document.createElement("div"),p_template = document.createElement("p"),button_template = document.createElement("button");
    p_template.align = "left";button_template.align = "left";
    for(i = 0;i < game.Ge.normal.length;i++) {
        let Ge_div = div_template.cloneNode();
        let name_p = p_template.cloneNode(),num_p = p_template.cloneNode(),mul_p = p_template.cloneNode(),cost_p = p_template.cloneNode();
        let buy = button_template.cloneNode(),buyMax = button_template.cloneNode();
        name_p.classList.add("gn");num_p.classList.add("gN");mul_p.classList.add("gt");cost_p.classList.add("gc");buy.classList.add("gb");buyMax.classList.add("gb");
        name_p.id = `g${i+1}n`;num_p.id = `g${i+1}N`;mul_p.id = `g${i+1}t`;cost_p.id = `g${i+1}c`;buy.id = `g${i+1}b`;buyMax.id = `g${i+1}bm`;
        buy.style.top = "5px";buyMax.style.top = "5px";buy.style.right = "160px";buyMax.style.right = "20px";
        buy.setAttribute("onclick",`buyGe(${i})`);buyMax.setAttribute("onclick",`buyMaxGe(${i})`);
        buy.textContent = "购买1";buyMax.textContent = "购买最大";
        Ge_div.classList.add("ge");Ge_div.style.top = `${40 + 10*i}px`;Ge_div.id = `g${i+1}`;
        Ge_div.appendChild(name_p);Ge_div.appendChild(num_p);Ge_div.appendChild(mul_p);Ge_div.appendChild(cost_p);Ge_div.appendChild(buy);Ge_div.appendChild(buyMax);
        target_div.appendChild(Ge_div);
    }
}
function InitAutomationGenerator() {
    let i,target_div = document.getElementById("ag");
    let div_template = document.createElement("div"),p_template = document.createElement("p"),button_template = document.createElement("button");
    p_template.align = "left";button_template.align = "left";
    for(i = 0;i < game.Ge.normal.length;i++) {
        let Ge_div = div_template.cloneNode();
        let name_p = p_template.cloneNode(),num_p = p_template.cloneNode(),mul_p = p_template.cloneNode(),cost_p = p_template.cloneNode();
        let buy = button_template.cloneNode(),buyMax = button_template.cloneNode();
        name_p.classList.add("gn");num_p.classList.add("gN");mul_p.classList.add("gt");cost_p.classList.add("gc");buy.classList.add("gb");buyMax.classList.add("gb");
        name_p.id = `ag${i+1}n`;num_p.id = `ag${i+1}N`;mul_p.id = `ag${i+1}t`;cost_p.id = `ag${i+1}c`;buy.id = `ag${i+1}b`;buyMax.id = `ag${i+1}bm`;
        buy.style.top = "5px";buyMax.style.top = "5px";buy.style.right = "160px";buyMax.style.right = "20px";
        buy.setAttribute("onclick",`buyGe(${i}, 'auto')`);buyMax.setAttribute("onclick",`buyMaxGe(${i}, 'auto')`);
        buy.textContent = "购买1";buyMax.textContent = "购买最大";
        num_p.style.position = "relative";num_p.style.left = "200px";
        Ge_div.classList.add("ge");Ge_div.style.top = `${40 + 10*i}px`;Ge_div.id = `ag${i+1}`;
        Ge_div.appendChild(name_p);Ge_div.appendChild(num_p);Ge_div.appendChild(mul_p);Ge_div.appendChild(cost_p);Ge_div.appendChild(buy);Ge_div.appendChild(buyMax);
        target_div.appendChild(Ge_div);
    }
}
function InitUpgrade() {
    let i,j,target_div = document.getElementById("nu");
    let table = document.createElement("table"),tbody = document.createElement("tbody");
    let row_template = document.createElement("tr"),elem_template = document.createElement("td"),button_template = document.createElement("button"),span_template = document.createElement("span");
    for(i = 0;i < game.u.normal.length;i++) {
        let row = row_template.cloneNode();
        for(j = 0;j < game.u.normal[i].length;j++) {
            let elem = elem_template.cloneNode(),button = button_template.cloneNode(),span = span_template.cloneNode(),br = document.createElement("br");
            span.id = `nut${i+1}${j+1}`;button.id = `nub${i+1}${j+1}`;
            button.classList.add("nub");
            button.setAttribute("onclick",`buyUp(${i},${j})`);
            elem.classList.add("nu")
            elem.id = `nu${i+1}${j+1}`;
            elem.style.top = "30px";
            elem.appendChild(span);
            elem.appendChild(br);
            elem.appendChild(button);
            row.appendChild(elem);
        }
        tbody.appendChild(row);
    }
    table.appendChild(tbody);
    target_div.appendChild(table);
}