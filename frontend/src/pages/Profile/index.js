import React, {useEffect, useState} from "react"
import {Link, useHistory} from 'react-router-dom'
import {FiPower, FiTrash2} from 'react-icons/fi';

import LogoImg from "../../assets/logo.svg";
import './styles.css'
import api from '../../services/api';

export default function Profile(){
    const [incidentsOng, setIncidentesOng] = useState([]);

    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    const history = useHistory();

    useEffect( ()=> {

        api.get('profile', {
            headers: {
                authorization: ongId
            }
        }).then( response => {
            setIncidentesOng(response.data);
        }).catch( err =>{
            alert('Não foi possível recuperar os dados. ' + err.message);
        })

    }, [ongId]);

    async function handleDeleteIncident(id){
        await api.delete(`incidents/${id}`, {
            headers:{
                authorization: ongId
            }
        }).then( response => {
            alert('Exclusão realizada com sucesso.');

            setIncidentesOng( incidentsOng.filter( incident => incident.id !== id ));

        }).catch(err => {
            alert('Erro ao realizar exclusão.')
        })
    }


    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">

            <header>
                <img src={LogoImg} alt="Be The Hero" />
                <span>Bem vinda, {ongName}</span>

                <Link to='/incident/new' className='button'> Cadastrar novo caso </Link>
                <button onClick={handleLogout}> <FiPower size={18} color='#e02041' /> </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                { incidentsOng.map(incident => 
                    (
                        <li key={incident.id}>
                            <strong>CASO:</strong>
                            <p>{incident.title}</p>

                            <strong>Descrição</strong>
                            <p>{incident.description}</p>

                            <strong>Valor:</strong>
                            <p> { Intl.NumberFormat('pt-BR', {style: 'currency', currency:'BRL'}).format(incident.value) }  </p>

                            <button type='button' onClick={() => handleDeleteIncident(incident.id)}>
                                <FiTrash2 size={20} color="#a8a8b3" />
                            </button>
                        </li>
                    )
                )}
            </ul>

        </div>
    );
}