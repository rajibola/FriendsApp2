import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  TextInput,
} from 'react-native';
import React from 'react';
import {wp, hp, deviceWidth, deviceHeight} from '../components/common';
import {connect} from 'react-redux';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import FloatingLabelInput from '../components/FloatingLabelInput';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/dist/AntDesign';

class About extends React.Component {
  constructor() {
    super();
    this.state = {
      description: '',
      location: '',
      page: 0,
    };
  }

  async incrementPageNo() {
    await this.setState({page: this.state.page + 1});
    // this.paginate(this.state.page);
  }

  async decrementPageNo() {
    await this.setState({page: this.state.page - 1});
    // this.paginate(this.state.page);
  }

  handleTextChange = (newText) => this.setState({description: newText});
  handlePassChange = (newText) => this.setState({location: newText});

  submit() {
    this.setState({isLoading: true});
    const {description, location} = this.state;

    // if (description) {
    //   alert('enter a valid parameter');
    //   this.setState({isLoading: false});
    // } else {
    this.setState({isLoading: true});
    var data = {
      description: description.toLowerCase(),
      location: location.toLowerCase(),
    };
    console.log('ENTERED DATA', data);
    this.props.getJobs(data).then((a) => {
      this.setState({isLoading: false});
    });
    // }
  }

