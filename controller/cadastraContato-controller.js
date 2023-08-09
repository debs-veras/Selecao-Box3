
import { contatoService } from '../service/contato-service.js'

const formulario = document.querySelector('[data-form]')


formulario.addEventListener('submit', async (evento) => {
  evento.preventDefault()
  try {
    const nome = evento.target.querySelector('[data-nome]').value
    const telefone = evento.target.querySelector('[data-telefone]').value
    const email = evento.target.querySelector('[data-email]').value
    const ativo = true
    const data_nas = evento.target.querySelector('[data-date]').value

    await contatoService.criaContato(nome, telefone, email, ativo, data_nas)
    window.location.href = '../telas/cadastro_concluido.html'
  }
  catch (erro) {
    console.log(erro);
    window.location.href = "../telas/erro.html"
  }
});