

const sevenBtn = document.getElementById("7");
//const sevenValue = parseFloat(document.getElementById("7-text").textContent);
const eightBtn = document.getElementById("8");
//const eightValue = parseFloat(document.getElementById("8-text").textContent);
const nineBtn = document.getElementById("9");
//const nineValue = parseFloat(document.getElementById("9-text").textContent);
const fourBtn = document.getElementById("4");
//const fourValue = parseFloat(document.getElementById("4-text").textContent);
const fiveBtn = document.getElementById("5");
//const fiveValue = parseFloat(document.getElementById("5-text").textContent);
const sixBtn = document.getElementById("6");
//const sixValue = parseFloat(document.getElementById("6-text").textContent);
const oneBtn = document.getElementById("1");
//const oneValue = parseFloat(document.getElementById("1-text").textContent);
const twoBtn= document.getElementById("2");
//const twoValue = parseFloat(document.getElementById("2-text").textContent);
const threeBtn = document.getElementById("3");
//const threeValue = parseFloat(document.getElementById("3-text").textContent);
const zeroBtn = document.getElementById("0");
//const zeroValue = parseFloat(document.getElementById("0-text").textContent);
const commaBtn = document.getElementById("comma");
const resultBtn = document.getElementById("result");
const clearBtn = document.getElementById("clear");
const sumBtn = document.getElementById("sum");
const subtractBtn = document.getElementById("subtract");
const multiplyBtn = document.getElementById("multiply");
const divideBtn = document.getElementById("divide");
const percentageBtn = document.getElementById("percentage");
const backspaceBtn = document.getElementById("backspace");


const calculator = {
  displayValue: '0',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;
  
  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    // Overwrite `displayValue` if the current value is '0' otherwise append to it
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }
  
  console.log(calculator);
}

function inputDecimal(dot) {
  if (calculator.waitingForSecondOperand === true) {
  	calculator.displayValue = '0.'
    calculator.waitingForSecondOperand = false;
    return
  }
  // If the `displayValue` property does not contain a decimal point
  if (!calculator.displayValue.includes(dot)) {
    // Append the decimal point
    calculator.displayValue += dot;
  }
}

function handleOperator(nextOperator) {
  // Destructure the properties on the calculator object
  const { firstOperand, displayValue, operator } = calculator
  // `parseFloat` converts the string contents of `displayValue`
  // to a floating-point number
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    console.log(calculator);
    return;
  }
  // verify that `firstOperand` is null and that the `inputValue`
  // is not a `NaN` value
  if (firstOperand === null && !isNaN(inputValue)) {
    // Update the firstOperand property
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);

    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
  console.log(calculator);
}

function calculate(firstOperand, secondOperand, operator) {
  if (operator === '+') {
    return firstOperand + secondOperand;
  } else if (operator === '-') {
    return firstOperand - secondOperand;
  } else if (operator === '×') {
    return firstOperand * secondOperand;
  } else if (operator === '÷') {
    return firstOperand / secondOperand;
  } else if (operator === '%') {
    return firstOperand + (secondOperand/100);
  }

  return secondOperand;
}

function resetCalculator() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  console.log(calculator);
}


function updateDisplay() {
  const resultDisplay = document.getElementById("result-display");
  resultDisplay.value = calculator.displayValue;
}

updateDisplay();

const keys = document.getElementById('keys-container-grid');
keys.addEventListener('click', (event) => {
  // Access the clicked element
  const { target } = event;

  // Check if the clicked element is a button.
  // If not, exit from the function
  if ( !target.matches('button')){
    return;
  } 

  if (target.classList.contains('operator')) {
    handleOperator(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains('decimal')) {
    inputDecimal(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains('all-clear')) {
    resetCalculator();
    updateDisplay();
    return;
  }

    inputDigit(target.value);
    updateDisplay();
});
//function eraseLastNum () {
//  resultDisplay.textContent = resultDisplay.textContent.slice(0, -1);
//}

//function clickNumButton (clickedId) {
//  resultDisplay.textContent += clickedId;
//  console.log(parseFloat(clickedId));
//}

//function commaPress () {
//  resultDisplay.textContent += ",";
//}