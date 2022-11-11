module.exports = {
    name: "leave",
    description: "Leaves voice channel",
    execute(message, args, client) {
        if (!message.member.voice.channel) return message.channel.send('You must be in a voice channel to use this command.');

        let queue = client.distube.getQueue(message);

        if (queue) {
            client.distube.stop(message)

            message.channel.send('Thanks for using the ESS Community Bot! <3');
        } else if (!queue) {
            return
        }
    }
}