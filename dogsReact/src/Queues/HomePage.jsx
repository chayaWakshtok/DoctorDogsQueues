import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import { queueActions } from '../_actions/queue.actions';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.getQueues();
        this.setState({ searchInput: "" });
    }

    handleDeleteQueue(id) {
        return (e) => this.props.deleteQueue(id);
    }

    handleChangeInput(event) {
        this.setState({ searchInput: event.target.value }, () => {
            this.globalSearch();
        });
    };

    globalSearch() {
        const { user, queues, searchInput } = this.props;
        let filteredData = queues.items.filter(value => {
            return (
                value.date.toString().includes(searchInput.toLowerCase()) ||
                value.user.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
                value.user.lastName.toLowerCase().includes(searchInput.toLowerCase())
            );
        });
        this.setState({ queues: filteredData });
    };

    render() {
        const { user, queues } = this.props;
        return (
            <div className="col-md-10">
                <p>Hi {user.firstName}!</p>
                <p>
                    <Link to="/login">Logout</Link>
                </p>
                <h3>All Queues:</h3>
                <br />
                <Input
                    size="large"
                    name="searchInput"
                    value={searchInput || ""}
                    onChange={this.handleChangeInput}
                    label="Search"
                />
                <br />
                <br />
                <Link to="addQueue" className="btn btn-sm btn-success mb-2">Add Queue</Link>
                {queues.loading && <em>Loading queues...</em>}
                {queues.error && <span className="text-danger">ERROR: {queues.error}</span>}
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th style={{ width: '25%' }}>User</th>
                            <th style={{ width: '25%' }}>Date</th>
                            <th style={{ width: '25%' }}>Time</th>
                            <th style={{ width: '25%' }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {queues.items && queues.items.map(queue =>
                            <tr key={queue.id}>
                                <td>{queue.user.firstName} {queue.user.lastName}</td>
                                <td>{new Date(queue.date).toDateString()}</td>
                                <td>{queue.timeInDay}</td>
                                <td style={{ whiteSpace: 'nowrap' }}>
                                    <Link to={`/edit/${queue.id}`} className="btn btn-sm btn-primary mr-1" disabled={queue.userId != user.id}>Edit</Link>
                                    <button onClick={() => this.handleDeleteQueue(queue.id)} className="btn btn-sm btn-danger btn-delete-user" disabled={queue.userId != user.id}>
                                        Delete
                                </button>
                                </td>
                            </tr>
                        )}
                        {!queues.items &&
                            <tr>
                                <td colSpan="4" className="text-center">
                                    <div className="spinner-border spinner-border-lg align-center"></div>
                                </td>
                            </tr>
                        }
                        {queues.items && !queues.items.length &&
                            <tr>
                                <td colSpan="4" className="text-center">
                                    <div className="p-2">No Quese To Display</div>
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>


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
    deleteQueue: queueActions.delete
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };