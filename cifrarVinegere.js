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

export default cifrarVigenere;
