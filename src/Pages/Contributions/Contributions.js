import React from 'react';

import { fetchContributions } from 'Common/API';
import { useQuery } from 'react-query';

export default function Contributions() {
  const { data: { data: list }} = useQuery('Contributions', fetchContributions);

  return (
    <>
      <div className="Page__Github Page__Inner">
        {list.map(({
          id,
          type,
          repo: {
            name: repo
          },
          payload: {
            action,
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
                    { action } { type && type.replace('Event', '') } { ref_type } { ref } { !!html_url && <a href={html_url}>#{number}</a> }
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
    </>
  );
}
