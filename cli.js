const rbr = require('./index.js');
const chalk = require('chalk');
const ora = require('ora');
const escape = require('entities');
const url = process.argv[2] || '';

function parse(data) {
  if (data.available) {
    console.log(chalk.green('Domínio ' + chalk.bold(data.fqdn) + ' está disponível'));
  } else {
    console.log(chalk.red('Domínio ' + chalk.bold(data.fqdn) + ' não está disponível'));
    if (data.reason) {
      console.log(chalk.red.bold(escape.decodeHTML(data.reason)));
    }

    if (data.suggestions && data.suggestions.length > 0) {
      console.log(chalk.yellow('Sugestões: '))
      data.suggestions.forEach(function (item) {
        console.log("\t" + chalk.yellow.bold('- ' + data.domain + '.' + item));
      })
    }
  }
}

if (!url || url.length < 2) {
  console.log(chalk.red('Por favor, digite uma url válida.'));
  process.exit(1);
} else {
  const spinner = ora({ color: 'yellow', text: (chalk.yellow('Carregando ') + chalk.yellow.bold(url))}).start();
  rbr(url).then(function (response) {
    spinner.stop();
    parse(response);
    process.exit(0);
  }).catch(function(ex) {
    spinner.stop();
    console.log(chalk.red('Alguma coisa de errado não está certo.'));
    console.log(ex);
    process.exit(1);
  });
}