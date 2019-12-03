import React, { Component } from 'react';
import vehiclelistdata from '../data/vehicle-list';

import VehicleList from '../components/VehicleList';
import MapContainer from '../components/MapContainer';
import '../styles/style.css';

export class MapPage extends Component {
  render() {
    return (
      <div>
        {vehiclelistdata ? (
          <div>
            <div className="row">
              <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12 min-vh-100">
                <VehicleList
                  vehicles={vehiclelistdata}
                  onVehicleSelect={this.handleSelectVehicle}
                />
              </div>
              <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12 min-vh-100">
                <MapContainer vehicles={vehiclelistdata} />
              </div>
            </div>
          </div>
        ) : (
          'loading ....'
        )}
      </div>
    );
  }
}

export default MapPage;
