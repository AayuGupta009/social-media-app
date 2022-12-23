import styles from './App.module.css';
import {
    Planet
} from './Planet'

function App() {
    let users = [{
        name: "Aayush",
        age: 12
    }, {
        name: "Shubham",
        age: 21
    }, {
        name: "Jaiki",
        age: 12
    }, {
        name: "Akhand",
        age: 37
    }]
    let planets = [{
            name: "Mars",
            isGasPlanet: false
        },
        {
            name: "Earth",
            isGasPlanet: false
        },
        {
            name: "Jupiter",
            isGasPlanet: true
        },
        {
            name: "Venus",
            isGasPlanet: false
        },
        {
            name: "Neptune",
            isGasPlanet: true
        },
        {
            name: "Uranus",
            isGasPlanet: true
        },
    ];
  return (
    <
      div className={
            styles.App
        } > {
            planets.map((planet, key) => planet.isGasPlanet && < Planet planet = {
                    planet.name
                }
                key = {
                    key
                }
                />
            )
      } </div>
    );
}

export default App