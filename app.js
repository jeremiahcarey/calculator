const numBtns = document.querySelectorAll('.num-buttons');
const allBtns = document.querySelectorAll('.buttons');

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(num1, num2, operator) {
    let result;
    if (operator === 'add') {
        result = add(num1, num2);
    } else if (operator === 'subtract') {
        result = subtract(num1, num2);
    } else if (operator === 'multiply') {
        result = multiply(num1, num2);
    } else if (operator === 'divide') {
        result = divide(num1, num2);
    } else {
        console.log('Error');
    }
    return result;
}

function btnUp() {
    allBtns.forEach(button => button.classList.remove('button-pressed'));;
}

numBtns.forEach(button => button.addEventListener('click', function (e) {
    const btn = e.target;
    btn.classList.add('button-pressed');
    const unpress = setTimeout(btnUp, 75);
}));

