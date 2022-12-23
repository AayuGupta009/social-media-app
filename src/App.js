import styles from  './App.module.css';
import { useState } from 'react'

function App() {
  const [input, setInput] = useState('')
  const setInputValue = (event) => setInput(event.target.value)
  return (
    <div className={styles.App}>
      <input type="text" onChange={setInputValue} />
      <br />
      {input}
    </div>
  );
}

export default App;