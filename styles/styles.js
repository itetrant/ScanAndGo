import { StyleSheet } from 'react-native';
import { Dimensions} from 'react-native';
const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
///////////////////////////////////
//HomeView
title_text: {
    color: 'black',
    //fontFamily:'Arial',
    fontSize: 18,
    lineHeight: 36,
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft:10,
    //backgroundColor: 'rgba(240, 240, 240, 0.9)',
  } ,   
///////////////////////////////////  
//Topsales
itemContainer: {
  marginTop: 0,
  margin: 5,
  //padding:5,
  backgroundColor: 'white', //#fbfbfa',
  borderRadius:0,
  flexDirection:'row',
  width:width,
  //height:100,
  //marginTop:10,
},
TopItemImage: {
  flexDirection:'row', 
  width:80,
  height:100,
  //alignSelf:'flex-start',
},
itemDetailContainer: {
  width:width-100,
  alignSelf:'center',
  //textAlign:'center'
},
itemName: {
    margin: 5,
    //lineHeight:25,
    fontWeight:'bold',
    color: 'black'//'#2592E5',
    //textAlign:'center'
  },
itemLineIcon: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  margin: 10,
  width:width-102
  //lineHeight:25,
},
///////////////////////////////////
//Location
    locationcontainer: {
      flex: 1,
    },
    image: {
      flex: 1,
      justifyContent: "center"
    },
///////////////////////////////////
//product styles    
    itemStyle: {
      padding: 10,
      fontSize:16,
    },
    img: {
        height:200,
        width:'100%',
        backgroundColor: '#e4e6eb',
        marginBottom:10,
        borderRadius:10,
        padding:0,
      },

      button: {
        alignSelf: 'stretch',
        //height: 33,
        flexDirection: 'row', // row
        //backgroundColor: '#fbfbfa',
        alignItems: 'center',
        justifyContent: 'space-between', //space-around', //space-between', //'center', 
        margin:10,
      },
///////////////////////////////////      
//priceCheck
headerContainer: {
    flexDirection: 'row',
    marginTop: 0,
    backgroundColor: '#ff0000', //'#C70039',
    borderRadius: 0 ,
  },

  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    flex: 1,
    margin:1,
    alignItems: 'center',
    borderRadius: 0 ,
  },
  cancelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 6,
    flexDirection: 'row',
  },
///////////////////////////////////
//cart styles
cartcontainer: {
    flex:1,
    backgroundColor:'#e9e7e2'// 'rgba(240, 240, 240, 0.9)', //'white',// 
 },
 TotalLine: {
   //marginBottom: 5,
   padding:10,
   backgroundColor: '#f2f0eb',
   flexDirection: 'row',
   justifyContent: 'space-between',
 },
 itemLineHead: {
   //margin: 5,
   padding:5,
   //lineHeight:20,
   flexDirection: 'row',
   justifyContent: 'space-between',
   //backgroundColor: '#f8f7f5',
 },
 itemLineDetail: {
   flexDirection: 'row',
   justifyContent:'space-between',
   margin: 2,
   padding:2,
   alignItems:'center',
   fontSize:16,
   color: '#000000',
 },
 itemLineDetailLeft: {
  flexDirection: 'row',
},
itemLineDetailLeftText: {
  margin: 2,
  padding:2,
  fontSize:16,
  fontWeight:'bold',
  color: '#000000',
  //color: '#2592E5',
},

 itemSeparatorStyle: {
   height: 0.5,
   width: '100%',
   backgroundColor: '#c5c6c6',
 },
 loadingContainer: {
  backgroundColor: 'white', //#fbfbfa',
  height:'100%',
  width:'100%',
},
  });