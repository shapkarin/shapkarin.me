
import { useQuery } from 'react-query';
import { fetchAbout } from '@/API';

export default function Main() {
  const { data: { data: { intro } } } = useQuery('Main', fetchAbout);

  return <>{intro}</>;
}