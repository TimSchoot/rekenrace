let problem1 = {};
let problem2 = {};
let progress1 = 0;
let progress2 = 0;
let result1 = "";
let result2 = "";

function generateProblem() {
    const operators = ['+', '-', '*', '/'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    let num1 = Math.floor(Math.random() * 10) + 1; // Numbers between 1 and 10
    let num2 = Math.floor(Math.random() * 10) + 1; // Numbers between 1 and 10
    let solution;

    switch(operator) {
        case '+':
            solution = num1 + num2;
            break;
        case '-':
            if (num1 < num2) { // Ensure no negative results
                [num1, num2] = [num2, num1];
            }
            solution = num1 - num2;
            break;
        case '*':
            solution = num1 * num2;
            break;
        case '/':
            while (num1 % num2 !== 0) { // Ensure the division results in a whole number
                num1 = Math.floor(Math.random() * 10) + 1;
                num2 = Math.floor(Math.random() * 10) + 1;
            }
            solution = num1 / num2;
            break;
    }

    return { num1, num2, operator, solution };
}

function displayProblem(player) {
    const problem = generateProblem();
    const problemStr = `${problem.num1} ${problem.operator} ${problem.num2}`;

    if (player === 1) {
        problem1 = problem;
        document.getElementById('problem1').value = problemStr;
    } else {
        problem2 = problem;
        document.getElementById('problem2').value = problemStr;
    }
}

function appendToResult(value) {
    result1 += value;
    document.getElementById("result").value = result1;
}

function clearResult() {
    if (document.getElementById("result").value !== "ERROR") {
        result1 = "";
        document.getElementById("result").value = result1;
    }
}


function calculate() {
    try {
        const answer = parseFloat(result1);
        if (answer === problem1.solution) {
            progress1 += 10; // Increase progress by 10% for each correct answer
            document.getElementById('progress1').style.width = progress1 + '%';
            displayProblem(1);
            clearResult();
        } else {
            document.getElementById("result").value = "ERROR";
            setTimeout(function() {
                document.getElementById("result").value = "";
            }, 3000); // Clear error message after 3 seconds
        }
        checkWinner();
    } catch (error) {
        document.getElementById("result").value = "Error";
    }
}



function appendToResult2(value) {
    result2 += value;
    document.getElementById("result2").value = result2;
}

function clearResult2() {
    result2 = "";
    document.getElementById("result2").value = result2;
}

function calculate2() {
    try {
        const answer = parseFloat(result2);
        if (answer === problem2.solution) {
            progress2 += 10; // Increase progress by 10% for each correct answer
            document.getElementById('progress2').style.width = progress2 + '%';
            displayProblem(2);
            clearResult2();
        } else {
            document.getElementById("result2").value = "ERROR";
            setTimeout(function() {
                document.getElementById("result2").value = "";
            }, 3000); // Clear error message after 3 seconds
        }
        checkWinner();
    } catch (error) {
        document.getElementById("result2").value = "Error";
    }
}



function checkWinner() {
    if (progress1 >= 100) {
        showWinner("Player 1");
    } else if (progress2 >= 100) {
        showWinner("Player 2");
    }
}

function showWinner(player) {
    document.getElementById("winnerMessage").innerText = player + " wins!";
    document.getElementById("winnerModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("winnerModal").style.display = "none";
}

function resetGame() {
    progress1 = 0;
    progress2 = 0;
    result1 = "";
    result2 = "";
    document.getElementById('progress1').style.width = '0%';
    document.getElementById('progress2').style.width = '0%';
    document.getElementById('result').value = '';
    document.getElementById('result2').value = '';
    closeModal();
    displayProblem(1);
    displayProblem(2);
}

// Initialize problems for both players
displayProblem(1);
displayProblem(2);