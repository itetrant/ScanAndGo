import {MaterialIcons} from 'react-native-vector-icons';
import React, {useState, useEffect, useRef} from 'react';
import { SafeAreaView,  View,  ScrollView,  Text,  RefreshControl,  Alert,  Image} from 'react-native';
import { useDispatch,connect } from 'react-redux';
//import {useNetInfo} from "@react-native-community/netinfo";
import Styles from './Styles';
import * as APIs from '../../constants/Config';

const _debug = APIs.DEBUG;

function wait(timeout) {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

function TopSales(state) {

  const [dataSource, setDataSource] = useState([]);
  const [refreshing, setRefreshing] = React.useState(true);
  const [jsonBins, setJsonBins] = React.useState([]);

  ////////////////////////////////////////////////////////////////
  const binsUrls  = APIs.API_Bin_Urls;
  const binUrl    = APIs.API_Bin_Base_Url;
  
  const size = APIs.PageSize;
  const maxpage = APIs.MaxPage;

  const dispatch = useDispatch();

  /////////////////////////////////////////////////////////
  ////////TO DO///////////////////////////////////////////
  const [isConnected, setIsConnected] = useState(false);
  // const netInfo = useNetInfo(); //used to check wifi status
  // const scrollViewRef = useRef();
  // const [page, setPage] = useState(1);

  function Order(_id, _name, _price, _unit, _url, _qty, act) {
    if (_id !== 'undefined' && _id !== '') {
      dispatch({ id: _id, name: _name, price: _price, unit: _unit, imgurl: _url, qty: _qty, type: act });
      //alert('Item: ' + _name + '\nadded to cart successfully!');
    }
  }

  function onRefresh() {
    //React.useCallback(()
    setRefreshing(true);
    dataSource?getData((dataSource.length / size) + 1, state.mySite, isConnected):getData(1, state.mySite, isConnected);

  } //, [refreshing]);

  useEffect(() => {
    
    setRefreshing(true);
    getJsonBins();
    getData(1, state.mySite, isConnected);
    // wait(3000).then(() => {
    //   if(refreshing && dataSource.length===0) {setIsConnected(false);}
    // });
  }, [state.mySite, isConnected]);

  function getJsonBins() {
    let bins = [];
    let j = 0;
    fetch(binsUrls, {
      mode: APIs.ENV,
      headers: {
        'X-Master-Key': APIs.API_MasterKey,
        'X-Sort-Order': 'ascending',
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        responseJson.forEach(i => {
          bins[j] = i.record;
          j++;
        });
        setJsonBins(bins);
        _debug ? console.log(jsonBins) : null;
      })
      .catch((error) => {
        _debug ? console.error(error) : null;
      });
  }

  function getData(p, site, isConnected) {
    _debug ? console.log('Load page:', p, ', site=', site, ', status=' + isConnected) : null;
    //Limited JSONBIN
    { p > maxpage ? p = maxpage : p; };

    { /*isConnected init true */ }
    const url = isConnected?APIs.API_Base_Url + '/Articles?page=' + p + '&site=' + site + '&size=' + size: p > 1? binUrl + jsonBins[p-1]: APIs.API_Bin_Url_p1;

    fetch(url, {
      mode: 'uat',
      headers: {
        'Authorization': APIs.API_Token,
        'X-Master-Key':  APIs.API_MasterKey,
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (p === 1) { setDataSource(isConnected ? responseJson : responseJson.record); }

        else {
          let mergedObj = isConnected ? [...dataSource, ...responseJson] : [...dataSource, ...responseJson.record];
          setDataSource(mergedObj);
        }
        setRefreshing(false);
      })
      .catch((error) => {
        _debug ? console.error(error) : null;
        //setIsConnected(false);

      });
  }

  function ItemView(item, key) {
    return (
      // Flat List Item
      <View style={Styles.itemContainer}
        key={key}
      >

        <View style={Styles.TopItemImage}>

          <Image source={{ uri: item.IMGURL ?? APIs.Product_placeholder}}
            style={{
              width: 80, height: 80, alignSelf: 'center',
              //resizeMode: 'stretch'
              resizeMode: 'contain',
              borderRadius: 120,
            }} />

        </View>

        <View style={Styles.itemDetailContainer}>

          <View style={Styles.itemName}>
            <Text
              style={Styles.itemName}
              onPress={() => getItem(item)}>
              Top {item.V_ROW}: {item.V_ALIBL}
            </Text>
          </View>
          {/* line */}
          <View style={Styles.itemSeparatorStyle} />

          <View style={Styles.itemLineIcon}>

            <Text
              onPress={() => getItem(item)}>
              Price:
            </Text>

            <Text style={{ fontWeight: 'bold', color: '#2592E5' }}
              onPress={() => getItem(item)}>
              {item.V_PRICE_PERM}
            </Text>

            <Text

              onPress={() => getItem(item)}>
              Sold: {item.V_MMUN_WEIGHT}  {item.V_MMUN_UNIT}
            </Text>
            <MaterialIcons
              name="add-shopping-cart" color="#2592E5" size={26} onPress={() => Item_Click(item.V_ARTNO, item.V_ALIBL, item.V_PRICE_PERM, item.V_MMUN_UNIT, item.IMGURL)} />

          </View>

          <View style={Styles.itemSeparatorStyle} />

          <View>
            <Text
              style={Styles.itemLineIcon}
              onPress={() => getItem(item)}>
              Location: {item.LOCAT ?? 'To be updated'}
            </Text>
          </View>
        </View>
      </View>

    );
  }


  function Item_Click(id, name, price, unit, url) {

    let msg = '-Id:' + id + '\n-Name: ' + name + '\n-Price:' + price + '/' + unit;
    Alert.alert(
      "Product details",
      msg,
      [
        {
          text: "Cancel",
          onPress: () => _debug ? console.log("Cancel Pressed") : null,
          style: "cancel"
        },
        { text: "Add to cart", onPress: () => { _debug ? console.log("Add-to-cart Pressed", url) : null; Order(id, name, price, unit, url, 1, 'UP'); } }
      ]
    );
  }

  function getItem(item) {
    // Function for click on an item
    Item_Click(item.V_ARTNO, item.V_ALIBL, item.V_PRICE_PERM, item.V_MMUN_UNIT, item.IMGURL);
  }

  function isCloseToBottom({ layoutMeasurement, contentOffset, contentSize }) {
    const paddingToBottom = 5;
    return (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom);
  }


  function ItemPromoView(props) {
    return (

      <View style={Styles.itemPromoStyle}>
        <Image source={{ uri: props.item ? props.item : APIs.Product_placeholder }}
          style={{
            width: '100%', height: '100%', alignSelf: 'center',
            //resizeMode: 'stretch'
            resizeMode: 'contain'
          }} />
      </View>
    );
  }

  return (

    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        refreshControl={<RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh} />}

        scrollEventThrottle={0} //fix iOS <ScrollView> but not `scrollEventThrottle`
        removeClippedSubviews={true} //VirtualizedList: You have a large list that is slow to update



        // ref={scrollViewRef}
        // onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {

            if (!refreshing) {
              dataSource?getData((dataSource.length / size) + 1, state.mySite, isConnected):null;
              //wait(3000);
              setRefreshing(false);
            }
          }
        } }
      >
        {/* Hot Promotions Item view */}

        <View>
          <Text style={Styles.title_text}>Hot Promotions</Text>
          <View style={Styles.itemSeparatorStyle}></View>
          <View style={{ height: 130, flexDirection: 'row' }}>

            {/* //////////////////////////
            to be replaced by API
            ////////////////////////// */}

            <ScrollView horizontal={true}>
              <ItemPromoView item='https://mmpro.vn/media/catalog/product/cache/b3c046f3e4b6993376bcb09384285aa0/2/0/206532_22065322_2.jpg' />
              <ItemPromoView item='https://mmpro.vn/media/catalog/product/cache/b3c046f3e4b6993376bcb09384285aa0/2/3/2315.jpg' />
              <ItemPromoView item='https://mmpro.vn/media/catalog/product/cache/b3c046f3e4b6993376bcb09384285aa0/b/_/b_vi_n.jpg' />
              <ItemPromoView item='https://mmpro.vn/media/catalog/product/cache/b3c046f3e4b6993376bcb09384285aa0/1/0/108486_21084867.jpg' />
              <ItemPromoView item='https://mmpro.vn/media/catalog/product/cache/b3c046f3e4b6993376bcb09384285aa0/3/5/352984.jpg' />
            </ScrollView>
          </View>
        </View>

        {/* Top sales Item view */}
        
        <View>
          <Text style={Styles.title_text}>Top sales</Text>
          <View style={Styles.itemSeparatorStyle}></View>
          <View>
            {dataSource? dataSource.map(ItemView) :
              <View style={Styles.imgLoaderContainer}>
                <Image source={require('../../assets/loader.gif')} />
              </View>}
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

function mapStateToProps(state) {
  return { 
      mySite: state.site,
      // mytheme: state.theme
  };
}
export default connect(mapStateToProps)(TopSales);
