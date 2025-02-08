const axios = require('axios');

const url = 'https://www.4devs.com.br/ferramentas_online.php';

const {gerarempresa} = require('./geradores/empresa.js')
const {gerarbanco} = require('./geradores/conta_bancaria.js')
const {gerarveiculo} = require('./geradores/veiculo.js')

const limparTexto = (texto) => {
    return texto.replace(/[<>/():]/g, '').trim(); // Remove os caracteres especiais e espaços extras
  };

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
        console.log(result.data);  // Exibe o conteúdo HTML gerado
        return result;
    } else {
        console.log(result.data);  // Exibe o conteúdo JSON gerado
        return result;
    }
};

// Parâmetros comuns para geração
const params = {  // Gerar com pontuação
    sexo: 'I',
    pontuacao: 'S',
    txt_qtde: 1,
    idade: 1,
}

// Geradores específicos com base no tipo
const gerar = (type) => {
    switch (type) {
        case 'pessoa':
            return gerador('gerar_pessoa', params);
        case 'placa':
            return gerador('gerar_placa', params);
        case 'empresa':
            return gerarempresa('empresa');  // Chama a função gerarempresa corretamente
        case 'veiculo':
            return gerarveiculo('veiculo');
        case 'conta_bancaria':
            return gerarbanco('conta_bancaria');  // Chama a função gerarbanco corretamente
        case 'renavam':
            return gerador('gerar_renavam', params);
        case 'cpf':
            return gerador('gerar_cpf', params);
        case 'cnpj':
            return gerador('gerar_cnpj', params);
        case 'rg':
            return gerador('gerar_rg', params);
        case 'cnh':
            return gerador('gerar_cnh', params);
        case 'certidão':
            return gerador('gerador_certidao', params);
        default:
            console.error('Tipo não reconhecido');
            return;
    }
};

module.exports = { gerar }