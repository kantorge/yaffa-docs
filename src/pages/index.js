import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import HomepageDescription from '@site/src/components/HomepageDescription';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          Documentation and guides for YAFFA personal finance application
        </Heading>
        <p>Check out the guidelines and instructions about YAFFA personal budget app, to get you started setting up you own application instance, and to make it easy to manage your personal finances.</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/resources/introduction">
            Read the Docs
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Documentation for YAFFA personal finance application"
      description="Check out the guidelines and instructions about YAFFA personal budget app, to get you started setting up you own application instance, and to make it easy to manage your personal finances.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <HomepageDescription />
      </main>
    </Layout>
  );
}
