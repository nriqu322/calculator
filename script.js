let input = '';
let booleanOne = false;
let displayNums = document.querySelector('#displayNums');
let displayResult = document.querySelector('#displayResult');
let buttons = document.querySelectorAll('button');
Array.from(buttons).forEach(button => {
    button.addEventListener('click', function() {
        if(button.className === 'oper') {
            if (booleanOne) {
                input = displayResult.innerHTML;
                displayResult.innerHTML = 0;
                booleanOne = false;
            }
            if (input.length === 0) return;
            if (input.charAt(input.length-1) === '.' ||  input.charAt(input.length-1) === '-' || input.charAt(input.length-1) === '+' || input.charAt(input.length-1) === '*' || input.charAt(input.length-1) === '/') {
                return;
            }
            input += button.id;
        } else if (button.id === 'clear') {
            location.reload(true);
            /*if (booleanOne) {
                displayResult.innerHTML = 0;
                booleanOne = false;
            }
            input = '';
            equationArray = [];*/
        } else if (button.id === '.') {
            let booleanTemp = true;
            if (booleanOne) {
                input = displayResult.innerHTML;
                displayResult.innerHTML = 0;
                booleanOne = false;
            }
            for (i = input.length -1; i >= 0; i--) {
                if ( input.charAt(i) === '/' || input.charAt(i) == '*' || input.charAt(i) === '+' || input.charAt(i) === '-' || input.charAt(i) === '=' ) {
                    break;
                }
                if (input.charAt(i) === '.') {
                    booleanTemp = false;
                    break;
                }
            }
            if (booleanTemp) {
                input += button.id;
            }
        } else if (button.id === 'backspace') {
            if (booleanOne) {
                input = displayResult.innerHTML;
                displayResult.innerHTML = ' ';
                calculated = false;
            } 
            input = input.substr(0, input.length-1)
        } else if (button.id === '=') {
            if (booleanOne) return;
            if (input === '') return;
            if (input.charAt(input.length -1) === '/' || input.charAt(input.length -1) === '*' || input.charAt(input.length -1) === '+' || input.charAt(input.length -1) === '-' || input.charAt(input.length -1) === '.' ) {
                return;
            }
            booleanOne = true;
            input += '=';
            getEquation();
            displayResult.innerHTML = calculate().toString();
        } else {
            if (booleanOne) {
                input = displayResult.innerHTML
                displayResult.innerHTML = 0;
                booleanOne = false;
            }
            input += button.id;
        }
        let temp = '';
        for (i = 0; i < input.length; i++) {
            if (input.charAt(i) === '=') break;
            temp += input.charAt(i);
        }
        displayNums.innerHTML = temp;
    });
});

function add (a,b) {
	return a + b;
}
function subtract (a,b) {
	return a - b;
}
function multiply (a,b) {
	return a*b;
}
function divide (a,b) {
    if(b == 0) {
        return 'OOPS';
    } else {
    return a/b;
    }
}
function operate (oper,a,b) {
    if (oper === '+') {
        return add (a,b);
    }
    if (oper === '-') {
        return subtract (a,b);
    }
    if (oper === '*') {
        return multiply (a,b);
    }
    if (oper === '/') {
        return divide (a,b);
    }
};

let equationArray = [];

function getEquation() {
    equationArray = [];
    let num = '';
    let isFloat = false;
    for (i = 0; i < input.length; i++) {
        if (input.charAt(i)==='/' || input.charAt(i)=='*' ||input.charAt(i)==='-' || input.charAt(i)==='+' || input.charAt(i)==='=') {
            let obj = {};
            if (isFloat) {
                obj.num = parseFloat(num);
            } else {
                obj.num = parseInt(num);
            }
            obj.oper = input.charAt(i);
            equationArray.push(obj);
            num = '';
            isFloat = false;
        } else if (input.charAt(i) === '.') {
            num += '.';
            isFloat = true;
        } else {
            num += input.charAt(i);
        }
    }
}

function calculate() {
    let i;
    for (i = 0; i < equationArray.length - 1 ; i++) {
        if (equationArray[i].oper === '/' || equationArray[i].oper === '*') {
            equationArray[i+1].num = operate(equationArray[i].oper, equationArray[i].num,equationArray[i+1].num);
            equationArray.splice(i, 1);
            i--;
        }
    }
    for (i = 0; i < equationArray.length -1 ; i++) {
        equationArray[i+1].num = operate(equationArray[i].oper, equationArray[i].num,equationArray[i+1].num);
        equationArray.splice(i, 1);
        i--;
    } 
    return Math.round(equationArray[i].num*100)/100;
}

window.addEventListener('keydown',function(k) {
    let key = document.querySelector('e.key') ;
    if(key.className === 'oper') {
        if (booleanOne) {
            input = displayResult.innerHTML;
            displayResult.innerHTML = 0;
            booleanOne = false;
        }
        if (input.length === 0) return;
        if (input.charAt(input.length-1) === '.' ||  input.charAt(input.length-1) === '-' || input.charAt(input.length-1) === '+' || input.charAt(input.length-1) === '*' || input.charAt(input.length-1) === '/') {
            return;
        }
        input += key.id;
    } else if (key.id === 'clear') {
        if (booleanOne) {
            displayResult.innerHTML = 0;
            booleanOne = false;
        }
        input = '';
        equationArray = [];
    } else if (key.id === '.') {
        let BooleanTemp = true;
        if (booleanOne) {
            input = displayResult.innerHTML;
            displayResult.innerHTML = '';
            booleanOne = false;
        }
        for (i = input.length -1; i >= 0; i--) {
            if ( input.charAt(i) === '/' || input.charAt(i) == '*' || input.charAt(i) === '+' || input.charAt(i) === '-' || input.charAt(i) === '=' ) {
                break;
            }
            if (input.charAt(i) === '.') {
                booleanTemp = false;
                break;
            }
        }
        if (booleanTemp) {
            input += key.id;
        }
    } else if (key.id === 'backspace') {
        if (input === '') return;
        if (booleanOne) {
            input = displayResult.innerHTML;
            displayResult.innerHTML = '';
            calculated = false;
        } 
        input = input.substr(0, input.length-1)
    } else if (key.id === '=') {
        if (booleanOne) return;
        if (input === '') return;
        if (input.charAt(input.length -1) === '/' || input.charAt(input.length -1) === '*' || input.charAt(input.length -1) === '+' || input.charAt(input.length -1) === '-' || input.charAt(input.length -1) === '.' ) {
            return;
        }
        booleanOne = true;
        input += '=';
        getEquation();
        displayResult.innerHTML = calculate().toString();
    } else {
        if (booleanOne) {
            input = displayResult.innerHTML
            displayResult.innerHTML = '';
            booleanOne = false;
        }
        input += key.id;
    }
    let temp = '';
    for (i = 0; i < input.length; i++) {
        if (input.charAt(i) === '=') break;
        temp += input.charAt(i);
    }
    displayNums.innerHTML = temp;
})