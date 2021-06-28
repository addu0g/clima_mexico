import { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import {CloudDrizzle, Cloud, CloudLightningRain, CloudFog, CloudSun, Sun, SunFill } from 'react-bootstrap-icons';

// const climas = ['Tormentas dispersas','Tormentas','Soleado',
//                 'Mayormente soleado','Nublado','Mayormente nublado',
//                 'Parcialmente nublado'];

function selectWeatherIcon(clima){
    switch(clima){
        case "Tormentas dispersas":
            return <CloudDrizzle />;
        case "Tormentas":
            return <CloudLightningRain/>;
        case "Soleado":
            return <Sun />;
        case "Mayormente soleado":
            return <SunFill/>;
        case "Nublado":
            return <Cloud />;
        case "Mayormente nublado":
            return <CloudFog/>;
        case "Parcialmente nublado":
            return <CloudSun/>;

    }
}

const Marker = props => {
    return <div className="SuperAwesomePin">
        Estado: <b>{props.state}</b>
        <br />
        Localidad: <b>{props.name}</b>
        <br />
        Tiempo: <b>{props.weather} {selectWeatherIcon(props.weather)}</b>
        <br />
        Tempreatura: <b>{props.tempc}°C</b>
        <br />
        Probabilidad de lluvia: <b>{props.probabilityofprecip}%</b>
        <br />
        Dirección del viento: <b>{props.winddirectioncardinal}</b></div>
}

class MapComponent extends Component {
    static defaultProps = {}
    constructor(props) {
        super(props);
        this.state = {
            lat: props.lat,
            lng: props.lng,
            zoom: props.zoom
        }
    }
    setCoordinates = (state) => {
        this.setState({
            lat: state.latitude,
            lng: state.longitude,
            zoom: 9,
            state: state.state,
            weather: state.skydescriptionlong,
            name: state.name,
            tempc: state.tempc,
            probabilityofprecip: state.probabilityofprecip,
            winddirectioncardinal: state.winddirectioncardinal
        });
    }
    render() {
        const { lat, lng, zoom, weather, state, name, tempc, probabilityofprecip, winddirectioncardinal } = this.state;

        const place = { lat: Number(lat), lng: Number(lng) };

        const element = <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyBEUY5W5szfd6zzJtiXpeorXRU6bWoQgfg' }}
            center={place}
            zoom={Number(zoom)}
        >
            <Marker lat={place.lat}
                lng={place.lng}
                weather={weather}
                state={state}
                name={name}
                tempc={tempc}
                probabilityofprecip={probabilityofprecip}
                winddirectioncardinal={winddirectioncardinal} />
        </GoogleMapReact>;

        return (
            <div style={{ height: '95vh', width: '100%' }} >
                {element}
            </div>

        );
    }
}

export default MapComponent;