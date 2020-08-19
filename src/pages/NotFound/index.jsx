import React from 'react'
import { Link } from 'react-router-dom'
/**
 * 404页面
 */
export default function NotFound() {
  return (
    <center className="not-found">
      <h1>迷路了吗？</h1>
      <Link to="/home">带你回家！</Link>
    </center>
  )
}
