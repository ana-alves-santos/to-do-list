let tarefas = [];

// Carregar tarefas do localStorage ao iniciar
window.onload = () => {
  const tarefasSalvas = localStorage.getItem("tarefas");
  if (tarefasSalvas) {
    tarefas = JSON.parse(tarefasSalvas);
    renderizarTarefas();
  }
};

function salvarLocalStorage() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function adicionarTarefa() {
  const inputTarefa = document.getElementById("inputTarefa");
  let tarefa = inputTarefa.value.trim();

  const mensagem = document.getElementById("mensagem");

  if (tarefa == "") {
    let mensagemErro = "Digite uma tarefa para adicioná-la a sua lista!";
    mensagem.textContent = mensagemErro;
  } else {
    let mensagemSucesso = "Tarefa adicionada com sucesso!";
    mensagem.textContent = mensagemSucesso;
    tarefas.push(tarefa);
    salvarLocalStorage(); // salvar após adicionar
    renderizarTarefas();
  }

  inputTarefa.value = "";
}

function renderizarTarefas() {
  const listaTarefas = document.getElementById("listaTarefas");
  listaTarefas.innerHTML = "";

  for (let i = 0; i < tarefas.length; i++) {
    let novaTarefa = document.createElement("li");
    novaTarefa.textContent = tarefas[i];

    let botaoRemover = document.createElement("button");
    botaoRemover.className = "remover";
    botaoRemover.textContent = "Remover";
    botaoRemover.onclick = () => removerTarefa(i);

    let botaoEditar = document.createElement("button");
    botaoEditar.className = "editar";
    botaoEditar.textContent = "Editar";
    botaoEditar.onclick = () => editarTarefa(i);

    novaTarefa.appendChild(botaoRemover);
    novaTarefa.appendChild(botaoEditar);
    listaTarefas.appendChild(novaTarefa);
  }
}

function removerTarefa(i) {
  tarefas.splice(i, 1);
  salvarLocalStorage(); // salvar após remover
  renderizarTarefas();
}

function editarTarefa(i) {
  let tarefaEditada = prompt("Edite a tarefa:", tarefas[i]);
  if (tarefaEditada && tarefaEditada.trim() !== "") {
    tarefas[i] = tarefaEditada.trim();
    salvarLocalStorage(); // salvar após editar
    renderizarTarefas();
  }
}

function limparLista() {
  tarefas.length = 0;
  salvarLocalStorage(); // salvar após limpar
  renderizarTarefas();
  const mensagem = document.getElementById("mensagem");
  mensagem.textContent = "Lista de tarefas limpa com sucesso!";
}
