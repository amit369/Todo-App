import * as mongoose from 'mongoose';



export const SchemaDefine = new mongoose.Schema({
    user_id: { type: mongoose.Types.ObjectId, ref: 'userDetails' },
    todo_description: { type: String, required: true },
});

export interface TodoInfo {
    todo_description: string;

}

SchemaDefine.pre('save', async function (next) {
    next();
});
