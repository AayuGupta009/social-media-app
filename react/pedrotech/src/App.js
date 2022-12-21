import './App.css';

function App() {
  return (
    <div className="App">
      <User name="pedro" age={22} email="aayush@email.com" />
      <br />
      <Job salary={ 6000 } position="Junior SDE" company="Apple" />
      <Job salary={ 9000 } position="Senior SDE" company="Netflix" />
      <Job salary={ 10000 } position="Product Manager" company="Netflix" />
    </div>
  );
}

const User = (props) => {
  return (
    <div className='user'>
      <h1>{ props.name }</h1>
      <h2>{ props.age }</h2>
      <h3>{ props.email }</h3>
    </div>
  )
}

const Job = (props) => {
  return (
    <div className='job'>
      <h1>{ props.salary }</h1>
      <h1>{ props.company }</h1>
      <h1>{ props.position }</h1>
    </div>
  )
}

export default App;
