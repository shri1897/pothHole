import React, { Component } from 'react'
import axios from 'axios';
import Button from './common/Button'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

class Map extends Component {
  state = {
    data: [],
  }

  componentDidMount() {
    axios.get("https://script.googleusercontent.com/macros/echo?user_content_key=CmQ-VQ0ZjneRtrr9tAtwqFj4RlX9bXdlpTUAgA06Idkkm55psvvT9WGwjYuE-42B2X3o78LqZ7rPmnq0nsRqCQSBNpBmmMKLm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnDRal0Azi5ZWRVZ8FCjwae5JM92xbDb8dsOcPek7VhDD2DrcZIoyHzh_rxe2sx9tHA&lib=M_D5spi_RrV_2TRFFz7I4Qqvgknt6_kkx")
      .then((response) => {
        const data = response.data.user;
        this.setState({ data })
      }).catch((error) => {
        alert('Error')
      });
  }

  getMarkers = () => {
    const { data = [] } = this.state;
    return data.map((item) => {
      return (
        <MapView.Marker
          key={`${item.long} ${item.lat}`}
          coordinate={{ latitude: item.long, longitude: item.lat }}
          title={`${item.long}`}
          description={"Marker"}
        />
      );
    }) || [];
  }

  refresh = () => {
    axios.get("https://script.googleusercontent.com/macros/echo?user_content_key=CmQ-VQ0ZjneRtrr9tAtwqFj4RlX9bXdlpTUAgA06Idkkm55psvvT9WGwjYuE-42B2X3o78LqZ7rPmnq0nsRqCQSBNpBmmMKLm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnDRal0Azi5ZWRVZ8FCjwae5JM92xbDb8dsOcPek7VhDD2DrcZIoyHzh_rxe2sx9tHA&lib=M_D5spi_RrV_2TRFFz7I4Qqvgknt6_kkx")
    .then((response) => {
      const data = response.data.user;
      this.setState({ data })
    }).catch((error) => {
      alert('Error')
    });
  }

  render() {
    const markers = this.getMarkers();
    const latitude = markers && markers[0] && markers[0].props.coordinate.latitude || 12.682004;
    const longitude = markers && markers[0] && markers[0].props.coordinate.longitude || 80.682004;
    return (
      <>
      <MapView
            provider={PROVIDER_GOOGLE}
            style={{ flex: 1 }}
            region={{
              latitude,
              longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            showsUserLocation={true}
          >
            {
              this.getMarkers()
            }
          </MapView>
          <Button text='Refresh' onPress={this.refresh} />
      </>
    );
  }
}

export default Map;