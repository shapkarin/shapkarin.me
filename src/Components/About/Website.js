import { Fragment, useState } from 'react';
import Collapse from 'Components/Collapse';
import RandomButton from 'Components/RandomButton';

export default function AboutWebsite() {
    const [isMoreInfo, setIsMoreInfo] = useState(false);

    return  (
      <Fragment>
        {!isMoreInfo && <Fragment><br/><div className="Link" onClick={() => setIsMoreInfo(true)}>{'---> About website <---'}</div></Fragment>}
        <Collapse open={isMoreInfo}>
          <div style={{ marginTop: 10 }}>
            <hr />
            <div className="p">
              UPD: Will be rewritten to next.js <br/>
              Website dependecies React, React Hooks, React Query, Github API <a href="https://github.com/shapkarin/shapkarin.me/blob/master/package.json" target="_blank" rel="noreferrer">and other</a><br />
              Persional JSON API is <a href="https://github.com/shapkarin/shapkarin.me/tree/master/src/Generate-Backend" target="_blank" rel="noreferrer">generating</a>{' '}
              from <a href="https://github.com/shapkarin/shapkarin.me/blob/master/src/Generate-Backend/database.js" target="_blank" rel="noreferrer">JS structures</a> and serve as a static JSON files(<a href="https://github.com/shapkarin/shapkarin.me/tree/gh-pages/api/packages/info" target="_blank" rel="noreferrer">example</a>).<br />
              The backgound is <RandomButton className="Link">generated</RandomButton> by pure JS and Canvas API.<br />
            </div>
            <div className="Link" onClick={() => setIsMoreInfo(false)}>[Hide website info]</div>
            <hr />
          </div>
        </Collapse>
      </Fragment>
    )
}