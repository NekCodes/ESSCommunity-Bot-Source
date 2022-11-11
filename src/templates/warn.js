function giveWarnJson(accuser, warned, reason) {
    const warn = {
        "accuser": accuser,
        "warned": warned,
        "reason": reason
    }
    return warn;
}

module.exports = {
    giveWarnJson
}