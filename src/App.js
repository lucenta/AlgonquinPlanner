import logo from './logo.svg';
import './App.css';
import React from "react";

import {
  Google,
  useLoadScript,
} from "@react-google-maps/api"

import GoogleMapReact from "google-map-react"
import Marker from "google-map-react"
import InfoWindow from "google-map-react"

import mapStyles from "./mapStyles"

const libraries = ['places'];
const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};
const center = {
  lat: 45.8372,
  lng: -78.3791,
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const campsites = [{
  "id": 1,
  "lat":45.71803708049203,
  "lng":-78.38289383556346
},
{
  "id": 2,
  "lat":45.82412470958419,
  "lng":-78.58263656012612
}];


const accessPoints = [{
  "id": "1",
  "lat":45.75520041959334,
  "lng":-78.65626765790739,
  "info": "INFO ABOUT AP 1"
},
{
  "id": "2",
  "lat":45.69113881435707,
  "lng":-78.65698396135092,
  "info": "INFO ABOUT AP 2"
}];

const paths = [
	{
		lat: 45.53650891923486,
		lng: -78.70815430606933},
	{
		lat: 45.54202492863799, 
		lng:-78.71577661049062},
	{
		lat: 45.56330300411947,
		lng:-78.721891100262},
	{
		lat: 45.566140763018204, 
		lng: -78.71819552980385},
	{
		lat: 45.58797500743641,
		lng: -78.72123670993506}
];

const polygon = [
	{
		lat: 45.674414947339635, 
		lng: -78.78718046834081},
	{
		lat: 45.66111235595334, 
		lng: -78.76912548693682},
	{
		lat: 45.66111235595334, 
		lng: -78.76912548693682},
	{
		lat: 45.68184759486141,
		lng: -78.77271491151336}
];


function App() {

  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOOGLE_MAPS_API_KEY,
    libraries,
  });

  //Store marker currently selected
  const [markers, setMarkers] = React.useState([]);
  const [selected,setSelected] = React.useState(null);

	const ModelsMap = (map, maps) => {
		//Load campsites onto map
		for (let i = 0; i < campsites.length; i++) {
			let marker = new maps.Marker({
				position: { lat: campsites[i].lat, lng: campsites[i].lng },
				map: map,
				icon: {
					url: "/campsite.png",
					scaledSize: new window.google.maps.Size(15,15),
					origin: new window.google.maps.Point(0,0),
					anchor: new window.google.maps.Point(15,15)
				} 
			});
		}

	    //Load access points onto map
	    let infowindow = new maps.InfoWindow();

		for (let i = 0; i <accessPoints.length; i++){
			let marker = new maps.Marker({
				position: { lat: accessPoints[i].lat, lng: accessPoints[i].lng },
				map: map,
				label: accessPoints[i].id 
			});  
			marker.addListener('click', () => {
				infowindow.setContent(accessPoints[i].info);
				infowindow.open(map, marker);
			}); 
		}

		//Test drawing path
		// In actuality, I only wanna draw path when user clicks
		// 'to' and 'from' location
		let pathTest = new maps.Polyline({
			path: paths,
			strokeColor: "#eb4034",
			strokeOpacity: 0.8,
			strokeWeight: 2,
			fillColor: "#FF000",
			fillOpacity:  0.35
		});
		pathTest.setMap(map)

		//test drawing polygon
		let polyTest = new maps.Polygon({
			paths: polygon,
			strokeColor: "#f5d069",
			strokeOpacity: 0.8,
			strokeWeight: 2,
			fillColor: "#FF000",
			fillOpacity:  0.35
		});
		polyTest.setMap(map)

	};

  // sStore state of map
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return "Error loading maps :(";
  if (!isLoaded) return "Loading Maps...";

  const Marker = props => {
    return <div></div>
  }

  return (
    <div style={{ width: '100vw',  height: '100vh' }}>
      <h1 className = "onMap">
        Backountry
        <span role='img' aria-label='tent'> 
          🏕
        </span>
      </h1>
        <GoogleMapReact 
          mapContainerStyle={mapContainerStyle}
          zoom={9}
          center={center}
          options={options}
          onGoogleApiLoaded={({ map, maps }) => ModelsMap(map, maps)}
          onLoad = {onMapLoad}
          yesIWantToUseGoogleMapApiInternals
          >
        </GoogleMapReact>
    </div>
  );
};



export default App;
