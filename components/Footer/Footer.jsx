import Link from 'next/link';
import styles from './Footer.module.css'; // CSS Module for styling

const Footer = () => {
  return (
    <footer className={styles.voxiumFooter}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3>About Voxium</h3>
          <p>
            Voxium is a leading technology company dedicated to innovative solutions. We bridge the gap between
            technology and people.
          </p>
        </div>

        <div className={styles.footerSection}>
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link href="/">
                <span className={styles.link}>Home</span>
              </Link>
            </li>
            <li>
              <Link href="/products">
                <span className={styles.link}>Products</span>
              </Link>
            </li>
            <li>
              <Link href="/services">
                <span className={styles.link}>Services</span>
              </Link>
            </li>
            <li>
              <Link href="/blog">
                <span className={styles.link}>Blog</span>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <span className={styles.link}>Contact Us</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h3>Follow Us</h3>
          <div className={styles.socialLinks}>{/* Social media links here */}</div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>&copy; 2023 Voxium | Designed by the Voxium Team</p>
      </div>
    </footer>
  );
};

export default Footer;
