import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../../styles/Layout.module.css'; 

const Layout = ({ children }) => {
  const router = useRouter();

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <h1>Portrea Hauts de France</h1>
        <nav>
          <ul className={styles.nav}>
            <li>
              <Link href="/search">
                <a className={router.pathname === '/search' ? styles.active : ''}>
                  Structures de médiation numérique
                </a>
              </Link>
            </li>
            <li>
              <Link href="/codepostal/00000">
                <a className={router.pathname === '/codepostal/00000' ? styles.active : ''}>
                  Statistiques par communes
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Layout;
