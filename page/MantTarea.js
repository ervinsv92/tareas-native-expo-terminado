import React, { useEffect, useState } from 'react'
import { ActivityIndicator, View, StyleSheet, ScrollView, TextInput, Alert } from 'react-native'
import { Button } from 'react-native-elements/dist/buttons/Button';
import { fetchAjax } from '../helper/fetch';

const initialState = {
    id:'',
    descripcion:'',
}

export const MantTarea = (props) => {
    const [loading, setLoading] = useState(true);
    const [tarea, setTarea] = useState(initialState);
    const [idTarea, setIdTarea] = useState("nueva");

    const handleChangeText = (name, value)=>{
        setTarea({...tarea, [name]:value});
    }

    const handleOnSave = async ()=>{
        console.log("save tarea: ", tarea)
        if(tarea.decripcion ===''){
            alert('Debe ingresar una tarea.');
        }else{
            try {
                if(idTarea == "nueva"){
                    const res = await fetchAjax('tareas', tarea, 'POST');
                }else{
                    const res = await fetchAjax(`tareas/${tarea.id}`, tarea, 'PUT');
                }
                
                props.navigation.navigate('ListaTareas');
            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleOnDelete = async ()=>{
        try {
            const res = await fetchAjax(`tareas/${tarea.id}`, {}, 'DELETE');
            props.navigation.navigate('ListaTareas');
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        (async function() {
            setIdTarea(props.route.params.idTarea);
            // console.log("load: ", idTarea)
            // if(idTarea != "nueva"){
            //     const tarea = await fetchAjax(`tareas/${idTarea}`);
            //     setTarea(tarea);
            //     console.log(tarea)
            // }
            
            // setLoading(false);
        })();
    }, [])

    useEffect(() => {
        (async function() {
            if(idTarea != "nueva"){
                const res = await fetchAjax(`tareas/${idTarea}`);
                const tarea = await res.json();
                if(tarea){
                    setTarea(tarea);
                }
            }
            
            setLoading(false);
        })();
    }, [idTarea])

    const openConfirmationAlert = ()=>{
        Alert.alert('Remover usuario', '¿Está seguro?',[
            {text:'Si', onPress:()=>handleOnDelete()},
            {text:'No', onPress:()=>console.log(false)}
        ])
    }

    if(loading){
        return (
            <View>
                <ActivityIndicator size="large" color="#9e9e9e"/>
            </View>
        )
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Tarea" value={tarea.descripcion} onChangeText={(value) => handleChangeText("descripcion", value)}/>
            </View>
            
            {
                (idTarea != "nueva") &&
                    <View>
                        <Button
                            color="#19AC52"
                            title="Actualizar" onPress={handleOnSave}/>
                        <Button 
                            color="#E37399"
                            title="Eliminar" onPress={openConfirmationAlert}/>
                        
                    </View>
            }

            {
                (idTarea == "nueva") &&
                <View>
                    <Button style={styles.button}
                        title="Guardar" 
                        onPress={handleOnSave}/>
                </View>
            }
            
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:35
    },
    inputGroup:{
        flex:1,
        padding:0,
        marginBottom:15,
        borderBottomWidth:1,
        borderBottomColor:"#ccc"
    }
});