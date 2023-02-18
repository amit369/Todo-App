import React from 'react'
import TodoForm from '../TodoForm'
import TodoList from '../TodoList'
import styles from "./index.module.css"
const Home = () => {
  return (
    <div className={styles.home_container}>
       <TodoForm/>
       <TodoList/>
    </div>
  )
}


export default Home