
const notificationReducer = (state = 'DEFAULT', action) => {
    switch(action.type) {
        case 'ERROR': return state
        default: return state
    }
}

export default notificationReducer