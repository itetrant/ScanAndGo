import React, { useState } from 'react';
import {View,Text,Image, Button} from 'react-native';
//import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import styles from '../styles/styles.js';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const Product = (props) => {
    
    const navigation = useNavigation();
    const [qty, setQty] = useState(1);

    function Plus(){
        setQty(qty + 1);
    }
    function Minus(){
        setQty(qty>1? qty - 1:1);
    }    
    const dispatch = useDispatch();

    function Order (_id,_name,_price,_unit, _qty, act){
      if (_id !== 'undefined' && _id !=='') {
        dispatch({id: _id, name:_name, price:_price, unit:_unit, qty:_qty ,type: act});
        alert('Item: ' + _name + '\nadded to cart successfully!');
      }
      }  
    // render() {

        return(

            <View>
                       <View style={styles.img}>
                            <Image
                            source={require('../assets/tap-hoa.jpg')}
                            style={{width:'100%',height:'100%'}}
                            />
                        </View>
                        <Text style={styles.itemStyle}> Article Number: {props.id}</Text>
                        <Text style={styles.itemStyle}> Article Description: {props.name}</Text>
                        <Text style={styles.itemStyle}> Referent price: {props.price}</Text>
                        <Text style={styles.itemStyle}> VAT Rate: {props.vat}</Text>
                        {/* <Text style={styles.itemStyle}> Supplier: {props.suppCode}</Text>
                        <Text style={styles.itemStyle}> Supplier Name: {props.suppName}</Text> */}
                        <Text style={styles.itemStyle}> MMUN: {props.mmun}</Text>
                        <Text style={styles.itemStyle}> UNIT: {props.unit}</Text>
                        {/*<Text style={styles.itemStyle}> Qty: {qty}</Text> */}
                        <View style={styles.button}>
                            <Text> Order Qty:</Text>
                            <Button  /*color="#ff5c5c" */title="  -  " onPress={()=>Minus()}/>
                            <Text> {qty} </Text>
                            <Button title="  +  " onPress={()=>Plus()}/>
                            <Button title="Add to cart" onPress={()=>Order(props.id?props.id:'',props.name,props.price,props.unit, qty,'UP')}/>
                            {/* <Button title ="SCAN NEXT" onPress={() =>navigation.navigate('Scanner')}/> */}
                        </View>

                </View>
            );
        // }        
} 

export default Product;