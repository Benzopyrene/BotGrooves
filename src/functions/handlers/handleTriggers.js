const fs = require('fs');

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
                    if (trigger.isHuman == isHuman) { // Human check is here so it doesn't trigger the else statement
                        client.triggers.set(trigger.name, trigger);
                        trigger.execute(message, client);
                    }
	            } else {
		            console.log(`[WARNING] The trigger at ${filePath} is missing a required "name" or "execute" property.`);
	            }
            }
        }
    }
}