var colors = require('colors');

function OnPersonFullyJoined(name, grade) {
    console.log(colors.green('[SUCCESS] ') + `${name} has fully joined the discord and they are in grade ${grade}`);
}

module.exports = {
    OnPersonFullyJoined
}