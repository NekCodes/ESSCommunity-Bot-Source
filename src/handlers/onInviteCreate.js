var colors = require('colors');

function onInviteCreate() {
    console.log(colors.bold.blue('[Invites] ') + "A new invite has been created!");
}

module.exports = {
    onInviteCreate
}