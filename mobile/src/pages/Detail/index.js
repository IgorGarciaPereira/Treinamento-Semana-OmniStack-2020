import React from 'react';
import {View, Text, TouchableOpacity, Image, Linking} from 'react-native';
import { Feather } from "@expo/vector-icons";

import logoImg from '../../assets/logo.png';
import styles from './styles';

import { useNavigation } from '@react-navigation/native';


export default function(){
    const navigation = useNavigation();

    function navigateBack(){
        navigation.goBack();
    }

    function sendWhatsApp(){
        const telefone = 558296783203;
        const message = 'Teste de mensagem';
        Linking.openURL(`whatsapp://send?phone=${telefone}&text=${message}`);
    }

    function sendEmail(){

    }

    return (
        <View style={styles.container}>
            
            <View style={styles.header}>
                <Image source={logoImg}/>
                
                <TouchableOpacity
                    onPress={navigateBack}
                >
                    <Feather size={28} color='#e82041' name='arrow-left'/>
                </TouchableOpacity>

            </View>

            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, {marginTop: 0}]}>ONG:</Text>
                <Text style={styles.incidentValue}>APAD</Text>

                <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>Cadelinha atropelada</Text>

                <Text style={styles.incidentProperty}>VALOR:</Text>
                <Text style={styles.incidentValue}>R$ 120,00</Text>

            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}> Salve o dia!</Text>
                <Text style={styles.heroTitle}> Seja o herói desse caso.</Text>

                <Text style={styles.heroDescription}> Entre em contato:</Text>

                <View style={styles.actions}>
                    <TouchableOpacity
                        onPress={sendWhatsApp}
                        style={styles.action}
                    >
                       <Text style={styles.actionText}>WhatsApp</Text> 
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {}}
                        style={styles.action}
                    >
                       <Text style={styles.actionText}>E-mail</Text> 
                    </TouchableOpacity>
                </View>
            </View>


        </View>
    );
}