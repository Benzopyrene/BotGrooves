const fs = require('fs');
// const { connection } = require('mongoose');

module.exports = (client) => {
    client.handleEvents = async () => { // Defines the new function we call in index.js
        const eventFolders = fs.readdirSync(`./src/events`);
        for (const folder of eventFolders) { // Loops through the src/events/ directory to find the folders
            const eventFiles = fs.readdirSync(`./src/events/${folder}`).filter(file => file.endsWith('.js')); // Reads the contents of that folder
            
            switch (folder) { // For multiple types of event

                case 'client': // In this case (lol), the client events
                    for (const file of eventFiles) { // For each file it finds in the folder... etc
                        const event = require(`../../events/${folder}/${file}`);

                        if (event.once) {
                            client.once(event.name, (...args) => event.execute(...args, client)); // Passing in client here so I can use it in other files
                        } else {
                            client.on(event.name, (...args) => event.execute(...args, client));
                        }
                    }
                    break;
                

                // case 'mongo': // MongoDB events
                //     for (const file of eventFiles) {
                //         const event = require(`../../events/${folder}/${file}`);

                //         if (event.once) { // Very similar to above (but not exactly the same)
                //             connection.once(event.name, (...args) => event.execute(...args, client));
                //         } else {
                //             connection.on(event.name, (...args) => event.execute(...args, client));
                //         }
                //     }
                default:
                    break;
            }
        }
    }
}