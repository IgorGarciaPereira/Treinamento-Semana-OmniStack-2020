import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import {View, FlatList, Text, Image, TouchableOpacity} from 'react-native'

import { Feather } from '@expo/vector-icons'
import logoImg from '../../assets/logo.png';
import api from '../../services/api';


import style from './styles';

export default function Incidents(){
    const navigation = useNavigation();

    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    async function loadIncidents(){

        if (loading) return;
        if (total > 0 && incidents.length === total) return;

        setLoading(true);

        await api.get(`incidents?page=${page}`).then( response => {
            setIncidents([...incidents, ...response.data]);
            setTotal(response.headers['x-total-count'])
            setPage(page + 1)
        }).catch( err => {
            alert('Erro ao ')
        })

        setLoading(false);
    }


    useEffect( () => {loadIncidents()}, []);

    function navigateToDetail(){
        navigation.navigate('Detail')
    }
    
    return (
        <View style={style.container}>

            <View style={style.header}>
                <Image source={logoImg}/>

                <Text> 
                    Total de 
                    <Text style={style.headerTextBold}> {total} casos</Text>
                </Text>

            </View>

            <Text style={style.title}>Bem-vindo!</Text>
            <Text style={style.description}>
                Escolha um dos casos abaixo e salve o dia.
            </Text>

            
            <FlatList 
                data={incidents}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                style={style.incidentsList}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={ ({item: incident}) => (
                    <View style={style.incident}>
                        <Text style={style.incidentProperty}>ONG:</Text>
                        <Text style={style.incidentValue}>{incident.name}</Text>

                        <Text style={style.incidentProperty}>CASO:</Text>
                        <Text style={style.incidentValue}>{incident.title}</Text>

                        <Text style={style.incidentProperty}>VALOR:</Text>
                        <Text style={style.incidentValue}>R$ {incident.value}</Text>

                        <TouchableOpacity style={style.detailsButton}
                            onPress={navigateToDetail}
                        >
                            <Text style={style.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#e02041"/>
                        </TouchableOpacity>
                    </View>
                )}
            />

        </View>
    )
}