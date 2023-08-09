import { contatoService } from '../service/contato-service.js'

const criaNovaLinha = (nome, email, telefone, id) =>  { 
  const linhaNovoContato = document.createElement('tr')
  const conteudo = `
      <td class="td" data-td>${nome}</td>
      <td>${email}</td>
      <td>${telefone}</td>
      <td>
        <ul class="tabela__botoes-controle">
          <li><a href="../telas/edita_contato.html?id=${id}" class="botao-simples botao-simples--editar">Editar</a></li>
          <li><button class="botao-simples botao-simples--excluir" type="button">Excluir</button></li>
        </ul>
      </td>`
  linhaNovoContato.innerHTML = conteudo
  linhaNovoContato.dataset.id = id
  return linhaNovoContato
}


const tabela = document.querySelector('[data-tabela]')

tabela.addEventListener('click', async (evento)=> {
    let ehBotaoDeDeleta = evento.target.className === 'botao-simples botao-simples--excluir'
    if(ehBotaoDeDeleta){
        try {
            const linhaContato = evento.target.closest('[data-id]')
            let id = linhaContato.dataset.id
            await contatoService.removeContato(id)
            linhaContato.remove()
        }
        catch(erro){
            window.location.href="../telas/erro.html"
        }
    }
})


const render = async () =>  {
    try {
        const listaContato = await contatoService.listaContatos()
        listaContato.forEach(elemento => {
            tabela.appendChild(criaNovaLinha(elemento.nome,elemento.email, elemento.telefone, elemento.id))
    })
    }
    catch(erro){
        console.log(erro)
        window.location.href="../telas/erro.html"
    }
    
}

render()