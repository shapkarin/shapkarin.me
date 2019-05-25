import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GoRepoForked, GoPulse, GoIssueOpened } from 'react-icons/go';
import { MdWeb } from 'react-icons/md';

import Loading from 'Components/Loading';
import liked from './routines';

const mapStateToProps = (state) => {
  const { example: { loading, list } } = state;
  return { loading, list };
};

const mapDispatchToProps = {
  fetch: liked
};

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class Github extends Component {
  componentDidMount(){
    this.props.fetch()
  }

  render () {
    const { loading, list } = this.props;
    return (
      <>
        <Loading loading={loading}>
          <div className="Page__Github">
          {list.map(({
            id,
            full_name,
            html_url,
            description,
            open_issues_count,
            homepage,
            fork,
            updated_at
          }) =>(
            <div key={id} className="Page__GithubItem">
              <div className="Page__GithubItemInner">
                <a className="GithubItem__Link centered-label" href={html_url} target="_blank">{full_name}{fork && <GoRepoForked />}</a>
                <div className="centered-label" style={{maxWidth: '250px', marginBottom: '7px'}}>{description}</div>
                <div className="centered-label" style={{marginBottom: '7px'}}><GoPulse /> {(new Date(updated_at)).toLocaleDateString('ru-RU')}</div>
                <div className="centered-label" style={{marginBottom: '7px'}}><GoIssueOpened /> open issues <a className="IssuesCount" href={`${html_url}/issues`} target="_blank">{open_issues_count}</a></div>
                {homepage && <div className="centered-label" ><MdWeb /> <a href={homepage} target="_blank">homepage</a></div>}
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