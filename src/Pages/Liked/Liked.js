import React, { Component } from 'react';
import connect from 'react-redux-connect';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import { GoRepoForked, GoPulse, GoIssueOpened } from 'react-icons/go';
import { MdWeb } from 'react-icons/md';
import { TiStarOutline } from "react-icons/ti";

import Loading from 'Components/Loading';
import Close from 'Components/Close';
import liked from './routines';

@connect
class Github extends Component {
  static mapStateToProps = ({ liked: { loading, list } }) => ({
    loading,
    list
  })

  static mapDispatchToProps = {
    fetch: liked
  }

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    // todo: arrayOf with shape, look at src/Pages/Projects/Projects.js
    list: PropTypes.array.isRequired,
    error: PropTypes.shape({
      code: PropTypes.number,
      message: PropTypes.string
    }),
    fetch: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.fetch();
  }

  render() {
    const { loading, error, list } = this.props;
    const status = { loading, error };
    return (
      <>
        <Loading {...status}>
          <Close />
          <ReactTooltip
            place="left"
          />
          <div className="Page__Github Page__Inner">
          {list.map(({
            id,
            full_name,
            html_url,
            description,
            open_issues_count,
            stargazers_count,
            homepage,
            fork,
            updated_at
          }) =>(
            <div key={id} className="Page__GithubItem">
              <div className="Page__GithubItemInner" style={{maxWidth: '250px'}}>
                <a className="GithubItem__Link centered-label" href={html_url} target="_blank">{full_name}{fork && <GoRepoForked data-tip="fork" />}</a>
                <div className="centered-label" style={{lineHeight: "20px"}}>{description}</div>
                <div className="centered-label"><GoPulse data-tip="last update" /> {(new Date(updated_at)).toLocaleDateString('ru-RU')}</div>
                { open_issues_count > 0 && <div className="centered-label"><GoIssueOpened data-tip="issues" /> open issues: <a className="IssuesCount" href={`${html_url}/issues`} target="_blank">{open_issues_count}</a></div> }
                { !!homepage && <div className="centered-label" ><MdWeb data-tip="homepage" /> <a href={homepage} target="_blank">homepage</a></div> }
                { stargazers_count > 0 && <div className="centered-label"><TiStarOutline data-tip="stars" size="18px" /> stars: {stargazers_count}</div>}
              </div>
            </div>
          ))}
          <div className="Page__GithubItem" style={{flexBasis: '100%'}}>
            <div className="Page__GithubItemInner">
              <a href="https://github.com/shapkarin?tab=stars" target="_blank" className="GithubItem__Link">More at Github...</a>
            </div>
          </div>
        </div>
        </Loading>
      </>
    )
  }
}

export default Github;
