import mongoose, { model, Schema } from "mongoose"

const UserSchema = new Schema({
        Name:{type:String , require:true},
        Avatar:{type:String},
	email: { type: String, require: true, unique: true },
	password: { type: String, require: true },
})

const GrantSchema = new Schema({
        creatorID:{type:mongoose.Types.ObjectId , ref:'email' , required:true},
	roomname: { type: String, require: true, unique: true },
	roomJoin: { type: Boolean, require: true },
	Name: { type: String, require: true },
	pctSub: { type: Boolean, require: true },
	pctPub: { type: Boolean, require: true },
})


export const UserModel = model("user", UserSchema)
export const GrantModel =  model('room' , GrantSchema)