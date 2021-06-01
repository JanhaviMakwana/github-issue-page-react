import React from 'react';
import { withRouter } from 'react-router-dom';
import { getDateDiff } from '../../calculate/getDateDiff';
import './Issue.css';

const Issue = (props) => {
    const issue = props.issue;
    const issueDetailHandler = (id) => {
        props.history.push(`/issues/${id}`);
    };

    return (
        <div className="issue" onClick={() => issueDetailHandler(issue.number)}>
            <div className="issue-header">
                <h3>
                    <i className="exclamation circle icon" style={{ color: issue.state === 'open' ? 'green' : 'red' }}></i>
                    {issue.title}
                </h3>
                {issue.labels.map((label) => {
                    return <p style={{ backgroundColor: `#${label.color}`, width: 'fit-content', height: 'fit-content' }}>{label.name}</p>
                })}
            </div>
            <div className="time">
                <p>#{issue.number + " opened " + getDateDiff(issue.created_at) + " ago by " + issue.user.login}</p></div>
        </div>
    );
};

export default withRouter(Issue);