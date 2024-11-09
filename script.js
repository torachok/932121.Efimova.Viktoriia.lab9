let display = document.getElementById('display');
let expression = '';


function appendToDisplay(value) {

    const lastChar = expression[expression.length - 1];
    const lastChar3 = expression[expression.length - 3];
    const parts = expression.trim().split(' ');

    if(value === '0' && lastChar === '0' && !(parts[parts.length - 1].includes('.'))&& (parts[parts.length - 1][0] === '0'))return;

    if(parts[parts.length - 1][0]=== '0' && parts[parts.length - 1].length===1 && value!=='.') {
        expression = expression.slice(0, -1) + value; 
        updateDisplay();
        return;
    }

    if(value === '.'){
        if (lastChar === '.')return;
        if(parts[parts.length - 1].includes('.'))return;
    }

    if (lastChar === '-' && ((lastChar3 === '*' || lastChar3 === '/') || expression.length === 1)) {
        expression += value;
    } else if ('*/+-'.includes(lastChar)) {
        expression += ' ' + value;
    } else {
        expression += value;
    }
    updateDisplay();
}

function appendToDisplayOper(value) {

    const lastChar = expression[expression.length - 1];
    const lastChar3 = expression[expression.length - 3];
    
    if (expression.length === 0) {
        if (value === '-') {
            expression += value; 
            updateDisplay();
        }
        return;
    } 
    
    if ((lastChar3 === '*' || lastChar3 === '/') && ('*/+-'.includes(lastChar))) {
        if (value !== '-') {
            expression = expression.slice(0, -3) + value; 
            updateDisplay();
        }
        return;
    }
    
    if ('*/+-'.includes(lastChar)) {
        if (value === '-' && (lastChar === '*' || lastChar === '/')) {
            expression += ' ' + value; 
        } else {
            expression = expression.slice(0, -1) + value; 
        }
        updateDisplay();
        return;
    }
    
    expression += ' ' + value; 
    updateDisplay();
}

function clearDisplay() {
    expression = '';
    display.innerHTML = '';
}

function removeLast() {
    expression = expression.slice(0, -1);
    while (expression.endsWith(' ')) {
        expression = expression.slice(0, -1);
    }
    updateDisplay();
}

function calculateResult() {
    while (expression.endsWith(' ') || expression.endsWith('+') || expression.endsWith('-') || expression.endsWith('*') || expression.endsWith('/')) {
        expression = expression.slice(0, -1);
    }

    const divisionByZeroPattern = /\/\s*[.\s]*0/; 
    if (divisionByZeroPattern.test(expression)) {
        display.innerHTML = '<span style="color: gray;"> Ошибка </span>';
        expression = ''; 
        return;
    }

    if(expression.length>0) { 
        let result = eval(expression.replace(/\s+/g, '')); 
        result = Math.round(result * 100000) / 100000; 
        display.innerHTML = `<span style="color: black;">${result}</span>`; 
        expression = result.toString(); 
    }
}

function updateDisplay() {
    const parts = expression.split(' ').map((part, index) => {
        return `<span style="color: ${index === expression.split(' ').length - 1 ? 'black' : 'gray'};">${part}</span>`;
    });
    display.innerHTML = parts.join(' '); 
}