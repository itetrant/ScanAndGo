import {MaterialIcons} from 'react-native-vector-icons';
import React, {useState, useEffect, useRef} from 'react';
import { useDispatch,connect } from 'react-redux';
import styles from '../styles/styles.js';

import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  RefreshControl,
  Alert,
  Dimensions,
  Image
} from 'react-native';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const TopSales = (state) => {

  const [dataSource, setDataSource] = useState([]);
  const [refreshing, setRefreshing] = React.useState(true);
  const [jsonBins, setJsonBins] = React.useState([]);
  const [dataSourceCords, setDataSourceCords] = useState([]);
  const MasterKey ='$2b$10$eOvjB2WIN.Bcmr63RlaoLeXCNr1IpSbP/xraLEIrVVzUjPW3jnwQS';
  const AuthorKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidHJhLm5ndXllbi10aGFuaEBtbXZpZXRuYW0uY29tIiwiaWF0IjoxNjMxMDI4MTk3fQ.VBVww3alKhg6YDBDxb1rZvsmAHoQs6y6XAcHoUm5E5Q'; 
  const binsUrls = 'https://api.jsonbin.io/v3/c/613dc646aa02be1d4446ba52/bins';
  const binUrl = 'https://api.jsonbin.io/v3/b/'; //613dcb779548541c29b07588
  const [isConnected, setIsConnected] = useState(false);
  const binUrlp1 = 'https://api.jsonbin.io/v3/b/613dcb779548541c29b07588';
  const mmUrl = 'http://172.26.24.150:8082/TopSales?page=';
  const placeholderUrl = 'https://mmpro.vn/media/catalog/product/placeholder/default/LOGO_MM_200x300-01_1.png';
  const size = 10;
  const { width, height } = Dimensions.get("window");
  const dispatch = useDispatch();

  // const scrollViewRef = useRef();
  // const [page, setPage] = useState(1);

  function Order (_id,_name,_price,_unit, _url, _qty, act){
    if (_id !== 'undefined' && _id !=='') {
      dispatch({id: _id, name:_name, price:_price, unit:_unit, imgurl:_url, qty:_qty, type: act});
      //alert('Item: ' + _name + '\nadded to cart successfully!');
    }
    }  

  const onRefresh = () => {
    //React.useCallback(()
    setRefreshing(true);
    getData((dataSource.length/size) + 1,state.mySite,isConnected);

  } //, [refreshing]);

  useEffect(() => {

    setRefreshing(true);
    getJsonBins();    
    getData(1,state.mySite,isConnected);
    // wait(3000).then(() => {
    //   if(refreshing && dataSource.length===0) {setIsConnected(false);}
    // });

  }, [state.mySite,isConnected]);


  const getJsonBins = ()=>{ //async
    let bins = [];
    let j = 0;
    fetch(binsUrls,{
      mode: 'off', 
      headers: {
        'X-Master-Key':MasterKey,
        'X-Sort-Order': 'ascending',
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
          responseJson.forEach(i => { //for jsonbin api
          bins[j] = i.record;
          j++;
      });
          setJsonBins(bins);
          console.log(jsonBins);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getData = async (p,site,isConnected)=>{

    console.log('Load page:', p, ', site=', site, ', status=' + isConnected);
    {/*isConnected init true */}
    //const url = isConnected?mmUrl + p + '&site=' + site + '&size=' + size: binUrl+ jsonBins[p-1]??jsonBins[0];
    {/*isConnected init false */}
    const url = p===1?binUrlp1: binUrl+ jsonBins[p-1]??jsonBins[0];
 
    fetch(url,{
      mode: 'uat', 
      headers: {
        'Authorization': AuthorKey,
        'X-Master-Key':MasterKey,
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
          if(p===1) {setDataSource(isConnected?responseJson:responseJson.record);}
          else
          {
            let mergedObj = isConnected?[...dataSource,...responseJson]:[...dataSource,...responseJson.record];
            setDataSource(mergedObj);
          }
          setRefreshing(false);
        //console.log(mergedObj);
      })
      .catch((error) => {
        console.error(error);
        setIsConnected(false);
        //console.error(error);
      });
  };

  const ItemView = (item, key) => {
    return (
      // Flat List Item
      <View style={styles.itemContainer}
        key={key}
        onLayout={(event) => {
          const layout = event.nativeEvent.layout;
          dataSourceCords[key] = layout.y;
          setDataSourceCords(dataSourceCords);
          //Debug
          // console.log(dataSourceCords);

        }}>
            
            <View style={styles.TopItemImage} >
            
              <Image source={{uri:item.IMGURL??placeholderUrl}}
                                          style={{width:'100%',height:'100%',alignSelf:'center', 
                                          //resizeMode: 'stretch'
                                          resizeMode: 'contain'
                                          }}                                                              
              />

            </View>

            <View style={styles.itemDetailContainer}>

                <View style={styles.itemName} >                                          
                    <Text
                      style={styles.itemName}
                      onPress={() => getItem(item)}>
                      Top {item.V_ROW}: {item.V_ALIBL}
                    </Text>
                </View>    
                {/* line */}
                <View style={styles.itemSeparatorStyle}/> 

                <View style={styles.itemLineIcon} >
                
                    <Text
                      onPress={() => getItem(item)}>
                      Price: {item.V_PRICE_PERM}
                    </Text>

                    <Text
                      //style={styles.itemLine}
                      onPress={() => getItem(item)}>
                      Sold: {item.V_MMUN_WEIGHT}  {item.V_MMUN_UNIT}
                    </Text>
                    <MaterialIcons
                      name= "add-shopping-cart"  color = "#2592E5" size={26}  onPress={() => createTwoButtonAlert(item.V_ARTNO,item.V_ALIBL,item.V_PRICE_PERM,item.V_MMUN_UNIT,item.IMGURL)}/>
                
                </View>   
                
            </View>    
      </View>
    );
  };


  const createTwoButtonAlert = (id,name,price,unit,url) => {

    let msg = '-Id:' + id + '\n-Name: ' + name + '\n-Price:' + price + '/' + unit;
    Alert.alert(
      "Product details",
      msg,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Add to cart", onPress: () => {console.log("Add-to-cart Pressed", url) ; Order(id,name,price,unit,url,1,'UP');}}
      ]
    );
  }

  const getItem = (item) => {
    // Function for click on an item
    //alert('Id : ' + item.id + ' Name : ' + item.title);
    createTwoButtonAlert(item.V_ARTNO,item.V_ALIBL,item.V_PRICE_PERM,item.V_MMUN_UNIT,item.IMGURL);
   // alert('Barcode : ' + item.ARCCODE + '\nName:' + item.V_ALIBL + '\nPrice:' + item.V_PRICE_PERM + '\nMMUN:' + item.V_MMUN_WEIGHT + '\nUNIT:' + item.V_MMUN_UNIT);
    //     "ARCCODE": "376268",
    //     "V_ARTNO": "376268",
    //     "V_ALIBL": "QUAN D.PHUC JEAN DAI NAM-S30",
    //     "V_VRATE": 10,
    //     "V_CNUF": "26698",
    //     "V_FIBL": "CONG TY TNHH MTV BLUE EXCHANGE - OB",
    //     "V_PRICE_PERM": 341000,
    //     "V_COST_PERM": 300000,
    //     "V_MMUN_WEIGHT": 1,
    //     "V_MMUN_UNIT": "CAI",
    //     "IMGURL":'https://...'
    //     "V_ROW": 1
  };

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 5;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  return (
    <SafeAreaView style={{flex: 1}}>

      <View>
    
        {/* List Item as a function */}
        <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}/>}
            // ref={scrollViewRef}
            // onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
            onScroll={({nativeEvent}) => {
              if (isCloseToBottom(nativeEvent)) {
                
                if (!refreshing) {
                  getData((dataSource.length/size) + 1,state.mySite,isConnected);
                  //wait(3000);
                  setRefreshing(false);
                }
              }
            }}
          >
            {dataSource.length>0?dataSource.map(ItemView):
              <View style={{height:height,width:width}} onPress={()=> setIsConnected(false)}>

                <Text style={styles.loading} 
                  onPress={()=> setIsConnected(false)}>
                  LOADING ... TAB TO CANCEL!
                </Text>

              </View>
            }
            {/* {dataSource.map(ItemView)} */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

function mapStateToProps(state) {
  return { 
      mySite: state.site,
      // mytheme: state.theme
  };
}
export default connect(mapStateToProps)(TopSales);
