const useSet = (initialValue) => {
  const [set, setSet] = React.useState(new Set(initialValue))

  const actions = React.useMemo(
    () => ({
      add: (item) => setSet((prevSet) => new Set([...prevSet, item])),

      remove: (item) =>
        setSet((prevSet) => new Set([...prevSet].filter((i) => i !== item))),

      clear: () => setSet(new Set()),
    }),

    [setSet]
  )

  return [set, actions]
}

const MyApp = () => {
  const [set, { add, remove, clear }] = useSet(['apples'])

  return (
    <div>
      <button onClick={() => add(String(Date.now()))}>Add</button>

      <button onClick={() => clear()}>Reset</button>

      <button onClick={() => remove('apples')} disabled={!set.has('apples')}>
        Remove apples
      </button>

      <pre>{JSON.stringify([...set], null, 2)}</pre>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<MyApp />)
