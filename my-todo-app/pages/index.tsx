import Link from 'next/link';
import styles from '../src/styles/welcome.module.css'; 

export default function HomePage() {
  return (


    <div className={styles.container}>
    <h2 className={styles.header}>Todo Application</h2>
      <div className={styles.options}>
        <Link href="/login">
          <p className={styles.button}>Login</p>
        </Link>
        <Link href="/register">
          <p className={styles.button}>Register</p>
        </Link>
      </div>
    </div>
  );
}
