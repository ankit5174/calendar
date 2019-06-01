import {connect} from 'react-redux'
import {withRouter} from "react-router-dom";
import {addEvent} from "./redux/events/events-action";
import App from './App';
import eventsReducer from "./redux/events/events-reducer";

function mapStateToProps(state) {
    return {
        events: state.eventsReducer.events
    }
}

function mapDispatchToProps(dispatch) {
   return {
       addEvent: (event) => {
           dispatch(addEvent(event))
       }
   }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
