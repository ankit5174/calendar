import React from 'react';
import moments from 'moment';

class AddEvent extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            event: {
                eventName: '',
                description: '',
                moment: props.moment || moments()
            }
        }
    }

    onChange = (e) => {
        const {event} = this.state;
        event[e.target.name] = e.target.value;
       this.setState ({
           event: {
               ...event
           }
       })
    };

    render() {
        const {onAdd} = this.props;
        const {event} = this.state;
        return (
            <div>
                <label>Event Name</label><input name="eventName" onChange={this.onChange} type="textbox"/><br/>
                <label>Description</label><input name="description" onChange={this.onChange} value={event.description} type="textbox"/><br/>
                <button onClick={() => onAdd(event)}>Add</button>
            </div>
        );
    }
}

export default AddEvent;
