import { useQuery } from 'react-query';
import SEO from '@/Components/SEO';

import Preloader from '@/Components/Preloader';
import Formatted from '@/Components/Formatted';
import { fetchCreativeIntro, fetchCreative } from '@/API';

import './style.less';

export default function Creative() {
  return (
    <>
      <SEO 
        title="Creative Coding & Generative Art | Iurii Shapkarin"
        description="Explore my collection of creative coding experiments, generative art, and interactive animations. Algorithmic drawings and visual experiments created with JavaScript and creative coding libraries."
        type="website"
        name="Iurii Shapkarin"
      />
      <div className="Page__Creative Page__Inner">
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


const CreativeProofLink = () =>
  <a target="_blank" rel="noreferrer" href="https://github.com/shapkarin/sketches" style={{ marginBottom: '10px' }}>=> from 9 y.o. repository</a>;

function Intro() {
  const { data: { data: { title, description } } } = useQuery('CreativeIntro', fetchCreativeIntro);

  return <>
    <h1>{ title }{' '}<CreativeProofLink /></h1>
    <p>
      <Formatted>
        { description }
      </Formatted>
    </p>
  </>
}


function Collection(){
  const { data: { data: collection } } = useQuery('Creative', fetchCreative);

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