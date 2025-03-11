// 多返回一个getter 确保总能拿到最新值
const useGetSet = (initialState) => {
  const state = React.useRef(initialState)
  // 触发重渲染
  const [, update] = React.useReducer(() => ({}));

  return React.useMemo(
    () => [
      () => state.current,
      (newState) => {
        state.current = newState
        update({})
      }
    ]
  )
}

const Counter = () => {
  const [getCount, setCount] = useGetSet(0)
  const onClick = () => {
    setTimeout(() => {
      setCount(getCount() + 1)
    }, 1000)
  }
  return (
    <div>
      <div>Count: {getCount()}</div>
      <button onClick={onClick}>Increment</button>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<Counter />)
