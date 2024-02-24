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
    choclate: {
        unlock: false,
        choc: new EN(0),
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
            [new EN(0),new EN(0),new EN(1),new EN(10),true], // 0购买数量 1数量 2倍数 3价格 4解锁
            [new EN(0),new EN(0),new EN(1),new EN(1e20),true],
            [new EN(0),new EN(0),new EN(1),new EN("ee500"),true],
            [new EN(0),new EN(0),new EN(1),new EN("10^^200"),true],
        ]
    },
    u: {
        normal: [
            [false,false,false,],
            [false,false,false,],
        ]
    },
    achivment: {
        normal: [
            [false,false,false,false,false,false,false,false,],
            [false,false],
        ],
        secret: [],
    },
    version: "0.39",
};
const dcgame = {
    automation: {
    },
    Ge: {
        normal: ["第一生成器","第二生成器","第三生成器","第四生成器",],
        auto: ["第一自动购买器生成器","第二自动购买器生成器","第三自动购买器生成器","第四自动购买器生成器",],
    },
    u: {
        normal: {
            name: [
                ["把乘数变为1.0001^base","解锁自动购买器","购买生成器无消耗"],
                ["购买自动生成器无消耗","自动购买器生成器乘数变为1.00000001^base","错误"]
            ],
            cost: [
                [new EN("e1e20"),new EN("e1e200"),new EN("10^^1000"),],
                [new EN(10).arrow(2)(new EN(10).pow(10)),new EN(10).arrow(2)(new EN(10).pow(100)),new EN("NaN"),],
            ]
        },
        
    },
    achivment : {
        normal: {
            name: [
                ["开始这个游戏","这个增长速度有点快","第一个升级","购买自动购买器","不消耗?听起来很酷","这个自动购买器有点强","强过头了","作者显然不会做平衡",],
                ["巧克力!好吃吗","错误"],
            ],
            tooltip: [
                ["开始游戏","获得1e5000嫌疑","购买第一个普通升级","购买第二个普通升级","购买第三个普通升级","购买一个自动购买器","拥有大于等于114514的自动购买器","购买位于(2,2)的普通升级",],
                ["获得至少一个巧克力","错误"],
            ]
        }
    }
}