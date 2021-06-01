import React, { useState, useEffect } from 'react';
import { Menu, Dropdown, Input } from 'semantic-ui-react';
import IssueService from '../../services/issueService';
import { withState } from '../../issues-context';
import './Header.css';

const filterOptions = [
    { key: 1, text: 'open', value: 1 },
    { key: 2, text: 'closed', value: 2 }
];

const Header = (props) => {
    const [starred, setStarred] = useState(false);
    const [searchKey, setSearchKey] = useState('');

    const searchKeywordHandler = (event) => {
        setSearchKey(event.target.value);
    };

    const searchSubmitHandler = (event) => {
        event.preventDefault();
        IssueService.search(searchKey.replace(' ', '+'))
            .then(res => {
                props.setFilteredIssues(res.data.items)
            })
            .catch(err => {
                console.log(err);
            })
    };

    const filterChangeHandler = (event) => {
        setSearchKey('');
        props.setFilteredIssues(props.issues);
        console.log(event.target.innerText);
        props.filterHandler(event.target.innerText);
    };

    const starHandler = () => {
        setStarred(!starred);
    };

    return (
        <div className="header">
            <Menu>
                <Menu.Item>
                    <Dropdown
                        placeholder="filter"
                        clearable
                        options={filterOptions}
                        onChange={filterChangeHandler}
                        selection
                    />
                </Menu.Item>
                <Menu.Item>
                    <form onSubmit={searchSubmitHandler}>
                        <Input placeholder='Search...'
                            value={searchKey}
                            onChange={searchKeywordHandler}
                        />
                    </form>
                </Menu.Item>
                <Menu.Item onClick={starHandler}>
                    <div className="star">
                        <i className={starred ? 'star icon' : 'star outline icon'} />
                        <p>{starred ? 'Starred' : 'Star'}</p>
                    </div>
                </Menu.Item>
            </Menu>
        </div>
    );

};

export default withState(Header);