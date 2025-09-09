let tasks = [];

// Carregar tarefas do localStorage ao iniciar
window.onload = () => {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    renderTasks();
  }
};

function saveLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  let task = taskInput.value.trim();
  const message = document.getElementById("message");

  if (task === "") {
    message.textContent = "Digite uma tarefa para adicioná-la a sua lista!";
  } else {
    message.textContent = "Tarefa adicionada com sucesso!";
    tasks.push(task);
    saveLocalStorage();
    renderTasks();
  }

  taskInput.value = "";
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    let newTask = document.createElement("li");
    newTask.textContent = tasks[i];

    let removeButton = document.createElement("button");
    removeButton.className = "remove";
    removeButton.textContent = "Remover";
    removeButton.onclick = () => removeTask(i);

    let editButton = document.createElement("button");
    editButton.className = "edit";
    editButton.textContent = "Editar";
    editButton.onclick = () => editTask(i);

    newTask.appendChild(removeButton);
    newTask.appendChild(editButton);
    taskList.appendChild(newTask);
  }
}

function removeTask(i) {
  tasks.splice(i, 1);
  saveLocalStorage();
  renderTasks();
}

function editTask(i) {
  let editedTask = prompt("Edite a tarefa:", tasks[i]);
  if (editedTask && editedTask.trim() !== "") {
    tasks[i] = editedTask.trim();
    saveLocalStorage();
    renderTasks();
  }
}

function clearTasks() {
  tasks.length = 0;
  saveLocalStorage();
  renderTasks();
  document.getElementById("message").textContent = "Lista de tarefas limpa com sucesso!";
}
