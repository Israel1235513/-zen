const axios = require("axios");
const cheerio = require("cheerio");

const limparTexto = (texto) => {
    return texto ? texto.replace(/[<>/():]/g, '').trim() : '';  // Verifica se o texto não é undefined
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
  
          // Extraindo os dados dos campos e limpando
          const Marca = limparTexto($('#marca').val());
          const Modelo = limparTexto($('#modelo').val());
          const Ano = limparTexto($('#ano').val());
          const Renavam = limparTexto($('#renavam').val());
          const Placa = limparTexto($('#placa_veiculo').val());
          const Cor = limparTexto($('#cor').val());
  
          console.log({
            Marca,
            Modelo,
            Ano,
            Cor,
            Modelo,
            Placa,
            Renavam
          });
      } else {
          console.log(result.data);  // Exibe o conteúdo direto se não for HTML
      }
  };

  const params = {  // Gerar com pontuação
      sexo: 'I',
      pontuacao: 'S',
      txt_qtde: 1,
      idade: 1,
  }
  
  // Geradores específicos com base no tipo
  const gerarveiculo = (type) => {
    switch (type) {
        case 'veiculo':
            return gerador('gerar_veiculo', params);
        default:
            console.error('Tipo não reconhecido');
            return;
    }
};

module.exports = { gerarveiculo }