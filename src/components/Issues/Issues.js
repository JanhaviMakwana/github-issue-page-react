import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Issue from '../Issue/Issue';
import IssueService from '../../services/issueService';
import { withState } from '../../issues-context';
import Header from './Header';
import './Issues.css';

const ISSUES_PER_PAGE = 7;

const Issues = (props) => {
    const fetchedIssues = props.issues;  
    const [issues, setIssues] = useState([]);
    const [filteredIssues, setFilteredIssues] = useState([]);
    const [open, setOpen] = useState('');
    const currentPage = props.match.path === '/' ? 1 : props.match.params.page;

    const filterHandler = (type) => {
        setOpen(type);
        if (type !== '') {
            IssueService.search(`is:${type}`).then(res => {
                const data = res.data.items;
                props.setFilteredIssues(data);
                setIssues(data);
            }).catch(err => {
                props.setFilteredIssues(props.issues);
                console.log(err);
            });
        } else {
            setIssues(fetchedIssues);
            props.setFilteredIssues(fetchedIssues);
        }
        props.history.push('/1');
    };

    const fetch = () => {
        const start = (currentPage - 1) * ISSUES_PER_PAGE;
        const end = (currentPage) * ISSUES_PER_PAGE - 1;
        const filteredData = issues.slice(start, end);
        setFilteredIssues(filteredData);
    };

    useEffect(() => {
        setIssues(props.filteredIssues);
        fetch();
    }, [issues, props.filteredIssues, currentPage, open]);

    return (
        <div className="home">
            {issues.length !== 0 && <Header filterHandler={(type) => filterHandler(type)} />}
            {filteredIssues.length !== 0 && <div className="issues">
                {filteredIssues.map((issue, index) => {
                    return <Issue key={index} issue={issue} />
                })}
            </div>}
        </div>
    );

};

export default withRouter(withState(Issues));