import styles from  './App.module.css';
import { useState } from 'react'

function App() {
  const [toggleText, setToggleText] = useState(true)
  const changeToggle = () => setToggleText(!toggleText)
  return (
    <div className={styles.App}>
      <button onClick={changeToggle}>Show/Hide</button>
      <br />
      {toggleText && <h1>Hi</h1>}
    </div>
  );
}

export default App;