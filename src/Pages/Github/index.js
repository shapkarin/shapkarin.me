import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GoRepoForked, GoPulse, GoIssueOpened } from 'react-icons/go';
import { MdWeb } from 'react-icons/md';

import { fetchRepositories } from './actions';
import Loading from 'Components/Loading';

import './style.less';

const mapStateToProps = (state) => {
  const { github: { loading, repositories } } = state;
  return { loading, repositories };
};

const mapDispatchToProps = {
  fetch: fetchRepositories
};

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class Github extends Component {
  componentDidMount(){
    this.props.fetch();
  }

  render () {
    const { loading, repositories } = this.props;
    return (
      <Loading loading={loading}>
        <div className="Page__Github">
          {repositories.map(({
            id,
            name,
            html_url,
            description,
            open_issues_count,
            homepage,
            fork,
            updated_at
          }) =>(
            <div key={id} className="Page__GithubItem">
              <div className="Page__GithubItemInner">
                <a className="GithubItem__Link centered-label" href={html_url} target="_blank">{name}{fork && <GoRepoForked />}</a>
                <div className="centered-label" style={{maxWidth: '250px', marginBottom: '7px'}}>{description}</div>
                <div className="centered-label" style={{marginBottom: '7px'}}><GoPulse /> {(new Date(updated_at)).toLocaleDateString('ru-RU')}</div>
                <div className="centered-label" style={{marginBottom: '7px'}}><GoIssueOpened /> open issues <a href={`${html_url}/issues`} target="_blank">{open_issues_count}</a></div>
                {homepage && <div className="centered-label" ><MdWeb /> <a href={homepage} target="_blank">homepage</a></div>}
              </div>
            </div>
          ))}
        </div>
      </Loading>
    )
  }
}