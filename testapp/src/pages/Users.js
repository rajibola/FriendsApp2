import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {wp, hp, deviceWidth, deviceHeight} from '../components/common';
import {connect} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';

class Users extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState({isLoading: true});
    this.props.listUsers(1).then((a) => {
      this.setState({isLoading: false});
    });
  }
  render() {
    console.log('USERS DATA', this.props.friends.users_data);
    var data = this.props.friends.users_data;
    return (
      <ScrollView>
        <View style={styles.container}>
          {data && (
            <View>
              {this.renderHeader()}
              {this.renderList()}
            </View>
          )}

          {this.state.isLoading && (
            <View style={styles.isLoading}>
              <ActivityIndicator size="large" color="rgb(98,176,223)" />
            </View>
          )}
        </View>
      </ScrollView>
    );
  }

  renderList() {
    const {data} = this.props.friends.users_data;
    return (
      <View style={styles.listView}>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <TouchableOpacity>
              <View style={styles.list}>
                <Image style={styles.image} source={{uri: item.avatar}} />
                <View>
                  <View style={styles.name}>
                    <Text style={styles.firstName}>{item.first_name}</Text>
                    <Text style={styles.lastName}>{item.last_name}</Text>
                  </View>
                  <Text style={styles.email}>{item.email}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }

  renderHeader() {
    var text = this.props.friends.users_data.ad.text;
    return (
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require('../assets/images/codeLogo.png')}
        />
        <View>
          <Text style={styles.companyName}>StatusCode Weekly</Text>
          <Text style={styles.companyText}>{text}</Text>
        </View>
      </View>
    );
  }
}

const mapState = (state) => ({
  friends: state.friends,
});
const mapDispatch = (dispatch) => ({
  listUsers: (data) => dispatch.friends.listUsers(data),
});

export default connect(mapState, mapDispatch)(Users);

const styles = StyleSheet.create({
  email: {
    fontSize: hp(16),
    color: '#747d8c',
  },
  firstName: {
    fontSize: hp(20),
    paddingRight: wp(4),
    color: '#57606f',
  },
  lastName: {
    fontSize: hp(20),
    color: '#57606f',
  },
  name: {
    flexDirection: 'row',
  },
  listView: {
    width: deviceWidth,
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#f1f2f6',
  },
  image: {
    width: wp(50),
    height: wp(50),
    borderRadius: wp(25),
    margin: wp(10),
  },
  isLoading: {
    position: 'absolute',
    width: deviceWidth,
    height: deviceHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  companyText: {
    width: wp(200),
    fontSize: hp(15),
    color: 'white',
  },
  companyName: {
    fontSize: hp(26),
    fontWeight: 'bold',
    color: 'white',
    lineHeight: hp(30),
    marginBottom: wp(5),
  },
  header: {
    width: wp(375),
    flexDirection: 'row',
    height: hp(150),
    alignItems: 'center',
    backgroundColor: 'black',
  },
  logo: {
    resizeMode: 'cover',
    width: wp(80),
    height: wp(80),
    borderRadius: wp(50),
    borderWidth: 1,
    borderColor: 'white',
    margin: wp(20),
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    width: wp(375),
    height: hp(812),
  },
});
