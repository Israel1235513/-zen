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
  
          // Extraindo os dados dos campos e limpando
          const nome = limparTexto($('#nome').val());
          const cnpj = limparTexto($('#cnpj').val());
          const inscricaoEstadual = limparTexto($('#ie').val());
          const dataAbertura = limparTexto($('#data_abertura').val());
          const site = limparTexto($('#site').val());
          const email = limparTexto($('#email').val());
          const cep = limparTexto($('#cep').val());
          const endereco = limparTexto($('#endereco').val());
          const numero = limparTexto($('#numero').val());
          const bairro = limparTexto($('#bairro').val());
          const cidade = limparTexto($('#cidade').val());
          const estado = limparTexto($('#estado').val());
          const telefoneFixo = limparTexto($('#telefone_fixo').val());
          const celular = limparTexto($('#celular').val());
  
          console.log({
              nome,
              cnpj,
              inscricaoEstadual,
              dataAbertura,
              site,
              email,
              cep,
              endereco,
              numero,
              bairro,
              cidade,
              estado,
              telefoneFixo,
              celular
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
  const gerarempresa = (type) => {
    switch (type) {
        case 'empresa':
            return gerador('gerar_empresa', params);
        default:
            console.error('Tipo não reconhecido');
            return;
    }
};

module.exports = { gerarempresa }