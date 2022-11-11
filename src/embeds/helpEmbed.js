function createHelpEmbed(message, args, Discord) {
    const embed = new Discord.MessageEmbed()
    .setColor('#800080')
    .setTitle('Welcome to the ESS Community, ' + message.author.username + '!')
    .setDescription('All the commands are listed here!')
    .addFields(
        {name: 'ess/play songname', value: 'Plays Music, (MUST BE IN A VOICE CHANNEL)'},
        {name: 'ess/skip', value: 'Skips the current song'},
        {name: 'ess/stop', value: 'Stops the crrent song and leave the voice chat'}
    )
    .setThumbnail('https://media.discordapp.net/attachments/1040033549253886062/1040033918818197606/download-_2_.png')
    .setTimestamp()
    .setAuthor('ESS Community Discord Bot')
    message.channel.send(embed);
}

module.exports = {
    createHelpEmbed
}