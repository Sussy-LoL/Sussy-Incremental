var EN = ExpantaNum; //为什么不用const? --var颜色更好看
const changelog = '懒得写'
const fgame = {
    sus: new EN(10),
    firstUpdate: 0,
    lastUpdate: 0,
    automation: {
        unlock: false,
        autobuyer: new EN(0),
        count: new EN(0),
    },
    Ge: {
        normal: [
            [new EN(0),new EN(0),new EN(1),new EN(10),true], // 0购买数量 1数量 2倍数 3价格 4解锁
            [new EN(0),new EN(0),new EN(1),new EN(1e20),true],
            [new EN(0),new EN(0),new EN(1),new EN("ee500"),true],
            [new EN(0),new EN(0),new EN(1),new EN("10^^200"),true],
        ],
        auto: [
            [new EN(0),new EN(0),new EN(1),new EN(10),true],
        ]
    },
    u: {
        normal: [
            [false,false,false],
            [false,false,false],
        ]
    },
    achivment: {
        normal: [
            [false,false,false,false,false],
            [false],
        ],
        secret: [],
    },
    version: "0.37",
};
const dcgame = {
    automation: {
    },
    Ge: {
        normal: ["第一生成器","第二生成器","第三生成器","第四生成器",],
        auto: ["第一自动购买器生成器"],
    },
    u: {
        normal: {
            name: [
                ["把乘数变为1.0001^base","解锁自动购买器","购买生成器无消耗"],
                ["错误"]
            ],
            cost: [
                [new EN("e1e20"),new EN("e1e200"),new EN("10^^1000"),],
                [new EN("e1e20"),new EN("e1e200"),new EN("10^^1000"),],
            ]
        },
        
    },
    achivment : {
        normal: [
            ["开始这个游戏","这个增长速度有点快","第一个升级","购买自动购买器","不消耗?听起来很酷",],
            ["错误"],
        ]
    }
}






/* //屎山
Object.freeze(fgame);
    Object.freeze(fgame.automation);
    Object.freeze(fgame.Ge);
        Object.freeze(fgame.Ge.auto);
        Object.freeze(fgame.Ge.normal);
    Object.freeze(fgame.u);
        Object.freeze(fgame.u.normal);
    Object.freeze(fgame.achivment);
        Object.freeze(fgame.achivment.normal);
        Object.freeze(fgame.achivment.secret);
Object.freeze(dcgame);
    Object.freeze(dcgame.automation);
    Object.freeze(dcgame.Ge);
        Object.freeze(dcgame.Ge.normal);
        Object.freeze(dcgame.Ge.auto);
    Object.freeze(dcgame.u);
        Object.freeze(dcgame.u.normal);
            Object.freeze(dcgame.u.normal.name);
            Object.freeze(dcgame.u.normal.cost);
    Object.freeze(dcgame.achivment);
        Object.freeze(dcgame.achivment.normal);
*/