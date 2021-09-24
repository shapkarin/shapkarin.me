import { useQuery } from 'react-query';

import { fetchSketches } from 'Common/API';

import './style.less';

export default function Sketches() {
  const { data: { data: catalog } } = useQuery('Sketches', fetchSketches);

  return (
    <>
      <div className="Page__Sketches Page__Inner Page__Inner_dark">
        <h1>Drawing with code</h1>
        <p>
          Generative art, animation and music visualization experiments
          <br />
          to lear, research and practice. Usually was build fast.
          It's like a sketch drawing but with code.
          <br />
          <br />
        </p>
        <h2>Some are made with pure JS, other with libraries</h2>
        <div className="Gal__Wrapper">
          {Object.keys(catalog).map(category => (
            <div key={category} className="Gal__Column">
              <h3>{`${category}:`}</h3>
              {/* :-) */}
              {catalog[category].map((link, i) => (
                <a
                  {...link}
                  key={`${category}-${i}`}
                  className="Gal--Item"
                  target="_blank"
                >
                  {link.title}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
