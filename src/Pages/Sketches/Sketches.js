import React from 'react';

import links from './catalog';
import './Sketches.less';

export default function() {
  return <div style={{display: 'flex'}}>
    {Object.keys(links).map(category => (
      <div key={category} style={{display: 'flex', flexDirection: 'column'}}>
        <h3>{`${category}:`}</h3>
        <br/> {/* :-) */}
        {links[category].map((link, i) => (
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
  </div>;
};