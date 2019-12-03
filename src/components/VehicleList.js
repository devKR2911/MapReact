import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import { onVehicleSelected } from '../actions/actions';

export class VehicleList extends Component {
  /**
   * @description Function triggered while selecting a vehicle.
   * @param {object} vehicle Listing vehicle item.
   */
  onVehicleSelect(vehicle) {
    this.props.dispatch(
      onVehicleSelected({
        mapData: vehicle
      })
    );
  }

  /**
   * @description Function to get the vehicle status color.
   * 0: Red
   * 1: Green
   * 2: Blue
   * @param {object} vehicle Listing vehicle item.
   */
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

  /**
   * @description Component lifecycle hook.
   * @param {object} eventObj Initializes the class variables
   */
  componentWillMount() {
    const { vehicles } = this.props;
    this.setState({
      vehiclesearchlist: vehicles,
      initialList: vehicles
    });
  }

  /**
   * @description Function to search the local vehicle list by vehicle name.
   * @param {object} eventObj Key down event object
   */
  filterVehicles = eventObj => {
    const { initialList } = this.state;
    const updatedList = initialList.filter(vehicle => {
      return (
        vehicle.name
          .toLowerCase()
          .search(eventObj.target.value.toLowerCase()) !== -1
      );
    });
    this.setState({
      vehiclesearchlist: updatedList
    });
  };

  /**
   * @description Component rended function.
   */
  render() {
    return (
      <div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Search with vehicle name"
            className="form-control"
            onChange={this.filterVehicles}
          />
        </div>
        {this.state.vehiclesearchlist ? (
          <div>
            {this.state.vehiclesearchlist.map(vehicle => (
              <div
                className="col-12 vehicle-list-item"
                key={vehicle.id}
                onClick={() => this.onVehicleSelect(vehicle)}
              >
                <div
                  className="vehicle-status"
                  style={{
                    background: this.getBackgroundColor(vehicle)
                  }}
                ></div>
                <div className="vehicle-name"> {vehicle.name} </div>
                <div className="vehicle-number"> {vehicle.regno} </div>
                {vehicle.count > 0 ? (
                  <div
                    className="vehicle-count"
                    style={{
                      background: this.getBackgroundColor(vehicle)
                    }}
                  >
                    {vehicle.count}
                  </div>
                ) : (
                  ''
                )}
              </div>
            ))}
          </div>
        ) : (
          'loading ....'
        )}
      </div>
    );
  }
}

VehicleList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  vehicles: PropTypes.arrayOf(PropTypes.shape({}))
};

/* Subscribe component to redux store and merge the state into component\s props */
const mapStateToProps = () => ({});

/* connect method from react-router connects the component with redux store */
export default connect(mapStateToProps)(VehicleList);
