import cifrasResouce from './main.js';
const { cifrarAtbashHTML, cifrarCesarHTML, cifrarVinegereHTML, gerarChavesRSA_DidaticasHTML, cifrarRSA_DidaticoHTML, decifrarRSA_DidaticoHTML } = cifrasResouce;

const cifra = document.getElementById('cifra');
const entrada = document.getElementById('entrada');

document.getElementById('cifrarAtbash').onclick = () => {
    cifrarAtbashHTML();
}

cifra.addEventListener("change", () => {

    document.getElementById('codificacao').innerText = ""

    switch(cifra.value){
        
        case 'Atbash':

            document.getElementById('codificacao').style.visibility = 'hidden';

            entrada.innerHTML = `
                <h3>Mensagem: </h3>
                <input type="text" name="" id="mensagem">
                <input type="submit" id="cifrarAtbash" value="Cifrar">
            `;

            document.getElementById('cifrarAtbash').onclick = () => {
                cifrarAtbashHTML();
            }

            break;
        
        case 'Cesar':
            
            document.getElementById('codificacao').style.visibility = 'hidden';

            entrada.innerHTML = `
                <h3>Mensagem: </h3>
                <input type="text" name="" id="mensagem">
                
                <h3>Deslocamento</h3>
                <input type="number" name="" id="chave">
                <br>
                <input type="submit" id="cifrarCesar" value="Cifrar">
            `;

            document.getElementById('cifrarCesar').onclick = () => {
                cifrarCesarHTML();
            }

            break;
        
        case 'Vinegere':
            
            document.getElementById('codificacao').style.visibility = 'hidden';

            entrada.innerHTML = `
                <h3>Mensagem: </h3>
                <input type="text" name="" id="mensagem">

                <h3>Chave</h3>
                <input type="text" name="" id="chave">

                <h3>Opção</h3>
                    <select name="" id="modo">
                        <option value="codificar">Codificar</option>
                        <option value="decodificar">Decodificar</option>
                    </select>
                <br>
                <input type="submit" id="cifrarVinegere" value="Cifrar">
            `;

            document.getElementById('cifrarVinegere').onclick = () => {
                cifrarVinegereHTML();
            }

            break;
        
        case 'RSA':
               
            document.getElementById('codificacao').style.visibility = 'hidden';

            entrada.innerHTML = `
                
                <div id="containerOpcaoRSA">
                    <h3>Escolha uma opção: </h3>
                    <select name="" id="opcaoRSA">
                        <option value="criarChaves">Criar Chaves</option>
                        <option value="codificar">Codificar</option>
                        <option value="decodificar">Decodificar</option>
                    </select>
                    <input type="submit" id="executar" value="Executar">
                </div>
            `
            
            //const btnExecutar = document.createElement('input');
            //btnExecutar.value = "Executar";
            //btnExecutar.type = "submit";

            //entrada.appendChild(btnExecutar);

            
            document.getElementById("executar").onclick = () => {
                
                switch(opcaoRSA.value) {

                    case 'criarChaves':
                        
                        const containerOpcaoRSA = document.getElementById('containerOpcaoRSA');
                        entrada.replaceChildren(containerOpcaoRSA);
                        
                        entrada.insertAdjacentHTML('beforeend' ,`
                            <h3>Insira dois números primos: </h3>
                            <input type="number" name="" class="primo" value="3">
                            <br>
                            <input type="number" name="" class="primo" value="3">
                            <br><br>
                            <input type="submit" id='btn_criarChaves' value="Criar chaves">
                        `);
                        
                        document.getElementById('btn_criarChaves').onclick = () => {
                            gerarChavesRSA_DidaticasHTML();
                        };
                        
                        break;
                    
                    case 'codificar':
                        
                        entrada.replaceChildren(document.getElementById('containerOpcaoRSA'));


                        entrada.insertAdjacentHTML('beforeend', `                     
                            <h3>Mensagem: </h3>
                            <input type="text" name="" id="mensagem" value="">
                            <br>
                            <h3>Chave Publica E: </h3>
                            <input type="number" name="" id="chavePublicaE" value="0">
                            <br>
                            <h3>Chave Publica N: </h3>
                            <input type="number" name="" id="chavePublicaN" value="0">
                            <br><br>
                            <input type="submit" id='btn_cifrarRSA' value="Cifrar">
                        `);

                        document.getElementById('btn_cifrarRSA').onclick = () => {
                            cifrarRSA_DidaticoHTML();
                        }

                        break;
                    
                    case 'decodificar':
                        
                        entrada.replaceChildren(document.getElementById('containerOpcaoRSA'));

                        entrada.insertAdjacentHTML('beforeend', `                     
                            <h3>Cifra: </h3>
                            <input type="text" name="" id="mensagem" value="">
                            <br>
                            <h3>Chave Privada D: </h3>
                            <input type="number" name="" id="chavePrivadaD" value="0">
                            <br>
                            <h3>Chave Privada N: </h3>
                            <input type="number" name="" id="chavePrivadaN" value="0">
                            <br><br>
                            <input type="submit" id='btn_decifrarRSA' value="Cifrar">
                        `);

                        document.getElementById('btn_decifrarRSA').onclick = () => {
                            decifrarRSA_DidaticoHTML();
                        }

                        break;
                       
                }
                
            }
            
            break;
        
    }
    
});
