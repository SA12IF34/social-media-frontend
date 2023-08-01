import styles from '@/app/styles/page.module.css';
import Link from 'next/link';

export const metadata = {
    title: `what's next`
}

export default function Next() {

    return (
        <div className={styles.Next}>
            <header>
                <Link href={'/'}>
                    <h1>Name</h1>
                </Link>
            </header>
            <br />
            <div className={styles.NextContent}>
                <p>
                    hello
                </p>
            </div>
        </div>
    )
}