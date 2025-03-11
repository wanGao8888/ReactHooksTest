const useDefault = (defaultState, initialState) => {
  const [state, setState] = React.useState(initialState)
  const isStateEmpty = state === undefined || state === null
  return [isStateEmpty ? defaultState : state, setState]
}

const UserCard = () => {
  const [user, setUser] = useDefault({ name: 'Adam' }, { name: 'John' })

  const inputRef = React.useRef(null)

  return (
    <div>
      <div>User: {user.name}</div>
      <input
        ref={inputRef}
        onChange={(e) => setUser({ name: e.target.value })}
      />
      <button
        onClick={() => {
          setUser(null)
          if (inputRef.current) {
            inputRef.current.value = ''
          }
        }}
      >
        Clear
      </button>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<UserCard />)
