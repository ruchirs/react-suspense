import './App.css';
import { Suspense } from 'react'
import { fetchData } from './providers/API'

const resource = fetchData()

const App = () => (
    <div className="container my-5">
      <Suspense fallback={<h1>loading users . . .</h1>}>
        <UserDetails />
      </Suspense>
    </div>
)

const UserDetails = () => {
  const user = resource.user.read();
  return (
    <div className='card card-body my-3'>
      <h1 className='large text-primary'>{user.name}</h1>
      <ul>
        <li>Username: {user.name}</li>
        <li>Email: {user.email}</li>
        <li>City: {user.address.city}</li>
      </ul>
    </div>
  )
}

export default App;
