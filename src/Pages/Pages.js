import React, { useState, useEffect } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { withState } from '../issues-context';
import Issues from '../components/Issues/Issues';
import IssueDetail from '../components/IssueDetail/IssueDetail';
import { getPages } from '../calculate/getPages';
import './Pages.css';

const ISSUES_PER_PAGE = 7;
const filterOptions = [
    { key: 1, text: 'open', value: 1 },
    { key: 2, text: 'closed', value: 2 }
];

const Pages = (props) => {
    const issues = props.filteredIssues;
    const pages = Array.from({ length: getPages(issues.length) }, (_, i) => i + 1);
    const pageChangeHandler = (pageNumber) => {
        props.history.push(`/${pageNumber}`);
    }

    return (
        <div>
            <div>
                <Switch>
                    <Route path='/issues/:id' exact component={IssueDetail} />
                    {issues.length !== 0 && <Route path='/:page' exact component={Issues} />}
                    {issues.length !== 0 && <Route path='/' component={Issues} />}
                </Switch>
            </div>
            <div>
                {!props.location.pathname.match('issues') &&  pages.map((index) => {
                    return <button className="page-number" onClick={() => pageChangeHandler(index)}>{index}</button>
                })}
            </div>
        </div>
    );
};

export default withRouter(withState(Pages));