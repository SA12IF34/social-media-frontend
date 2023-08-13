import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import Link from 'next/link';
import styles from './styles/page.module.css';
import SideBar from './components/SideBar';
import MainContent from './components/HomeContent';

const baseUrl = process.env.BASE_URL+'/projects/social_media/';

async function getAccount() {
  const res = await fetch(baseUrl+"me/", {
    method: 'GET',
    headers: {
      Cookie: cookies().toString()
    },
    cache: 'no-store'
  })
      
  if (res.status === 403) {
    redirect('/login/');
  }
  if (res.status === 200) {
    const data = await res.json();
    return data
  }
    

  return false;
  
}

async function getFollowings() {
  const res = await fetch(baseUrl+'follow/', {
      method: 'GET',
      headers: {
          Cookie: cookies().toString()
      },
      cache: 'no-store'
  });

  if (res.status === 200) {
      const data = await res.json();

      return data;
  } else {
      return false
  }
}


export default async function Home() {
  let serverDown;
  let user;
  let followings;
  
  try {
    user = await getAccount();
    followings = await getFollowings();
    serverDown = false;
  } catch (error) {
    if (error['digest']) {
      redirect('login');
    }
    serverDown= true;
  }


  return (
    <div className={styles.home}>
        {!serverDown ? (
          <>
            <SideBar img={user.profile_img} />
            <main>
              <MainContent userId={user.id} />
              <div className={styles.personal}> 
                <div>
                  <Link href={'/me/'}>
                    <div className={styles.info}>
                      <div className={styles.img}>
                        {user.profile_img && <img src={process.env.BASE_URL+user.profile_img} />}
                      </div>
                      <div >
                        <h4>{user['fname']} {user['lname']}</h4>
                        <h5>@{user['username']}</h5>
                      </div>
                    </div>
                  </Link>
                </div>
                <div>
                {followings.length > 0 ? 
                  followings.map(f => {
                    return (
                      <Link href={`/users/${f.id}`}>
                        <div className={styles.followings}>
                          <div className={styles.img}>
                            {f.profile_img && <img src={process.env.BASE_URL+f.profile_img} />}
                          </div>
                          <div>
                            <h4>{f['fname']} {f['lname']}</h4>
                            <h5>@{f['username']}</h5>
                          </div>
                        </div>
                      </Link>
                    )
                  }) : 
                  (
                    <div className={styles.noFollowings}>
                      <h3>here your followings will appear</h3>
                    </div>
                  )
                }
                </div>
              </div>
            </main>
          </>
        ): (
          <h2 style={{margin: '30px'}}>The server is currently down</h2>
        )}
    </div>
  )
}
