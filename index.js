const os = require('os');
const axios = require('axios')
const fs = require('fs');

const { ip, cnpj } = require('./functions/consultas.js')
const { gerar } = require('./functions/geradores.js')
const { downloadYouTube, search } = require('./functions/ytdl.js')

// Usando um array para consultas
const consultas = [
  {
    ip: async function(query) {
      if (!query || query.trim() === "") {
        console.warn("Cadê o IP?");
        return;
      }
      if (/^0+\.0+\.0+\.0+$/.test(query) || !query.includes('.')) {
        console.warn("IP inválido.");
        return;
      }
      try {
        const { response, result } = await ip(query);
        return { response, result };
      } catch (error) {
        console.error("Erro ao consultar o IP:", error);
      }
    },

    cnpj: async function(query) {
      if (!query || !/^[0-9]{14}$/.test(query)) {
        console.warn("CNPJ inválido.");
        return;
      }
      try {
        const { response, result } = await cnpj(query);
        return { response, result };
      } catch (error) {
        console.error("Erro ao buscar informações do CNPJ:", error);
      }
    }
  }
];

const geradores = [
  {
    pessoa: async function() {
      return gerar('pessoa');
    },
    placa: async function() {
      return gerar('placa');
    },
    empresa: async function() {
      return gerar('empresa');
    },
    veiculo: async function() {
      return gerar('veiculo');
    },
    conta_bancaria: async function() {
      return gerar('conta_bancaria');
    },
    renavam: async function() {
      return gerar('renavam');
    },
    cpf: async function() {
      return gerar('cpf');
    },
    cnpj: async function() {
      return gerar('cnpj');
    },
    rg: async function() {
      return gerar('rg');
    },
    cnh: async function() {
      return gerar('cnh');
    },
    certidao: async function() {
      return gerar('certidao');
    }
  }
]

const ytdl = [
  { 
    mp3: async function(query, path) {
      downloadYouTube(query, 'audio', path)
    },
    mp4: async function(query, path) {
      downloadYouTube(query, 'video', path)
    },
    pesquisa: async function(query) {
      return await search(query);
    }
  }
]

module.exports = { consultas, geradores, ytdl };