const users = [
    { "id": "testID", "username": "Bob", "room": "Javascript", type: "user" }
];

const userJoin = (id, username, room) => {
    const user = { id, username, room, type: "user" };

    users.push(user);

    return user;
}

const userLeave = (id) => {
    const ind = users.findIndex(user => user.id === id);

    if (ind !== -1) {
        return users.splice(ind, 1)[0];
    }
}

const getCurrentUser = (id) => {
    return users.find(user => user.id === id);
}

const getRoomUsers = (room) => {
    return users.filter(user => user.room === room)
}


module.exports = {
    userJoin,
    userLeave,
    getCurrentUser,
    getRoomUsers
}