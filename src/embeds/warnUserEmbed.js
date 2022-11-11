
function manuelWarnUserEmbed(message, student, reason, warner, Discord) {
    const embed = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .setTitle('You have recieved a warning in the ESS Community Discord!')
        .addFields(
            { name: 'Who warned you:', value: warner },
            { name: "Moderator's Note:", value: reason }
        )
        .setThumbnail('https://media.discordapp.net/attachments/1040033549253886062/1040033918818197606/download-_2_.png')
        .setTimestamp()
    student.send(embed).catch(() => {
        message.channel.send('Cannot send a message to this user, but they are still warned!');
    }); // send the embed in student's DMS
}

module.exports = {
    manuelWarnUserEmbed
}