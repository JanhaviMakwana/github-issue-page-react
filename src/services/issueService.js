import axios from '../axios';

const IssueService = {
  search: (q) => {
    return axios(`search/issues?q=repo:facebook/react+${q}&per_page=100`)
      .then((data) => {
        return data;
      })
      .catch(err => {

      });
  },
  getIssues: () => {
    return axios(`search/issues?q=repo:facebook/react&per_page=100`)
      .then((data) => {
        return data;
      })
      .catch(err => {

      });
  },
  getIssueDetail: (id) => {
    return axios(`repos/facebook/react/issues/${id}/comments`)
      .then((data) => {
        return data;
      })
      .catch(err => {

      });
  }
};

export default IssueService;