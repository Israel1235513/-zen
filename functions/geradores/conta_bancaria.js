const axios = require("axios");
const cheerio = require("cheerio");

const limparTexto = (texto) => {
    return texto.replace(/[<>/():]/g, '').trim(); // Remove os caracteres especiais e espaços extras
};

const url = 'https://www.4devs.com.br/ferramentas_online.php';

const config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0',
    }
};

const toUrlEncoded = (obj) =>
    Object.keys(obj).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])).join('&');

const request = async (method, params) => {
    params['acao'] = method;
    try {
        return await axios.post(url, toUrlEncoded(params), config);
    } catch (error) {
        console.error('Erro:', error);
    }
};

const gerador = async (method, params) => {
    const result = await request(method, params);
    if (!result || !result.data) return console.error('Erro na requisição');
    
    const contentType = result.headers['content-type'];
    if (contentType.includes('html')) {
        const $ = cheerio.load(result.data);

        // Usando .text() ao invés de .val()
        const contaCorrente = limparTexto($('#conta_corrente').text());
        const agencia = limparTexto($('#agencia').text());
        const banco = limparTexto($('#banco').text());
        const cidade = limparTexto($('#cidade').text());
        const estado = limparTexto($('#estado').text());

        console.log({
            contaCorrente,
            agencia,
            banco,
            cidade,
            estado
        });
    } else {
        console.log(result.data);  // Exibe o conteúdo direto se não for HTML
    }
};

const params = {  // Parâmetros para gerar dados
    sexo: 'I',
    pontuacao: 'S',
    txt_qtde: 1,
    idade: 1,
};

// Gerador específico para conta bancária
const gerarbanco = (type) => {
    switch (type) {
        case 'conta_bancaria':
            return gerador('gerar_conta_bancaria', params);
        default:
            console.error('Tipo não reconhecido');
            return;
    }
};

module.exports = { gerarbanco };
