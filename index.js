const os = require('os');
const axios = require('axios')
const fs = require('fs');

const { ip, cnpj } = require('./functions/consultas.js')

async function Saudacao() {
  const response = await fetch('https://api.ipify.org?format=json');
  const data = await response.json();
  const platform = os.platform();
  console.log("🌐 - Ip: " + data.ip);
  console.log("💻 - Sistema Operacional: " + platform + "\n⏱ - Iniciando...\n⚡ - Zen Module iniciado com sucesso.\n\n\n");
}

// Usando um array para consultas
const consultas = [
  {
    ip: async function(query) {
      if (!query) {
        console.warn("Cadê o IP?");
        return;
      }

      try {
        const result = await ip(query);
        console.log(result)
      } catch (error) {
        console.error("Erro ao buscar informações do IP:", error);
      }
    },

    cnpj: async function(query) {
      if (!query) {
        console.warn("Cadê o CNPJ?");
        return;
      }

      try {
        const result = await cnpj(query);
        console.log(result)
      } catch (error) {
        console.error("Erro ao buscar informações do CNPJ:", error);
      }
    }

  }
];

Saudacao();

module.exports = { consultas };