import axios from 'axios';
import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import FileBase from 'react-file-base64'

const Write = () => {

    const state = useLocation().state

    const [value, setValue] = useState(state?.desc || '');
    const [title, setTitle] = useState(state?.title || '');
    const [file, setFile] = useState(state?.img || null);
    const [cat, setCat] = useState(state?.cat || '');

    const navigate = useNavigate()

    const handleClick = async (e) => {
        e.preventDefault();

        try {
            state
                ? await axios.put(`https://quillserver.onrender.com/api/posts/${state.id}`, {
                    title,
                    desc: value,
                    cat,
                    token: JSON.parse(localStorage.getItem('user'))?.token,
                    img: file
                }, { withCredentials: true })
                : await axios.post(`https://quillserver.onrender.com/api/posts/`, {
                    title,
                    desc: value,
                    cat,
                    // img: file ? imgUrl : "",
                    token: JSON.parse(localStorage.getItem('user'))?.token,
                    img: file,
                    date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
                }, { withCredentials: true })

            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='add'>
            <div className='content'>
                <input type='text' placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} />
                <div className='editorContainer'>
                    <ReactQuill className='editor' theme='snow' value={value} onChange={setValue} />
                </div>
            </div>
            <div className='menu'>
                <div className='item'>
                    <h1>Publish</h1>
                    <span>
                        <b>Visibility: </b> Public
                    </span>
                    <FileBase type="file" multiple={false} onDone={({ base64 }) => setFile(base64)} />
                    <div className='buttons'>
                        <button onClick={handleClick}>Publish</button>
                    </div>
                </div>
                <div className='item'>
                    <h1>Category</h1>
                    <div className='cat'>
                        <input type='radio' checked={cat === 'art'} name='cat' value='art' id='art' onChange={e => setCat(e.target.value)} />
                        <label htmlFor='art'>Art</label>
                    </div>
                    <div className='cat'>
                        <input type='radio' checked={cat === 'science'} name='cat' value='science' id='science' onChange={e => setCat(e.target.value)} />
                        <label htmlFor='science'>Science</label>
                    </div>
                    <div className='cat'>
                        <input type='radio' checked={cat === 'technology'} name='cat' value='technology' id='technology' onChange={e => setCat(e.target.value)} />
                        <label htmlFor='technology'>Technology</label>
                    </div>
                    <div className='cat'>
                        <input type='radio' checked={cat === 'cinema'} name='cat' value='cinema' id='cinema' onChange={e => setCat(e.target.value)} />
                        <label htmlFor='cinema'>Cinema</label>
                    </div>
                    <div className='cat'>
                        <input type='radio' checked={cat === 'design'} name='cat' value='design' id='design' onChange={e => setCat(e.target.value)} />
                        <label htmlFor='design'>Design</label>
                    </div>
                    <div className='cat'>
                        <input type='radio' checked={cat === 'food'} name='cat' value='food' id='food' onChange={e => setCat(e.target.value)} />
                        <label htmlFor='food'>Food</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Write