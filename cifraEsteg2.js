const codifica_esteg = (textoVisivel, mensagem) => {   

    const esteg_hex = toHex(mensagem);

    for(let i = 0; i < esteg_hex.length; i++) {

        for(let j = 0; j <= 1; j++) {
            
            let zwsp_simbol = "";
            
            switch(esteg_hex[i][j]) {
                
                case "0":
                    zwsp_simbol = "\u200B";
                    break;
                case "1":
                    zwsp_simbol = "\u200C";
                    break;
                case "2":
                    zwsp_simbol = "\u200D";
                    break;
                case "3":
                    zwsp_simbol = "\u200E";
                    break;
                case "4":
                    zwsp_simbol = "\u200F"
                    break;
                case "5":
                    zwsp_simbol = "\u202A";
                    break;
                case "6":
                    zwsp_simbol = "\u202B";
                    break;
                case "7":
                    zwsp_simbol = "\u202C";
                    break;
                case "8":
                    zwsp_simbol = "\u202D";
                    break;
                case "9":
                    zwsp_simbol = "\u202E";
                    break;
                case "a":
                    zwsp_simbol = "\u2060";
                    break;
                case "b":
                    zwsp_simbol = "\u2066";
                    break;
                case "c":
                    zwsp_simbol = "\u2067";
                    break;
                case "d":
                    zwsp_simbol = "\u2068";
                    break;
                case "e":
                    zwsp_simbol = "\u2069";
                    break;
                case "f":
                    zwsp_simbol = "\u00AD";
                    break;
                
            }

            textoVisivel = textoVisivel + zwsp_simbol;
            
        }
        
    };

    return textoVisivel;

}

const decodifica_esteg = (textoCodificado) => {

    let msg = "";
    let result = "";

    for(let i = 0; i < textoCodificado.length; i++) { 
         
        switch(textoCodificado[i]) {
             
            case "\u200C":
                result = result + "1"; break;
            case "\u200D":
                result = result + "2"; break;
            case "\u200E":
                result = result + "3"; break;
            case "\u200F":
                result = result + "4"; break;
            case "\u202A":
                result = result + "5"; break;
            case "\u202B":
                result = result + "6"; break;
            case "\u202C":
                result = result + "7"; break;
            case "\u202D":
                result = result + "8"; break;
            case "\u202E":
                result = result + "9"; break;
            case "\u2060":
                result = result + "a"; break;
            case "\u2066":
                result = result + "b"; break;
            case "\u2067":
                result = result + "c"; break;
            case "\u2068":
                result = result + "d"; break;
            case "\u2069":
                result = result + "e"; break;
            case "\u00AD":
                result = result + "f"; break;
            
        }

    }

    for(let j = 0; j <= result.length; j+=2) {

        let hex = result.substring(j, j+2);
        let decimal = parseInt(hex, 16);
        let string = String.fromCharCode(decimal);

        msg = msg + string;

    }

    return msg;

}

function toHex(text) {
    
    let output = [];

    text.split("").forEach(char => {

        const hex = char.charCodeAt(0).toString(16);
        output.push(hex);
        
    });

    return output;

}

export {codifica_esteg, decodifica_esteg }; 
