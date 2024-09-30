import Link from 'next/link';
import styles from '../src/styles/welcome.module.css'; 

export default function HomePage() {
  return (


    <div className={styles.container}>
    <h2 className={styles.header}>Choose One Option</h2>
      <div className={styles.options}>
        <Link href="/AddTodo">
          <p className={styles.button}>Add a task</p>
        </Link>
        <Link href="/ListTodo">
          <p className={styles.button}>Show Tasks</p>
        </Link>
      </div>
    </div>
  );
}
