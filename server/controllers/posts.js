import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";
import schedule from "node-schedule";
// import expComments from '../models/expComments.js';
import axios from "axios";
const rule = new schedule.RecurrenceRule();
rule.hour = 0;
rule.minute = 00;
rule.tz = "IST";
let biggy;
export const getPosts = async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT; //to get the starting index of every page
    const total = await PostMessage.countDocuments({});

    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex); //_id:-1 ensures we get the newest posts first
    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostMessage.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {
    const title = new RegExp(searchQuery, "i");
    let posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });
    if (posts.length < 2) {
      const extraPosts = await PostMessage.find();
      posts = [...posts, ...extraPosts.slice(0, 2)];
    }
    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  //add profanity here too
  const post = req.body;
  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  console.log(newPost);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  console.log("bum");
  const { id: _id } = req.params;
  const post = req.body;

  try {
    console.log("#");
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("No post with that id"); //check if post is valid
    }
    console.log("3");
    const updatedPost = await PostMessage.findByIdAndUpdate(
      _id,
      { ...post, _id },
      { new: true }
    );
    biggy = updatedPost;
    printster(biggy);
    //first check if the flag is 1.
    //if 1, send it through the profanity checker.
    // If the checker is successful, then pass it through
    if (updatedPost.flag == 1) {
      let temp = updatedPost.message + " "; //this is the string
      [...updatedPost.title].forEach((titleWords) => {
        temp += " " + titleWords;
      });
      [...updatedPost.comments].forEach((comment) => {
        temp += " " + comment;
      });
      [...updatedPost.tags].forEach((tag) => {
        temp += " " + tag;
      });
      await profanityChecker(temp, updatedPost._id);
    }
    res.json(updatedPost);
  } catch (error) {
    console.log(error.message);
  }
};

//it will delter

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id"); //check if post is valid

  await PostMessage.findOneAndDelete(id);

  res.json({ message: "Post deleted successfully" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id"); //check if post is valid

  const post = await PostMessage.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.json(updatedPost);
}; //65b89b64550c94fad4caacdb

export const commentPost = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;
  const post = await PostMessage.findById(id);
  post.comments.push(value);
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.json(updatedPost);
};

async function RecurringJob() {
  let expCommentNumber = await PostMessage.countDocuments({ flag: 1 });

  //get all the comments in the comment section..
  if (expCommentNumber != 0) {
    //  const posts = await PostMessage.find({});
    //  [...posts].forEach((post) => {
    //    add all the deleted document details to the deleted users colection
    //  })
    await PostMessage.deleteMany({ flag: 1 }); //try catch
    expCommentNumber = 0;
  }
  if (expCommentNumber == 0) {
    //find all the posts from post database which have explicit words in them and then flag them.
    const posts = await PostMessage.find({});

    [...posts].forEach((post) => {
      //add all comments to a string
      //add all the postmessage to the string
      //add all tags to the string
      let temp = post.message + " "; //this is the string
      [...post.title].forEach((titleWords) => {
        temp += " " + titleWords;
      });
      [...post.comments].forEach((comment) => {
        temp += " " + comment;
      });
      [...post.tags].forEach((tag) => {
        temp += " " + tag;
      });
      profanityChecker(temp, post._id);
    });
    //send a mail to the person with that email id.
  }
}

async function profanityChecker(temp, id) {
  const encodedParams = new URLSearchParams();
  encodedParams.set("content", temp);
  encodedParams.set("censor-character", "*");

  const options = {
    method: "POST",
    url: process.env.RAPID_API_URL_PROFANITY,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": process.env.RAPID_API_HOST_URL, //not necessary (check)
    },
    data: encodedParams,
  };
  try {
    const response = await axios.request(options);
    //response.data is the response we get back after the request is complete
    if (response.data["is-bad"] === true) {
      //flag this post
      //update a post insitu??
      const doc = await PostMessage.findOneAndUpdate(
        { _id: id },
        { flag: 1 },
        {
          new: true,
        }
      );
    } else {
      const doc = await PostMessage.findOneAndUpdate(
        { _id: id },
        { flag: 0 },
        {
          new: true,
        }
      );
    }
  } catch (error) {
    console.error(error);
  }
}

const job = schedule.scheduleJob(rule, () => {
  try {
    RecurringJob();
    console.log("recurring job complete!");
  } catch (error) {
    console.log(error);
  }
});

function printster(temp){
  console.log(temp);
}
