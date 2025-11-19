
import { useQuery } from 'react-query';
import { fetchMainPage } from '@/API';

export default function Main() {
  const { data: { data: { data: mainPageContent } } } = useQuery('Main', fetchMainPage);

  return (
    <div className='Page Page__Main'>
      {mainPageContent}
    </div>
  )
}