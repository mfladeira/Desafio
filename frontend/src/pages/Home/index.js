import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './style.css';
import { FaSearch } from 'react-icons/fa';

export default function Home() {
    const [users, setUsers] = useState([])
    const [companies, setCompanies] = useState([])

    const [selectedCompany, setSelectedCompany] = useState('0');

    useEffect(() => {
        axios.get('http://localhost:8000/users')
            .then(resp => {
                let CompaniesNames = resp.data.map(user => user.company.name)
                const setCompaniesNames = new Set(CompaniesNames)// Para não ter nomes de empresas repetidos
                CompaniesNames = Array.from(setCompaniesNames)

                setCompanies(CompaniesNames)
                setUsers(resp.data)
            })
    }, [])

    function handleSelectCompany(event) {
        const company = event.target.value;
        setSelectedCompany(company);
    }

    return (
        <div className="home-container">
            <header>
                <strong>API que lista os posts dos usuários das respectivas empresas em que trabalham</strong>
            </header>
            <select name="companies" id="companies" value={selectedCompany} onChange={handleSelectCompany}>
                <option value="0">Selecione uma uma empresa...</option>
                {companies.map(company => (
                    <option key={company} value={company}>{company}</option>
                ))}
            </select>
            <ul>{users.filter(user => user.company.name === selectedCompany)
                .map(userMapped => (<li key={userMapped.id}>
                    <p><strong>Nome:</strong> {userMapped.name}</p>
                    <p><strong>Empresa:</strong> {userMapped.company.name}</p>
                    <Link to={`/listPost?id=${userMapped.id}&name=${userMapped.name}&company=${userMapped.company.name}`}>
                        <span><FaSearch size={16} style={{ marginRight: 8 }} /></span>Vizualizar Posts</Link></li>))}
            </ul>
        </div>
    )
}