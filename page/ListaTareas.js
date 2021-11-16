import React, { useState, useEffect } from 'react';
import { Button, ScrollView} from 'react-native';
import { ListItem } from 'react-native-elements';
import {fetchAjax} from '../helper/fetch';

export const ListaTareas = (props) => {
    const [listaTareas, setListaTareas] = useState([]);
  
    useEffect(async () => {
        const res = await fetchAjax('tareas');
        const data = await res.json();
        setListaTareas(data);
    }, [])
    
    const detalleTarea = (id)=>{
        props.navigation.navigate("ListaTareas", {idTarea:id})
        console.log("ir : ", id)
    }

    return (
        <ScrollView>
            <Button title="Nuevo" onPress={ ()=> props.navigation.navigate('MantTarea', {idTarea:'nueva'}) }></Button>

            {
                listaTareas.map(tarea => {
                    return (<ListItem key={tarea.id} onPress={()=> 
                                props.navigation.navigate('MantTarea', { idTarea : tarea.id }) 
                            }>
                                <ListItem.Content>
                                    <ListItem.Title>{tarea.descripcion}</ListItem.Title>
                                </ListItem.Content>
                            </ListItem>)
                })
            }
        </ScrollView>
    )
}

