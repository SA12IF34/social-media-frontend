import styles from '@/app/styles/search.module.css';
import SideBar from '../components/SideBar';
import Notifications from '../components/Notifications';

export const metadata = {
    title: 'notifications'
}

export default function NotificationsPage () {

    return (
        <div className={styles.container}>
            <SideBar />
            <Notifications />
        </div>
    )
}