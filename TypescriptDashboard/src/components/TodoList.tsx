import React , {useEffect, useState} from 'react';
import { useSelector, useDispatch, } from 'react-redux';
import { RootState } from '../redux/app/store';
import TodoItem from './TodoItem';
import { clearList } from '../redux/features/todoSlice';
import axios from "axios";
import { GET_ALLTODO } from './types/type';

const TodoList = () => {
  const dispatch = useDispatch();
  let bg = {
    backgroundColor: 'white',
    color: 'black'
  }
  const [todos, setTodos] = useState<any>(null);

  var list = useSelector((state: RootState) => state.todo);
  
  useEffect(() => {
    localStorage.removeItem('todos');
    const getdata = async () => {
       var user : any = localStorage.getItem('user');
       var userid = JSON.parse(user);
       console.log('typeof ' , userid._id);

       console.log('user ', typeof(user));
       const mydata: any = await axios.get(`${GET_ALLTODO}`+ userid._id);
        // alert(JSON.stringify(mydata.data.add_todo));
        setTodos(mydata.data);
        // alert(todos);
        localStorage.setItem('todos', JSON.stringify(mydata.data)); 
        // console.log(JSON.stringify(todos));
    }
    getdata();
    
}, []);
  const handleClear = () => {
    dispatch(clearList());
  }

  if (!todos) {
    return <h2 className="text-center my-3 text-danger">LIST IS EMPTY</h2>;
  }

  // console.log(todos.data, "list data", list)
  return (

    <div className='todo-items-container'>
      <div className='container-fluid'>
        <ul className='list-group' style={bg}>
          {todos.data.map((item : any) =>
           {
            return <TodoItem key={item['_id']} item={item}  />;
          }
          )}
        </ul>

        {/* <button onClick={handleClear} className="btn btn-primary">
          CLEAR LIST
        </button> */}
      </div>
    </div>
  )
}

export default TodoList;