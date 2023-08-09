const token = 'd61ee513-7348-4a45-b46b-364789e1912c'
const apiUrl = "https://api.box3.work/api/Contato/"
const urlComToken = `${apiUrl}${token}`

const listaContatos = () => {
  return fetch(urlComToken)
    .then(resposta => {
      if(resposta.ok)
        return resposta.json()
      throw new Error('Não foi possível listar os clientes')
    })
}

const criaContato = (nome, telefone, email, ativo, data_nas) => { 
  return fetch(urlComToken, {
        method: 'POST', 
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            nome: nome,
            telefone: telefone,
            email: email,
            ativo: ativo,
            dataNascimento: data_nas
        })
    })
    .then( resposta => {
      if(resposta.ok)
        return resposta.body
      throw new Error('Não foi possível criar um cliente')
    })
}

const removeContato= (id) => { 
  const urlComTokenId = `${urlComToken}/${id}`;
  return fetch(urlComTokenId, {
        method: 'DELETE',
        headers: { 
            'Content-type' : 'application/json'
        }
  })
    .then( resposta => { 
      if(!resposta.ok)
        throw new Error('Não foi possível deletar um cliente')
    })
}

const atualizaContato = (id, nome, telefone, email, data_nas) => {
    return fetch(`${urlComToken}/${id}`, {
        method: 'PUT',
        headers: { 
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            nome: nome,
            telefone: telefone,
            email: email,
            dataNascimento: data_nas
        })
    })
    .then( resposta => {
        if(resposta.ok){
            return resposta.json()
        }
        throw new Error('Não foi possível detalhar um cliente')
    })
}

const detalhaContato = (id) => { 
    return fetch(`${urlComToken}/${id}`)
    .then(resposta => { 
        if(resposta.ok)
            return resposta.json()
        throw new Error('Não foi possível detalhar um cliente')
    })
}
export const contatoService = { 
    listaContatos,
    criaContato, 
    removeContato,
    detalhaContato,
    atualizaContato
}
