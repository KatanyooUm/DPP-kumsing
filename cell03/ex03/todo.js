const newButton = document.getElementById("new");
const list = document.getElementById("ft_list");

// บันทึกรายการลง Cookie
function saveTasks() {
    let tasks = [];

    for (let task of list.children) {
        tasks.push(task.textContent);
    }

    document.cookie = "todos=" +
        encodeURIComponent(JSON.stringify(tasks)) +
        "; max-age=2592000; path=/; SameSite=Lax";
}

// สร้างรายการใหม่
function addTask(text) {
    const task = document.createElement("div");

    task.textContent = text;

    task.addEventListener("click", function() {
        if (confirm("Delete this task?")) {
            task.remove();
            saveTasks();
        }
    });

    list.prepend(task);
}

// กดปุ่ม New
newButton.addEventListener("click", function() {
    const text = window.prompt("Enter a new task:");

    if (text === null || text.trim() === "") {
        return;
    }

    addTask(text.trim());
    saveTasks();
});

// โหลดรายการจาก Cookie
function loadTasks() {
    const cookies = document.cookie.split("; ");

    for (let cookie of cookies) {
        if (cookie.startsWith("todos=")) {
            try {
                const saved = decodeURIComponent(cookie.substring(6));
                const tasks = JSON.parse(saved);

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