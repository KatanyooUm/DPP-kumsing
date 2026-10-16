let balloon = $("#balloon");
let size = 200;
let color = "red";

// คลิกลูกโป่ง
balloon.on("click", function() {
    size = size + 10;

    if (size > 420) {
        size = 200;
    }

    balloon.css({
        "width": size + "px",
        "height": size + "px"
    });

    if (color === "red") {
        color = "green";
    } else if (color === "green") {
        color = "blue";
    } else {
        color = "red";
    }

    balloon.css("background-color", color);
});

// เมาส์ออกจากลูกโป่ง
balloon.on("mouseleave", function() {
    size = size - 5;

    if (size < 200) {
        size = 200;
    }

    balloon.css({
        "width": size + "px",
        "height": size + "px"
    });

    if (color === "red") {
        color = "blue";
    } else if (color === "blue") {
        color = "green";
    } else {
        color = "red";
    }

    balloon.css("background-color", color);
});