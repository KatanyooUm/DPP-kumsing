$("#changeColor").on("click", function() {
    let color = "#" + Math.floor(Math.random() * 16777216)
        .toString(16).padStart(6, "0");

    $("body").css("background-color", color);
});