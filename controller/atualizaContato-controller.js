import { contatoService } from '../service/contato-service.js'

(async () => { 
  const pegaURL = new URL(window.location)
  const id = pegaURL.searchParams.get('id')
  
  const inputNome = document.querySelector('[data-nome]')
  const inputTelefone = document.querySelector('[data-telefone]')
  const inputEmail = document.querySelector('[data-email]')
  const inputDataNas = document.querySelector('[data-data_nas]')

  try { 
    const dados = await contatoService.detalhaContato(id)
    inputNome.value = dados.nome
    inputEmail.value = dados.email
    inputTelefone.value = dados.telefone
    inputDataNas.value = dados.dataNascimento.split("T")[0];
  }
  catch(erro){
    console.log(erro)
    window.location.href="../telas/erro.html"
  }
  
  const formulario = document.querySelector('[data-form]')
  
  formulario.addEventListener('submit', async (evento)=> { 
    evento.preventDefault()
    try {
      await contatoService.atualizaContato(id, inputNome.value, inputTelefone.value, inputEmail.value, inputDataNas.value)
      window.location.href = "../telas/edicao_concluida.html"
    }
    catch(erro){
      console.log(erro)
      window.location.href="../telas/erro.html"
    }
  })
})()
