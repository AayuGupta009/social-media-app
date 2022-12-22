import styles from  './App.module.css';

function App() {
  let name;
  let isGreen = true;
  return (
    <div className={styles.App}>
      <div className={styles.name} style={{ color : isGreen ? 'blue' : 'red'}}>{name ? <h1>{ name }</h1> : <h1>"Good Night"</h1> }</div>
    </div>
  );
}
export default App;
