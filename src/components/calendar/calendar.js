import React, {Component} from 'react';
import moments from 'moment';
import BootstrapTable from 'react-bootstrap-table-next';
import './calendar.css';
import Modal from "../modal/modal";
import AddEvent from "../add-event/add-event";

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moment: props.moment || moments(),
            display: props.display || 'cal',
            addEventEnable: false
        };
    }

    getCurrentMonth = () => {
        let {moment} = this.state;
        let clonedMoment = moment.clone();
        let startDay = clonedMoment.startOf('month').format('e');
        let endDate = clonedMoment.endOf('month').format('D');

        let currentMonthData = [];
        for (let i = 1; i <= endDate;) {
            let row = {};
            for (; startDay <= 6; startDay++) {
                if (i <= endDate) {
                    row[startDay] = i;
                }
                i++;
            }
            currentMonthData.push(row);
            startDay = 0;
        }

        return currentMonthData;
    };

    getColumn = () => {
        let {moment} = this.state;

        let headerStyle = {backgroundColor: '#e74c3c', color: 'white'};

        let onClick = {
            onClick: e => {
                this.updateMonth(e)
            }
        };

        let clasess = (cell) => {
            let today = moments();
            if (today.format('MMM YYYY') === moment.format('MMM YYYY')) {
                if (Number(cell) === Number(today.format('D'))) {
                    return 'today';
                }
                if (Number(cell) < Number(today.format('D'))) {
                    return 'disabled';
                }
            }
        };

        return [
            {
                dataField: '0',
                text: 'Su',
                events: onClick,
                headerStyle: headerStyle,
                classes: clasess
            }, {
                dataField: '1',
                text: 'Mo',
                events: onClick,
                headerStyle: headerStyle,
                classes: clasess
            }, {
                dataField: '2',
                text: 'Tu',
                events: onClick,
                headerStyle: headerStyle,
                classes: clasess
            }, {
                dataField: '3',
                text: 'We',
                events: onClick,
                headerStyle: headerStyle,
                classes: clasess
            }, {
                dataField: '4',
                text: 'Th',
                events: onClick,
                headerStyle: headerStyle,
                classes: clasess
            }, {
                dataField: '5',
                text: 'Fr',
                events: onClick,
                headerStyle: headerStyle,
                classes: clasess
            }, {
                dataField: '6',
                text: 'Sa',
                events: onClick,
                headerStyle: headerStyle,
                classes: clasess
            }

        ];
    };

    nextMonth = () =>  {
        let {moment} = this.state;
        moment.add(1, 'month');
        this.setState({moment: moment});
    };

    prevMonth = () => {
        let {moment} = this.state;
        moment.subtract(1, 'month');
        if (moment.isBefore(moments(), 'month')) {
            moment.add(1, 'month');
        } else {
            this.setState({moment: moment});
        }
    };

    updateMonth = (e) => {
        let {moment} = this.state;
        moment.date(e.target.innerText);
        this.setState({moment: moment});
    };

    updateHour = (e) => {
        let value = e.target.value;
        this.setState((prevState) => ({
            moment: prevState.moment.hour(value)
        }))
    };

    updateMinutes = (e) => {
        let value = e.target.value;
        this.setState((prevState) => ({
            moment: prevState.moment.minute(value)
        }))
    };

    addMoment = () => {
        this.setState({addEventEnable: true})
    };

    getDisplay = () => {
        let {display, moment} = this.state;

        if (display === 'cal') {
            return (
                <BootstrapTable keyField='id' data={this.getCurrentMonth()} columns={this.getColumn()}
                                bordered={false}/>
            );
        } else if (display === 'time') {
            return (
                <div className="date-time-picker-time-container">
                    <div>
                        <span>{moment.format('H')}</span>
                        <div className="slidecontainer">
                            <input type="range" min="0" max="23" className="slider" id="myRange"
                                   value={moment.format('HH')}
                                   onChange={this.updateHour}
                            />
                        </div>
                    </div>
                    <div className="mt-3">
                        <span>{moment.format('mm')}</span>
                        <div className="slidecontainer">
                            <input type="range" min="0" max="59" className="slider" id="myRange"
                                   value={moment.format('mm')}
                                   onChange={this.updateMinutes}
                            />
                        </div>
                    </div>
                </div>
            );
        }
    };

    render() {
        const {moment, addEventEnable} = this.state;
        const {onAdd} = this.props;

        return (
            <div className="date-time-picker-container">
                <div className="date-time-picker-controls">
                    <a onClick={this.prevMonth}><i className="fas fa-arrow-left"/></a>
                    <p>{moment.format('DD MMM YYYY hh:mm A')}</p>
                    <a onClick={this.nextMonth}><i className="fas fa-arrow-right"/></a>
                </div>
                {this.getDisplay()}
                <Modal show={addEventEnable} onClose={() => this.setState({addEventEnable: false})}>
                    <AddEvent moment={moment} onAdd={(event) => {onAdd(event); this.setState({addEventEnable: false})}}/>
                </Modal>
                <div className="date-time-picker-controls-bottom">
                    <a onClick={()=>{this.setState({display:'time'})}}><i className="far fa-clock"/></a>
                    <a onClick={()=>{this.setState({display:'cal'})}}><i className="far fa-calendar-alt"/></a>
                    <a onClick={this.addMoment}><i className="far fa-check-circle"/></a>
                </div>
            </div>
        );
    }

}

export default Calendar;
