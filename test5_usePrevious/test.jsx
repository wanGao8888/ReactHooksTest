const usePrevious = (initialValue) => {
  const latestvalue = React.useRef()

  React.useEffect(() => {
    latestvalue.current = initialValue
  }, [initialValue])

  return latestvalue.current
}

const Counter = () => {
  const [count, setCount] = React.useState(0)
  const latestCount = usePrevious(count)
  const onClick = () => {
    setCount(count + 1)
  }
  return (
    <div>
      <div>Count: {count}</div>
      <div>PreviousCount: {latestCount}</div>
      <button onClick={onClick}>Increment</button>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<Counter />)
