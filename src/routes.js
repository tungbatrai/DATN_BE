import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))


// Base


const routes = [
  { path: '/', exact: true, name: 'Dashboard', component: Dashboard },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
 
]

export default routes
