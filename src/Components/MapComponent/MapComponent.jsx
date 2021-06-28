import { Component } from 'react';
import GoogleMapReact from 'google-map-react';
const Marker = props => {
    return <div className="SuperAwesomePin">
        Estado: {props.state}
        <br />
        Localidad: {props.name}
        <br />
        Tiempo: {props.weather}
        <br />
        Tempreatura: {props.tempc}°C
        <br />
        Probabilidad de lluvia: {props.probabilityofprecip}%
        <br />
        Dirección del viento: {props.winddirectioncardinal}</div>
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