// ESS Community Discord Bot
// Please ask for permission to use my code on different stuff
//
// NOTE: I am not a perfect programmer, there will be flaws
// and I will fix it eventually. Love ya <3

const Discord = require('discord.js')
const fs = require('fs');
const client = new Discord.Client();
const config = require('./configs/config.json');
const express = require('express');
const path = require('path');
const DisTube = require('distube')
const app = express()
const port = 3000


// Youtube & Discord Integration
client.distube = new DisTube(client, { searchSongs: false, emitNewSongOnly: true });
client.distube
    .on("playSong", (message, queue, song) => message.channel.send(
        `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`
    ))
    .on("addSong", (message, queue, song) => message.channel.send(
        `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
    ))


// Tempoary variables (will remove when I find fix for all 3 of these)
var newMember = "";
var prefix = config.prefix;
var newMemberTimes = 0;

// Handlers
const BotReady = require('./handlers/onBotReady');
const PersonFullJoin = require('./handlers/onPersonFullJoin');

// Embeds
const embeda = require('./embeds/newMemberEmbed');
const embedb = require('./embeds/helpEmbed');

// Express WebServer (idk why I added it, prob will use it for sum later)
app.get('/', (req, res) => {
    res.json({ "author": "John Mcdowall", "message": "You do not have permission to view this page" });
})

app.listen(port, () => {
    // don't need to print this out
})

// Commands
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync(path.join(__dirname, './commands')).filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

// Ready RPC
client.once("ready", () => {
    BotReady.onBotReady(client.user.tag); // lol
    client.user.setPresence({ activity: { type: "LISTENING", name: "The ESS Announcements" }, status: "dnd" })
});

// New Student Joined the Server RPC
client.on('guildMemberAdd', member => {
    newMember = member.user.username;
    embeda.SendNewMemberEmbed(newMember, Discord, client, `<@${member.user.id}>`);
})

// Student left the Server RPC
client.on('guildMemberRemove', member => {
    require('./handlers/onPersonLeave').onPersonLeave(member);
});

// Student create invite RPC
client.on('inviteCreate', invite => {
    require('./handlers/onInviteCreate').onInviteCreate();
});

// Role Creation RPC
client.on('roleCreate', role => {
    // TODO
})

// Message RPC
client.on('message', message => {
    if (message.author.username == newMember) {
        prefix = "";
    }
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if (message.author.username == newMember) {
        // really weird fix but eh what the hell could go wrong (I will make a better way I promise)
        newMemberTimes++;
        // for some reason when the student joins the bot will call this automatically so I made it 2
        if (newMemberTimes >= 2) {
            PersonFullJoin.OnPersonFullyJoined(command.charAt(0).toUpperCase() + command.slice(1), args[0]);
            if (!message.guild.me.hasPermission('MANAGE_NICKNAMES')) return message.channel.send('ERROR: I do not have permission to change your nickname. Please contact .nekuzi#0001 for more information');
            message.member.setNickname(command.charAt(0).toUpperCase() + command.slice(1));

            var roleid; // role id

            switch (args[0]) {
                case "8":
                    roleid = message.guild.roles.cache.get("1039973531443789866");
                    message.member.roles.add(roleid);
                    break;
                case "9":
                    roleid = message.guild.roles.cache.get("1039973593607573564");
                    message.member.roles.add(roleid);
                    break;
                case "10":
                    roleid = message.guild.roles.cache.get("1039973625740140575");
                    message.member.roles.add(roleid);
                    break;
                case "11":
                    roleid = message.guild.roles.cache.get("1039973671382564965");
                    message.member.roles.add(roleid);
                    break;
                case "12":
                    roleid = message.guild.roles.cache.get("1039973723190607972");
                    message.member.roles.add(roleid);
                    break;
            }

            message.channel.send('Thanks for taking your time to join the ESS Community Discord! We hope we see you around, ' + newMember);

            // back to default
            newMember = "";
            prefix = config.prefix;
            newMemberTimes = 0;
        } else {

        }

    } else {
        prefix = "ess/";
        if (!message.content.startsWith(prefix) || message.author.bot) return;


        switch (command) {
            case "test":
                message.channel.send('test');
                break;
            case "play":
                client.commands.get('play').execute(message, args, client);
                break;
            case "leave":
                client.commands.get('leave').execute(message, args, client);
                break;
            case "skip":
                client.commands.get('skip').execute(message, args, client);
                break;
            case "help":
                embedb.createHelpEmbed(message, args, Discord);
                break;
            case "warn":
                client.commands.get('warn').execute(message, args, client, Discord);
                break;
            default:
                message.channel.send('That is not a command at the moment! :sob:');
                break;
        }
    }
});

// Authentication go brrrrrrrr
client.login(config.DiscordToken);