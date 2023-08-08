
const token = (userData) => {
    return { userID:userData._id, username:userData.username, userRole:userData.role }
}

module.exports = token