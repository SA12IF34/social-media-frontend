'use client';
import React, {useEffect} from 'react';
import styles from '@/app/styles/post.module.css';

function PostBoard({text, img}) {

  let n = 0;
  useEffect(() => {
    
    let post = document.getElementById('post');
    let ele = document.getElementById("write");
    let fileInput = document.getElementById("file");

    if (text) {
      ele.innerHTML = text;
    }

    fileInput.onchange = async () => {

      let reader = new FileReader()
      reader.onload = () => {
        if (document.querySelector("img")) {
          let img = document.querySelector('img');
          img.src = reader.result;
        } else {

          let img = document.createElement('img');
          let imgContainer = document.createElement("div");
          imgContainer.classList.add(styles.imgContainer);

          img.src = reader.result;
          imgContainer.appendChild(img);
          post.appendChild(imgContainer);
        }
      }
      reader.readAsDataURL(fileInput.files[0])
      
    }
    ele.focus();  
    ele.parentElement.addEventListener('click', (e) => {
      ele.focus();
    })
    
  }, []);

  return (
    <div className={styles.board}>
        <div id='post' className={styles.write}>
          <span contentEditable role="textbox" id='write'>
          </span>
          <br/>
          {img && 
            <div className={styles.imgContainer}>
              <img src={process.env.NEXT_PUBLIC_BASE_URL+img} />
            </div>
            }
        </div>
    </div>
  )
}

export default PostBoard;