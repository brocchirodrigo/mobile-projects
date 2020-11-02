import React, {useEffect, useState} from 'react';
import api from './services/api'

import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

export default function App() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then(response => {
            // console.log(response.data)
            setProjects(response.data)
        })

    }, [])

    async function handlerAddProject() {
        const response = await api.post('projects', {
            title: `Novo projeto ${Date.now()}`,
            owner: 'Rodrigo Brocchi Teste'
        })

        setProjects([...projects, response.data])

    }

    return (
    <>
        <StatusBar barStyle="light-content" backgroundColor="#7159c1" />

        <SafeAreaView style={styles.container}>
        <FlatList 
            data={projects}
            keyExtractor={project => project.id}
            renderItem={({ item: project }) => (
                <Text style={styles.project}>{project.title}</Text>
            )}
        />

        <TouchableOpacity 
            activeOpacity={0.6} 
            style={styles.button} 
            onPress={handlerAddProject}
        >
            <Text style={styles.buttonText}>Adicionar projetos</Text>
        </TouchableOpacity>

        </SafeAreaView>
    </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7159c1',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFF',
    },
    project: {
        fontSize: 25,
        color: '#FFF',
    },
    button: {
        backgroundColor: '#FFF',
        margin: 20,
        height: 50,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
    }
})