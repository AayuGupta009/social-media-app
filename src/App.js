import styles from  './App.module.css';
import { useState } from 'react'

function App() {
  const [age , setAge] = useState(0)
  return (
    <div className={styles.App}>
      {age}
      <br />
      <button onClick={() => setAge( age + 1)}>Click me!</button>
    </div>
  );
}

export default App;