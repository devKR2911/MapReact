import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps';

import pin from '../assets/pin.png';
import pinselected from '../assets/pin_selected.png';

const { compose, withStateHandlers } = require('recompose');
const {
  MarkerClusterer
} = require('react-google-maps/lib/components/addons/MarkerClusterer');

/**
 * @description Google map component.
 */
const MyMapComponent = compose(
  withStateHandlers(
    () => ({
      isOpen: false
    }),
    {
      onToggleOpen: ({ isOpen }) => () => ({
        isOpen: !isOpen
      }),
      showInfo: ({ showInfo, isOpen }) => a => ({
        isOpen: !isOpen,
        showInfoIndex: a
      }),
      getBackgroundColor(vehicle) {
        let color;
        color =
          vehicle.status === 0
            ? '#faa19a'
            : vehicle.status === 1
            ? '#3baf29'
            : '#5bc7f8';
        return color;
      }
    }
  ),
  withScriptjs,
  withGoogleMap
)(props => {
  return (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{
        lat: 10.5276,
        lng: 76.2144
      }}
    >
      <MarkerClusterer
        onClick={props.onMarkerClustererClick}
        averageCenter
        enableRetinaIcons
        gridSize={60}
      >
        {props.vehicleList.map((marker, index) => (
          <Marker
            key={marker.id}
            onClick={() => {
              props.showInfo(index);
            }}
            icon={{
              url: marker.id === props.selectedVehicle.id ? pinselected : pin
            }}
            position={{
              lat: marker.location.lat,
              lng: marker.location.long
            }}
          >
            {props.showInfoIndex === index && (
              <InfoWindow onCloseClick={props.onToggleOpen}>
                <div>
                  <p> Vehicle: {marker.name} </p>
                  <p> Reg No: {marker.regno} </p>
                  <span> {marker.infotext} </span>
                </div>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </MarkerClusterer>
    </GoogleMap>
  );
});

export class MapContainer extends Component {
  /**
   * @description Component render function.
   */
  render() {
    const { mapData, vehicles } = this.props;
    return (
      <MyMapComponent
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        mapElement={<div style={{ height: `100%` }} />}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        vehicleList={vehicles}
        selectedVehicle={mapData}
      />
    );
  }
}

MapContainer.propTypes = {
  vehicles: PropTypes.arrayOf(PropTypes.shape({}))
};

const mapStateToProps = ({ mapData }) => ({
  mapData: mapData
});

/* connect method from react-router connects the component with redux store */
export default connect(mapStateToProps)(MapContainer);
