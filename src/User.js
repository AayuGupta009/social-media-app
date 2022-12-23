export const User = (props) => {
  return (
    <div key={ props.key }>
      <h1>{ props.name }</h1>
      <h2>{ props.age }</h2>
    </div>
  )
}