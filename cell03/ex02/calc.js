let calculator = document.getElementById("calculator");

calculator.addEventListener("submit", function(event) {
    event.preventDefault();

    let left = document.getElementById("left").value;
    let right = document.getElementById("right").value;
    let operator = document.getElementById("operator").value;

    let num1 = Number(left);
    let num2 = Number(right);

    if (
        left.trim() === "" ||
        right.trim() === "" ||
        !Number.isInteger(num1) ||
        !Number.isInteger(num2) ||
        num1 < 0 ||
        num2 < 0
    ) {
        alert("Error :(");
        return;
    }

    if ((operator === "/" || operator === "%") && num2 === 0) {
        alert("It's over 9000!");
        console.log("It's over 9000!");
        return;
    }

    let result;

    if (operator === "+") {
        result = num1 + num2;
    } else if (operator === "-") {
        result = num1 - num2;
    } else if (operator === "*") {
        result = num1 * num2;
    } else if (operator === "/") {
        result = num1 / num2;
    } else if (operator === "%") {
        result = num1 % num2;
    }

    alert(result);
    console.log(result);
    setInterval(function() {
    alert("Please, use me...");
}, 30000);
});