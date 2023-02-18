import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
    id: string,
    title: string
}

const todoSlice = createSlice({
    name: 'todo',
    initialState: [
        // { id: 1, title: 'add item to list' }
    ],
    reducers: {
        addItem: (state : any, action : PayloadAction<Todo>) => {
            const newItem = {
               id: new Date().getTime(),
                title : action.payload.title
            };
         state.push(newItem );
        },
        // addtodo : (state, action : { payload : any}  ) => {
        //     return [...state , action.payload.id];
        // },
        clearList: (state) => {
            return [];
        },
        removeItem: (state, action: {
            payload: any
        }) => {
       return state.filter((item : any) => item['id'].toString() !== action.payload.id.toString());
        }, 
        editItem : (state, action: {
            payload: {
                id: number,
                newTitle: string
            }
        }) => {
            
            state.forEach((item : any)=>{
                if(item['id'] ==action.payload.id){
                   item['title'] =action.payload.newTitle
                }
            })
            return state;
        },

    }
})

export const { addItem, clearList , removeItem , editItem } = todoSlice.actions;

export default todoSlice.reducer;