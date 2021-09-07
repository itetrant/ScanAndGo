import React, { useState } from 'react';
import {View,Text,Image, Button} from 'react-native';
//import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import styles from '../styles/styles.js';
import { useDispatch } from 'react-redux';
// import { useNavigation } from '@react-navigation/native';

const Product = (props) => {
    
    // const navigation = useNavigation();
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
                            source= {{uri:props.imgurl?props.imgurl:'https://mmpro.vn/media/home-solution-01.jpeg'}}
                            // {require('../assets/splash.png')}
                            style={{width:'100%',height:'100%',alignSelf:'center'}}
                            />
                        </View>
                        <Text style={styles.itemLineDetail}> Article No: {props.id}</Text>
                        <View style={styles.itemSeparatorStyle}/>
                        <View style={styles.itemLineDetailLeft}>
                            <Text style={styles.itemLineDetail}> Name: </Text>
                            <Text style={styles.itemLineDetailLeftText}> {props.name}</Text>
                        </View>
                        <View style={styles.itemSeparatorStyle}/>
                        <View style={styles.itemLineDetailLeft}>
                            <Text style={styles.itemLineDetail}> Referent price: </Text>
                            <Text style={styles.itemLineDetailLeftText}> {props.price} </Text>
                        </View>

                        <View style={styles.itemSeparatorStyle}/>
                        <Text style={styles.itemLineDetail}> VAT%: {props.vat}</Text>
                        <View style={styles.itemSeparatorStyle}/>
                        {/* <Text style={styles.itemLineDetail}> Supplier: {props.suppCode}</Text>
                        <Text style={styles.itemLineDetail}> Supplier Name: {props.suppName}</Text> */}
                        <Text style={styles.itemLineDetail}> MMUN: {props.mmun}</Text>
                        <View style={styles.itemSeparatorStyle}/>
                        <Text style={styles.itemLineDetail}> UNIT: {props.unit}</Text>
                        <View style={styles.itemSeparatorStyle}/>
                        {/*<Text style={styles.itemLineDetail}> Qty: {qty}</Text> */}
                        <View style={styles.itemLineDetail}>
                            <Text style={styles.itemLineDetail}> Quantity:</Text>
                            <Button  /*color="#ff5c5c" */title="  -  " onPress={()=>Minus()}/>
                            <Text> {qty} </Text>
                            <Button title="  +  " onPress={()=>Plus()}/>
                            <Button title="Add to cart" onPress={()=>Order(props.id?props.id:'',props.name,props.price,props.unit, qty,'UP')}/>
                            {/* <Button title ="SCAN NEXT" onPress={() =>navigation.navigate('Scanner')}/> */}
                        </View>
                        <View style={styles.itemSeparatorStyle}/>
                </View>
            );
        // }        
} 

export default Product;