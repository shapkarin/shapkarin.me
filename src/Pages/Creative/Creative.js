import { useQuery } from 'react-query';
import SEO from 'Components/SEO';

import Preloader from 'Components/Preloader';
import Formatted from 'Components/Formatted';
import { fetchSketchesIntro, fetchSketches } from 'Common/API';

import './style.less';

export default function Sketches() {
  return (
    <>
      <SEO 
        title="Creative Coding & Generative Art | Iurii Shapkarin"
        description="Explore my collection of creative coding experiments, generative art, and interactive animations. Algorithmic drawings and visual experiments created with JavaScript and creative coding libraries."
        type="website"
        name="Iurii Shapkarin"
      />
      <div className="Page__Sketches Page__Inner Page__Inner_dark">
        <Preloader>
          <Intro />
        </Preloader>
        <Preloader>
          <Collection />
        </Preloader>
      </div>
    </>
  );
}

function Intro() {
  const { data: { data: { title, description } } } = useQuery('SketchesIntro', fetchSketchesIntro);

  return <>
    <h1>{ title }</h1>
    <p style={{ lineHeight: '24px' }}>
      <Formatted>
        { description }
      </Formatted>
    </p>
  </>
}

function Collection(){
  const { data: { data: collection } } = useQuery('Sketches', fetchSketches);

  return <div className="Gal__Wrapper">
    {Object.keys(collection).map(category => (
      <div key={ category } className="Gal__Column">
        <h3>{`${category}:`}</h3>
        {collection[category].map((link, i) => (
          <a
            {...link}
            key={`${ category }-${i}`}
            className="Gal--Item"
            target="_blank"
          >
            { link.title }
          </a>
        ))}
      </div>
    ))}
  </div>
}