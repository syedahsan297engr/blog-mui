// src/pages/EditPost.jsx
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ThemeHeader from "../components/ThemeHeader";
import useFetchPostById from "../hooks/useFetchPostById";
import useEditPost from "../hooks/useEditPost";

const EditPost = () => {
  const { postId } = useParams(); // Get post ID from URL
  const navigate = useNavigate();
  const { post, isLoading, error: fetchError } = useFetchPostById(postId);
  const { editPost, loading, error, success } = useEditPost();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
    },
  });

  useEffect(() => {
    if (post) {
      setValue("title", post.title);
      setValue("content", post.content);
    }
  }, [post, setValue]);

  const onSubmit = async (data) => {
    try {
      // Await the editPost function and check for success
      await editPost(postId, data);

      // Only navigate if there is no error
      if (!error) {
        navigate("/my-posts");
      }
    } catch (e) {
      // Handle any unexpected errors (optional)
      console.error("Unexpected error:", e);
    }
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <Container component="main" maxWidth="xs">
      <ThemeHeader />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "100px",
          alignItems: "center",
          padding: 3,
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <Typography variant="h5">Edit Post</Typography>
        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : fetchError ? (
          <Typography color="error">{fetchError.message}</Typography>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ width: "100%", marginTop: "16px" }}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoComplete="title"
              autoFocus
              {...register("title", { required: "Title is required" })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="content"
              label="Content"
              name="content"
              multiline
              rows={6}
              {...register("content", { required: "Content is required" })}
              error={!!errors.content}
              helperText={errors.content?.message}
            />
            <Typography variant="caption" color="textSecondary" sx={{ mt: 1 }}>
              Last Updated:{" "}
              {post?.updatedAt
                ? new Date(post.updatedAt).toLocaleDateString()
                : "N/A"}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 2,
                width: "100%",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ width: "auto" }}
              >
                Save
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCancel}
                sx={{ width: "auto" }}
              >
                Cancel
              </Button>
            </Box>
          </form>
        )}
      </Box>
      {success && (
        <Snackbar open autoHideDuration={6000}>
          <Alert severity="success">{success}</Alert>
        </Snackbar>
      )}
      {error && (
        <Snackbar open autoHideDuration={6000}>
          <Alert severity="error">{error}</Alert>
        </Snackbar>
      )}
    </Container>
  );
};

export default EditPost;
