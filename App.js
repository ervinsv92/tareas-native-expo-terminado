import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { ListaTareas } from './page/ListaTareas';
import { MantTarea } from './page/MantTarea';

const Stack = createNativeStackNavigator();

const MyStack = ()=>{
  return (
    <Stack.Navigator>
      <Stack.Screen name="ListaTareas" component={ListaTareas} options={{title:"Lista Tareas"}} />
      <Stack.Screen name="MantTarea" component={MantTarea} options={{title:"Mant Tarea"}}/>
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
        <MyStack></MyStack>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
