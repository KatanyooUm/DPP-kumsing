let balloon = document.getElementById("balloon");
let size = 200;
let color = "red";

// เมื่อคลิกลูกโป่ง
balloon.addEventListener("click", function() {
    size = size + 10;


    if (size > 420) {
        size = 200;
    }

    balloon.style.width = size + "px";
    balloon.style.height = size + "px";

  
    if (color === "red") {
        color = "green";
    } else if (color === "green") {
        color = "blue";
    } else {
        color = "red";
    }

    balloon.style.backgroundColor = color;
});


balloon.addEventListener("mouseleave", function() {
    size = size - 5;

    // ห้ามเล็กกว่า 200px
    if (size < 200) {
        size = 200;
    }

    balloon.style.width = size + "px";
    balloon.style.height = size + "px";


    if (color === "red") {
        color = "blue";
    } else if (color === "blue") {
        color = "green";
    } else {
        color = "red";
    }

    balloon.style.backgroundColor = color;
});