import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/features/todoSlice';
import { TextField, Button } from '@material-ui/core';
// import TodoItem from './TodoItem';
import axios from "axios";
import { ADDNEW_TODO } from './types/type';
const TodoForm = (): JSX.Element => {

    const dispatch = useDispatch();
    const [text, setText] = useState('');
    const [user, setUser] = useState();
    const [todos, setTodos] = useState<any>(null);
    // const [check, setCheck] = useState(false);
    let styleobject = {
        padding: '10px',
        color: 'gray'
    }
    let textboxstyle = {
        width: '100%'
    }

    // useEffect(() => {
    //     const getdata = async () => {
    //         const mydata: any = await axios.get('http://localhost:5000/getTodo/63ae6d2a62082c7be304fa4c');
    //         // alert(JSON.stringify(mydata.data.add_todo));
    //         setTodos(mydata.data.add_todo);
    //         dispatch(addItem({ title: todos, id: new Date().getTime().toString() }));
    //         // console.log(JSON.stringify(todos));
    //     }
    //     getdata();
    // }, []);
    // console.log("todos", todos);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (text.trim().length === 0) {
            return;
        }
        setText(text);
        try {
            var userid: any | null = localStorage.getItem('user');
            //setUser(userid);
            // setUser(text);
            // alert(JSON.stringify(userid));
            userid = JSON.parse(userid);
            // console.log("userid", userid._id);

            let res = await axios.post(`${ADDNEW_TODO}${userid?._id}`, {
                "todo_description": text
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            alert('Todo registered successfully');
            // console.log("resjson " + JSON.stringify(res.data.message));
        } catch (err) {
            console.log(err);
        }
        dispatch(addItem({ title: text, id: new Date().getTime().toString() }));
        setText('');
    };
    return (
        <form className='container-fluid' onSubmit={handleSubmit} >
            <div className='input-group-container' style={textboxstyle}>

                <TextField fullWidth placeholder='Enter Todo list' value={text} margin="normal" className='user-input' onChange={(e) => setText(e.target.value)} variant='standard'></TextField>
                <br />
                <Button type="submit" className='buttonclass' >
                    Add
                </Button>
                {/* <ul>
                    {
                        todos?.map((todo:any) => {
                            {console.log("todo", todo.todo_description);
                            }
                            <li>{todo?.todo_description}</li>
                        })
                    }
                </ul>  */}
            </div>
        </form>
    )

}


export default TodoForm;