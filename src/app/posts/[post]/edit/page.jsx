import { cookies } from 'next/headers';
import styles from '@/app/styles/post.module.css';
import SideBar from '@/app/components/SideBar';
import PostBoard from '../../../components/PostBoard';
import EditButton from '@/app/components/EditButton';
import { redirect } from 'next/navigation';

const baseUrl = process.env.BASE_URL;



async function getPost(postId) {
    const res = await fetch(`${baseUrl}/projects/social_media/posts/${postId}/edit/`, {
        method: 'GET',
        headers: {
            Cookie: cookies().toString()
        }
    });

    if (res.status === 200) {
        const data = await res.json();

        return data;
    } else if (res.status === 403) {
        redirect('/');
    }
}


export default async function Edit({params: {post}}) {
    const data = await getPost(post);

    return (
        <div className={styles.container}>
            <SideBar />
            <div className={styles.playground}>
                <PostBoard text={(data['edit_content'])} img={data['file']} />
                <div className={styles.assets}>
                    <div>
                        <h2>attach an image</h2>
                        <h5>Drag an image here or press upload</h5>
                        <br />
                        <label htmlFor="file">upload</label>
                        <input type="file" id='file' name='file' />
                    </div>
                    <EditButton post={post} />
                </div>
            </div>
        </div>
    )
}