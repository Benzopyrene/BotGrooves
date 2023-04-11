const fs = require('fs');
const ms = require('ms');
const botInfo = require('../../../botInfo.json');

module.exports = (client) => {
    client.handleTriggers = async(message, isHuman) => { // Makes sure the trigger files can use message.propertyHere
        const triggersFolders = fs.readdirSync(`./src/triggers`); // Finds the contents of the src/triggers/ directory
        for (const folder of triggersFolders) { // Loops through the src/triggers/ directory to find the folders
            const triggerFiles = fs.readdirSync(`./src/triggers/${folder}`).filter(file => file.endsWith('.js')); // Reads the contents of that folder

            for (const file of triggerFiles) { // For each file it finds (in each sub-folder)...
                const filePath = fs.readdirSync(`./src/triggers/${folder}`);
                const trigger = require(`../../triggers/${folder}/${file}`);

                // Set a new item in the Collection with the key as the trigger name and the value as the exported module
	            if ('name' in trigger && 'execute' in trigger) { // Checks for a name, execute property
                    if (trigger.isHuman == isHuman && (message.content === trigger.filter || trigger.allMessages) ) { 


                        // Cooldowns!
                        const cooldownData = `${message.author.id}/trigger/${trigger.name}`;
                        if (!client.cooldowns.has(cooldownData)) { // If not on cooldown

                            if (trigger.name !== 'chatCoins') { // Any actual trigger
                                await client.setCooldown(cooldownData, trigger.cooldown || botInfo.defaultCooldowns.triggers);
                            }

                            client.triggers.set(trigger.name, trigger);
                            trigger.execute(message, client); // chatCoins has its own special cooldown (configurable since the cd is stored on MongoDB)
                        } else {
                            // There was a return; here but it was causing problems lol
                        }

                        
                        
                    }
	            } else {
		            console.log(`[WARNING] The trigger at ${filePath} is missing a required "name" or "execute" property.`);
	            }
            }
        }
    }
}