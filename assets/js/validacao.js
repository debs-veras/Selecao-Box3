const fields = document.querySelectorAll("[required]")

function ValidateField(field){
  function verifyErrors(){
    let foundError = false;
    for(let error in field.validity)
      if(field.validity[error] && !field.validity.valid)
        foundError = error    
      else if(field.type == "date"){
        let dataAtual = new Date();
        let data = field.value;
        data = new Date(data);
        if(data > dataAtual)
          foundError ="rangeUnderflow" 
      }
      else if(field.id == "confirm_password")
        if(!validatePassword())
          foundError = "valid"
    return foundError;
  }

  function customMessage(typeError){
     const messages = {
        valueMissing: "Por favor, preencha este campo",
        typeMismatch: "Por favor, preencha  um formato válido",
        rangeUnderflow: "Por favor preencha com uma data valida",
        valid: "Não foi possível confirmar sua senha"
     }
     return messages[typeError]
  } 

  function setCustomMessage(message){
    const spanError = field.parentNode.querySelector("span.error")
    if(message){
      spanError.classList.add("active")
      spanError.innerHTML = message
    }else{
      spanError.classList.remove("active")
      spanError.innerHTML = ""
    }
  }

  return function(){
    const error = verifyErrors()
    if(error){
      const message = customMessage(error)
      field.style.border = "1px solid red"
      field.style.marginBottom = "5px"
      setCustomMessage(message)
     }else{
       field.style.border = "1px solid green"
       setCustomMessage()
     }
  }
}

function customValidation(event){
  const field = event.target
  const validation = ValidateField(field)
  validation()
}

for(let field of fields){
  field.addEventListener("invalid", event => { 
    event.preventDefault()
    customValidation(event)
  })
  field.addEventListener("blur", customValidation)
}

document.querySelector("form").addEventListener("submit", event => {
  event.preventDefault()
})

function maskFunc(object){
  let tel = object.value;
tel=tel.replace(/\D/g,""); 

if(tel.length>=10)
  tel=tel.replace(/(.{4})$/,"-$1"); 

tel=tel.replace(/^(\d)/,"($1"); 
tel=tel.replace(/(.{3})(\d)/,"$1) $2");
object.value = tel;
}