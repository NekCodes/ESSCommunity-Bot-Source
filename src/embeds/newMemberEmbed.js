function SendNewMemberEmbed(member, Discord, client, ping) {
    let user = member;
    const embed = new Discord.MessageEmbed()
    .setColor('#800080')
    .setTitle('Welcome to the ESS Community, ' + user + '!')
    .setDescription('Welcome to the ESS Community ' + user + '! Please send your **REAL** Name and Grade so we can assign you the correct roles (example: John 10)')
    .setThumbnail('https://media.discordapp.net/attachments/1040033549253886062/1040033918818197606/download-_2_.png')

    const channel = client.channels.cache.find(channel => channel.name === "discussion")
    channel.send(ping);
    channel.send(embed);
}

module.exports = {
    SendNewMemberEmbed
}