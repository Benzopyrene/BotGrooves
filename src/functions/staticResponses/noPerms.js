module.exports = (client) => {
    client.noPerms = async (action = 'command', ephemeral = true) => {
        return {
            content: `You do not have the required permissions to do this ${action}!`,
            ephemeral: ephemeral
        }
    }
}