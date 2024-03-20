import mongoose from 'mongoose';


const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    flag: {
       type: Number,//change to bool
       default: 0
    },
    likes: {
        type:[String],
        default: [],
    },
    comments: {
        type:[String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const PostMessage = mongoose.model('PostMessage', postSchema);
export default PostMessage;