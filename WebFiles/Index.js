'use strict';

const playerClass = 'divPlayer', coinClass = 'divCoin';
var movementInterval, player, coinCoordinates, checkCount = 15;
let innerDivs = [];
const txtScore = document.getElementById('txtScore');

function clear() {
    innerDivs.forEach(row => { row.divs.forEach(col => { col.parentNode.removeChild(col); }); });
    Array.from(document.getElementsByClassName('divRow')).forEach(row => { row.parentNode.removeChild(row); });
    innerDivs = [];
}

function startUp(count) {
    clearInterval(movementInterval);
    txtScore.innerText = 0;
    checkCount = count;
    clear(); 
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
        innerDivs[i] = {row: i, divs: colDivs};
    }
    
    innerDivs[Math.floor(checkCount / 2)].divs[Math.floor(checkCount / 2)].className += ' ' + playerClass;
    generateCoin();
}
    
function keyDetect() {
    clearInterval(movementInterval);
    switch (event.key.toLowerCase()) {
        case 'a':
            movementInterval = setInterval(() => { playerMovement('left') }, 100);
            break;        
        case 'd':
            movementInterval = setInterval(() => { playerMovement('right') }, 100);
            break;        
        case 'w':
            movementInterval = setInterval(() => { playerMovement('top') }, 100);
            break;        
        case 's':
            movementInterval = setInterval(() => { playerMovement('bottom') }, 100);
            break;        
        default: 
            break;
    }
}

function playerMovement(direction) {
    let row = getCoordinates().row, col = getCoordinates().col;
    getPlayer().className = getPlayer().className.replace(playerClass, '').trim();

    switch (direction) {
        case 'left':    
            if (col === 0) {
                col = innerDivs.length;
            }
            col--;
            innerDivs[row].divs[col].className += ' ' + playerClass;
            break;
        case 'right':
            if (col === innerDivs.length - 1) {
                col = -1;
            }
            col++;
            innerDivs[row].divs[col].className += ' ' + playerClass;
            break;
        case 'top':
            if (row === 0) {
                row = innerDivs[0].divs.length;
            } 
            row--;
            innerDivs[row].divs[col].className += ' ' + playerClass;
            break;
        case 'bottom':
            if (row === innerDivs[0].divs.length - 1) {
                row = -1;
            }
            row++;
            innerDivs[row].divs[col].className += ' ' + playerClass;
            break;
        default:
            break;
    }

    if (getCoordinates().row == coinCoordinates.posY && getCoordinates().col == coinCoordinates.posX) {
        innerDivs[coinCoordinates.posY].divs[coinCoordinates.posX].className = innerDivs[coinCoordinates.posY].divs[coinCoordinates.posX].className.replace(coinClass).trim();
        generateCoin();
        txtScore.innerText = Number(txtScore.innerText) + 1;
    }

    console.log(getCoordinates());
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
            return {row: innerDivs.indexOf(d), col: divCol};
        }
    }
}

function generateCoin() {
    let arr = innerDivs[getCoordinates().row].divs.filter(p => { return p != getPlayer(); });
    
    do { var x = Math.floor(Math.random() * checkCount); } while(x == getCoordinates.col);
    do { var y = Math.floor(Math.random() * checkCount); } while(y == getCoordinates.row);
    
    coinCoordinates = { posY: y, posX: x };
    console.log(coinCoordinates);
    innerDivs[coinCoordinates.posY].divs[coinCoordinates.posX].className += ' ' + coinClass;
}