const { exec } = require('child_process');

const execPromise = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        return reject(new Error(`Erro: ${error.message}`));
      }
      if (stderr) {
        console.warn(`Aviso: ${stderr}`);
      }
      resolve(stdout);
    });
  });
};

const updateVersion = async () => {
  try {
    const chalkModule = await import('chalk');
    const chalk = chalkModule.default;

    console.log(chalk.blue("=== Tudo pronto para começar ==="));
    console.log(chalk.yellow("=== Atualizando versão do npm ===\n"));

    await execPromise("npm version patch");
    console.log(chalk.green("=== Versão patch atualizada ===\n"));

    await execPromise("npm publish");
    console.log(chalk.green("=== Publicação concluída ==="));
  } catch (error) {
    console.log(error.message);
  }
};

updateVersion();
