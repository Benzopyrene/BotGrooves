const chalk = require('chalk');

module.exports = {
    name: 'connected',
    execute: () => {
        console.log(chalk.greenBright('▤ Database Status: Connected!'))
    }
}