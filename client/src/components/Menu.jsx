import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Menu = ({ cat }) => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`https://quillserver.onrender.com/api/posts/?cat=${cat}`)
                setPosts(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [cat])


    return (
        <div className='menu'>
            <h1>Other posts you may like</h1>
            {posts.map((post) => (
                <div className='post' key={post.id}>
                    <img src={post?.img || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt='' />
                    <h2>{post.title}</h2>
                    <Link className='link' to={`/post/${post.id}`} >
                        <button>Read More</button>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default Menu