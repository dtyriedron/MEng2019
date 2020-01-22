import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import $ from 'jquery';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import AppBar from '../components/AppBar';
const mapStyles = {
  width: '100%',
  height: '100%',
};
const stores = [];

$.ajax({ url: 'PHPF/getmeals.php',
	type: 'post',
	dataType : "json",
	async: false,
	success: function(output) {
		console.log(output);
		var ret = output;
		console.log(ret[0]);
		for (var i = 0; i < ret.length; i++) {
		    var line = ret[i].split(',');
		    console.log(line);
		    var tmp = {};
		    for(var j = 0; j < line.length; j++){
			if(j == 3){
			    tmp.lat = JSON.parse(line[j]);
			}
			if(j == 4){
			    tmp.lng = JSON.parse(line[j]);
			}
		    }
		    stores.push(tmp);
		    console.log(tmp);
		    console.log(stores);
		}
	}
});
class MapTemplate extends Component {
	
render() {
    return (
	<body style={{height:"100%", margin: "0px", padding:"0px"}}>
	<div id="mapM">
        <Map
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{ lat: 55.9533, lng: -3.1883}}
	    >
	    {
		    stores.map(element => <Marker position={element}/>)
	    }
        </Map>
	    </div>
	    </body>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyBY6v3bJwMKv6Ov4t1pVjGX0byoaX1K2gI'
})(MapTemplate)



//export default MapTemplate;



