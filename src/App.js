import React, {Component} from 'react';
import './App.css';
import Calendar from "./components/calendar/calendar";

class App extends Component {
    onAdd = (event) => {
        const {addEvent} = this.props;
        addEvent(event);
    };

    render() {
        const {events} = this.props;
        console.log(events);
        return (
            <Calendar events={events} onAdd={this.onAdd}/>
        );
    }
}

export default App;
