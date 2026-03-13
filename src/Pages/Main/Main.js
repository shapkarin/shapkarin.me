
import { useQuery } from '@tanstack/react-query';

import SEO from '@/Components/SEO';
import { fetchMainPage } from '@/DAL';

export default function Main() {
  const { data: { data: { data: { title, list } } } } = useQuery({
    queryKey: ['Main'],
    queryFn: fetchMainPage
  });

  return (
    <div className='Page__Main'>
      <SEO
        title="Yuri Shapkarin | Software Engineer"
        description="Yuri Shapkarin's personal website. Experienced Software Engineer."
      />
      {title}
      <ul>
        {list.map((item, id) => (
          <li key={`${id}-main`}>{item}</li>
        ))}
      </ul>
    </div>
  )
}