import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'

export default function ListPost() {
    const [posts, setPosts] = useState([])
    const [name, setName] = useState('')
    const [company, setCompany] = useState('')

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id')
        const name = urlParams.get('name')
        setName(name)
        const company = urlParams.get('company')
        setCompany(company)
        console.log(name)
        axios.get('http://localhost:8000/posts')
            .then(resp => {
                const posts = resp.data.filter(post => String(post.userId) === id)
                setPosts(posts)
            })
    }, [])

    return (
        <div className="post-container">
            <header>{`Posts do usuário ${name} da empresa ${company}`}</header>
            <ul>{posts.map(post => (<li key={post.id}><p><strong>Título: </strong>{post.title}</p>
                <p><strong>Conteúdo: </strong>{post.body}</p>
            </li>))}
            </ul>
            <Link to='/'><span><FaArrowLeft size={17} style={{ marginRight: 8 }} /></span>Voltar</Link>
        </div>
    )
}