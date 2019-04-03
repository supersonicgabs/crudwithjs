import mascaras from './util/masks'

const each = (i, f) => Array.prototype.forEach.call(i, f);
const form = document.querySelectorAll('form');

if (form.length) each(form, FormMask);
function FormMask(f) {
  (Array.from(f.elements))
      .filter(el => el.hasAttribute('data-mask'))
      .forEach(campo => campo.addEventListener('input', function () {
        const metodo = this.getAttribute('data-mask');
        if (!mascaras[metodo]) return console.log(`A máscara do tipo "${metodo}" não foi definida.`);

        mascaras[metodo](this);
  }));
}

const pk = document.querySelector('#cpfcnpj')
const nome = document.querySelector('#nome')
const razao = document.querySelector('#razao')
const endereco = document.querySelector('#endereco')
const cep = document.querySelector('#cep')
const numero = document.querySelector('#numero')
const bairro = document.querySelector('#bairro')
const cidade = document.querySelector('#cidade')
const estado = document.querySelector('#estado')
const email = document.querySelector('#email')

function makeObj(data){
  return {
    nome: nome.value,
    razao: razao.value,
    cpf: pk.value,
    endereco: endereco.value,
    cep: cep.value,
    numero: numero.value,
    bairro: bairro.value,
    cidade: cidade.value,
    estado: estado.value,
    email: email.value,
  }
}
let array = []

const clearForm = document.querySelector('.contact-form')

document.querySelector('.enviar').onclick = function() {
    if(nome.value!=null, nome.value!="" && pk.value!=null, pk.value!="" && razao.value!=null, razao.value!="" && endereco.value!=null, endereco.value!="" && cep.value!=null, cep.value!="" && numero.value!=null, numero.value!="" && bairro.value!=null, bairro.value!="" && cep.value!=null, cep.value!="" && cidade.value!=null, cidade.value!="" && estado.value!=null, estado.value!="" && email.value!=null, email.value!="")
    {
        let indexArray = array.findIndex( elem => {
            return elem.cpf === pk.value
        })
        if (indexArray > -1) {
            array[indexArray] = makeObj();
        } else {
            array.push(makeObj());
        }
        transformText(array);
        clearForm.reset();        
    }
    else{
        alert('Preencha todos os campos!')
    }
}
function arrayRemove(arr, value){
    return arr.filter(function(ele, index){
        return index != value;
    });
}

document.querySelector('.deletar').onclick = function() {    
    let indexArray = array.findIndex( elem => {
        return elem.cpf === pk.value
    }) 

    if (indexArray > -1) {
        array = arrayRemove(array, indexArray);        
    }
    transformText(array);
    clearForm.reset();
}

function transformText(array){
    const objectText = JSON.stringify({array}, null, " ")
    const dataContainer = document.getElementsByClassName('results__display')[0];
    dataContainer.textContent = objectText;
}
