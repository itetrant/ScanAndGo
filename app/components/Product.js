import React, { useState } from 'react';
import {View,Text,Image, Button} from 'react-native';
//import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import Styles from '../styles/Styles';
import { useDispatch } from 'react-redux';
//import { useNavigation } from '@react-navigation/native';

const Product = (props) => {
    
    //const navigation = useNavigation();
    const [qty, setQty] = useState(1);

    function Plus(){
        setQty(qty + 1);
    }
    function Minus(){
        setQty(qty>1? qty - 1:1);
    }    
    const dispatch = useDispatch();

    function Order (_id,_name,_price,_unit, _url, _qty, act){
      if (_id !== 'undefined' && _id !=='') {
        dispatch({id: _id, name:_name, price:_price, unit:_unit, imgurl:_url, qty:_qty, type: act});
        alert('Item: ' + _name + '\nadded to cart successfully!');
      }
      }  
    // render() {

        return(

            <View>
                       <View style={Styles.img}>
                            <Image 
                            source= {{uri:props.name!=='NOT FOUND'?props.imgurl??'data:image/png;base64,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':'https://boyztomen.co.uk/assets/images/no-magento-product-found.jpg'}}
                            // {require('../assets/splash.png')}
                            style={{width:'100%',height:'100%',alignSelf:'center', 
                                    //resizeMode: 'stretch',
                                    resizeMode: props.imgurl?'stretch':'contain'
                                    }}
                            />
                        </View>
                        <Text style={Styles.itemLineDetail}> Article No: {props.id}</Text>
                        <View style={Styles.itemSeparatorStyle}/>
                        <View style={Styles.itemLineDetailLeft}>
                            <Text style={Styles.itemLineDetail}> Name: </Text>
                            <Text style={Styles.itemLineDetailLeftText}> {props.name}</Text>
                        </View>
                        <View style={Styles.itemSeparatorStyle}/>
                        <View style={Styles.itemLineDetailLeft}>
                            <Text style={Styles.itemLineDetail}> Referent price: </Text>
                            <Text style={Styles.itemLineDetailLeftText}> {props.price} </Text>
                        </View>

                        <View style={Styles.itemSeparatorStyle}/>
                        <Text style={Styles.itemLineDetail}> VAT%: {props.vat}</Text>
                        <View style={Styles.itemSeparatorStyle}/>
                        {/* <Text style={Styles.itemLineDetail}> Supplier: {props.suppCode}</Text>
                        <Text style={Styles.itemLineDetail}> Supplier Name: {props.suppName}</Text> */}
                        <Text style={Styles.itemLineDetail}> MMUN: {props.mmun}</Text>
                        <View style={Styles.itemSeparatorStyle}/>
                        <Text style={Styles.itemLineDetail}> UNIT: {props.unit}</Text>
                        <View style={Styles.itemSeparatorStyle}/>
                        {/*<Text style={Styles.itemLineDetail}> Qty: {qty}</Text> */}
                        <View style={Styles.itemLineDetail}>
                            <Text style={Styles.itemLineDetail}> Quantity:</Text>
                            <Button  /*color="#ff5c5c" */title="  -  " onPress={()=>Minus()}/>
                            <Text> {qty} </Text>
                            <Button title="  +  " onPress={()=>Plus()}/>
                            <Button title="Add to cart" onPress={()=>Order(props.id?props.id:'',props.name,props.price,props.unit, props.imgurl,qty,'UP')}/>
                            {/* <Button title ="SCAN NEXT" onPress={() =>navigation.navigate('Scanner')}/> */}
                        </View>
                        <View style={Styles.itemSeparatorStyle}/>
                </View>
            );
        // }        
} 

export default Product;