import * as cifraEstegHex from "./cifraEstegHex.js";
import * as cifraEstegBin from "./cifraEstegBin.js";
import cifrarAtbash from "./cifrarAtbash.js";
import cifrarCesar from "./cifrarCesar.js";
import cifraRSA from "./cifraRSA.js";
import cifrarVigenere from "./cifrarVinegere.js";

const cifrarAtbashHTML = () => {
    
    const mensagem = document.getElementById("mensagem").value;
    if(mensagem === "") return 0;
    
    const cifra = cifrarAtbash(mensagem);
    const codificacao = document.getElementById("codificacao");
    codificacao.innerHTML = cifra;
    codificacao.style.visibility = "visible";

}

const cifrarCesarHTML = () => {
    
    const mensagem = document.getElementById("mensagem").value;
    const chave = document.getElementById("chave").value;

    if(mensagem === "" || chave === "") return 0;

    const cifra = cifrarCesar(mensagem, Number(chave));
    const codificacao = document.getElementById("codificacao")

    codificacao.innerHTML = cifra;
    codificacao.style.visibility = "visible";

}

const cifrarVinegereHTML = () => {

    const mensagem = document.getElementById("mensagem").value;
    const chave = document.getElementById("chave").value;
    const modo = document.getElementById("modo").value;
    
    if(mensagem === "" || chave === "") return 0;

    const cifra = cifrarVigenere(mensagem, chave, modo);
    const codificacao = document.getElementById("codificacao")

    codificacao.innerHTML = cifra;
    codificacao.style.visibility = "visible";

}

const gerarChavesRSA_DidaticasHTML = () => {
     
    const primo1 = Number(document.getElementsByClassName("primo")[0].value);
    const primo2 = Number(document.getElementsByClassName("primo")[1].value);
    
    if(primo1 == "" || primo2 == "") return 0;
    else if(primo1 < "17" || primo2 < "17") return 0;

    if(primo1 === primo2) {
        alert("Insira números primos diferentes...");
        return 0;
    }

    const CHAVES = cifraRSA.gerarChavesRSA_Didaticas(primo1, primo2);
    
    const chavePublica = CHAVES.publica;
    const chavePrivada = CHAVES.privada;

    const codificacao = document.getElementById("codificacao"); 
    codificacao.innerHTML = `Chave Publica: E = ${chavePublica.E} N = ${chavePublica.N}<hr>`
    codificacao.innerHTML += `Chave Privada: D = ${chavePrivada.D} N = ${chavePrivada.N}`
    codificacao.style.visibility = "visible";

}

const cifrarRSA_DidaticoHTML = () => {
    
    const mensagem = document.getElementById("mensagem").value;
    const chavePublicaE = Number(document.getElementById("chavePublicaE").value);
    const chavePublicaN = Number(document.getElementById("chavePublicaN").value);

    if(mensagem === "" || chavePublicaE == "" || chavePublicaN == "") return 0;

    const cifra = cifraRSA.cifrarRSA_Didatico(mensagem, chavePublicaE, chavePublicaN);

    const codificacao = document.getElementById("codificacao")
    codificacao.innerHTML = cifra;
    codificacao.style.visibility = "visible";

}

const decifrarRSA_DidaticoHTML = () => {

    const cifra = document.getElementById("mensagem").value.split(",");
    const chavePrivadaD = Number(document.getElementById("chavePrivadaD").value);
    const chavePrivadaN = Number(document.getElementById("chavePrivadaN").value);

    const mensagem = cifraRSA.decifrarRSA_Didatico(cifra, chavePrivadaD, chavePrivadaN);

    const codificacao = document.getElementById("codificacao")
    codificacao.innerHTML = mensagem;
    codificacao.style.visibility = "visible";

}

const cifrarEsteganografiaHTML = () => {

    const modo = document.getElementById("modoEsteg").value;
    const mascara = document.getElementById("mascara").value;
    const esteg = document.getElementById("esteg").value;
    
    let texto_mascarado = ""; 

    if(modo == "hex") {
        texto_mascarado = cifraEstegHex.codifica_esteg(mascara, esteg);
    } else {
        texto_mascarado = cifraEstegBin.codifica_esteg(mascara, esteg);
    }

    const codificacao = document.getElementById("codificacao")

    codificacao.innerHTML = texto_mascarado;
    codificacao.style.visibility = "visible";

    const copyBtn = document.createElement("button");
    copyBtn.innerHTML = "Copiar"
    copyBtn.id = "copy";
    copyBtn.style.backgroundColor = "linen";
    copyBtn.style.color = "rgb(20, 20, 20)";

    copyBtn.onclick = () => {

        navigator.clipboard.writeText(codificacao.innerHTML);
        
        const notification = document.createElement("span");

        notification.innerHTML = "Copiado...";
        notification.className = "notification"
        
        while(true) {
            
            if(document.getElementsByClassName("notification").length == 0) { 
                
                document.querySelector("body").appendChild(notification);
                break;

            } else {
                
                document.querySelector("body").removeChild(
                    document.getElementsByClassName("notification")[0]
                );
                
            }

        }

    }
    
    if(document.getElementById("copy") == null) {
        document.querySelector("form").appendChild(copyBtn);
    }

}

const decifrarEsteganografiaHTML = () => {
    
    const modo = document.getElementById("modoEsteg").value;

    const esteg = document.getElementById("mensagem").value;    
    let texto_desmascarado = "";

    if(modo == "hex") {
        texto_desmascarado = cifraEstegHex.decodifica_esteg(esteg);
    } else {
        texto_desmascarado = cifraEstegBin.decodifica_esteg(esteg);
    }

    const codificacao = document.getElementById("codificacao")

    codificacao.innerHTML = texto_desmascarado;
    codificacao.style.visibility = "visible";

}

export default { 
    cifrarAtbashHTML, cifrarCesarHTML, cifrarVinegereHTML,
    gerarChavesRSA_DidaticasHTML, cifrarRSA_DidaticoHTML, 
    decifrarRSA_DidaticoHTML, cifrarEsteganografiaHTML, decifrarEsteganografiaHTML
};
