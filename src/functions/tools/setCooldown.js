module.exports = (client) => {
    client.setCooldown = async (cooldownData, cooldownTime) => {
        client.cooldowns.set(cooldownData, Date.now() + cooldownTime);
        setTimeout(() => client.cooldowns.delete(cooldownData), cooldownTime);
    }
}