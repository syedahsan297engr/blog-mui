import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { styled } from "@mui/material/styles";
import { getRandomImage } from "../utils/getRandomImage";

const PostCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  margin: theme.spacing(2),
}));

const Post = ({
  postId,
  author,
  image,
  title,
  content,
  date,
  showEdit,
  showDelete,
}) => {
  const navigate = useNavigate(); // Initialize the navigate function

  // Event handler functions
  const handleView = () => {
    navigate(`/posts/${postId}`); // Navigate to the PostView route
  };

  const handleEdit = () => {
    navigate(`/post/edit-post/${postId}`); // Navigate to the EditPost route
  };

  const handleDelete = () => {
    console.log(`Delete post ${postId}`);
    // Add your delete logic here
  };

  return (
    <PostCard>
      <CardMedia
        component="img"
        height="140"
        image={getRandomImage() || image} // Use provided image or default image
        alt={title}
      />
      <CardContent>
        <Typography variant="subtitle1" color="text.secondary">
          {author}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {format(new Date(date), "MMMM dd, yyyy")}
        </Typography>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {content.length > 110 ? `${content.substring(0, 110)}...` : content}
        </Typography>
      </CardContent>
      <IconButton onClick={handleView} color="primary" sx={{ margin: 2 }}>
        <VisibilityIcon />
      </IconButton>
      {showEdit && (
        <IconButton onClick={handleEdit} color="secondary">
          <EditIcon />
        </IconButton>
      )}
      {showDelete && (
        <IconButton onClick={handleDelete} color="error">
          <DeleteIcon />
        </IconButton>
      )}
    </PostCard>
  );
};

export default Post;
