export const actionTypes = {
    ADD_EVENT: 'ADD_EVENT'
};

export const addEvent = (event) => {
    console.log(event);
    return {
        type: actionTypes.ADD_EVENT,
        payload: event
    }
};
