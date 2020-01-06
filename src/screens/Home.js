import React, {Component} from 'react';
import {StyleSheet, FlatList, Image} from 'react-native';
import {
  Container,
  Header,
  Content,
  Text,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Card,
  CardItem,
  Item,
  Input,
} from 'native-base';
import axios from 'axios';
import moment from 'moment';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      categories: [],
    };
    // console.log(props.categoryid)
  }

  Events = ({item}) => {
    return (
      <Cards
        id = {item.id}
        image={item.image}
        title={item.title}
        price={item.price}
        startTime={item.startTime}
        description={item.description}
        getId = {this.handleEventPress(item.id)}

      />
    );
  };

  Buttons = ({item}) => {
    return (
      <Button
        onPress={() => {this.props.navigation.navigate('Category', {itemId: item.id})}}
        style={styles.button}
        full
        light>
        <Text>{item.name}</Text>
      </Button>
    );
  };

  // handlePress = () => (id) => {
  //   this.props.navigation.navigate('Category', {itemId: id});
  // };

  handleEventPress = (id) => () => {
    this.props.navigation.navigate('DetailEvent', {itemId: id});
  };

  componentDidMount() {
    axios.get(`https://dumbtickapi.herokuapp.com/api/v2/events`).then(res => {
      this.setState({events: res.data});
    });

    axios
      .get(`https://dumbtickapi.herokuapp.com/api/v2/categories`)
      .then(res => {
        this.setState({categories: res.data});
      });
  }

  render() {
    // console.log(this.props);
    const event = this.state.events;
    const dataCategory = this.state.categories;

    const todayEvents = event.filter(event => {
      return (
        moment(new Date(event.startTime)).format("YYYY-MM-DD") ===
        moment(new Date()).format("YYYY-MM-DD")
      );
    });

    const upcomingEvents = event.filter(event => {
      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      return (
        moment(new Date(event.startTime)).format("YYYY-MM-DD") ===
        moment(tomorrow).format("YYYY-MM-DD")
      );
    });

    console.log(dataCategory);
    return (
      <Container>
        <Content style={styles.content}>
          <Header noShadow style={styles.search} searchBar rounded>
            <Item>
              <Icon name="ios-search" />
              <Input placeholder="Search" />
            </Item>
            <Button transparent>
              <Text>Search</Text>
            </Button>
          </Header>

          <FlatList centerContent horizontal data={dataCategory} renderItem={this.Buttons} />
          <Content style={{marginTop: 30, marginBottom: 15}}>
            <Text style={{fontSize: 30, fontWeight: 'bold'}}>TODAY</Text>
          </Content>
          <FlatList horizontal data={todayEvents} renderItem={this.Events} />

          <Text style={{fontSize: 30, fontWeight: 'bold', marginTop: 20, marginBottom: 15}}>UPCOMING EVENT</Text>
          <FlatList horizontal data={upcomingEvents} renderItem={this.Events} />
        </Content>
      </Container>
    );
  }
}

class Cards extends Component {

  

  render() {
    const image = this.props.image;
    const price = this.props.price;
    const navigate = this.props.navigate
    const date = moment(this.props.startTime).format('DDD MMM YYYY');
    return (
      <Content>
        <Card
          style={{
            flex: 0,
            width: 250,
            height: 350,
            marginLeft: 10,
            marginRight: 10,
          }}>
          <CardItem>

          </CardItem>
          <CardItem>
            <Image onPress={navigate}
              source={{
                uri: image,
              }}
              style={{height: 200, width: null, flex: 1}}
            />
          </CardItem>
          <CardItem>
            <Left>
              <Body>
                <Text onPress={this.props.getId}>{this.props.title}</Text>
                <Text>{date}</Text>
              </Body>
            </Left>
            <Right>
              <Text>{price === 0 ? 'Free' : 'Rp. ' + price}</Text>
              <Text></Text>
            </Right>
          </CardItem>
          <CardItem></CardItem>
        </Card>
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FF5555',
  },
  footer: {
    backgroundColor: '#242424',
  },
  content: {
    backgroundColor: '#F4E1E1',
    paddingLeft: 20,
    paddingRight: 20,
  },
  search: {
    backgroundColor: '#F4E1E1',
    borderRadius: 0,
  },
  button: {
    marginBottom: 5,
    backgroundColor: '#F4E1E1',
  },
});
