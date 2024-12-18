const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = [];

function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      tasks = JSON.parse(savedTasks);
      tasks.forEach((task, index) => renderTask(task, index));
    }
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return alert("Task cannot be empty!");

    const newTask = { text: taskText, completed: false };
    tasks.push(newTask);
    saveTasks();
    renderTask(newTask, tasks.length - 1);
    taskInput.value = "";
}

function renderTask(task, index) {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task";
  
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => toggleTask(index));
  
    const taskText = document.createElement("span");
    taskText.textContent = task.text;
    if (task.completed) {
      taskText.classList.add("completed");
    }
  
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteTask(index));
  
    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(taskText);
    taskDiv.appendChild(deleteBtn);
    taskList.appendChild(taskDiv);
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    refreshTasks();
}
  
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    refreshTasks();
}
  
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function refreshTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => renderTask(task, index));
}
  
addTaskBtn.addEventListener("click", addTask);
window.addEventListener("DOMContentLoaded", loadTasks);