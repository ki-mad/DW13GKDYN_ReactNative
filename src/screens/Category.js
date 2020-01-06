import React, {Component} from 'react';
import {StyleSheet, FlatList, Image} from 'react-native';
import {
  Container,
  Content,
  Text,
  Left,
  Right,
  Body,
  Card,
  CardItem,
} from 'native-base';
import axios from 'axios';
import moment from 'moment'

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
    };
  }
  Events = ({item}) => {
    return (
      <Cards
        image={item.image}
        title={item.title}
        price={item.price}
        startTime={item.startTime}
        description={item.description}
      />
    );
  };

  componentDidMount() {
    const {navigation} = this.props;
    const id = navigation.getParam('itemId');
    axios
      .get(`https://dumbtickapi.herokuapp.com/api/v2/category/${id}`)
      .then(res => {
        this.setState({category: res.data});
      });
  }

  render() {
    const dataCategory = this.state.category;
    const dataEvent = dataCategory.Events;
    return (
      <Container>
        <Content style={styles.content}>
          <Content style={{marginTop: 30, marginBottom: 15}}>
            <Text style={{fontSize: 30, fontWeight: 'bold'}}>
              {dataCategory.name}
            </Text>
          </Content>
          <FlatList data={dataEvent} renderItem={this.Events} />
        </Content>
        {/* <Footer>
          <FooterTab style={styles.footer}>
            <Button vertical>
              <Icon name="apps" />
              <Text>Apps</Text>
            </Button>
            <Button vertical>
              <Icon name="camera" />
              <Text>Camera</Text>
            </Button>
            <Button vertical>
              <Icon name="navigate" />
              <Text>Navigate</Text>
            </Button>
            <Button vertical>
              <Icon name="person" />
              <Text>Contact</Text>
            </Button>
          </FooterTab>
        </Footer> */}
      </Container>
    );
  }
}

class Cards extends Component {
  render() {
    const image = this.props.image;
    const date = moment(this.props.startTime).format('DDD MMM YYYY');
    const price = this.props.price;
    return (
      <Content>
        <Card
          style={{flex: 0, marginLeft: 10, marginRight: 10, marginBottom: 10}}>
          <CardItem>
            <Image
              source={{
                uri: image,
              }}
              style={{height: 200, width: null, flex: 1}}
            />
          </CardItem>
          <CardItem>
            <Left>
              <Body>
                <Text>{this.props.title}</Text>
                <Text>{date}</Text>
              </Body>
            </Left>
            <Right>
              <Text>{price === 0 ? 'Free' : 'Rp.' + price}</Text>
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
    backgroundColor: '#FFFFFF',
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
    backgroundColor: '#FFFFFF',
    borderRadius: 0,
  },
  button: {
    marginBottom: 5,
    backgroundColor: '#FFFFFF',
  },
});
