import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GoRepoForked, GoPulse, GoIssueOpened } from 'react-icons/go';
import { MdWeb } from 'react-icons/md';

import { fetchRepositories } from './actions';
import Loading from 'Components/Loading';

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
        <div>
          {repositories.map(({
            id,
            name,
            html_url,
            description,
            open_issues_count,
            homepage,
            fork,
            updated_at,
            issues_url
          }) =>(
            <div key={id} style={{marginBottom: '10px'}}>
              <a href={html_url}>{name}{fork && <GoRepoForked />}</a>
              <div style={{width: '300px'}}>{description}</div>
              <div><GoPulse /> {(new Date(updated_at)).toLocaleDateString('ru-RU')}</div>
              <div><GoIssueOpened /> open issues <a href={issues_url}>{open_issues_count}</a></div>
              <div><MdWeb /> <a href={{homepage}}>homepage</a></div>
            </div>
          ))}
        </div>
      </Loading>
    )
  }
}