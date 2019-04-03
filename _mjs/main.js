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
    email: document.querySelector('#email').value,
    razao: document.querySelector('#razao').value,
    cpf: document.querySelector('#cpfcnpj').value,
    // assunto: document.querySelector('[name="assunto"]').value,
    // mensagem: document.querySelector('[name="mensagem"]').value,
  }
}
let array = []
const pk = document.querySelector('#cpfcnpj')
const clearForm = document.querySelector(".contact-form")

document.querySelector(".enviar").onclick = function() {
    let indexArray = array.findIndex( elem => {
        return elem.cpf === pk.value
    })
    console.log('filterarray', indexArray)

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

document.querySelector(".deletar").onclick = function() {    
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
