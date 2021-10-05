const moment = require('moment');

let state = {};

const initializeState = (initialState) => {
    state = initialState;
    return state;
}

const getRoomState = (room) => {
    return state[room];
}

const addMessage = (user, room, message) => {
    state = {
        ...state,
        [room]: {
            ...state[room],
            chatMessages: [
                ...state[room].chatMessages,
                {"type": `${user.type}Message`, "user": user.username, "time": moment().format("h:mm a"), "content": message}
            ]
        }
        
    }
    return state[room];
}

module.exports = {
    initializeState,
    getRoomState,
    addMessage,
}