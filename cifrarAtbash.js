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

export default cifrarAtbash;
