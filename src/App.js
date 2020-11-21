import './App.css';
import { Suspense } from 'react'
import { fetchData } from './providers/API'

const resource = fetchData()

const App = () => (
    <div className="container my-5">
      <Suspense fallback={<h1>loading . . .</h1>}>
        <UserDetails />
        <UserPosts />
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

const UserPosts = () => {
  const posts = resource.posts.read();
  return (
    <ul className='list-group'>
      <li className='list-group-item'>
        <b>User's Posts</b>
      </li>
      {posts.map(post => (
        <li className='list-group-item' key={post.id}>
          {post.title}
        </li>
      ))}
    </ul>
  )
}

export default App;
