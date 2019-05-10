'use strict'

const playerName = 'divPlayer';
var movementInterval;
let innerDivs = [];
let player;

function startUp(count) {
    for (let i = 0; i < count; i++) {
        let colDivs = [];
        let divRow = document.createElement('div');
        divRow.className = 'divRow';
        document.getElementById('game').appendChild(divRow);
        for (let j = 0; j < count; j++) {
            let divCol = document.createElement('div');
            divCol.className = 'divCol';
            divCol.title = `${i}, ${j}`;
            divRow.appendChild(divCol);
            colDivs.push(divCol);
        }
        innerDivs[i] = {row: i, divs: colDivs};
    }
    
    innerDivs[Math.floor(count / 2)].divs[Math.floor(count / 2)].className += ' ' + playerName;
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
    getPlayer().className = getPlayer().className.replace(playerName, '');

    switch (direction) {
        case 'left':    
            if (col == 0) {
                col = innerDivs.length;
            }
            col--;
            innerDivs[row].divs[col].className += ' ' + playerName;
            break;
        case 'right':
            if (col == innerDivs.length - 1) {
                col = -1;
            }
            col++;
            innerDivs[row].divs[col].className += ' ' + playerName;
            break;
        case 'top':
            if (row == 0) {
                row = innerDivs[0].divs.length;
            } 
            row--;
            innerDivs[row].divs[col].className += ' ' + playerName;
            break;
        case 'bottom':
            if (row == innerDivs[0].divs.length - 1) {
                row = -1;
            }
            row++;
            innerDivs[row].divs[col].className += ' ' + playerName;
            break;
        default:
            break;
    }

    console.log(getCoordinates());
}

function getPlayer() {
    for (const i of innerDivs) {
        let curDiv = i.divs.find(x => { return x.className.includes(playerName); });
        if (curDiv !== undefined) {
           return curDiv;
       }
    }  
}

function getCoordinates() {
    for (const d of innerDivs) {
        let divCol = d.divs.findIndex(x => { return x.className.includes(playerName); });
        if (divCol !== -1) {
            return {row: innerDivs.indexOf(d), col: divCol};
        }
    }
}