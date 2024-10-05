// DEFINING VARIABLES

    
function performOperation() {
    
    // Get user input from input fields
    
    let num1 = parseInt(document.getElementById('input1').value);
    let num2 = parseInt(document.getElementById('input2').value);
    
    // Check if inputs are valid numbers
    
    if (!isNaN(num1) && !isNaN(num2)) {
    
        // Perform the first operation
    
        let result = multiply(num1, num2);
    
        // Display the first operation result
    
        displayResult(result);

        // Perform the second operation

        let result1 = addition(num1, num2);

        // Display the second operation result

        displayResult1(result1);

        // Perform the third operation

        let result2 = division(num1, num2);

        // Display the thrid operation result

        displayResult2(result2);
    
    } else {
        displayResult('Please enter valid numbers');
    }
}

function multiply(a, b) {
    // Introduce a debugger statement to pause execution
    
    debugger;

    // Multiply the numbers
    
    return a * b;
    }

function addition(a, b) {

    debugger;

    // Sum the numbers

    return a + b;
}

function division(a, b) {

    debugger;

    // Divide the numbers

    return a / b;
}

function displayResult(result) {
    
    // Display the result in the paragraph element
    
    const resultElement = document.getElementById('result');
    resultElement.textContent = `The result of multiplication is: ${result}`;
}        

function displayResult1(result1) {
    
    // Display the result in the paragraph element
    
    const result1Element = document.getElementById('result1');
    result1Element.textContent = `The result of addition is: ${result1}`;
}

function displayResult2(result2) {
    
    // Display the result in the paragraph element
    
    const result2Element = document.getElementById('result2');
    result2Element.textContent = `The result of division is: ${result2}`;
}