import Head from 'next/head';
import { MainApp } from 'components/main-app';

export default function Home() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | IP Address Tracker</title>
        <meta
          name="description"
          content="Solution to Frontend Mentor challenge IP Address Tracker"
        />
      </Head>
      <MainApp />
    </>
  );
}
