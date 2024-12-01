import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import the FontAwesomeIcon component.
import { fas } from '@fortawesome/free-solid-svg-icons'; // Import the necessary icon categories.
import Link from '@docusaurus/Link';
library.add(fas); // Add the necessary icon categories to the library.

const FeatureList = [
  {
    title: 'Installation',
    icon: ['fas', 'download'],
    description: (
      <>
        Learn how to set up, customize, and run your own instance of YAFFA budget app
      </>
    ),
    url: '/resources/category/installation',
  },
  {
    title: 'First steps',
    icon: ['fas', 'play'],
    description: (
      <>
        Get a step by step guide to make your first steps on your financial journey with YAFFA
      </>
    ),
  },
  {
    title: 'Guides',
    icon: ['fas', 'book'],
    description: (
      <>
        Get to know the details and learn all the best practices to easily manage your finances
      </>
    ),
  },
];

function Feature({title, description, icon, cta, url}) {
  cta = cta || 'Learn more';
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <div className={styles.featureIconContainer}>
          <FontAwesomeIcon icon={icon} size="3x" />
        </div>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
      <div className="text--center padding-horiz--md">
        <Link
          className="button button--primary button--lg"
          to={url}>
          {cta}
        </Link>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
