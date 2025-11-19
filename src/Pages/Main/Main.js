
import { useQuery } from 'react-query';

import SEO from '@/Components/SEO';
import { fetchMainPage } from '@/API';

export default function Main() {
  const { data: { data: { data: { title, list } } } } = useQuery('Main', fetchMainPage);

  return (
    <div className='Page__Main'>
      <SEO
        title="Yuri Shapkarin | Software Engineer"
        description="Yuri Shapkarin's personal website. Experienced Software Engineer."
      />
      {title}
      <ul>
        {list.map(item => (
          <li>{item}</li>
        ))}
      </ul>
    </div>
  )
}