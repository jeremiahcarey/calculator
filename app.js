const numBtns = document.querySelectorAll('.num-buttons');
const allBtns = document.querySelectorAll('.buttons');
const display = document.querySelector('#display-value');
const clearBtn = document.querySelector('#clear-btn');
const negPosBtn = document.querySelector('#neg-pos-btn');
const delBtn = document.querySelector('#del-btn');
const decBtn = document.querySelector('#decimal');
const operatorBtns = document.querySelectorAll('.operator-btns');
const equalsBtn = document.querySelector('#equals');
const opDisplay = document.querySelector('#display-operator');

let displayValue = '0';
let currentOperator;
let operatorPressed = false;
let newDisplay = false;
let num1;
let num2;


function add(num1, num2) {
    return num1 + num2;
};

function subtract(num1, num2) {
    return num1 - num2;
};

function multiply(num1, num2) {
    return num1 * num2;
};

function divide(num1, num2) {
    return num1 / num2;
};

function operate(num1, num2, operator) {
    let result;
    if (operator === 'add') {
        result = add(num1, num2);
    } else if (operator === 'subtract') {
        result = subtract(num1, num2);
    } else if (operator === 'multiply') {
        result = multiply(num1, num2);
    } else if (operator === 'divide' && num2 !== 0) {
        result = divide(num1, num2);
    } else {
        return 'Error';
    };
    const displayResult = parseFloat(result.toFixed(2)).toString();
    if (displayResult.length > 9) {
        return 'Error';
    } else {
        return displayResult;
    };
};


function updateDisplay() {
    display.innerText = displayValue;
};

function startOperate() {
    num2 = parseFloat(displayValue);
    displayValue = operate(num1, num2, currentOperator);
    updateDisplay();
    newDisplay = true;
};


operatorBtns.forEach(button => button.addEventListener('click', function (e) {
    if (operatorPressed === true) {
        startOperate();
    }
    num1 = parseFloat(displayValue);
    if (e.target.id === 'divide-btn') {
        currentOperator = 'divide';
        operatorPressed = true;
        newDisplay = true;
        opDisplay.innerText = '÷';
    } else if (e.target.id === 'multiply-btn') {
        currentOperator = 'multiply';
        operatorPressed = true;
        newDisplay = true;
        opDisplay.innerText = 'x';
    } else if (e.target.id === 'minus-btn') {
        currentOperator = 'subtract';
        operatorPressed = true;
        newDisplay = true;
        opDisplay.innerText = '-';
    } else if (e.target.id === 'plus-btn') {
        currentOperator = 'add';
        operatorPressed = true;
        newDisplay = true;
        opDisplay.innerText = '+';
    }
}));

numBtns.forEach(button => button.addEventListener('click', function (e) {
    if (newDisplay === true || displayValue === '0') {
        displayValue = e.target.innerText;
        updateDisplay();
        newDisplay = false;
    } else if (displayValue.length <= 9) {
        displayValue += e.target.innerText;
        updateDisplay();
    }
}));

decBtn.addEventListener('click', function () {
    if (newDisplay === false && !displayValue.includes('.')) {
        displayValue += '.';
        updateDisplay();
    }
});

negPosBtn.addEventListener('click', function () {
    if (displayValue[0] === '-') {
        displayValue = displayValue.replace('-', '');
        updateDisplay();
    } else if (displayValue !== '0') {
        displayValue = '-' + displayValue;
        updateDisplay();
    }
});

clearBtn.addEventListener('click', function () {
    displayValue = '0';
    operatorPressed = false;
    newDisplay = false;
    updateDisplay();
    num1 = '0';
    num2 = '0';
    opDisplay.innerText = '';
});

delBtn.addEventListener('click', function () {
    if (newDisplay === true) {
        return;
    } else if (displayValue !== '0' && displayValue.length > 1) {
        displayValue = displayValue.slice(0, -1);
        updateDisplay();
    } else if (displayValue !== '0' && displayValue.length === 1) {
        displayValue = '0';
        updateDisplay();
    }
});


equalsBtn.addEventListener('click', function () {
    if (operatorPressed === true) {
        operatorPressed = false;
        startOperate();
        opDisplay.innerText = '';
    }
});

// keyboard support added

document.addEventListener('keydown', function (e) {
    const nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const operators = ['-', '+', '*', '/'];
    if (nums.includes(e.key)) {
        if (newDisplay === true || displayValue === '0') {
            displayValue = e.key;
            updateDisplay();
            newDisplay = false;
        } else if (displayValue.length <= 9) {
            displayValue += e.key;
            updateDisplay();
        };
    } else if (operators.includes(e.key)) {
        if (operatorPressed === true) {
            startOperate();
        }
        num1 = parseFloat(displayValue);
        if (e.key === '+') {
            currentOperator = 'add';
            operatorPressed = true;
            newDisplay = true;
            opDisplay.innerText = '+';
        } else if (e.key === '-') {
            currentOperator = 'subtract';
            operatorPressed = true;
            newDisplay = true;
            opDisplay.innerText = '-';
        } else if (e.key === '/') {
            currentOperator = 'divide';
            operatorPressed = true;
            newDisplay = true;
            opDisplay.innerText = '÷';
        } else if (e.key === '*') {
            currentOperator = 'multiply';
            operatorPressed = true;
            newDisplay = true;
            opDisplay.innerText = 'x';
        };
    } else if (e.key === '.') {
        if (newDisplay === false && !displayValue.includes('.')) {
            displayValue += '.';
            updateDisplay();
        };
    } else if (e.key === 'Backspace') {
        if (newDisplay === true) {
            return;
        } else if (displayValue !== '0' && displayValue.length > 1) {
            displayValue = displayValue.slice(0, -1);
            updateDisplay();
        } else if (displayValue !== '0' && displayValue.length === 1) {
            displayValue = '0';
            updateDisplay();
        }
    } else if (e.key === '=') {
        if (operatorPressed === true) {
            operatorPressed = false;
            startOperate();
            opDisplay.innerText = '';
        }
    };
});