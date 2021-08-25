import React, {Component } from 'react';
import {View,Text,StyleSheet,Image, Button} from 'react-native';
//import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';

export default class Product extends Component {
    constructor(props){
        super(props);
        this.state={
            click:0
        }

    }
    Order(){
        this.setState({
            click:this.state.click + 1
        });
    }
    Reduce(){
        this.setState({
            click: this.state.click > 0? this.state.click - 1: 0 
        });
    }    
    Remove(){
        this.setState({
            click:0
        });
    }
    render() {

        return(

            <View>
                       <View style={styles.img}>
                            <Image
                            source={require('../assets/ken.jpg')}
                            style={{width:'100%',height:'100%'}}
                            />
                        </View>
                        <Text style={styles.itemStyle}> Article Number: {this.props.id}</Text>
                        <Text style={styles.itemStyle}> Article Description: {this.props.name}</Text>
                        <Text style={styles.itemStyle}> Referent price: {this.props.price}</Text>
                        <Text style={styles.itemStyle}> VAT Rate: {this.props.vat}</Text>
                        {/* <Text style={styles.itemStyle}> Supplier: {this.props.suppCode}</Text>
                        <Text style={styles.itemStyle}> Supplier Name: {this.props.suppName}</Text> */}
                        <Text style={styles.itemStyle}> MMUN: {this.props.mmun}</Text>
                        <Text style={styles.itemStyle}> UNIT: {this.props.unit}</Text>
                        <Text style={styles.itemStyle}> Order Qty: {this.state.click}</Text>
                        <View style={styles.button}>
                            <Button title="Order" onPress={()=>this.Order()}/>
                            {/* <Button title="Reduce" onPress={()=>this.Reduce()}/> */}
                            <Button title="Cancel" onPress={()=>this.Remove()}/>
                        </View>
                </View>
            );
        }        
} 


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
        justifyContent: 'space-between', //space-around', //space-between', // , space-around //'center', 
        margin:10,
      }
  });