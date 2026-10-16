
const newButton = document.getElementById("new");
const list = document.getElementById("ft_list");
const deleteDialog = document.getElementById("deleteDialog");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

let taskToDelete = null;

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
    let task = document.createElement("div");

    task.textContent = text;

    // เมื่อคลิกรายการ ให้เปิดหน้าต่าง Yes / No
    task.addEventListener("click", function() {
        taskToDelete = task;
        deleteDialog.style.display = "flex";
    });

    // เพิ่มรายการไว้ด้านบนสุด
    list.prepend(task);
}

// กดปุ่ม New เพื่อเพิ่มรายการ
newButton.addEventListener("click", function() {
    let text = window.prompt("Enter a new task:");

    if (text === null || text.trim() === "") {
        return;
    }

    addTask(text.trim());
    saveTasks();
});

// กด Yes เพื่อลบรายการ
yesBtn.addEventListener("click", function() {
    if (taskToDelete !== null) {
        taskToDelete.remove();
        saveTasks();
        taskToDelete = null;
    }

    deleteDialog.style.display = "none";
});

// กด No เพื่อยกเลิก
noBtn.addEventListener("click", function() {
    taskToDelete = null;
    deleteDialog.style.display = "none";
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

// โหลดรายการเมื่อเปิดหน้าเว็บ
loadTasks();
