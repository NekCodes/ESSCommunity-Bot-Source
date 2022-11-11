module.exports = {
    name: "skip",
    description: "Skips Music",
    execute(message, args, client) {
        if (!message.member.voice.channel) return message.channel.send('You must be in a voice channel to use this command.');

        let queue = client.distube.getQueue(message);

        if (queue) {
            client.distube.skip(message)

            message.channel.send('Successfully skipped song :white_check_mark:!')
        } else if (!queue) {
            return
        };
    }
}