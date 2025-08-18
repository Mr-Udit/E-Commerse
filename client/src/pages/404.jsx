import React from 'react'
import { Link } from 'react-router-dom'
const PageNotFound = () => {
  return (
    <div>
      <div className="container-404">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link to="/">Go to Home</Link>
      </div>
    </div>
  )
}

export default PageNotFound