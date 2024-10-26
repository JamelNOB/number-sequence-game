const startButton = document.getElementById('startButton');
const coverButton = document.getElementById('coverButton');
const restartButton = document.getElementById('restartButton');
const gameBoard = document.getElementById('gameBoard');
const timerDisplay = document.getElementById('timer');
const backgroundMusic = document.getElementById('backgroundMusic');
const correctSound = document.getElementById('correctSound');
const wrongSound = document.getElementById('wrongSound');
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let shuffledNumbers = [];
let nextNumber = 1;  // 玩家要点击的下一个数字
let startTime, interval;

// 页面加载时，初始化按钮状态
window.onload = function() {
    startButton.disabled = false;
    coverButton.disabled = true;
    restartButton.disabled = true;
}

// 随机打乱数组
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// 初始化游戏
function initGame() {
    nextNumber = 1;  // 重置下一个要点击的数字
    shuffledNumbers = [...numbers];  // 复制数组
    shuffle(shuffledNumbers);  // 打乱数字

    // 初始化游戏界面
    gameBoard.innerHTML = '';
    shuffledNumbers.forEach(num => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.textContent = num;
        gameBoard.appendChild(cell);
    });

    // 显示遮蔽按钮，隐藏重启按钮
    coverButton.disabled = false;
    restartButton.disabled = true;

    // 开始计时
    startTime = Date.now();
    interval = setInterval(() => {
        const elapsedTime = (Date.now() - startTime) / 1000;
        timerDisplay.textContent = `Time: ${elapsedTime.toFixed(2)}s`;
    }, 100);

    // 播放背景音乐
    backgroundMusic.play();
}

// 点击遮蔽按钮后，隐藏所有数字，开始游戏
coverButton.addEventListener('click', function() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.classList.add('hidden');  // 遮蔽数字
        cell.addEventListener('click', function() {
            if (parseInt(cell.textContent) === nextNumber) {
                correctSound.play();  // 播放正确音效
                cell.classList.remove('hidden');  // 显示正确数字
                nextNumber++;  // 更新为下一个数字

                if (nextNumber > 9) {
                    setTimeout(() => {
                        clearInterval(interval);  // 停止计时
                        const displayedTime = timerDisplay.textContent;  // 获取显示的时间
                        alert(`You completed the game in ${displayedTime}!`);
                        restartButton.disabled = false;  // 显示重启按钮
                    }, 100);
                }
            } else {
                wrongSound.play();  // 播放错误音效
            }
        });
    });

    // 隐藏遮蔽按钮
    coverButton.disabled = true;
});

// 开始游戏按钮
startButton.addEventListener('click', function() {
    initGame();  // 初始化游戏
    startButton.disabled = true;  // 禁用开始按钮
});

// 重启按钮点击事件
restartButton.addEventListener('click', function() {
    clearInterval(interval);  // 停止计时
    timerDisplay.textContent = 'Time: 0s';  // 重置计时器
    startButton.disabled = false;  // 重新启用开始按钮
    backgroundMusic.pause();  // 停止背景音乐
    backgroundMusic.currentTime = 0;  // 将音乐回到开头
    gameBoard.innerHTML = '';  // 清空游戏板
    restartButton.disabled = true;  // 隐藏重启按钮
});
