# Zen Module
> * Meu modulo com coisas de bot, e apis.

```bash
npm install zenmdl
```
# Consultas
```js
const zenModule = require('zenmdl');

// Function Para IP
async function ip(query) {
    try {
        const { response, result } = await zenModule.consultas[0].ip(query) //Pega os dados usando o modulo.

        result.readme = "sla"; // Pode modificar se quiser

        console.log(result); // Precisa ter isso para enviar as informações
    } catch (error) {
        console.error("Erro ao consultar o IP:", error);
    }
}

// Function Para O Cnpj
async function cnpj(query) {
    try {
        const { response, result } = await zenModule.consultas[0].cnpj(query) //Pega os dados usando o modulo.

        result.readme = "sla"; // Pode modificar se quiser

        console.log(result); // Precisa ter isso para enviar as informações
    } catch (error) {
        console.error("Erro ao consultar o Cnpj:", error);
    }
}

// Puxando Function
ip('45.229.116.56'); // Se não tiver ip não vai enviar um resultado valido.
cnpj('16049656000139'); // Se não tiver o cnpj não vai enviar o resultado valido.
```