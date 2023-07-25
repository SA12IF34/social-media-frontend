import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import styles from './styles/page.module.css';
import SideBar from './components/SideBar';
import MainContent from './components/HomeContent';


async function getAccount() {
  const res = await fetch("http://127.0.0.1:8000/projects/social_media/me/", {
    method: 'GET',
    headers: {
      Cookie: cookies().toString()
    },
    cache: 'no-store'
  })

  const status = await res.status;

  if (status === 403) {
    redirect('/login/')
  }else if (status === 200) {
    const data = await res.json();
    return data
  }
  
}

// check website blueprint
export default async function Home() {

  let response = await getAccount();

  let followings = false;
  let content = true;

  return (
    <div className={styles.home}>
        <SideBar/>
        <main>
          <MainContent content={content} />
          <div className={styles.personal}> 
            <div>
              <Link href={'/me/'}>
                <div className={styles.info}>
                  <div className={styles.img}></div>
                  <div >
                    <h4>{response['name']}</h4>
                    <h5>@{response['name']}</h5>
                  </div>
                </div>
              </Link>
            </div>
            <div>
            {followings ? 
              (<h1>Salmoon</h1>) : 
              (
                <div className={styles.noFollowings}>
                  <h3>here your followings will appear</h3>
                </div>
              )
            }
            </div>
            <div className={styles.terms}>

            </div>
          </div>
        </main>
    </div>
  )
}
