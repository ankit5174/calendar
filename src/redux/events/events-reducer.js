import {actionTypes} from './events-action';

const DEFAULT = {
    events: []
};

function addEvent(state, event) {
    const {events} = state;
    return {
        ...state,
        events: [...state.events, event]
    }
}

export default (state = DEFAULT, action) => {
    switch (action.type) {
        case actionTypes.ADD_EVENT:
            return addEvent(state, action.payload);
        default:
            return state;
    }
}
