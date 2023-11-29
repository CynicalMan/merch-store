import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {count}
      <button onClick={() => setCount(count + 1)}>gg</button>
    </>
  )
}

export default App
