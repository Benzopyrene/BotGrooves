module.exports = (client) => {
    client.checkClient = async (input) => {
        console.log(`"${input}" was your input to this function, which I should be able to execute anywhere in my code, provided 'client' was passed in through the handlers. See handleEvents.js for an example`)
    }
}