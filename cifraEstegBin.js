const codifica_esteg = (textoVisivel, mensagem) => {   

    const esteg_binary = toBin(mensagem);

    for(let i = 0; i < esteg_binary.length; i++) {

        if(esteg_binary.charAt(i) == "0") {
            textoVisivel = textoVisivel + "\u202D";
        }
        else {
            textoVisivel = textoVisivel + "\u202C";
        }

    };

    return textoVisivel;

}

const decodifica_esteg = (textoCodificado) => {

    let msg = "";
    let result = "";

    for(let i = 0; i < textoCodificado.length; i++) {
        
        if(textoCodificado.charAt(i) == "\u202D") {
            result = result + "0";
        }
        else if(textoCodificado.charAt(i) == "\u202C") {
            result = result + "1";
        }

    }

    for(let j = 0; j <= result.length; j+=8) {

        let byte = result.substring(j, j+8);
        let decimal = parseInt(byte, 2);
        let string = String.fromCharCode(decimal);

        msg = msg + string;

    }

    return msg;

}

function toBin(text) {
    
    let output = [];

    text.split("").forEach(char => {

        const bin = char.charCodeAt(0).toString(2);
        output.push(Array(8 - bin.length + 1).join("0") + bin);
        
    });

    return output.toString().replaceAll(",", "");

}

export {codifica_esteg, decodifica_esteg }; 
