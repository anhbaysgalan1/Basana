import React from 'react';
import { connect } from 'react-redux';
import { minDate } from '../../util/date_util';
import { openModal } from '../../actions/modal_actions';
import { createTask } from '../../actions/task_actions';
import CalendarTaskIndexItem from './calendar_task_index_item';

const mapStateToProps = (state, ownProps) => {
    const tasks = Object.values(state.entities.tasks)
    .filter(task => (
        task.due_date && 
        parseInt(task.due_date.slice(8)) === ownProps.date &&
        parseInt(task.due_date.slice(5, 7)) === ownProps.month + 1 &&
        parseInt(task.due_date.slice(0, 4)) === ownProps.year
    ));

    return {
        tasks
    };
};

const mapDispatchToProps = dispatch => {
    return {
        openModal: modal => dispatch(openModal(modal)),
        createTask: task => dispatch(createTask(task))
    };
};

const CalendarTaskIndex = ({ tasks, year, month, date, match, openModal, createTask }) => {
    const handleClick = () => {
        createTask({
            project_id: (match.params.projectId ? match.params.projectId : ''),
            assignee_id: (match.params.userId ? match.params.userId : ''),
            name: 'Task name',
            description: '',
            completion: false,
            privacy: false,
            due_date: `${year}-${month + 1}-${date}`
        }).then((res) => {
            openModal({ type: "edittask", task: res.task });
        });  
    };

    const li = tasks.map((task, idx) => <li key={idx}>
        <CalendarTaskIndexItem task={task} />
    </li>);

    return (
        <div>
            <div onClick={handleClick}>{date}</div>
            <div className="calendar-task-index-wrapper">
                <ul>
                    {li}
                </ul>
            </div>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarTaskIndex);