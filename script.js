let num1 = ''; 
let num2 = ''; 
let operator; 
let result = ''; 
let errorState = false; 


//Keyboard Support 
document.addEventListener("keydown", (e) => {
    e.preventDefault()
    let keyInput = e.key
    let regExp = /^[0-9()+\-*.\/]*$/

    if(e.key === '=' || e.key === 'Enter' || e.code === 'Space'){
        equals.click()
    }  else if (e.key === 'Backspace') {
        clearPrevBtn.click()
    }  else if (e.key === 'Escape'){
        allClearBtn.click()
    }  else if (e.key === '–'){
        signChange.click()
    }  else if(e.key === '.'){
        decimal.click()
    }  else if (regExp.test(keyInput)){
        document.querySelector(`button[value="${keyInput}"]`).click(); 
        document.querySelector(`button[value="${keyInput}"]`).active(); 
    }   else {
        return; 
    }   
    }
  ); 

//Buttons 

const buttons = document.querySelectorAll(".btn");
buttons.forEach((button) => 
    button.addEventListener("click", getInput));

const allClearBtn = document.querySelector("#allClear"); 
allClearBtn.addEventListener("click", allClear)

const clearPrevBtn = document.querySelector("#clearPrev"); 
clearPrevBtn.addEventListener("click", clearPrev)

const equals = document.querySelector("#operate")
equals.addEventListener("click", getResult)

const signChange = document.querySelector("#sign-change")
signChange.addEventListener("click", changeSign);

const decimal = document.querySelector("#decimal")
decimal.addEventListener("click", addDecimal);

let displayValue; 
let operand = ''; 
let firstOperand = ''
let secondOperand = ''
let showFullEq = false; 

//Main Function for retriving and storing the users inputs

function getInput(){
    userInput = this.value;
    
    //Error state Handler -- Clears all entries
    if (errorState === true){
        allClear()
        errorState = false; 
    }
    //If the button has the class of btn-op (operators)
    if (this.classList.contains("btn-op")){
    
        if(num1 != '' && num2 != ''){
            getResult()    
        }
        //If a new operator is selected  
        if (userInput != operatorDisplay){
            assignOperator(userInput)
        }
        //When an OP is clicked, assign num1 as the operand 
       if(num1 === ''){ 
       num1 = operand
       }
        // Assign the Operator via the User Input
        assignOperator(userInput) 
        
        //Update Bottom Display 
        updateDisplay(result)
       
        // Clear operand
        operand = ''
        //Return num1 
        return num1;  
    }

    //Set the operand to be the user input, and concatenate any new number inputted
        operand = operand.concat(userInput)
    //Update the display with the operand 
        updateDisplay(operand)

    //IF num1 has already been set, set num2 to opperand
        if (num1 != '' ){
            num2 = operand         
    }
        return operand;
}

// Operator Assignment Function 
let operatorDisplay = '';

function assignOperator(){
    switch (userInput){
        case '+':
            operator = "add"
            operatorDisplay = "+"
            break;
        case '-':
            operator = "subtract"
            operatorDisplay = "-"
            break;
        case '*':
            operator = "multiply"
            operatorDisplay = "x"
            break;
        case '/':
            operator = "divide"
            operatorDisplay = "÷"
            break;
    }
}


//Change Sign Function 
function changeSign(){
    !operand.includes('-') ? operand = '-' + operand : operand = operand.slice(1); 
    updateDisplay(operand)
}

//Add Decimal Point Function 
function addDecimal(){
    if (!operand.includes('.')) {
         operand = operand + '.'
        } 
    updateDisplay(operand)
}


//Display functions 

const calcDisplay = document.querySelector(".calc-display");
const calcTopDisplay = document.querySelector(".calc-topDisplay")

function updateDisplay(input){
    displayValue = input

//Error State Message Display:
    if(errorState === true){
        calcDisplay.innerText = "NANI?!?"
        return;
    }
    
//Max Character limit: 
    if(operand.length > 15){
        calcDisplay.innerText = "Max Digits Reached"
        errorState = true; 
        return;
    }

//Updating the top display:
    if (operatorDisplay != ''){
        if (result === ''){
        calcTopDisplay.innerText =  `${num1}` + ' ' + `${operatorDisplay}`
    } else {
        calcTopDisplay.innerText =  `${result}` + ' ' + `${operatorDisplay}`
    }
} 


//Clear Display Case: 
if (num1 != '' && num2 != '' && operand === ''){
    calcTopDisplay.innerText =  `${num1}` + ' ' + `${operatorDisplay}`
    calcDisplay.innerText = ''
    return;
}


//Show full equation and update Case: 
if (input === result && num2 != ''){
    calcTopDisplay.innerText =  `${num1}` + ' ' + `${operatorDisplay}` + ' ' + `${num2}` + ' ' + "=";
}
    calcDisplay.innerText = displayValue
    return displayValue;  
}


// All Clear Function 
function allClear(){
    calcDisplay.innerText = ''
    calcTopDisplay.innerText = ''
    operatorDisplay = ''
    operand = ''
    num1 = ''
    num2 = ''
    result = ''
}

// Clear previous entry function 
function clearPrev(){
    operand = operand.slice(0, -1);
    updateDisplay(operand)
}


//Operators & Operate 

const add = (x, y) => x + y;
const subtract = (x, y) => x - y; 
const multiply = (x, y) => x * y;
const divide = (x, y) =>  x / y; 


function getResult(){
 
    if (num1 === '' && num2 === '' || operand === ''){
        return
    } 
    if (result === ''){
        operate(num1, num2, operator);
    } 
    else {
        operate(result, num2, operator);
    }
    firstOperand = num1
    updateDisplay (result)
    num1 = result
    num2 = ''

}

function operate(num1, num2, operator){
    switch (operator){
        case 'add':
            result = add(+num1, +num2);
            updateDisplay(result)
            return result; 
        case 'subtract':
            result = subtract(+num1, +num2);
            updateDisplay(result)
            return result; 
        case 'multiply':
            result = multiply(+num1, +num2);
            updateDisplay(result)
            return result; 
        case 'divide':
            if (num2 === '0'){
                errorState = true; 
                return;
            }
            result = divide(+num1, +num2);
            updateDisplay(result)
            return result; 
    }
}