module.exports = {
    name: 'warn',
    description: "Warns a specific student",
    execute(message, args, client, Discord) {
        // make sure they have authority to do so
        var a = false;
        var b = message.mentions.members.first() // user
        
        require('../configs/modroles.json').modroles.forEach(role => {
            if (b.roles.cache.has(role.roleid)) {
                a = true;
            }
        });

        if (a == true) {
            require('../embeds/warnUserEmbed').manuelWarnUserEmbed(message, b, message.content.substring(args.slice(0, 4).join("").length + 1), message.author.username, Discord); // makes/sends the embed to the student's DMS
            // Keeps the warn on record
            var c = require('../templates/warn').giveWarnJson(message.author.username, b.displayName, message.content.substring(args.slice(0, 4).join("").length + 1));
            var d = require('fs');
            var e = require('path');

            // read the warns record and adds a new record for it
            d.readFile(e.join(__dirname, '../data/warns.json'), function(err, data){
                var currentJSON = JSON.parse(data);
                currentJSON.push(c);
                d.writeFile(e.join(__dirname, '../data/warns.json'), JSON.stringify(currentJSON, null, 2), function(){
                    var f = require('colors');
                    console.log(f.cyan('[Student Warns] ') + "Successfully recorded 1 warning");
                });
            });
        
        } else {
            return message.channel.send('You do not have authority to execute this command :angry:');
        }
    }
}