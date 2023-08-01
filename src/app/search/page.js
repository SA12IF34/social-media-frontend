import styles from '@/app/styles/search.module.css';
import SideBar from '../components/SideBar';
import Search from '../components/Search';


export const metadata = {
  title: 'search'
}

function page() {
  return (
    <div className={styles.container}>
      <SideBar />
      <Search />
    </div>
  )
}

export default page