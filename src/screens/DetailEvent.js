import React, {Component} from 'react';
import {StyleSheet, Image} from 'react-native';
import {
  Container,
  Content,
  Text,
  Button,
  Left,
  Right,
  Body,
  Card,
  CardItem,
} from 'native-base';
import axios from 'axios';
import moment from 'moment'


export default class DetailEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: [],
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    const id = navigation.getParam('itemId');
    axios
      .get(`https://dumbtickapi.herokuapp.com/api/v2/event/${id}`)
      .then(res => {
        this.setState({event: res.data});
      });
  }

  render() {
    const dataEvent = this.state.event;
    const price = dataEvent.price;
    const image = dataEvent.image
    const date = moment(this.props.startTime).format('DDD MMM YYYY');
    return (
      <Container>
          <Content style={{ marginTop: 0, marginBottom: 0, backgroundColor:"#F4E1E1"}}>
            <Card
              style={{
                flex: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 10,
              }}>
              <CardItem>
                <Image
                  source={{
                    uri: image,
                  }}
                  style={{height: 350, width: null, flex: 1}}
                />
              </CardItem>
              <CardItem>
                <Left>
                  <Body>
                    <Text>
                      {dataEvent.title}
                    </Text>
                    <Text>{date}</Text>
                  </Body>
                </Left>
                <Right>
                  <Text>{price === 0 ? 'Free' : price}</Text>
                  <Button style={{marginTop:8}} success><Text> Buy </Text></Button>
                </Right>
              </CardItem>
              <CardItem>
                <Body>
                  
                </Body>
                <Text>
                  {dataEvent.description}
                </Text>
              </CardItem>
            </Card>
          </Content>
      </Container>
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
