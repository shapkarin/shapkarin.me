import { Fragment, useState } from 'react';
import Collapse from 'Components/Collapse';
import RandomButton from 'Components/RandomButton';

export default function AboutWebsite() {
    const [isMoreInfo, setIsMoreInfo] = useState(false);

    return  (
      <Fragment>
        {!isMoreInfo && <div className="Link" onClick={() => setIsMoreInfo(true)}>[About website]</div>}
        <Collapse open={isMoreInfo}>
          <div style={{ marginTop: 10 }}>
            <hr />
            <div className="p">
              Website dependecies React, React Hooks, React Query, Github API <a href="https://github.com/shapkarin/shapkarin.me/blob/master/package.json" target="_blank" rel="noreferrer">and other</a><br />
              Persional JSON API is <a href="https://github.com/shapkarin/shapkarin.me/tree/master/src/Generate-Backend" target="_blank" rel="noreferrer">generating</a>{' '}
              from JS structures and serve as a static JSON files(<a href="https://github.com/shapkarin/shapkarin.me/tree/gh-pages/api/packages/info" target="_blank" rel="noreferrer">example</a>).<br />
              The backgound is <RandomButton className="Link">generated</RandomButton> with pure JS and Canvas API.<br />
            </div>
            <div className="p">
              it's still doesn't has any CSS methodology and markup is not so clear.<br />
            </div>
            <div className="Link" onClick={() => setIsMoreInfo(false)}>[Hide website info]</div>
            <hr />
          </div>
        </Collapse>
      </Fragment>
    )
}