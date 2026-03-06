const letras = "abcdefghijklmnopqrstuvwxyz";

const cifrarAtbash = (mensagem) => {

    let msg_cifrada = ''

    for(let i = 0; i < mensagem.length; i++) {
        
        let caractere = mensagem[i];

        var maiuscula = false;
        if(!(letras.indexOf(caractere) >= 0)) {
            caractere = caractere.toLowerCase();
            maiuscula = true; 
        }

        let index = letras.indexOf(caractere);
        let charCifrado = letras.charAt( (letras.length - 1) - index); 
        
        if(maiuscula) {
            caractere = caractere.toUpperCase();
            charCifrado = charCifrado.toUpperCase();
        }

        if(letras.indexOf(caractere.toLowerCase()) == -1) {
            msg_cifrada = msg_cifrada.concat(caractere);
        } else {
            msg_cifrada = msg_cifrada.concat(charCifrado);
        }
        
    }

    return msg_cifrada;
}

const cifrarCesar = (mensagem, chave) => {

    let msg_cifrada = '';

    for(let i = 0; i < mensagem.length; i++) {
        
        let caractere = mensagem[i];

        var maiuscula = false;
        if(!(letras.indexOf(caractere) >= 0)) {
            caractere = caractere.toLowerCase();
            maiuscula = true; 
        }

        let index = letras.indexOf(caractere); 
        novoIndex = index + chave;
            
        (novoIndex < 0) ? novoIndex = letras.length + novoIndex : null;

        // Novo Índice = ( Índice Original + Chave ) ( mod 26 ) 
        (novoIndex > letras.length - 1) ? novoIndex = (index + chave) % letras.length : null;
        
        let charCifrado = letras.charAt(novoIndex);

        if(maiuscula) {
            caractere = caractere.toUpperCase();
            let charCifrado = charCifrado.toUpperCase();
        }

        if(letras.indexOf(caractere.toLowerCase()) == -1) {
            msg_cifrada = msg_cifrada.concat(caractere);
        } else {
            msg_cifrada = msg_cifrada.concat(charCifrado);
        }

    }

    return msg_cifrada;

}

const cifrarVigenere = (mensagem, palavraChave, modo = 'codificar') => {
    
    let msg_cifrada = '';
    let chave = palavraChave.toLowerCase();
    let chaveAlterada = chave;
    let i = 0;
    
    // Montar chave
    for(let j = palavraChave.length; j < mensagem.length; j++) {
        
        if(i >= palavraChave.length) i = 0;
        
        chaveAlterada = chaveAlterada.concat(chave[i]);
        i++
        
    }
    
    // Cifrar mensagem    
    for(let k = 0; k < mensagem.length; k++) {
        
        let caractere = mensagem[k];

        var maiuscula = false;
        if(!(letras.indexOf(caractere) >= 0)) {
            caractere = caractere.toLowerCase();
            maiuscula = true; 
        }

        // Obter letra de inicio da linha da Grade de Vigenere
        let indiceInico = letras.indexOf(chaveAlterada[k]);
        
        // Montar a linha horizontal de acordo com a letra de inicio
        let linhaIndex  = letras.substring(indiceInico, letras.length);
        
        // Completar a linha horizontal com o pedaço faltando
        linhaIndex  = linhaIndex + letras.substring(0, indiceInico);
        
        // Buscar indice da letra para cifrar a mensagem
        // cifrar   -> Ci = Pi + Ki (mod 26)
        // decifrar -> Ci = Pi - Ki + 26 (mode 26)
        
        let indiceMensagem = letras.indexOf(caractere);
        let indiceChaveAlt = letras.indexOf(chaveAlterada[k]); 

        let indiceCifra = '';

        if(modo == 'codificar') {
            indiceCifra = (indiceMensagem + indiceChaveAlt) % 26;
        } else {
            indiceCifra = (indiceMensagem - indiceChaveAlt + 26) % 26;
        }
        
        let charCifrado = letras.charAt(indiceCifra);

        if(maiuscula) {
            caractere = caractere.toUpperCase();
            charCifrado = charCifrado.toUpperCase();
        }

        if(letras.indexOf(caractere.toLowerCase()) == -1) {
            msg_cifrada = msg_cifrada.concat(caractere);
        } else {
            msg_cifrada = msg_cifrada.concat(charCifrado);
        }
        
    } 
    
    return msg_cifrada;
    
}

