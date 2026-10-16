// บันทึกรายการลง Cookie
function saveTasks() {
    let tasks = [];

    $("#ft_list").children().each(function() {
        tasks.push($(this).text());
    });

    document.cookie = "todos=" +
        encodeURIComponent(JSON.stringify(tasks)) +
        "; max-age=2592000; path=/; SameSite=Lax";
}

// สร้างรายการใหม่
function addTask(text) {
    let task = $("<div></div>");

    task.text(text);

    task.on("click", function() {
        if (confirm("Delete this task?")) {
            $(this).remove();
            saveTasks();
        }
    });

    $("#ft_list").prepend(task);
}

// กดปุ่ม New
$("#new").on("click", function() {
    let text = prompt("Enter a new task:");

    if (text === null || text.trim() === "") {
        return;
    }

    addTask(text.trim());
    saveTasks();
});

// โหลดรายการจาก Cookie
function loadTasks() {
    let cookies = document.cookie.split("; ");

    for (let cookie of cookies) {
        if (cookie.startsWith("todos=")) {
            try {
                let saved = decodeURIComponent(cookie.substring(6));
                let tasks = JSON.parse(saved);

                if (Array.isArray(tasks)) {
                    for (let i = tasks.length - 1; i >= 0; i--) {
                        if (typeof tasks[i] === "string") {
                            addTask(tasks[i]);
                        }
                    }
                }
            } catch (error) {
                console.error("Cookie error:", error);
            }

            break;
        }
    }
}

loadTasks();