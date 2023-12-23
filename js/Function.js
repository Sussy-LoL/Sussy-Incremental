function buyGe(n = 0) {
    let x = document.getElementById("g"+(n+1)+"b");
    if(!x.disabled) {
        if(!hasUp(0,2)) game.sus = game.sus.sub(game.Ge[n][4]);
        game.Ge[n][1] = game.Ge[n][1].add(new EN(1));
        game.Ge[n][2] = game.Ge[n][2].add(new EN(1));
    }
}
function buyMaxGe(n = 0) {
    let x = document.getElementById("g"+(n+1)+"b");
    if(!x.disabled) {
        let time = EN.floor(EN.div(game.sus,game.Ge[n][4]));
        if(!hasUp(0,2)) game.sus = game.sus.sub(EN.mul(game.Ge[n][4],time));
        game.Ge[n][1] = game.Ge[n][1].add(time);
        game.Ge[n][2] = game.Ge[n][2].add(time);
    }
}
function buyMaxAll() {
    let i;
    let s = 0;
    for(i = 0;i < game.Ge.length;i++) {
        if(game.Ge[i][5]) s++;
    }
    for(i = s-1;i >= 0;i--) {
        buyMaxGe(i);
    }
}
function getGe() {
    let i;
    let s = 0;
    for(i = 0;i < game.Ge.length;i++) {
        if(game.Ge[i][5]) s++;
    }
    for(i = 0;i < s;i++) {
        let base = EN.floor(EN.div(game.Ge[i][2],new EN(10)));
        game.Ge[i][3] = EN.add(EN.mul(2,base),1);
        if(hasUp(0,0)) game.Ge[i][3] = EN.pow(new EN(1.0001),base);
        //game.Ge[i][3] = EN.pow(2,base);
        if(i == 0) game.sus = game.sus.add(game.Ge[i][2].mul(game.Ge[i][3]));
        else game.Ge[i-1][2] = game.Ge[i-1][2].add(game.Ge[i][2].mul(game.Ge[i][3]));
    }
}
function buyUp(row = 0,n = 0) {
    let l = (n*2)+1;
    let cost = game.u[row][(l-1)];
    let lock = game.u[row][l];
    if(game.sus.gte(cost) && !hasUp(row,n)) {
        game.u[row][l] = !lock;
        game.sus = game.sus.sub(cost);
    }
    if(debuging) console.log("value: " + l + " " + cost.toString() + " " + lock + " " + hasUp(row,n));
}
function hasUp(row = 0,n = 0) {
    return game.u[row][(n*2)+1];
}
function autoGe() {
    setInterval("buyMaxAll()",25);
}
var autoB14;
function checkAB() {
    if(hasUp(0,1) && autoB14 == undefined) autoB14 = autoGe();
    else if(!hasUp(0,1)) autoB14 = undefined; 
}