'use strict';

const playerClass = ' divPlayer', partsClass = ' divPart', coinClass = ' divCoin';
var playerInterval, player, coinCoordinates, checkCount = 15;
let innerDivs = [], playerParts = [], speed = 100;
const txtScore = document.getElementById('txtScore');
let direction;

function clear() {
    innerDivs.forEach(row => { row.divs.forEach(col => { col.parentNode.removeChild(col); }); });
    Array.from(document.getElementsByClassName('divRow')).forEach(row => { row.parentNode.removeChild(row); });
    innerDivs = [];
    playerParts = [];
}

function startUp(count = checkCount) {
    clearInterval(playerInterval);
    clear();
    txtScore.innerText = playerParts.length;
    checkCount = count;
    for (let i = 0; i < checkCount; i++) {
        let colDivs = [];
        let divRow = document.createElement('div');
        divRow.className = 'divRow';
        document.getElementById('game').appendChild(divRow);
        for (let j = 0; j < checkCount; j++) {
            let divCol = document.createElement('div');
            divCol.className = 'divCol';
            divCol.title = `${i}, ${j}`;
            divRow.appendChild(divCol);
            colDivs.push(divCol);
        }
        innerDivs[i] = { row: i, divs: colDivs };
    }

    innerDivs[Math.floor(checkCount / 2)].divs[Math.floor(checkCount / 2)].className += playerClass;
    generateCoin();
}

function keyDetect() {
    switch (event.key.toLowerCase()) {
        case 'a':
            clearInterval(playerInterval);
            playerInterval = setInterval(() => { playerMovement('left') }, speed);
            break;
        case 'd':
            clearInterval(playerInterval);
            playerInterval = setInterval(() => { playerMovement('right') }, speed);
            break;
        case 'w':
            clearInterval(playerInterval);
            playerInterval = setInterval(() => { playerMovement('top') }, speed);
            break;
        case 's':
            clearInterval(playerInterval);
            playerInterval = setInterval(() => { playerMovement('bottom') }, speed);
            break;
        case 'r':
            startUp();
            break;
        default:
            break;
    }
}

function playerMovement(direction) {
    let row = getCoordinates().row, col = getCoordinates().col;
    getPlayer().className = getPlayer().className.replace(playerClass, '');

    switch (direction) {
        case 'left':
            if (col === 0) {
                col = innerDivs.length;
            }
            col--;
            innerDivs[row].divs[col].className += playerClass;
            break;
        case 'right':
            if (col === innerDivs.length - 1) {
                col = -1;
            }
            col++;
            innerDivs[row].divs[col].className +=  playerClass;
            break;
        case 'top':
            if (row === 0) {
                row = innerDivs[0].divs.length;
            }
            row--;
            innerDivs[row].divs[col].className += playerClass;
            break;
        case 'bottom':
            if (row === innerDivs[0].divs.length - 1) {
                row = -1;
            }
            row++;
            innerDivs[row].divs[col].className += playerClass;
            break;
        default:
            break;
    }

    if (playerParts.length > 0) {
            partMovement(direction);    
    }

    if (getCoordinates().row == coinCoordinates.posY && getCoordinates().col == coinCoordinates.posX) {
        innerDivs[coinCoordinates.posY].divs[coinCoordinates.posX].className = innerDivs[coinCoordinates.posY].divs[coinCoordinates.posX].className.replace(coinClass);
        generateCoin();
        expandPlayer(direction);
        txtScore.innerText = playerParts.length;
    }

    if (innerDivs[getCoordinates().row].divs[getCoordinates().col].className.includes(partsClass)) {
        gameOver()
    }
}

function partMovement(direction) {
    playerParts.forEach (
        (p, i) => {
                p.className.replace(partsClass, '');
                if (i == 0) {
                expandPlayer(direction);
            }
          });
    playerParts[0].className = playerParts[0].className.replace(partsClass, '');
    playerParts.shift();
}

function expandPlayer(direction) {
    let newPart;
    switch(direction) {
        case 'left':
            newPart = innerDivs[getCoordinates().row].divs[getCoordinates().col + 1 > innerDivs.length - 1 ? 0 : getCoordinates().col + 1];
            break;
        case 'right':
            newPart = innerDivs[getCoordinates().row].divs[getCoordinates().col - 1 < 0 ? innerDivs.length - 1 : getCoordinates().col - 1];
            break;
        case 'top':
            newPart = innerDivs[getCoordinates().row + 1 > innerDivs.length - 1 ? 0 : getCoordinates().row + 1].divs[getCoordinates().col];
            break;
        case 'bottom':
            newPart = innerDivs[getCoordinates().row - 1 < 0 ? innerDivs.length - 1 : getCoordinates().row - 1].divs[getCoordinates().col];
            break;
    }
    newPart.className += partsClass
    playerParts.push(newPart);
}

function getPlayer() {
    for (const i of innerDivs) {
        let curDiv = i.divs.find(x => { return x.className.includes(playerClass); });
        if (curDiv !== undefined) {
            return curDiv;
        }
    }
}

function getCoordinates() {
    for (const d of innerDivs) {
        let divCol = d.divs.findIndex(x => { return x.className.includes(playerClass); });
        if (divCol !== -1) {
            let obj = { row: innerDivs.indexOf(d), col: divCol };
            let x = [innerDivs.indexOf(d), divCol];
            return obj;
        }
    }
}

function generateCoin() {
    do { var x = Math.floor(Math.random() * checkCount); var y = Math.floor(Math.random() * checkCount); } while (x == getCoordinates().col && y == getCoordinates().row);

    coinCoordinates = { posY: y, posX: x };
    innerDivs[coinCoordinates.posY].divs[coinCoordinates.posX].className += ' ' + coinClass;
}

function gameOver() {
    startUp(checkCount);
    console.error('You Lose!');
}