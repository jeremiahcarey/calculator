const numBtns = document.querySelectorAll('.num-buttons');
const allBtns = document.querySelectorAll('.buttons');
const display = document.querySelector('#display-value');
const clearBtn = document.querySelector('#clear-btn');
const negPosBtn = document.querySelector('#neg-pos-btn');
const delBtn = document.querySelector('#del-btn');
const decBtn = document.querySelector('#decimal');
const operatorBtns = document.querySelectorAll('.operator-btns');
const equalsBtn = document.querySelector('#equals');

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
        console.log('Error');
    }
    const displayResult = parseFloat(result.toFixed(3)).toString();
    return displayResult;
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
    } else if (e.target.id === 'multiply-btn') {
        currentOperator = 'multiply';
        operatorPressed = true;
        newDisplay = true;
    } else if (e.target.id === 'minus-btn') {
        currentOperator = 'subtract';
        operatorPressed = true;
        newDisplay = true;
    } else if (e.target.id === 'plus-btn') {
        currentOperator = 'add';
        operatorPressed = true;
        newDisplay = true;
    }
}));

numBtns.forEach(button => button.addEventListener('click', function (e) {
    if (newDisplay === true) {
        displayValue = e.target.innerText;
        updateDisplay();
        newDisplay = false;
        // not sure if I need the below
    } else if (displayValue === '0') {
        displayValue = e.target.innerText;
        updateDisplay();
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
    operatorPressed = false;
    startOperate();
})

