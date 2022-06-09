import Head from 'next/head';
import { PageLayout } from 'components/page-layout';

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

      <PageLayout>
        <h1>IP Address Tracker</h1>
        {/* Search */}
        {/* Info */}
        {/* Map */}
      </PageLayout>
    </>
  );
}
