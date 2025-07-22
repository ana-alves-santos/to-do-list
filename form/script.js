const form = document.querySelector('form');
const mensagem = document.getElementById('mensagem');

form.addEventListener('submit', function(event) {
  event.preventDefault(); 

 
  form.style.display = 'none';

  
  mensagem.style.display = 'block';
});