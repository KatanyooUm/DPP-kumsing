$("#calculator").on("submit", function(event) {
    event.preventDefault();

    let left = $("#left").val();
    let right = $("#right").val();
    let operator = $("#operator").val();

    // ตรวจสอบว่ารับเฉพาะจำนวนเต็มตั้งแต่ 0 ขึ้นไป
    if (!/^\d+$/.test(left) || !/^\d+$/.test(right)) {
        alert("Error :(");
        return;
    }

    let num1 = Number(left);
    let num2 = Number(right);

    // ตรวจสอบการหารหรือ Modulo ด้วยศูนย์
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
});

// แจ้งเตือนทุก 30 วินาที
setInterval(function() {
    alert("Please, use me...");
}, 30000);