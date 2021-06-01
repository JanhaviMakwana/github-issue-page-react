import React, { createContext, useState } from 'react';

const IssuesContext = createContext();

const StateProvider = (props) => {
    const [issues, setIssues] = useState([]);
    const [filteredIssues, setFilteredIssues] = useState([]);
    return (
        <IssuesContext.Provider value={{ issues, setIssues, filteredIssues, setFilteredIssues }}>
            {props.children}
        </IssuesContext.Provider>
    );
};

const withState = (Child) => (props) => (
    <IssuesContext.Consumer>
        {(context) => <Child {...props} {...context} />}
    </IssuesContext.Consumer>
);

export { StateProvider, withState };