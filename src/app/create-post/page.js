import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import styles from '@/app/styles/post.module.css';
import SideBar from '../components/SideBar';
import PostBoard from '../components/PostBoard';
import ShareButton from '../components/ShareButton';


const isAuthenticated = () => {
    var cookie = cookies().get("sessionid");
    if (cookie === undefined || !cookie) {
        redirect('/');
    }
    return ;
}

async function getAccount() {
    const res = await fetch(process.env.BASE_URL+'/social_media/me/', {
        method: 'GET',
        headers: {
            Cookie: cookies().toString()
        }
    })
}

export const metadata = {
    title: 'create-post'
}

export default async function CreatePost() {

    try {
        isAuthenticated();
        await getAccount();
    } catch (error) {
        redirect('/');
    }

    return (
        <div className={styles.container}> 
            <SideBar />
            <div className={styles.playground}> 
                <PostBoard />
                <div className={styles.assets}>
                    <div>
                        <h2>attach an image</h2>
                        <h5>Drag an image here or press upload</h5>
                        <br/>
                        <label htmlFor='file' >upload</label>
                        <input type="file" id='file' name='file' />
                    </div>
                    <ShareButton />
                </div>
            </div>
        </div>
    )
}