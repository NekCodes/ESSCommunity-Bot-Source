// ESS Community Discord Bot
// Please ask for permission to use my code on different stuff
// love ya <3

const Discord = require('discord.js')
const fs = require('fs');
const client = new Discord.Client();
const config = require('./config.json');
const express = require('express');
const path = require('path');
const app = express()
const port = 3000

var newMember = "";
var prefix = config.prefix;
var newMemberTimes = 0;

// handlers
const BotReady = require('./handlers/onBotReady');
const PersonFullJoin = require('./handlers/onPersonFullJoin');

// embeds
const embeda = require('./embeds/newMemberEmbed');

app.get('/', (req, res) => {
    res.json({ "author": "John Mcdowall", "message": "You do not have permission to view this page" });
})

app.listen(port, () => {
    // don't need to print this out
})

client.commands = new Discord.Collection();


const commandFiles = fs.readdirSync(path.join(__dirname, './commands')).filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once("ready", () => {
    BotReady.onBotReady(client.user.tag); // lol
    client.user.setPresence({ activity: { type: "LISTENING", name: "The ESS Announcements" }, status: "dnd" })
});

client.on('guildMemberAdd', member => {
    newMember = member.user.username;
    embeda.SendNewMemberEmbed(newMember, Discord, client, `<@${member.user.id}>`);
})

client.on('message', message => {
    if (message.author.username == newMember) {
        prefix = "";
    }
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if (message.author.username == newMember) {
        newMemberTimes++;
        if (newMemberTimes >= 2) {
            let grade = args.slice(2).join(' ')
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
        } else {

        }

    } else {
        prefix = "ess/";
        if (!message.content.startsWith(prefix) || message.author.bot) return;


        switch (command) {
            case "test":
                message.channel.send('test');
                break;
        }
    }
});


client.login(config.DiscordToken);