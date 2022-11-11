module.exports = {
    name: "play",
    description: "Plays Music",
    execute(message, args, client) {
        if (!message.member.voice.channel) return message.channel.send('You must be in a voice channel to use this command.');
        if(message.author.bot) {
            return;
        }

        const music = args.join(" ");

        client.distube.play(message, music);
    }
}