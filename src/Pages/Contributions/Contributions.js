import React from 'react';

// todo: combine Loading and Close to the Page component
import Loading from 'Components/Loading';
import Close from 'Components/Close';

// TODO: temp
import '../Repositories/style.less'

export default function Contributions({ isLoading, error, data: { data: activites } = { data: []} }) {
  const status = { isLoading, error };

  return (
    <Loading {...status}>
      <Close />
      <div className="Page__Github Page__Inner">
        {activites.map(({
          id,
          type,
          repo: {
            name: repo
          },
          payload: {
            action = null,
            ref_type,
            ref,
            issue: {
              html_url,
              number
            } = {}
          }
        }) => {
          if(type !== 'DeleteEvent') {
            return (
              <div key={id} className="Page__GithubItem">
                <div className="Page__GithubItemInner">
                  <div>
                    { action } { type.replace('Event', '') } { ref_type } { ref } { !!html_url && <a href={html_url}>#{number}</a> }
                  </div>
                  <div>
                    Repo:
                    {' '}
                    <a
                      href={`https://github.com/${repo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      { repo }
                    </a>
                  </div>
                </div>
              </div>
            )
          }
        })}
      </div>
    </Loading>
  );
}
