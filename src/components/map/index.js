import dynamic from 'next/dynamic';

export const Map = dynamic(() => import('./map').then((module) => module.Map), {
  ssr: false,
  loading: () => (
    <div style={{ width: '100%', height: '100%', backgroundColor: 'hsl(0,0%,90%)' }}></div>
  ),
});
