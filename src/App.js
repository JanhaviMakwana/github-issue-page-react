import React from 'react';
import { BrowserRouter } from 'react-router-dom';
/* import { StateProvider } from './issues-context'; */
import IssueService from './services/issueService';
import { withState } from './issues-context';
import Pages from './Pages/Pages';
import './App.css';


class App extends React.Component {

  componentDidMount() {
    IssueService.getIssues()
    .then(res => {
      this.props.setFilteredIssues(res.data.items);
      this.props.setIssues(res.data.items);
    })
    .catch(err => { console.log(err); })
  }


  render() {
    return (
      <div className="App" style={{ height: '100wh' }}>
        <BrowserRouter>
          <Pages />
        </BrowserRouter>
      </div>

    );
  }
}

export default withState(App);
