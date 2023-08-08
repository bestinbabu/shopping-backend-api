const mongo = require("mongoose")

const connect = async(url) => {
    return mongo.connect(url)
}

module.exports = connect