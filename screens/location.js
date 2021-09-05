import * as React from 'react';
import { View, Text, ImageBackground , SafeAreaView} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import {Ionicons} from 'react-native-vector-icons';
import { useDispatch, connect } from 'react-redux';
import TopBar from './topBar';
import styles from '../styles/styles.js';

const Location = () => {

  const dispatch = useDispatch();
  function handleChange (_act,_site){
  
      dispatch({ type: _act, site:_site.substring(0,5)})
  
    }  
    const storelist = [
      '10010-MM AN PHU',
      '10011-MM BINH PHU',
      '10012-MM HIEP PHU',
      '10013-MM THANG LONG',
      '10014-MM HOANG MAI',
      '10015-MM HUNG LOI',
      '10016-MM HONG BANG',
      '10017-MM DA NANG',
      '10018-MM BIEN HOA',
      '10019-MM BINH DUONG',
      '10020-MM LONG XUYEN',
      '10021-MM QUY NHON',
      '10022-MM VUNG TAU',
      '10023-MM VINH',
      '10024-MM HA LONG',
      '10025-MM NHA TRANG',
      '10026-MM HA DONG',
      '10027-MM BUON MA THUOT',
      '10028-MM RACH GIA',
      '10029-MM FOOD SERVICE HUNG ',
      '10040-OFFICE CENTRE AN PHU',
      '10041-MM HOANG MAI',
      '10050-FOOD DELIVERY SERVICE',
      '20090-MM THANH XUAN',
      '60051-PHU QUOC DEPOT',
      '60052-DEPOT DA LAT',      
    ];

    return (
      <SafeAreaView style={{flex: 1}}>
          
      <ImageBackground source={require('../assets/bg.png')} resizeMode="cover" style={styles.image}>
            <TopBar />
              <Text style={{fontWeight:'normal',fontSize:16, textAlign:'center', lineHeight:40}}>
                Shopping at: 
                {/* {state.myValue} */}
              </Text>  
              {/* <Text style={{fontWeight:'bold',fontSize:16, textAlign:'center',lineHeight:50}}>
                Store_id: {site}
              </Text>   */}

               <ModalDropdown options={storelist} 
                      defaultValue={storelist[0]}               
                      renderRightComponent={()=>(<Ionicons name="location-outline" size={26} />)}
                      style={{alignItems:'center', flex:1}}
                      textStyle={{fontWeight:'bold',fontSize:20, alignItems:'center',color:'#0272ba'}}
                      dropdownStyle={{height:'50%',alignItems:'center' }}
                      dropdownTextStyle={{fontSize:20, textAlign:'center'}}
                      isFullWidth={true}
                      // onSelect={(id)=>alert("Be sure you're at " + storelist[id])}
                      onSelect={(id)=>handleChange('SITE',storelist[id])}
               />

       </ImageBackground>

    </SafeAreaView>   
  );
}

function mapStateToProps(state) {
  return { 
      myValue: state.site,
      // myHighlight: state.highlight 
  };
}
export default connect(mapStateToProps)(Location);
