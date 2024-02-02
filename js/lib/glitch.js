//--------------------------------------------------------------------
// Created by wikidot user JoanHax and licensed under CC BY-SA 3.0
// Originally hosted here: http://scp-sandbox-3.wikidot.com/jaonhax
//--------------------------------------------------------------------
var obfuData = {
    "delay":0,
    "start_time":40,
    "end_time":40,
    "disp_time":2000,
    "obfu_chars":"�æ–‡åŒãÃƒÆ’¢â‚¬Å¡€šÂ£ÌÉÏÔËÁÆá ÖóÞ¢ñë╟╨╬╥▐п╠▀šðèæ����¶rg¥s∂в√•»¿Ø§",
    "phrases":[
      '错误',
      '致命错误',
      '请通知管理员',
      '未找到目标文本',
    ]
};

const delay = obfuData.delay
const start_time = obfuData.start_time
const end_time = obfuData.end_time
const disp_time = obfuData.disp_time
const obfu_chars = obfuData.obfu_chars
const phrases = obfuData.phrases

var glist = [];
const TextScramble = (function() {
  const chars = obfu_chars;
  let queue = [];
  
  function startScramble(el = Element) {
    if(el.hasAttribute("glitch")) return;
    else el.setAttribute("glitch","1");
    const OriginText = el.innerText;
    let counter = 0;
    let click = el.hasAttribute("onclick");
    if(click) el.disabled = true;
      const update = () => {
        let output = ''
        let complete = 0
        for (let i = 0, n = queue.length; i < n; i++) {
          let { from, to, start, end, char } = queue[i]
          if (frame >= end) {
            complete++
            output += to
          } else if (frame >= start) {
            if (!char || Math.random() < 0.28) {
              char = randomChar()
              queue[i].char = char
            }
            output += char
          } else {
            output += from
          }
        }
        el.innerHTML = output
        if (complete === queue.length) {
          this.resolve()
        } else {
          frameRequest = requestAnimationFrame(update)
          frame++
        }
      }

      let frameRequest = requestAnimationFrame(update)

      const setText = (newText) => {
        const oldText = el.innerText
        const length = Math.max(oldText.length, newText.length)
        const promise = new Promise((resolve) => this.resolve = resolve)
        queue = []
        for (let i = 0; i < length; i++) {
          const from = oldText[i] || ''
          const to = newText[i] || ''
          const start = Math.floor(Math.random() * start_time)
          const end = start + Math.floor(Math.random() * end_time)
          queue.push({ from, to, start, end })
        }
        cancelAnimationFrame(frameRequest)
        frame = 0
        update()
        return promise
      }

    
    const randomChar = () => {
      return chars[Math.floor(Math.random() * chars.length)]
    }
    const next = () => {
      setText(phrases[counter]).then(() => {
        setTimeout(next, disp_time)
      })
      if(debuging) console.log(el + "在change")
      if (counter <= phrases.length) {
        counter = (counter + 1) % phrases.length;
      }
      if(glist.indexOf(el) == -1) {
        if(debuging) console.log(el + "不再是glitch的了")
        clearTimeout(a);
        el.removeAttribute("glitch");
        if(click) el.disabled = false;
        setText(OriginText).then(() => {return;})
      }
    }
    const a = setTimeout(next(), delay);
    
  }
  return {
    Scramble: (el = Element) => startScramble(el)
  }
}())

function checkGlitch() {
  let a = document.getElementsByClassName("glitch");
  let oldlist = glist;
  glist = [...a];
  for(let i = 0;i < a.length;i++) {
    if(oldlist.indexOf(glist[i]) == -1) TextScramble.Scramble(glist[i]);
  }
}