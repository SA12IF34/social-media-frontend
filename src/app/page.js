import { redirect } from 'next/navigation';
import {cookies} from 'next/headers'
import Link from 'next/link';
import styles from './styles/page.module.css';
import SideBar from './components/SideBar';
import MainContent from './components/HomeContent';


const baseUrl = process.env.BASE_URL+'/social_media/';
 
async function getAccount(baseUrl) {
  try {
    const res = await fetch(baseUrl+"me/", {
      method: 'GET',
      headers: { 
        Cookie: cookies().toString()
      },
      cache: 'no-store'
    })
    
    if (res.status === 403) throw 'redirect';
    if (res.status === 200) {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    if (error.message === 'fetch failed') {
      return -1
    } 
    else if (error === 'redirect') {
      redirect('/login/');
    }
  }
     
  
  return false;
  
}



async function getFollowings(baseUrl) {
  try {
    const res = await fetch(baseUrl+'follow/', {
      method: 'GET',
      headers: {
          Cookie: cookies().toString()
      },
      cache: 'no-store'
    });
  
    if (res.status === 403) throw 'forbedden';
    if (res.status === 200) {
        const data = await res.json();

        return data;
    } else {
        return [];
    }
  } catch (error) {
    
    return [];
  }
}



export default async function Home() {
  let user = await getAccount(baseUrl);
  let followings = await getFollowings(baseUrl);

 

  return (
    <div className={styles.home}>
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
                        <Link key={f.id} href={`/users/${f.id}`}>
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
    </div>
  )
}

export {getAccount}
export {getFollowings}

 