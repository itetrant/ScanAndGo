import React, {Component , useState } from 'react';
import {View,Text,StyleSheet,Image, Button} from 'react-native';
//import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import { useDispatch } from 'react-redux';

const Product = (props) => {
   
    const [qty, setQty] = useState(1);

    function Plus(){
        setQty(qty + 1);
    }
    function Minus(){
        setQty(qty>1? qty - 1:1);
    }    
    function Clear(){
        setQty(1);
    }

    const dispatch = useDispatch();

    function Order (_id,_name,_price,_unit, _qty, act){
      if (_id !== 'undefined' && _id !=='') {
        dispatch({id: _id, name:_name, price:_price, unit:_unit, qty:_qty ,type: act});
        alert('Item: ' + _name + ' added to cart');
      }
      }  
    // render() {

        return(

            <View>
                       <View style={styles.img}>
                            <Image
                            source={require('../assets/ken.jpg')}
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
                        {/* <Text style={styles.itemStyle}> UNIT: {props.unit}</Text>
                        <Text style={styles.itemStyle}> Qty: {qty}</Text> */}
                        <View style={styles.button}>
                            <Text> Order Qty:</Text>
                            
                            <Button title="  -  " onPress={()=>Minus()}/>
                            <Text> {qty}  {props.unit} </Text>
                            <Button title="  +  " onPress={()=>Plus()}/>

                            <Button title="Add to cart" onPress={()=>Order(props.id?props.id:'',props.name,props.price,props.unit, qty,'UP')}/>
                            
                        </View>
                </View>
            );
        // }        
} 

export default Product;

const styles = StyleSheet.create({
    container: {
      //backgroundColor: 'white',
      padding: 0,
      width:'100%',
    },
    itemStyle: {
      padding: 10,
      fontSize:16,
    },
    img: {
        height: 200,
        width:'100%',
        backgroundColor: '#e4e6eb',
        margin:0,
        borderRadius:0,
    
      },

      button: {
        alignSelf: 'stretch',
        //height: 33,
        flexDirection: 'row', // row
        //backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'space-between', //space-around', //space-between', //'center', 
        margin:10,
      }
  });