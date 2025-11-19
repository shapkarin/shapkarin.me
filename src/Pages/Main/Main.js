
import { useQuery } from 'react-query';

import SEO from '@/Components/SEO';
import { fetchMainPage } from '@/API';

export default function Main() {
  const { data: { data: { data: mainPageContent } } } = useQuery('Main', fetchMainPage);

  return (
    <div className='Page Page__Main'>
      <SEO
        title="Yuri Shapkarin | Software Engineer"
        description="Yuri Shapkarin's personal website. Experienced Software Engineer."
      />
      {mainPageContent}
    </div>
  )
}