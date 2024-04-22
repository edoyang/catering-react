import React from 'react'
import { useAuth } from '../../utils/Authcontext'

const Dashboard = () => {
  const { user } = useAuth(); // Access the user object from the authentication context

  return (
    <div>
      <h1>Dashboard</h1>
      {user && <p>{user.firstname} {user.lastname}</p>}
    </div>
  )
}

export default Dashboard