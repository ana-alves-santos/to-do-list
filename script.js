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
    message.textContent = "Digite uma tarefa para adicioná-la à lista!";
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

  tasks.forEach((task, i) => {
    let li = document.createElement("li");
    li.textContent = task;

    let btnRemove = document.createElement("button");
    btnRemove.className = "remove";
    btnRemove.textContent = "Remover";
    btnRemove.onclick = () => removeTask(i);

    let btnEdit = document.createElement("button");
    btnEdit.className = "edit";
    btnEdit.textContent = "Editar";
    btnEdit.onclick = () => editTask(i);

    li.appendChild(btnRemove);
    li.appendChild(btnEdit);
    taskList.appendChild(li);
  });
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

function clearAllTasks() {
  tasks.length = 0;
  saveLocalStorage();
  renderTasks();
  const message = document.getElementById("message");
  message.textContent = "Lista de tarefas limpa com sucesso!";
}
