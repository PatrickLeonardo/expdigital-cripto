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
console.log(CHAVES);
const cifrado = cifrarRSA_Didatico(textoOriginal, CHAVES.publica.E, CHAVES.publica.N);
console.log("RSA Cifrado:", cifrado); // Array de números

// 2. Decifrar com a Chave Privada
const decifrado = decifrarRSA_Didatico(cifrado, CHAVES.privada.D, CHAVES.privada.N);
console.log("RSA Decifrado:", decifrado); // Esperado: "OLA"
