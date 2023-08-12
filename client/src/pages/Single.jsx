import React, { useState, useEffect, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Edit from '../img/edit.png'
import Delete from '../img/delete.png'
import Menu from '../components/Menu'
import axios from 'axios'
import moment from 'moment'
import { AuthContext } from '../context/authContext'

const Single = () => {
    const [post, setPost] = useState()

    const location = useLocation()
    const navigate = useNavigate()

    const postId = location.pathname.split('/')[2]
    const { currentUser } = useContext(AuthContext)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`https://quillserver.onrender.com/api/posts/${postId}`)
                setPost(res.data)
            } catch (error) {
                console.log(error);
            }
        }

        fetchData()
    }, [postId])

    const handleDelete = async () => {
        try {
            await axios.delete(`https://quillserver.onrender.com/api/posts/${postId}`, { data: { token: JSON.parse(localStorage.getItem('user')).token }, withCredentials: true })
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
    }

    return (
        <div className='single'>
            <div className='content'>
                <img src={post?.img || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt='' />

                <div className='user'>
                    {post?.userImg && <img src={post.userImg} alt='' />}

                    <div className='info'>
                        <span>{post?.username}</span>
                        <p>Posted {moment(post?.date).fromNow()}</p>
                    </div>
                    {currentUser?.username === post?.username &&
                        <div className='edit'>
                            <Link to={`/write`} state={post}>
                                <img src={Edit} alt='' />
                            </Link>
                            <img onClick={handleDelete} src={Delete} alt='' />
                        </div>
                    }
                </div>
                <h1>{post?.title}</h1>
                {getText(post?.desc)}
            </div>
            <Menu cat={post?.cat} />
        </div>
    )
}

export default Single