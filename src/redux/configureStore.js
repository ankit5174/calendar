import {createStore, combineReducers, applyMiddleware} from 'redux';
import eventsReducer from './events/events-reducer';
export function configureStore() {
    return createStore(
        combineReducers({
            eventsReducer
        }),
        applyMiddleware(

        )
    );
}
