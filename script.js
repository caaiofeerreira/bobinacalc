document.addEventListener('DOMContentLoaded', () => {
  const toast = document.querySelector(".modal-message");
  const message = document.querySelector(".modal-message p");
  const calcular = document.querySelector(".button");

  calcular.addEventListener('click', () => {
    
    const numBobinas = parseInt(document.getElementById('numBobinas').value);
    const pesoTubo = parseFloat(document.getElementById('pesoTubo').value.replace('.', ''));
    const pesoFilmePorBobina = parseFloat(document.getElementById('pesoFilme').value.replace('.', ''));
    const pesoTotalProducao = parseFloat(document.getElementById('pesoTotalProducao').value.replace('.', ''));

    if (isNaN(numBobinas) || isNaN(pesoTubo) || isNaN(pesoFilmePorBobina) || isNaN(pesoTotalProducao)) {
      toast.classList.add("ativo");
      message.innerHTML = "Por favor, preencha todos os campos com valores válidos.";
      setTimeout(() => {
        toast.classList.remove("ativo");
      }, 3000);
      return;
    }

    if (numBobinas < 0 || pesoTubo < 0 || pesoFilmePorBobina < 0 || pesoTotalProducao < 0) {
      toast.classList.add("ativo");
      message.innerHTML = "Os valores não podem ser negativos!";
      setTimeout(() => {
        toast.classList.remove("ativo")
      }, 3000)
      return;
    }

    const pesoTotalEsperado = (pesoTubo + pesoFilmePorBobina) * numBobinas;

    let resultado = `Peso total da produção: ${Math.round(pesoTotalProducao).toLocaleString("pt-BR")} kg.\n`;
    resultado += `Peso total esperado: ${Math.round(pesoTotalEsperado).toLocaleString("pt-BR")} kg.\n`;
    resultado += "\n";
    
    const diferenca = pesoTotalProducao - pesoTotalEsperado;
    let novoPesoTubo = pesoTubo;
    let novoPesoFilme = pesoFilmePorBobina;

    if (diferenca > 0) {
      resultado += `O peso da produção excedeu em ${Math.round(diferenca).toLocaleString("pt-BR")} gramas.\n`;

      const totalFilme = pesoFilmePorBobina * numBobinas;
      const ajusteFilme = totalFilme * 0.005;

      const ajusteTubo = diferenca + ajusteFilme;

      novoPesoFilme = (totalFilme - ajusteFilme) / numBobinas;
      novoPesoTubo = pesoTubo + (ajusteTubo / numBobinas);

      resultado += `Peso do TUBO ajustado: ${Math.round(novoPesoTubo).toLocaleString("pt-BR")} gramas por bobina.\n`;
      resultado += `Peso do FILME ajustado: ${Math.round(novoPesoFilme).toLocaleString("pt-BR")} gramas por bobina.\n`;
    } else if (diferenca < 0) {
      resultado += `O peso da produção ficou abaixo em ${(-diferenca).toLocaleString("pt-BR")} kg.\n`;

      const info = document.getElementById('resultado');
      info.classList.add('ativo')
      info.innerText = resultado;
      return;
    } else {
      resultado += `O peso da produção está exatamente conforme o esperado.\n`;
    }

    const totalTuboProd = novoPesoTubo * numBobinas;
    const totalFilmeProd = novoPesoFilme * numBobinas;

    resultado += "\n";
    resultado += "VALORES DA PRODUÇÃO: \n";
    resultado += `Peso total do TUBO: ${(totalTuboProd / 1000).toFixed(1).toLocaleString("pt-BR")} kg.\n`;
    resultado += `Peso total do FILME: ${(totalFilmeProd / 1000).toFixed(1).toLocaleString("pt-BR")} kg.\n`;    

    const info = document.getElementById('resultado');
    info.classList.add("ativo");
    info.innerText = resultado;
  });
});