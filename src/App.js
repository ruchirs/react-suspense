import './App.css';
import { Suspense } from 'react'
import { fetchData } from './providers/API'

const resource = fetchData()

const App = () => (
    <div className="container">
      <Suspense fallback={<h1>loading users . . .</h1>}>
        <UserDetails />
      </Suspense>
    </div>
)

const UserDetails = () => {
  const user = resource.user.read();
  return (
    <div>
      <h1>{user.name}</h1>
      <ul>
        <li>{user.name}</li>
        <li>{user.email}</li>
        <li>{user.address.city}</li>
      </ul>
    </div>
  )
}

export default App;
