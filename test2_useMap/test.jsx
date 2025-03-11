const useMap = (initialValue) => {
  const [map, setMap] = React.useState(new Map(initialValue))
  const actions = React.useMemo(
    () => ({
      get: (key) => map.get(key),
      set: (key, value) => {
        setMap((prevMap) => {
          const newMap = new Map(prevMap)
          newMap.set(key, value)
          return newMap
        })
      },
      remove: (key) => {
        setMap((prevMap) => {
          const newMap = new Map(prevMap)
          newMap.delete(key)
          return newMap
        })
      },
      clear: () => setMap(new Map()),
      has: (key) => map.has(key),
    }),
    [map, setMap]
  )
  return [map, actions]
}

const MyApp = () => {
  const [map, { get, set, remove, clear, has }] = useMap([
    ['apples', 5],
    ['bananas', 7],
    ['grapes', 3],
  ])
  return (
    <div>
      <button onClick={() => set(Date.now(), new Date().toJSON())}>Add</button>

      <button onClick={() => clear()}>Reset</button>

      <button onClick={() => remove('apples')} disabled={!has('apples')}>
        Remove apples
      </button>

      <div>{ get('bananas')}</div>

      <pre>
        {JSON.stringify(
          [...map.entries()].reduce(
            (acc, [key, value]) => ({ ...acc, [key]: value }),
            {}
          ),
          null,
          2
        )}
      </pre>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<MyApp />)
