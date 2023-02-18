import React, { useEffect, useState } from 'react';
import { removeItem, editItem } from '../redux/features/todoSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Modal } from 'react-responsive-modal';
import "react-responsive-modal/styles.css";
import { TextField } from '@material-ui/core';
import axios from 'axios';

const TodoItem = ({ item , setTodo }: any) => {
  // console.log(item.todo_description);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(item.todo_description);
  console.log(data)
  const styles = {
    fontFamily: "sans-serif",
    textAlign: "center"
  };
  const myRef = React.useRef(null);
  // var data = useSelector( (state ) => { return state.id = item.id} );

 
  const config = {
    todo_description:data
  }

  useEffect(() => {
    axios.put(`http://localhost:5000/updateTodo/${item._id}`, config).then((res) => {
      console.log(res);
    })
  }, [data])
  

  const handleRemove = async (e: any) => {
    e.preventDefault();
 
    axios.delete(`http://localhost:5000/deleteTodo/${item._id}`).then(res=>console.log(res))
    alert('Deleted successfully');
    dispatch(removeItem({ id: item.id }));
  }
  const onOpenModal = () => {
    setOpen(true);
  };

  const onCloseModal = () => {
    setOpen(false);
  };
  const editfunction =async () => {
    // e.preventDefault();
    // api call
    alert(item._id);



   
    dispatch(editItem({ id: item._id, newTitle: data }));
    setOpen(false);
  }
  return (
    <div className="item-container">
      <p className=" text-text" style={{ marginBottom: 0 }}>
        {/* <input
      value={item.title}
      
    /> */}

        <TextField value={item.todo_description} variant='outlined'  className='text-field'/>
      </p>
      <div className='action-container'>
        <i onClick={handleRemove} className="fas fa-times text-danger" style={{fontSize : '30px' , padding: '15px'}}></i>
        <button onClick={onOpenModal}>Edit</button>
        <Modal open={open} onClose={onCloseModal}    center container={myRef.current}>
          <div>

            <label>Title:</label>
            <input type="text" value={data} onChange={(e) =>  setData(()=>e.target.value) } /><br></br>
            {/* <input type="text" value={data} onChange={(e)=> { setData(e.target.value ) }}/><br></br> */}
            <button type="button" onClick={editfunction}>Save changes</button>
          </div>

        </Modal>
      </div>
    </div>
  )
}

export default TodoItem;