let [month, date, year] = new Date().toLocaleDateString("en-US").split("/");

const resultados = document.querySelector('#resultadosTxt');
resultados.innerHTML = `<div class="alert alert-success" role="alert">
<h6 class="alert-heading">Resultados em tempo real</h6>
<hr>
<p class="mb-0">${date}/ ${month}/ ${year}</span></p>
</div>`;

const lucro = document.getElementById('resultadosCash');

const mostrar = () => {
  document.addEventListener('DOMContentLoaded', () => {
    dinheiroDisplay.innerText = somado('dinheiro');
    prazoDisplay.innerText = somado('prazo');
    saidaDisplay.innerText = somado('saida');
    lucro.innerText = verLucro();
  });
}
mostrar();

const dinheiro = document.querySelector('#dinheiro-input'),
      dinheiroDisplay = document.querySelector('#dinheiro'),
      dinheiroAvista = [];

document.querySelector('#dinheiro-btn').addEventListener('click', () => {
  if(dinheiro.value === '') {
    alert('Digite o valor!')
  } else {
    pagamento(dinheiro, dinheiroDisplay, 'dinheiro');
  } 
})

const prazo = document.querySelector('#praz-input'),
      prazoDisplay = document.querySelector('#ent-praz'),
      dinheiroAprazo = [];

document.querySelector('#btn-praz').addEventListener('click', () => {
  if(prazo.value === '') {
    alert('Digite o valor!')
  } else {
    pagamento(prazo, prazoDisplay, 'prazo');
  } 
})

const saida = document.querySelector('#sai-input'),
      saidaDisplay = document.querySelector('#sai'),
      dinheiroSaida = [];

document.querySelector('#sai-btn').addEventListener('click', () => {
  if(saida.value === '') {
    alert('Digite o valor!')
  } else {
    pagamento(saida, saidaDisplay, 'saida');
  } 
})

const pagamento = (input, output, lsKey) => {
  let dinheiroLs;
  if(localStorage.getItem(lsKey) === null) {
    dinheiroLs = [];
  } else {
    dinheiroLs = JSON.parse(localStorage.getItem(lsKey));
  }

  dinheiroLs.push(input.value)
  localStorage.setItem(lsKey, JSON.stringify(dinheiroLs))

  output.innerText = somado(lsKey)
  input.value = '';

  lucro.innerText = verLucro();
}

const somado = (lsKey) => {
  const totalString = JSON.parse(localStorage.getItem(lsKey));
  let somaVista = [];
  totalString.forEach(ele => {
    let num = Number(ele);
    somaVista.push(num);
  });

  let somadoVista = somaVista.reduce((total, currentElement) => total + currentElement);
  return somadoVista.toFixed(2);
}

const verLucro = () => {
  let dindin = Number(dinheiroDisplay.innerText);
  let despesa = Number(saidaDisplay.innerText);
  
  return dindin - despesa;
}

document.querySelector('#pagarBtn').addEventListener('click', (e) => {
  if(prazo.value === '') {
    alert('Digite o valor!')
  } else {
    alert(`Você está inserindo um pagamento na sessão Dinheiro`)
    diminuirFiado(prazo, prazoDisplay, 'prazo');
  } 
})

const diminuirFiado = (input, output, lsKey) => {
  let dividas = Number(prazoDisplay.innerText);
  let pgto = Number(prazo.value);
  let pago = dividas - pgto;

  let dinheiroLs;
  if(localStorage.getItem(lsKey) === null) {
    dinheiroLs = [];
  } else {
    dinheiroLs = JSON.parse(localStorage.getItem(lsKey));
  }
  
  dinheiroLs = [];
  dinheiroLs.push(pago);
  localStorage.setItem(lsKey, JSON.stringify(dinheiroLs));
  pagamento(prazo, dinheiroDisplay, 'dinheiro');

  output.innerText = somado(lsKey)
  input.value = '';
}







