const visor = document.querySelector('.visor');
const botoes = document.querySelectorAll('.botao');

let expressao = '';

botoes.forEach(botao => {
  botao.addEventListener('click', () => {
    const valor = botao.textContent;

    if (valor === 'AC') {
      expressao = '';
      visor.value = '';
    } else if (valor === 'CE') {
      expressao = expressao.slice(0, -1);
      visor.value = expressao;
    } else if (valor === '=') {
      const resultado = calcular(expressao);
      visor.value = resultado;
      expressao = resultado.toString(); // permite continuar usando o resultado
    } else {
      expressao += valor;
      visor.value = expressao;
    }
  });
});

function calcular(exp) {
  try {
    const tokens = exp.match(/(\d+(\.\d+)?|[+\-*/%])/g);
    if (!tokens) return 'Erro';

    // Operações com prioridade: multiplicação, divisão e módulo
    const prioridade = ['*', '/', '%'];
    let stack = [];

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];

      if (prioridade.includes(token)) {
        const anterior = parseFloat(stack.pop());
        const proximo = parseFloat(tokens[++i]);

        let resultado;
        if (token === '*') resultado = anterior * proximo;
        else if (token === '/') resultado = anterior / proximo;
        else if (token === '%') resultado = anterior % proximo;

        stack.push(resultado);
      } else {
        stack.push(token);
      }
    }

    // Agora resolve + e -
    let resultado = parseFloat(stack[0]);
    for (let i = 1; i < stack.length; i += 2) {
      const op = stack[i];
      const num = parseFloat(stack[i + 1]);

      if (op === '+') resultado += num;
      else if (op === '-') resultado -= num;
    }

    return resultado;
  } catch (e) {
    return 'Erro';
  }
}
