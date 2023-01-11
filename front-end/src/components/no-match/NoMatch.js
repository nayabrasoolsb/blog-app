import "../../assets/styles/no-match.css"

import { Link } from 'react-router-dom'
import React from 'react'

export default function NoMatch() {
  return (
    <div className="no-match">Page not found
      <div><Link to="/user">Go to home</Link></div>
      
    </div>
  )
}
