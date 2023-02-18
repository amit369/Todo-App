import * as mongoose from 'mongoose';

const bcrypt = require('bcrypt');

export const SchemaDefine = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },

});

export interface UserInfo {
    firstname: string;
    lastname: string;
    email: string;
    password: string;

}

SchemaDefine.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});
