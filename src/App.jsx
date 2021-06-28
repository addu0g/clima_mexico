import React, { Component } from 'react';
import './App.css';

//My components
//import NavComponent from './Components/NavComponent/NavComponent';
import MapComponent from './Components/MapComponent/MapComponent';

//My configs
import { atmosphere } from './Config/webapi';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      greet: props.value,
      states: [{ _id: 0, name: "Selecciona un estado..." }],
      repo: new Array(),
      localidades: new Array(),
      lat: 25.703564186991375,
      lng: -100.28456008067516
    }
    this.mapReference = React.createRef();
  }

  componentDidMount() {
    this.fnGetJson();
  }

  fnGetJson = () => {
    fetch(atmosphere, { 'Method': 'GET' })
      .then(response => response.json())
      .then(x => {
        let tmp = new Array();
        let estados = new Array();
        let weather = new Array();
        estados.push({ _id: 0, name: 'Selecciona un estado...' });
        x.results.forEach(function (y) {
          tmp.push(y);
          if(weather.some(w => w.skydescriptionlong === y.skydescriptionlong) === false){
            weather.push({skydescriptionlong: y.skydescriptionlong});
          }
          console.log();
          if (estados.some(h => h.name === y.state) === false) {
            estados.push({ name: y.state });
          }
        });
        this.setState({
          repo: tmp,
          states: estados
        });
        console.log(weather);
      });
  }

  filterLocalidades = (event) => {
    let value = event.target.value;
    let data = this.state.repo;
    let local = new Array();
    local.push({ _id: 0, name: 'Seleccione una localidad...' });
    data.forEach(x => {
      if (x.state === value) {
        local.push(x);
      }
    });
    this.setState({ localidades: local });

    if(this.state.localidades.length === 0){
      alert("Selecciona una localidad.");
    }
  }

  ChangeMap = (event) => {
    const { localidades } = this.state;
    let opt = event.target.value;
    let result = {};
    localidades.forEach(function (x) {
      if (x._id === opt) {
        result = x;
        return x
      }
    });

    if (opt === "0") {
      alert("Selecciona una localidad...");
    } else {
      this.mapReference.current.setCoordinates(result);
    }
  }


  render() {
    const { states, lat, lng, localidades } = this.state;
    return (
      <div className="App">
        <h1 className="appTitle" >Climas en la República Mexicana</h1>
        <div className="mensaje">
          La información presentanda proviene de datos proporcionados por el gobierno de la República Mexicana
        </div>
        Seleccione el estado:
        <select onChange={this.filterLocalidades} className="selectElement">
          {states.map(({ name }, index) => <option key={index} value={name}>{name}</option>)}
        </select>
        Seleccione localidad: <select onChange={this.ChangeMap} className="selectElement">
          {localidades.map(({ _id, name }, index) => <option key={index} value={_id}>{name}</option>)}
        </select>
        <hr/>
        <MapComponent lat={lat} lng={lng} zoom="10" ref={this.mapReference}></MapComponent>

      </div>
    );
  }
}

export default App;
