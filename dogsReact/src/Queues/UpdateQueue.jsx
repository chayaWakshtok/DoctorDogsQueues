
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import { queueActions } from '../_actions/queue.actions';

class UpdateQueuePage extends React.Component {

    constructor(props) {
        super(props);
        const { id } = props.match.params;
        const { queues } = props;
        var queue = queues.items.filter(p => p.id == id)[0];
        queue.date = new Date(queue.date);

        this.state = {
            queue: {
                id: queue.id,
                userId: JSON.parse(localStorage.getItem('user')).id,
                date: queue.date.getFullYear() + "-" + (queue.date.getMonth() + 1) + "-" +
                    (queue.date.getDate() < 10 ? "0" + queue.date.getDate() : queue.date.getDate()),
                timeInDay: queue.timeInDay,
            },
            submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { queue } = this.state;
        this.setState({
            queue: {
                ...queue,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { queue } = this.state;
        if (queue.date && queue.timeInDay) {
            this.props.updateQueue(queue);
        }
    }

    render() {
        const { registering } = this.props;
        const { submitted, user, queue } = this.state;

        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Edit Queue</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !queue.date ? ' has-error' : '')}>
                        <label htmlFor="date">Date</label>
                        <input type="date" className="form-control" name="date" value={"2021-12-03"} onChange={this.handleChange} />
                        {submitted && !queue.date &&
                            <div className="help-block">Date is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !queue.timeInDay ? ' has-error' : '')}>
                        <label htmlFor="timeInDay">Time</label>
                        <input type="time" step="3600000" className="form-control" name="timeInDay" value={queue.timeInDay} onChange={this.handleChange} />
                        <span className="validity"></span>
                        {submitted && !queue.timeInDay &&
                            <div className="help-block">Time is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Update</button>
                        {registering &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                    </div>
                </form>
            </div>
        );
    }
}

function mapState(state) {
    const { queues, authentication } = state;
    const { user } = authentication;

    return { user, queues };
}

const actionCreators = {
    getQueues: queueActions.getAll,
    updateQueue: queueActions.update,
    getQueueById: queueActions.getById
}

const connectedUpdateQueuePage = connect(mapState, actionCreators)(UpdateQueuePage);
export { connectedUpdateQueuePage as UpdateQueuePage };