import cifrasResouce from "./main.js";

const { 
    cifrarAtbashHTML, cifrarCesarHTML, cifrarVinegereHTML,
    gerarChavesRSA_DidaticasHTML, cifrarRSA_DidaticoHTML,
    decifrarRSA_DidaticoHTML, cifrarEsteganografiaHTML, decifrarEsteganografiaHTML
} = cifrasResouce;

document.querySelector("form").onsubmit = () => {
    event.preventDefault();
}

const cifra = document.getElementById("cifra");
const entrada = document.getElementById("entrada");

document.getElementById("cifrarAtbash").onclick = () => {
    cifrarAtbashHTML();
}

cifra.addEventListener("change", () => {

    document.getElementById("codificacao").innerText = ""

    switch(cifra.value){
        
        case "Atbash":

            document.getElementById("codificacao").style.visibility = "hidden";

            entrada.innerHTML = `
                <h3>Mensagem: </h3>
                <input type="text" required placeholder="Olá Mundo" id="mensagem">
                <input type="submit" id="cifrarAtbash" value="Cifrar">
            `;

            document.getElementById("cifrarAtbash").onclick = () => {
                cifrarAtbashHTML();
            }

            break;
        
        case "Cesar":
            
            document.getElementById("codificacao").style.visibility = "hidden";

            entrada.innerHTML = `
                <h3>Mensagem: </h3>
                <input type="text" required placeholder="Olá Mundo" id="mensagem">
                
                <h3>Deslocamento</h3>
                <input type="number" required placeholder="3" id="chave">
                <br>
                <input type="submit" id="cifrarCesar" value="Cifrar">
            `;

            document.getElementById("cifrarCesar").onclick = () => {
                cifrarCesarHTML();
            }

            break;
        
        case "Vinegere":
            
            document.getElementById("codificacao").style.visibility = "hidden";

            entrada.innerHTML = `
                <h3>Mensagem: </h3>
                <input type="text" required placeholder="Olá Mundo" id="mensagem">

                <h3>Chave</h3>
                <input type="text" required placeholder="CHAVE" id="chave">

                <h3>Opção</h3>
                    <select name="" id="modo">
                        <option value="codificar">Codificar</option>
                        <option value="decodificar">Decodificar</option>
                    </select>
                <br>
                <input type="submit" id="cifrarVinegere" value="Cifrar">
            `;

            document.getElementById("cifrarVinegere").onclick = () => {
                cifrarVinegereHTML();
            }

            break;
        
        case "RSA":
               
            document.getElementById("codificacao").style.visibility = "hidden";

            entrada.innerHTML = `
                
                <div id="containerOpcaoRSA">
                    <h3>Escolha uma opção: </h3>
                    <select name="" id="opcaoRSA">
                        <option value="criarChaves">Criar Chaves</option>
                        <option value="codificar">Codificar</option>
                        <option value="decodificar">Decodificar</option>
                    </select>
                    <input type="button" id="executar" value="Executar">
                </div>
            `
            
            document.getElementById("executar").onclick = () => {
                
                switch(opcaoRSA.value) {

                    case "criarChaves":
                        
                        const containerOpcaoRSA = document.getElementById("containerOpcaoRSA");
                        entrada.replaceChildren(containerOpcaoRSA);
                        
                        entrada.insertAdjacentHTML("beforeend" ,`
                            <h3>Insira dois números primos: </h3>
                            <input type="number" required min="17" placeholder="0" class="primo">
                            <br>
                            <input type="number" required min="17" placeholder="0" class="primo">
                            <br><br>
                            <input type="submit" id="btn_criarChaves" value="Criar chaves">
                        `);
                        
                        document.getElementById("btn_criarChaves").onclick = () => {
                            gerarChavesRSA_DidaticasHTML();
                        };
                        
                        break;
                    
                    case "codificar":
                        
                        entrada.replaceChildren(document.getElementById("containerOpcaoRSA"));

                        entrada.insertAdjacentHTML("beforeend", `                     
                            <h3>Mensagem: </h3>
                            <input type="text" required placeholder="Olá Mundo" id="mensagem" value="">
                            <br>
                            <h3>Chave Publica E: </h3>
                            <input type="number" required placeholder="0" id="chavePublicaE">
                            <br>
                            <h3>Chave Publica N: </h3>
                            <input type="number" required placeholder="0" id="chavePublicaN">
                            <br><br>
                            <input type="submit" id="btn_cifrarRSA" value="Cifrar">
                        `);

                        document.getElementById("btn_cifrarRSA").onclick = () => {
                            cifrarRSA_DidaticoHTML();
                        }

                        break;
                    
                    case "decodificar":
                        
                        entrada.replaceChildren(document.getElementById("containerOpcaoRSA"));

                        entrada.insertAdjacentHTML("beforeend", `                     
                            <h3>Cifra: </h3>
                            <input type="text" required placeholder="Ex: 0,0,0" id="mensagem" value="">
                            <br>
                            <h3>Chave Privada D: </h3>
                            <input type="number" required placeholder="0" id="chavePrivadaD">
                            <br>
                            <h3>Chave Privada N: </h3>
                            <input type="number" required placeholder="0" id="chavePrivadaN">
                            <br><br>
                            <input type="submit" id="btn_decifrarRSA" value="Cifrar">
                        `);

                        document.getElementById("btn_decifrarRSA").onclick = () => {
                            decifrarRSA_DidaticoHTML();
                        }

                        break;
                       
                }
                
            }
            
            break;
        
        case "Esteganografia":

            document.getElementById("codificacao").style.visibility = "hidden";
            
            entrada.innerHTML = `
                <select id="opcaoEsteg">
                    <option value="codificar">Codificar</option>
                    <option value="decodificar">Decodificar</option>
                </select>

            `
            
            entrada.insertAdjacentHTML("beforeend", `
                
                <h3>Mensagem Visivel: </h3>
                <input type="text" required placeholder="Olá, tudo bem com você" id="mascara">
                
                <h3>Mensagem não Visivel:</h3>
                <input type="text" required placeholder="Reunião hoje" id="esteg">
                <br>
                <input type="submit" id="cifrarEsteg" value="Esconder">
                
            `);
            
            document.getElementById("opcaoEsteg").onchange = () => {
                
                if(document.getElementById("opcaoEsteg").value == "decodificar") {
                    
                    if(document.getElementById("copy")) {
                        document.querySelector("form").removeChild(
                            document.getElementById("copy")
                        );
                    }

                    document.getElementById("codificacao").style.visibility = "hidden";
                    entrada.replaceChildren(document.getElementById("opcaoEsteg"));

                    entrada.insertAdjacentHTML("beforeend", `
                        
                        <h3>Mensagem: </h3>
                        <input type="text" required placeholder="Olá, tudo bem com você" id="mensagem">
                        
                        <br>
                        <input type="submit" id="decifrarEsteg" value="Revelar">
                        
                    `);

                    document.getElementById("decifrarEsteg").onclick = () => {
                        decifrarEsteganografiaHTML();
                    }
                    
                } else {

                    document.getElementById("codificacao").style.visibility = "hidden";
                    entrada.replaceChildren(document.getElementById("opcaoEsteg"));

                    entrada.insertAdjacentHTML("beforeend", `
                        
                        <h3>Mensagem Visivel: </h3>
                        <input type="text" required placeholder="Olá, tudo bem com você" id="mascara">
                        
                        <h3>Mensagem não Visivel:</h3>
                        <input type="text" required placeholder="Reunião hoje" id="esteg">
                        <br>
                        <input type="submit" id="cifrarEsteg" value="Esconder">
                        
                    `);

                    document.getElementById("cifrarEsteg").onclick = () => {
                        cifrarEsteganografiaHTML();
                    }

                }

            }

            document.getElementById("cifrarEsteg").onclick = () => {
                cifrarEsteganografiaHTML();
            }

            break; 
        
    }
    
});

if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
    document.getElementById("cifra").value = "Atbash";
}
