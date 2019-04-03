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

function makeObj(data){
  return {
    nome: document.querySelector('#nome').value,
    razao: document.querySelector('#razao').value,
    cpf: document.querySelector('#cpfcnpj').value,
    endereco: document.querySelector('#endereco').value,
    cep: document.querySelector('#cep').value,
    numero: document.querySelector('#numero').value,
    bairro: document.querySelector('#bairro').value,
    cidade: document.querySelector('#cidade').value,
    estado: document.querySelector('#estado').value,
    email: document.querySelector('#email').value,
  }
}
let array = []

const pk = document.querySelector('#cpfcnpj')
// const nome = document.querySelector('#nome').value
// const razao = document.querySelector('#razao').value
// const endereco = document.querySelector('#endereco').value
// const cep = document.querySelector('#cep').value
// const numero = document.querySelector('#numero').value
// const bairro = document.querySelector('#bairro').value
// const cidade = document.querySelector('#cidade').value
// const estado = document.querySelector('#estado').value
// const email = document.querySelector('#email').value
const clearForm = document.querySelector('.contact-form')

document.querySelector('.enviar').onclick = function() {
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
