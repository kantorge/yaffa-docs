import styles from './styles.module.css';

export default function HomepageDescription() {
  return (
    <section className={styles.description}>
      <div className="container">
        <div className="row">
          <p>
            The <strong>Documentation</strong> serves as a comprehensive resource hub for users, offering essential guides and instructions to maximize the utility of <strong>YAFFA</strong> personal budget app. From installation guidelines to practical usage tips, this category covers all aspects necessary for a seamless experience. Explore subcategories such as Installation Guide, Getting Started, and Usage to navigate through detailed instructions tailored to your needs. Whether you're a novice user or an experienced aficionado, this section provides valuable insights to enhance your YAFFA journey.
          </p>
          <p>
            One of the benefits of using YAFFA personal finance application is that you host your own instance, giving you control over the behavior of the application, the platform you choose, and most importantly, not requiring you to share your financial data with any third parties. One the other hand, you have to be a bit tech-savvy and open to setting up and maintaining your own instance of YAFFA financial application. The installation guides will provide you all necessary information, guidelines, examples and tutorials, so you could start using YAFFA.
          </p>
          <p>
            YAFFA personal finance application supports most of the features that one would expect from a tool, aiming to help mastering one's personal finances. The building blocks are also similar, related to assets, terms, terminologies: accounts, budgets, currencies, transactions, etc. These articles highlight these concepts as part of capabilities and features of YAFFA personal finance application, while the Usage section provides detailed, step-by-step instructions about the usage of various features of YAFFA.
          </p>
        </div>
      </div>
    </section>
  );
}