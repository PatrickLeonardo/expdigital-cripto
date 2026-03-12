# ✨ Desafio: Criptografia Clássica em JavaScript

Integrantes: Patrick Leonardo - RA: 825142332

Projeto hospedado: https://patrickleonardo.github.io/expdigital-cripto/

# Objetivo

Implementar quatro das cifras mais importantes da história da criptografia. Reforçar conhecimento sobre programação usando Javascript: funções, laços de repetição (for), arrays, manipulação de strings (ASCII) e aritmética modular (%).

## Requisitos Gerais

1. <b>Funções Javascript Vanilla:</b> Todas as funções devem usar apenas os recursos disponíveis no javascript puro, sem usar bibliotecas externas.
2. <b>Alfabeto:</b> Considere apenas as 26 letras do alfabeto inglês (A-Z, a-z).
3. <b>Tratamento de Não-Letras:</b> Espaços, números e pontuações devem ser mantidos inalterados no texto cifrado.
4. <b>Caixa (Case):</b> O case (maiúsculo/minúsculo) das letras deve ser preservado.

<hr>

## Parte 1: Cifra Atbash (O Desafio do Mapeamento Oposto)

A Cifra Atbash é a mais simples das cifras de substituição, sendo recíproca (a codificação é a mesma que a decodificação): A ↔ Z, B ↔ Y, C ↔ X, etc.

### Função Implementada:

```js
const cifrarAtbash = (mensagem) => {
    
    const letras = "abcdefghijklmnopqrstuvwxyz";
    let msg_cifrada = ""

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
```

<hr>

## Parte 2: Cifra de César (O Desafio do Deslocamento Fixo)

A Cifra de César desloca cada letra por um número fixo de posições (a chave).

### Função Implementada:

```js
const cifrarCesar = (mensagem, chave) => {

    const letras = "abcdefghijklmnopqrstuvwxyz";
    let msg_cifrada = "";

    for(let i = 0; i < mensagem.length; i++) {
        
        let caractere = mensagem[i];

        var maiuscula = false;
        if(!(letras.indexOf(caractere) >= 0)) {
            caractere = caractere.toLowerCase();
            maiuscula = true; 
        }

        let index = letras.indexOf(caractere); 
        let novoIndex = index + chave;
         
        (novoIndex < 0) ? novoIndex = letras.length + novoIndex : null;

        // Novo Índice = ( Índice Original + Chave ) ( mod 26 ) 
        (novoIndex > letras.length - 1) ? novoIndex = (index + chave) % letras.length : null;
        
        let charCifrado = letras.charAt(novoIndex);

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
```

Fórmula Essencial (Deslocamento Circular):

$$\text{Novo Índice} = (\text{Índice Original} + \text{Chave}) \pmod{26}$$

<hr>

## Parte 3: Cifra de Vigenère (O Desafio da Chave Variável e Cíclica)

A Cifra de Vigenère usa uma palavraChave para aplicar múltiplos deslocamentos da Cifra de César, de forma cíclica.

### Função Implementada:

```js
const cifrarVigenere = (mensagem, palavraChave, modo = "codificar") => {
    
    const letras = "abcdefghijklmnopqrstuvwxyz";
    let msg_cifrada = "";

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

        let indiceCifra = "";

        if(modo == "codificar") {
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
```

Dica Essencial: Você precisará de dois índices no seu laço: um para a mensagem e um índice separado (e modular) para a chave. O índice da chave só deve avançar se o caractere da mensagem for uma letra.

<hr>

## Parte 4: Criptografia RSA (O Desafio da Chave Pública/Privada)

O RSA é um sistema de chave assimétrica. Implementaremos o algoritmo focando na lógica matemática, usando chaves didáticas pequenas.
O Contexto Essencial (Confidencialidade)

Neste desafio, você simulará a comunicação segura:

Cifragem: O remetente usa a Chave Pública (E, N) do destinatário.

Decifragem: O destinatário usa sua Chave Privada (D, N) secreta para ler a mensagem.
Geração de Chaves (Função Fornecida)

Utilize a seguinte função para gerar o par de chaves que você usará nas funções de cifragem e decifragem.

```js
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
```

### Funções Implementadas:

1. Codificação (Usando a Chave Pública do Destinatário)

```js
/**
 * Cifra a mensagem usando a chave pública (E, N).
 * @param {string} mensagem - O texto a ser cifrado.
 * @param {number} E - Expoente Público.
 * @param {number} N - Módulo.
 * @returns {number[]} Array de números (os códigos cifrados).
 */
static cifrarRSA_Didatico(mensagem, E, N) {

    let codigosCifrados = [];

    mensagem.split("").forEach(caractere => {

        let charCode = caractere.charCodeAt();
        let caractereCifrado = (BigInt(charCode) ** BigInt(E)) % BigInt(N);
        
        codigosCifrados.push(caractereCifrado);

    });

    return codigosCifrados;

}
```

#### Fórmula de Cifragem: (Para cada código ASCII/Unicode x)

$$\text{Cifrado} = x^E \pmod{N}$$

2. Decodificação (Usando a Chave Privada do Destinatário)

```js
/**
 * Decifra o array de números usando a chave privada (D, N).
 * @param {number[]} mensagemCifrada - Array de números cifrados.
 * @param {number} D - Expoente Privado.
 * @param {number} N - Módulo.
 * @returns {string} A string original.
 */
static decifrarRSA_Didatico(mensagemCifrada, D, N) {
    
    let mensagemDecifrada = "";

    mensagemCifrada.forEach(charCode => {
        
        const charCodeDecifrado = BigInt(BigInt(charCode) ** BigInt(D)) % BigInt(N);
        
        // Exponenciação modular
        const charCodeAscii = String.fromCharCode(Number(charCodeDecifrado));
        
        mensagemDecifrada = mensagemDecifrada.concat(charCodeAscii);

    });

    return mensagemDecifrada;

}
```

#### Fórmula de Decifragem: (Para cada número cifrado C)

$$\text{Original} = C^D \pmod{N}$$

<hr>

#### Teste de Validação Final

Execute os testes a seguir para garantir que todas as suas funções estão corretas:

```sh
node test/teste.js
```

```js
import cifrarAtbash from "../cifrarAtbash.js";
import cifrarCesar from "../cifrarCesar.js";
import cifraRSA from "../cifraRSA.js";
import cifrarVigenere from "../cifrarVinegere.js";

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
const CHAVES = cifraRSA.gerarChavesRSA_Didaticas(PRIMO_1, PRIMO_2); 

const textoOriginal = "OLA";

// 1. Cifrar com a Chave Pública
console.log(CHAVES);
const cifrado = cifraRSA.cifrarRSA_Didatico(textoOriginal, CHAVES.publica.E, CHAVES.publica.N);
console.log("RSA Cifrado:", cifrado); // Array de números

// 2. Decifrar com a Chave Privada
const decifrado = cifraRSA.decifrarRSA_Didatico(cifrado, CHAVES.privada.D, CHAVES.privada.N);
console.log("RSA Decifrado:", decifrado); // Esperado: "OLA"
```
