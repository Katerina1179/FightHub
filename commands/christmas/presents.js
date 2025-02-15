const db = require('../../database/models/presentSchema')
const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'presents',
    fhOnly: false,
    disabledChannels: [],
    description: 'Check how many presents you or someone else has!',
    usage: '[user]',
    category: {
        name: 'christmas',
        displayName: 'Christmas Special',
    },
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    async execute(message) {
        const userId =
            message.mentions.users.size > 0
                ? message.mentions.users.first().id
                : message.member.id
        const user = await db.findOne({ userId })
        const lb = await db
            .find({})
            .sort({
                presents: -1,
            })
            .limit(1)
        const presents = user ? user.presents : 0

        console.log(lb)
        message.channel.send({
            embeds: [
                new MessageEmbed()
                    .setTitle('Presents')
                    .setDescription(
                        `**Your presents:** ${presents.toLocaleString()}\n**Leaderboard top:** ${lb[0].presents.toLocaleString()}`
                    )
                    .setColor('WHITE'),
            ],
        })
    },
}
