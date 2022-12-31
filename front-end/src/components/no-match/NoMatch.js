import { Link } from 'react-router-dom'
import React from 'react'

export default function NoMatch() {
  return (
    <div>Page not found
      <div><Link to="/">Go to home</Link></div>
      
    </div>
  )
}
