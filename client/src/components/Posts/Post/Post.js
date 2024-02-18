import React, { useState } from "react";//with mui, the website becomes responsive.
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorzIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import moment from 'moment';
import { useNavigate } from "react-router-dom";
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from "../../../actions/posts";
const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const [likes, setLikes] = useState(post?.likes);
    const hasLikedPost = post.likes.find((like) => like === (user?.result?._id));
    const handleLike = async () => {
        dispatch(likePost(post._id));
        if (hasLikedPost) {
            setLikes(post.likes.filter((id) => id !== user?.result?._id ))
        } else {
            setLikes([...post.likes, user?.result?._id]);
        }
    };

    const Likes = () => {
        if (post?.likes?.length > 0) {
            return likes.find((like) => like === (user?.result?._id))
                ? (
                    <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}</>
                ) : (
                    <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
                );
        }

        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    const openPost = (e) => {
        navigate(`/posts/${post._id}`)
    }
    return (
        <Card className={classes.card} raised elevation={6}>
            <div className={classes.cardAction} onClick={openPost} >
                <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
                <div className={classes.overlay}>
                    <Typography variant="h6">{post.name}</Typography>
                    <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
                </div>
                {(user?.result?._id === post?.creator) && (
                    <div className={classes.overlay2}>
                        <Button style={{ color: 'white' }} size="small" onClick={(e) => {
                            e.stopPropagation();
                            setCurrentId(post._id);

                        }}>
                            <MoreHorzIcon fontSize="default" />
                        </Button>
                    </div>
                )}
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag}`)}</Typography>
                </div>
                <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
                </CardContent>
            </div>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
                    <Likes />
                </Button>
                {(user?.result?._id === post?.creator) && (
                    <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
                        <DeleteIcon fontSize="small" />
                        Delete
                    </Button>
                )}
            </CardActions>
        </Card>
    );
}
export default Post;