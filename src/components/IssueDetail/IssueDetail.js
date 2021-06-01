import React, { useEffect, useState } from 'react';
import IssueService from '../../services/issueService';
import { getDateDiff } from '../../calculate/getDateDiff';
import './IssueDetail.css';


const IssueDetail = (props) => {
    console.log(props);
    const [detail, setDetail] = useState([]);

    useEffect(() => {
        const id = props.match.params.id;
        const fetch = async () => {
            const res = IssueService.getIssueDetail(id)
                .then(res => {
                    setDetail(res.data);
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        fetch();
    }, [])

    return (
        <div>
            {detail.map((issue) => {
                return (
                    <div className="issueDetail">
                        <div className="section1">
                            <img src={issue.user.avatar_url} />
                            <h3>
                                {issue.user.login}
                            </h3>
                            <p className="time">{`commented ${getDateDiff(issue.updated_at)} ago`}</p>
                            <p className="author">
                                {issue.author_association !== 'NONE' && issue.author_association}
                            </p>
                        </div>
                        <div style={{textAlign:'left', margin: '10px 10px 10px 55px', wordSpacing: '3px', fontSize: '20px'}}>
                            <p>{issue.body}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default IssueDetail;