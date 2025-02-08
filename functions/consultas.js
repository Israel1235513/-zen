const axios = require('axios');

async function ip(query) {
    try {
        const response = await axios.get(`https://ipinfo.io/${query}/json`);
        const result = response.data;
        delete result.readme
        result.criador = "Zenitsu Modz";

        return result;
    } catch (error) {
        console.error("Erro ao buscar informações do IP:", error);
    }
}

async function cnpj(query) {
    try {
        const response = await axios.get(`https://consulta-cnpj-gratis.p.rapidapi.com/office/${query}?simples=false`, {
            headers: {
                'x-rapidapi-key': 'fd037b8facmsh61e6d0d492201fap10adfdjsn9930a4b6db22',
                'x-rapidapi-host': 'consulta-cnpj-gratis.p.rapidapi.com'
            }
        });

        const result = response.data;
        result.criador = "Zenitsu Modz";

        return result;
    } catch (error) {
        console.error("Erro ao buscar informações do CNPJ:", error);
    }
}

module.exports = { ip, cnpj };
