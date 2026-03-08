import cifrarAtbash from "./cifrarAtbash.js";
import cifrarCesar from "./cifrarCesar.js";
import cifraRSA from "./cifraRSA.js";
import cifrarVigenere from "./cifrarVinegere.js";

const cifrarAtbashHTML = () => {
    
    const mensagem = document.getElementById('mensagem').value;
    const cifra = cifrarAtbash(mensagem);
    
    const codificacao = document.getElementById('codificacao');
    codificacao.style.visibility = "visible";
    codificacao.innerHTML = cifra;

}

const cifrarCesarHTML = () => {
    
    const mensagem = document.getElementById('mensagem').value;
    const chave = document.getElementById('chave').value;

    const cifra = cifrarCesar(mensagem, Number(chave));
    const codificacao = document.getElementById('codificacao')

    codificacao.innerHTML = cifra;
    codificacao.style.visibility = "visible";

}

const cifrarVinegereHTML = () => {

    const mensagem = document.getElementById('mensagem').value;
    const chave = document.getElementById('chave').value;
    const modo = document.getElementById('modo').value;

    const cifra = cifrarVigenere(mensagem, chave, modo);
    const codificacao = document.getElementById('codificacao')

    codificacao.innerHTML = cifra;
    codificacao.style.visibility = "visible";

}

const gerarChavesRSA_DidaticasHTML = () => {
     
    const primo1 = Number(document.getElementsByClassName('primo')[0].value);
    const primo2 = Number(document.getElementsByClassName('primo')[1].value);
    
    const CHAVES = cifraRSA.gerarChavesRSA_Didaticas(primo1, primo2);
    
    const chavePublica = CHAVES.publica;
    const chavePrivada = CHAVES.privada;

    const codificacao = document.getElementById('codificacao'); 
    codificacao.innerHTML = `Chave Publica: E = ${chavePublica.E} N = ${chavePublica.N}<hr>`
    codificacao.innerHTML += `Chave Privada: D = ${chavePrivada.D} N = ${chavePrivada.N}`
    codificacao.style.visibility = "visible";

}

const cifrarRSA_DidaticoHTML = () => {
    
    const mensagem = document.getElementById('mensagem').value;
    const chavePublicaE = Number(document.getElementById('chavePublicaE').value);
    const chavePublicaN = Number(document.getElementById('chavePublicaN').value);

    const cifra = cifraRSA.cifrarRSA_Didatico(mensagem, chavePublicaE, chavePublicaN);

    const codificacao = document.getElementById('codificacao')
    codificacao.innerHTML = cifra;
    codificacao.style.visibility = "visible";

}

const decifrarRSA_DidaticoHTML = () =>{

    const cifra = document.getElementById('mensagem').value.split(',');
    const chavePrivadaD = Number(document.getElementById('chavePrivadaD').value);
    const chavePrivadaN = Number(document.getElementById('chavePrivadaN').value);

    const mensagem = cifraRSA.decifrarRSA_Didatico(cifra, chavePrivadaD, chavePrivadaN);

    const codificacao = document.getElementById('codificacao')
    codificacao.innerHTML = mensagem;
    codificacao.style.visibility = "visible";

}

export default { cifrarAtbashHTML, cifrarCesarHTML, cifrarVinegereHTML, gerarChavesRSA_DidaticasHTML, cifrarRSA_DidaticoHTML, decifrarRSA_DidaticoHTML }
