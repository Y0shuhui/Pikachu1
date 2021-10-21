const string = `
.skin *{box-sizing: border-box;padding: 0;margin: 0;}
.skin {
    position: relative;
    background: #ffe600;
    height: 100vh; 
}
.nose {
    border:10px solid black;
    border-color: black transparent transparent transparent;
    width: 0px;
    height: 0px;
    position: relative;
    left: 50%;
    top: 190px;
    border-radius: 50%;
    margin-left: -10px;
    z-index: 2;
}
@keyframes wave {
    0%{
        transform: rotate(0deg);
    }
    33%{
        transform: rotate(5deg);
    }
    66%{
        transform: rotate(-5deg);
    }
    100%{
        transform: rotate(0deg);
    }
}
.nose:hover {
    animation: wave 300ms infinite linear;
}
.eye {
    border: 3px solid black;
    width: 64px;
    height: 64px;
    position: absolute;
    left: 50%;
    top: 150px;
    margin-left: -32px;
    background: #2e2e2e;
    border-radius: 50%;
    z-index: 2;
}
.eye.left {
    transform: translateX(-100px);
}
.eye.right {
    transform: translateX(100px);
}
.qiu {
    border: 1px solid white;
    background: white;
    width: 25px;
    height: 25px;
    left: 20px;
    top: 5px;
    position: absolute;
    margin-left: -10px;
    border-radius: 50%;
}
.mouth {
    width: 160px;
    height: 160px;
    position: absolute;
    left: 50%;
    top: 215px;
    margin-left: -80px;
}
.mouth .up {
    position: relative;
    top: -60px;
}
.mouth .up .lip{
    border: 3px solid black;
    background: #ffe600;
    height: 75px;
    width: 100px;
    border-radius: 60%;
    border-top-color: transparent;
    border-right-color: transparent;
    border-left-color: transparent;
    position: absolute;
    z-index: 1;
}
.mouth .up .lip.left {  
    transform: rotate(-10deg);
    right: 43.5%;
}
.mouth .up .lip.right {
    transform: rotate(10deg);
    left: 43.5%;
}
.mouth .down {
    height: 180px;
    position: absolute;
    top: -10px;
    width: 100%;
    overflow: hidden;
}
.mouth .down .yuan1 {
    border: 3.5px solid black;
    width: 100%;
    height: 1000px;
    position: absolute;
    bottom: 0;
    left: 0;
    border-radius: 60%;
    background: #9b000a;
    overflow: hidden;
}
.mouth .down .yuan1 .yuan2 {
    width: 180px;
    height: 300px;
    position: absolute;
    bottom: -160px;
    left: 50%;
    border-radius: 60%;
    margin-left: -90px;
    background: #ff485f;
}
.face {
    border: 3px solid black;
    width: 80px;
    height: 80px;
    position: absolute;
    left: 50%;
    top: 250px;
    margin-left: -40px;
    background: #fd0101;
    border-radius: 50%;
    z-index: 2;
}
.face > img {
    position: absolute;
    top: 50%;
    left: 50%;
}
.face.left {
    transform: translateX(-150px);
}
.face.left > img {
    transform: rotateY(180deg);
    transform-origin: 0 0;
}
.face.right {
    transform: translateX(150px);
}
`

const demo = document.querySelector('#demo')
const demo2 = document.querySelector('#demo2')

const player ={
    n: 1,
    time: 50,
    id: undefined,
    ui: {
        demo: document.querySelector('#demo'),
        demo2: document.querySelector('#demo2'),    
    },
    events: {
        '#btnSlow': 'slow',
        '#btnNormal': 'normal',
        '#btnFast': 'fast',
        '#btnPause': 'pause',
        '#btnPlay': 'play'
    },
    init: () => {
        player.ui.demo.innerText = string.substr(0,player.n)
        player.ui.demo2.innerHTML = string.substr(0,player.n)
        player.play()
        player.bindEvents()
    },    
    bindEvents: () => {
        for(let key in player.events) {
            if(player.events.hasOwnProperty(key)){
                const value = player.events[key]
                document.querySelector(key).onclick = player[value]
            }
        }
    },
    run: () => {
        player.n += 1
        if(player.n > string.length) {
            window.clearInterval(player.id)
            return
        }
        player.ui.demo.innerText = string.substr(0,player.n)
        player.ui.demo2.innerHTML = string.substr(0,player.n)
        player.ui.demo.scrollTop = player.ui.demo.scrollHeight
    },
    play: () => {
        player.id = setInterval(player.run, player.time)
    },
    pause: () => {
        window.clearInterval(player.id)
    },
    slow: () => {
        player.pause()
        player.time = 150
        player.play()
    },
    normal: () => {
        player.pause()
        player.time = 30
        player.play()
    },
    fast: () => {
        player.pause()
        player.time = 0
        player.play()
    }
}

player.init()