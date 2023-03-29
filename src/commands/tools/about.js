const { SlashCommandBuilder } = require('discord.js');
const { version } = require('../../../package.json');
const { host } = require('../../../config.json')
const botInfo = require('../../../botInfo.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('about')
		.setDescription('General Info about BotGrooves'),


	async execute(interaction) { 

        // const botUptimeSeconds = new Date(interaction.client.uptime).toISOString().slice(17, 19);
        // const botUptimeMinutes = new Date(interaction.client.uptime).toISOString().slice(14, 16);
        // const botUptimeHours = new Date(interaction.client.uptime).toISOString().slice(11, 13);

        const infoEmbed = {
            title: "BotGrooves Info",
            color: interaction.client.color,
            thumbnail: {
                url: interaction.client.user.avatarURL(),
            },
            fields: [
                {
                    name: '🔃 Version',
                    value: `BotGrooves v${version} - Made with Discord.JS v14 💖`
                },
                {
                    name: '📰 Author',
                    value: 'Benzopyrene'
                },
                {
                    name: '⏱ Uptime',
                    value: `Last restart was <t:${(interaction.client.readyAt.getTime() / 1000).toFixed(0)}:R>`
                    // value: `${botUptimeHours} Hours, ${botUptimeMinutes} Minutes and ${botUptimeSeconds} Seconds`
                },
            ],
            timestamp: new Date().toISOString(),
        }

        if (botInfo.author.id.includes(interaction.member.id)) {
            const osu = require('node-os-utils');

            const cpuUsage = await osu.cpu.usage();

            const memObject = await osu.mem.used();
            const memUsage = (memObject.usedMemMb / memObject.totalMemMb * 100).toFixed(2);

            // Adding to the embed
            infoEmbed.fields.push({
                name: `💾 Host statistics (${host})`,
                value: `CPU usage: ${cpuUsage}% \nMemory usage: ${memUsage}%`
            })

            await interaction.reply({ 
                content: `<@${interaction.user.id}>`,
                embeds: [infoEmbed] 
            })


        } else {
            await interaction.reply({ 
                content: `<@${interaction.user.id}>`,
                embeds: [infoEmbed] 
            })
        }
	},
};