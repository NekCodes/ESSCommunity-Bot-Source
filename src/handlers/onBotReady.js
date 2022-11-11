var colors = require('colors');

function onBotReady(botname) {
    console.clear();
    console.log(colors.magenta('[ESS] ') + "The ESS Community bot is now Online! Logged in as: " + botname);
}

module.exports = {
    onBotReady
}