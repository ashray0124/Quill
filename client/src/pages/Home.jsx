import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
    const [posts, setPosts] = useState([])

    const cat = useLocation().search

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`https://quillserver.onrender.com/api/posts${cat}`)
                setPosts(res.data)
            } catch (error) {
                console.log(error);
            }
        }

        fetchData()
    }, [cat])

    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
    }

    return (
        <div className='home'>
            <div className='posts'>
                {posts.map((post) => (
                    <div className='post' key={post.id}>
                        <div className='img'>
                            {/* <img src={`../upload/${post.img}`} alt='' /> */}
                            <img src={post.img || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt='' />
                        </div>
                        <div className='content'>
                            <Link className='link' to={`/post/${post.id}`} >
                                <h1>{post.title}</h1>
                            </Link>
                            <p>{getText(post.desc)}</p>
                            <Link className='link' to={`/post/${post.id}`} >
                                <button>Read More</button>
                            </Link>
                        </div>
                        <hr />
                    </div>
                ))}
            </div >
        </div >
    )
}

export default Home