  render() {
    var data = this.props.friends.jobs_list;

    const itemsPerPage = 10;
    const {page} = this.state;
    const from = page * itemsPerPage;
    const to = (page + 1) * itemsPerPage;

    var pageData = data.slice(from, to);
    console.log('PAGE', this.state.page);

    return (
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <StatusBar backgroundColor="#000" barStyle="light-content" />
            <View style={styles.githubView}>
              <Text style={styles.githubText}>Github Jobs</Text>
            </View>

            <View style={styles.center}>
              <TextInput
                placeholder="Description"
                style={styles.textInput}
                placeholderTextColor="rgba(87, 96, 111,1.0)"
                onChangeText={this.handleTextChange}
                value={this.state.description}
              />
              <TextInput
                placeholder="Location"
                style={styles.textInput}
                placeholderTextColor="rgba(87, 96, 111,1.0)"
                onChangeText={this.handlePassChange}
                value={this.state.location}
              />
              <View>
                <Button
                  name="Search"
                  color="#ff3838"
                  size={wp(300)}
                  onPress={() => this.submit()}
                />
              </View>
            </View>

            <View style={styles.jobListContainer}>
              <FlatList
                data={pageData}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    style={styles.jobListView}
                    onPress={() =>
                      this.props.navigation.navigate('SingleJobPage', {
                        id: item.id,
                      })
                    }>
                    <View style={styles.companyData}>
                      <View style={styles.box1}>
                        <Text style={styles.jobTitle}>{item.title}</Text>
                        <Text style={styles.company}>
                          {item.company} ({item.type})
                        </Text>
                        <Text style={styles.company}>
                          Location: {item.location}
                        </Text>
                        <Text style={styles.company}>
                          Date: {item.created_at}
                        </Text>
                        {/* <Text>{item.id}</Text> */}
                      </View>

                      {item.company_logo === null ? (
                        <View
                          style={[
                            styles.image,
                            {
                              backgroundColor: 'green',
                              padding: hp(10),
                            },
                          ]}>
                          <Text style={styles.github}>Github Jobs</Text>
                        </View>
                      ) : (
                        <Image
                          style={styles.image}
                          source={{uri: item.company_logo}}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                )}
              />

              {data.length > 10 && (
                <View style={styles.pagination}>
                  {/* <Text onPress={() => this.decrementPageNo()}>back</Text>
                <Text onPress={() => this.incrementPageNo()}>next</Text> */}
                  <Text>
                    page {from + 1}-{to} of {data.length}
                  </Text>
                  <View style={styles.paginationButton}>
                    {from > 0 && (
                      <Icon
                        name="left"
                        size={18}
                        color="#000"
                        onPress={() => this.decrementPageNo()}
                      />
                    )}

                    <Icon
                      name="right"
                      size={18}
                      color="#000"
                      onPress={() => this.incrementPageNo()}
                    />
                  </View>
                </View>
              )}
            </View>

            {this.state.isLoading && (
              <View style={styles.isLoading}>
                <ActivityIndicator size="large" color="rgb(98,176,223)" />
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapState = (state) => ({
  friends: state.friends,
});

const mapDispatch = (dispatch) => ({
  getJobs: (data) => dispatch.friends.getJobs(data),
});

export default connect(mapState, mapDispatch)(About);

const styles = StyleSheet.create({
  github: {
    fontSize: hp(15),
    color: '#fff',
  },
  textInput: {
    width: wp(300),
    height: hp(56),
    // borderWidth: 1,
    // marginTop: hp(14),
    marginBottom: hp(14),
    padding: hp(10),
    paddingLeft: wp(20),
    backgroundColor: 'rgba(241, 242, 246,.9)',
    color: 'rgba(87, 96, 111,1.0)',
  },
  githubText: {
    color: '#fff',
    fontSize: hp(50),
  },
  githubView: {
    width: deviceWidth,
    height: hp(130),
    // borderWidth: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    alignItems: 'center',
    backgroundColor: '#000',
    width: deviceWidth,
    minHeight: hp(14),
    paddingBottom: hp(40),
  },
  paginationButton: {
    flexDirection: 'row',
    height: hp(50),
    alignItems: 'center',
    width: wp(100),
    justifyContent: 'space-around',
  },
  pagination: {
    flexDirection: 'row',
    height: hp(50),
    alignItems: 'center',
    width: deviceWidth,
    padding: wp(20),
    justifyContent: 'flex-end',
  },
  isLoading: {
    position: 'absolute',
    width: deviceWidth,
    height: deviceHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  company: {
    fontSize: hp(16),
    color: '#57606f',
    fontFamily: 'WorkSans-Medium',
    letterSpacing: -0.5,
  },
  jobTitle: {
    fontSize: hp(17),
    color: '#5352ed',
    fontFamily: 'WorkSans-Light',
    fontWeight: 'bold',
    letterSpacing: -0.5,
  },
  box1: {
    width: wp(285),
    // borderWidth: 1,
  },
  companyData: {
    flexDirection: 'row',
    maxWidth: '100%',
    flex: 1,
    // borderWidth: 1,
    justifyContent: 'space-between',
    // padding: hp(4),
    alignItems: 'flex-start',
  },
  image: {
    width: wp(50),
    height: wp(50),
    borderRadius: wp(3),
    alignSelf: 'flex-start',
    resizeMode: 'contain',
  },
  jobListContainer: {
    width: deviceWidth,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: hp(500),
  },
  jobListView: {
    width: wp(350),
    minHeight: hp(100),
    margin: hp(10),
    borderRadius: wp(2),
    backgroundColor: '#fff',
    padding: wp(10),
    // paddingVertical: wp(13),
    // borderWidth: 1,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 1.8,
  },
  header: {
    flexDirection: 'row',
    // padding: wp(20),
    width: deviceWidth,
    borderWidth: 1,
    alignItems: 'center',
  },
  experience: {
    color: 'black',
    fontSize: hp(18),
    fontFamily: 'WorkSans-Thin',
    width: wp(180),
  },
  title: {
    color: 'black',
    fontSize: hp(30),
    fontFamily: 'WorkSans-Light',
  },
  imageText: {
    fontSize: hp(80),
    color: 'white',
    fontFamily: 'WorkSans-Thin',
  },
  imageContainer: {
    width: wp(100),
    height: wp(100),
    margin: wp(15),
    borderRadius: wp(75),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    // backgroundColor: 'red',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    // borderWidth: 1,
    // backgroundColor: 'rgba(0,0,0,1)',//#
    width: deviceWidth,
    minHeight: deviceHeight,
    backgroundColor: '#fff',
  },
});
