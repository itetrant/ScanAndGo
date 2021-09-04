import * as React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import {Ionicons} from 'react-native-vector-icons';
import { useDispatch } from 'react-redux';
import TopBar from './topBar';
import styles from '../styles/styles.js';

export default function Location() {

  const dispatch = useDispatch();
  function handleChange (act){
  
      dispatch({ type: act})
  
    }  
    const storelist = [
          'MM AN PHU',
          'MM BINH PHU',
          'MM HIEP PHU',
          'OFFICE CENTRE AN PHU',
          'FOOD DELIVERY SERVICE CENTRE',
          'MM THANG LONG',
          'MM HOANG MAI',
          'MM HOANG MAI',
          'MM HA DONG',
          'MM HUNG LOI',
          'MM HONG BANG',
          'MM DA NANG',
          'MM BIEN HOA',
          'MM BINH DUONG',
          'MM LONG XUYEN',
          'MM QUY NHON',
          'MM VUNG TAU',
          'MM VINH',
          'MM HA LONG',
          'MM NHA TRANG',
          'MM BUON MA THUOT',
          'MM RACH GIA'
    ];

    return (
    <View style={styles.locationcontainer}> 
          
      <ImageBackground source={require('../assets/bg.png')} resizeMode="cover" style={styles.image}>
            <TopBar />
              <Text style={{fontWeight:'normal',fontSize:16, textAlign:'center', lineHeight:40}}>
                Shopping at:
              </Text>  
              {/* <Text style={{fontWeight:'bold',fontSize:16, textAlign:'center',lineHeight:50}}>
                Store_id: {site}
              </Text>   */}

               <ModalDropdown options={storelist} 
                      defaultValue={storelist[0]}               
                      renderRightComponent={()=>(<Ionicons name="location-outline" size={26} />)}
                      style={{alignItems:'center', flex:1}}
                      textStyle={{fontWeight:'bold',fontSize:20, alignItems:'center',color:'blue'}}
                      dropdownStyle={{height:'50%',alignItems:'center' }}
                      dropdownTextStyle={{fontSize:20, textAlign:'center'}}
                      isFullWidth={true}
                      // onSelect={(id)=>alert("Be sure you're at " + storelist[id])}
                      onSelect={(id)=>handleChange('UP')}
               />

       </ImageBackground>

    </View>   
  );
}
