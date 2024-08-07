import { cookies } from 'next/headers';
import Link from 'next/link';
import styles from '@/app/styles/post.module.css';
import PostMenu from '../../components/PostMenu';

async function getAuthor(baseUrl, author) {
    const res = await fetch(`${baseUrl}/social_media/accounts/${author}/`, {
        method: 'GET', 
        headers: {
            Cookie: cookies().toString()
        },
        cache: 'no-store'
    })

    if (res.status === 200) {
        const data = await res.json();

        return data;
    }
    return false;
}

async function checkAuthor(baseUrl, author) {
    var cookie = cookies().get('sessionid');
    if (cookie) {
        const res = await fetch(`${baseUrl}/social_media/me/`, {
            method: 'GET',
            headers: {
                Cookie: cookies().toString()
            },
            cache: 'no-store'
        })

        if (res.status === 200) {
            const data = await res.json();
            if (data['id'] === author) {
                return true;
            }
        }
    }

    return false;
}
 
async function Header({postId, baseUrl, author}) { 
    const postAuthor = await getAuthor(baseUrl, author);
    const isAuthor = await checkAuthor(baseUrl, author);

    return (  
        <div className={styles.postAuthor}>
            <Link href={`/users/${author}/`}>
                <div>
                    <div className={styles.img}>
                        {postAuthor['profile_img'] && <img src={process.env.BASE_URL+postAuthor['profile_img']} />}
                    </div>
                    <span >
                        {postAuthor && (<>@{postAuthor.username}</>)}
                    </span>
                </div>
            </Link>
            {isAuthor && <PostMenu postId={postId} />}
        </div>
    )
}

export default Header;