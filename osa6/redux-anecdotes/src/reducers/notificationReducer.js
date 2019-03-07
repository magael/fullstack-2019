const notificationReducer = (state = '', action) => {
    switch(action.type) {
        case 'VOTE':
            console.log("votingmsg")
            return 'You voted ' + action.data.content
        case 'CLEAR': 
            console.log("clear3")
            return ''
        default:
            console.log("default msg")
            return state
    }
}

export const clearMessage = () => {
    console.log("clear2")
    return {
        type: 'CLEAR'
    }
}

export default notificationReducer