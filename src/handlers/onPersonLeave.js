var colors = require('colors');


function onPersonLeave(member) {
    console.log(colors.gray('[Student] ') + `A student has left the server`);
}

module.exports = {
    onPersonLeave
}