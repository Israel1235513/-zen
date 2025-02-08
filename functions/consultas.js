const axios = require('axios');

async function ip(query) {
    try {
        if (!query || query.trim() === "") {
            console.warn("Cadê o IP?");
            process.exit();
        }
        if (/^0+\.0+\.0+\.0+$/.test(query) || !query.includes('.')) {
            console.warn("IP inválido.");
            process.exit();
        }
        
        let response = await axios.get(`https://ipinfo.io/${query}/json`);
        let result = response.data;
        delete result.readme;
        result.criador = "Zenitsu Modz";
        
        if (typeof modifyCallback === 'function') {
            const modified = modifyCallback({ response, result });
            if (modified && typeof modified === 'object') {
            if (modified.response) response = modified.response;
            if (modified.result) result = modified.result;
            }
        }
        
        return { response, result };
    } catch (error) {
        console.error("Erro ao buscar informações do IP:", error);
    }
}

async function cnpj(query) {
    try {
        if (!query || query.trim() === "" || !/^[0-9]{14}$/.test(query)) {
            console.warn("CNPJ inválido.");
            process.exit()
        }

        const response = await axios.get(`https://consulta-cnpj-gratis.p.rapidapi.com/office/${query}?simples=false`, {
            headers: {
                'x-rapidapi-key': 'fd037b8facmsh61e6d0d492201fap10adfdjsn9930a4b6db22',
                'x-rapidapi-host': 'consulta-cnpj-gratis.p.rapidapi.com'
            }
        });

        let result = response.data;
        result.criador = "Zenitsu Modz";
        
        if (typeof modifyCallback === 'function') {
            const modified = modifyCallback({ response, result });
            if (modified && typeof modified === 'object') {
            if (modified.response) response = modified.response;
            if (modified.result) result = modified.result;
            }
        }
        
        return { response, result };
    } catch (error) {
        console.error("Erro ao buscar informações do CNPJ:", error);
    }
}

module.exports = { ip, cnpj };
