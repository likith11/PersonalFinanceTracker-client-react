import React, {Component} from 'react';
import ReactDOM from "react-dom";
import Map from "./Map";
import PropertyService from "../service/properties.service.client";
import MyContext from "./MyContext";
import mapStyle from '../styling/mapStyle'
import UniversalService from "../service/universal.service.client";




const { compose, withProps, withHandlers } = require("recompose");
const {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} = require("react-google-maps");
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

const MapWithAMarkerClusterer = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCh74PetKr_ZSxXTPiH5bkE1w19b3KQsgg&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withHandlers({
        onMarkerClustererClick: () => (markerClusterer) => {
            const clickedMarkers = markerClusterer.getMarkers()
            console.log(`Current clicked markers length: ${clickedMarkers.length}`)
            console.log(clickedMarkers)
        },
    }),
    withScriptjs,
    withGoogleMap
)(props =>
    <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 42.3473046, lng: -71.0819042 }}
        defaultOptions={{ styles: mapStyle }}
    >
        <MarkerClusterer
            onClick={props.onMarkerClustererClick}
            averageCenter
            enableRetinaIcons
            gridSize={60}
        >
            {props.markers.map(marker => (
                <Marker
                    key={marker._id}
                    position={{ lat: marker.latitude, lng: marker.longitude }}
                />
            ))}
        </MarkerClusterer>
    </GoogleMap>
);

class MapComponentMultiCluster extends React.PureComponent {

    constructor(props){
        super(props)
        this.propertyService = new PropertyService();

    }


    componentWillMount() {
        this.setState({ markers: [] })
    }

    componentDidMount() {

       this.propertyService.findAllProperties()
           .then(properties =>{
               this.setState({ markers: properties })
           })

        console.log("Context Prop", this.context.state)

    }

    render() {
        return (
            <MapWithAMarkerClusterer markers={this.state.markers} />
        )
    }
}



class UserOverViewTabContent extends Component {
    constructor(props){

        super(props);
        this.universalService = new UniversalService();
        this.state = {
            CreditScore: 0,
            TotalAsset: 0,
            TotalDebt: 0,
            NetAsset: 0
        }
    }

    componentDidMount() {
       this.universalService.findAssetTotal()
           .then(total =>{ console.log(total);
           this.setState({
               CreditScore: total.CreditScore,
               TotalAsset: total.TotalAsset,
               TotalDebt: total.TotalDebt,
               NetAsset: total.TotalAsset - total.TotalDebt
           })
    })
    }


    render(){
        return(
            <MyContext.Consumer>
                {(context) => (
                    <React.Fragment>
            <div className="container bg-light">

                <h2 className="web-dev-text-center mb-2"> Welcome, Here is your financial overview  </h2>

                <h2 className="web-dev-text-center mt-4 mb-2">Properties you own</h2>

               <MapComponentMultiCluster/>




                <div className=" mt-2 mb-2"/>

                <div className="card text-center">
                    <div className="card-header bg-secondary">
                        <h5 className="card-title">Credit Score</h5>
                    </div>
                    <div className="card-body">

                        <p className="card-text"><b> {this.state.CreditScore} </b>   </p>

                    </div>

                </div>


                <div className=" mt-2 mb-2"/>

                <div className="card text-center">
                    <div className="card-header bg-secondary">
                        <h5 className="card-title">Total Asset Value</h5>
                    </div>
                    <div className="card-body">

                        <p className="card-text"><b>${this.state.TotalAsset}</b></p>

                    </div>

                </div>

                <div className=" mt-2 mb-2"/>

                <div className="card text-center">
                    <div className="card-header bg-secondary">
                        <h5 className="card-title">Total Debt</h5>
                    </div>
                    <div className="card-body">

                        <p className="card-text">${this.state.TotalDebt}</p>

                    </div>

                </div>

                <div className=" mt-2 mb-2"/>

                <div className="card text-center">
                    <div className="card-header bg-secondary">
                        <h5 className="card-title">Net Assets</h5>
                    </div>
                    <div className="card-body">

                        <p className="card-text"><b>${this.state.NetAsset} </b></p>

                    </div>

                </div>



                <div className="line"/>


            </div>


                    </React.Fragment>
                )}
            </MyContext.Consumer>
        )
    }

}
MapComponentMultiCluster.contextType = MyContext;
UserOverViewTabContent.contextType = MyContext;
    export default UserOverViewTabContent