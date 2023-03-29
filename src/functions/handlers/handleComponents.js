const fs = require('fs');

module.exports = (client) => {
    client.handleComponents = async() => { // Defines the new function we call in index.js
        const componentFolders = fs.readdirSync(`./src/components`);
        for (const folder of componentFolders) {


            if (folder == 'buttons') {
                const componentSubFolders = fs.readdirSync(`./src/components/${folder}`);

                for (const subFolder of componentSubFolders) {
                    const componentFiles = fs.readdirSync(`./src/components/${folder}/${subFolder}`).filter(file => file.endsWith('.js'));

                    for (const file of componentFiles) {
                        const button = require(`../../components/${folder}/${subFolder}/${file}`);
                        const filePath = fs.readdirSync(`./src/components/${folder}/${subFolder}`)

                        // Set a new item in the Collection with the key as the command name and the value as the exported module
                        if ('data' in button && 'execute' in button) {
                            client.buttons.set(button.data.name, button);
                        } else {
                            console.log(`[WARNING] The button at ${filePath} is missing a required "data" or "execute" property.`);
                        }
                    }
                }

            } else if (folder == 'selectMenus') {
                const componentSubFolders = fs.readdirSync(`./src/components/${folder}`);

                for (const subFolder of componentSubFolders) {
                    const componentFiles = fs.readdirSync(`./src/components/${folder}/${subFolder}`).filter(file => file.endsWith('.js'));

                    for (const file of componentFiles) {
                        const selectMenu = require(`../../components/${folder}/${subFolder}/${file}`);
                        const filePath = fs.readdirSync(`./src/components/${folder}/${subFolder}`)

                        // Set a new item in the Collection with the key as the command name and the value as the exported module
                        if ('data' in selectMenu && 'execute' in selectMenu) {
                            client.stringSelectMenus.set(selectMenu.data.name, selectMenu);
                        } else {
                            console.log(`[WARNING] The select menu at ${filePath} is missing a required "data" or "execute" property.`);
                        }
                    }
                }
            }
        }
    }
}