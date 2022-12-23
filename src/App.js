import styles from  './App.module.css';
import { useState } from 'react'

function App() {
  const [changeColor, setChangeColor] = useState("green")
  const alterColor = () => setChangeColor(changeColor === 'green' ? "red" : "green")
  return (
    <div className={styles.App}>
      <button onClick={alterColor}>Change text Color</button>
      <br />
      <h1 style={{color : changeColor}}>Hi</h1>
    </div>
  );
}

export default App;