/* * FUNÇÃO FORNECIDA - NÃO É NECESSÁRIO MODIFICAR. */
function gerarChavesRSA_Didaticas(p, q) {
    if (p <= 1 || q <= 1) return null; 
    
    const N = p * q;
    const phi_N = (p - 1) * (q - 1);
    
    let E = 3;
    while (E < phi_N) {
        // Encontrar o primeiro E que é coprimo de phi_N
        if ((phi_N % E !== 0) && ((p - 1) % E !== 0) && ((q - 1) % E !== 0)) {
             // Otimização: A verificação (p-1)%E e (q-1)%E não é rigorosamente a do RSA, 
             // mas é didática e evita fatores óbvios para primos pequenos.
            break;
        }
        E++;
    }

    let D = 1;
    while (D < phi_N) {
        // Encontrar D tal que (D * E) % phi_N === 1
        if ((D * E) % phi_N === 1) {
            break;
        }
        D++;
    }
    
    return {
        publica: { E, N }, // Use E e N para CIFRAR
        privada: { D, N }  // Use D e N para DECIFRAR
    };
}

/**
 * Cifra a mensagem usando a chave pública (E, N).
 * @param {string} mensagem - O texto a ser cifrado.
 * @param {number} E - Expoente Público.
 * @param {number} N - Módulo.
 * @returns {number[]} Array de números (os códigos cifrados).
 */
function cifrarRSA_Didatico(mensagem, E, N) {

    let codigosCifrados = [];

    mensagem.split('').forEach(caractere => {

        let charCode = caractere.charCodeAt();
        let caractereCifrado = (charCode ** E) % N;
        
        codigosCifrados.push(caractereCifrado);

    })

    return codigosCifrados;

}

/**
 * Decifra o array de números usando a chave privada (D, N).
 * @param {number[]} mensagemCifrada - Array de números cifrados.
 * @param {number} D - Expoente Privado.
 * @param {number} N - Módulo.
 * @returns {string} A string original.
 */
function decifrarRSA_Didatico(mensagemCifrada, D, N) {
    
    let mensagemDecifrada = '';

    mensagemCifrada.forEach(charCode => {
        
        const charCodeDecifrado = BigInt(BigInt(charCode) ** BigInt(D)) % BigInt(N);
        
        // Exponenciação modular
        const charCodeAscii = String.fromCharCode(Number(charCodeDecifrado));
        
        mensagemDecifrada = mensagemDecifrada.concat(charCodeAscii);

    })

    return mensagemDecifrada;

}

// Atbash:

console.log(cifrarAtbash("OlaMundo"));
console.log(cifrarAtbash("LozNfmwl"));

// César:

console.log(cifrarCesar("criptografia", 3)); // Esperado:  "fulswrjudild"
console.log(cifrarCesar("fulswrjudild", -3)); // Esperado: "criptografia"

// Vigenère:

const chaveV = "CHAVE";
const codificadoV = cifrarVigenere("Enigma!", chaveV, 'codificar'); 
console.log(codificadoV); // Ex: "Guibqc!"
console.log(cifrarVigenere(codificadoV, chaveV, 'decodificar')); // Esperado: "Enigma!"

// RSA (Usar a função gerarChavesRSA_Didaticas):

const PRIMO_1 = 17;
const PRIMO_2 = 19;
const CHAVES = gerarChavesRSA_Didaticas(PRIMO_1, PRIMO_2); 

const textoOriginal = "OLA"; 

// 1. Cifrar com a Chave Pública
const cifrado = cifrarRSA_Didatico(textoOriginal, CHAVES.publica.E, CHAVES.publica.N);
console.log("RSA Cifrado:", cifrado); // Array de números

// 2. Decifrar com a Chave Privada
const decifrado = decifrarRSA_Didatico(cifrado, CHAVES.privada.D, CHAVES.privada.N);
console.log("RSA Decifrado:", decifrado); // Esperado: "OLA"
