import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Container, Typography, TextField, Button } from "@mui/material";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70, type: "number" },
  { field: "userId", headerName: "userId", width: 130, type: "number" },
  { field: "title", headerName: "title", width: 130 },
  {
    field: "body",
    headerName: "body",

    width: 90,
  },
];

import axios from "axios";
import { useEffect, useState } from "react";

//DIALOG FORM
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface IPost {
  id: number;
  userId: number;
  title: string;
  body: string;
}
const Table1 = () => {
  const [posts, setPosts] = useState<IPost[]>([]); //axios catch error //axios  convert res to json kbj

  //create  a new post
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //fetch posts
  useEffect(() => {
    const getPosts = async () => {
      try {
        await axios
          .get("https://jsonplaceholder.typicode.com/posts")
          .then((res) => {
            console.log(res);
            setPosts(res.data);
          });
      } catch (error) {
        console.log(error);
      }
    };

    getPosts();
  }, []);

  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    console.log(title);
    console.log(body);

    let newPost = {
      id: posts.length + 1,
      userId: 1,
      title: title,
      body: body,
    };
    console.log(newPost);

    const sendPost = async () => {
      try {
        await axios
          .post<{ id: number; userId: number; title: string; body: string }>(
            "https://jsonplaceholder.typicode.com/posts",
            {
              headers: {
                "Content-Type": "application/json",
              },
            },
            newPost
          )
          .then((res) => {
            console.log(res, "post sent");
            setPosts([...posts, newPost]);
            setTitle("");
            setBody("");
          });
      } catch (error) {
        console.log(error);
      }
    };
    sendPost();
    setBody("");
    setTitle("");
    handleClose();
  };

  // const handleDelete = (postId: number) => {
  //   const newPosts = posts.filter((post) => {
  //     return post.id !== postId;
  //   });

  //   setPosts(newPosts);
  //   console.log("post deleted", newPosts);
  // };

  return (
    <Container>
      <Button variant="outlined" onClick={handleClickOpen}>
        CREATE POST
      </Button>
      {/* <form noValidate onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          label="Title of post"
          variant="outlined"
          color="primary"
          fullWidth
          required
        />
        <TextField
          onChange={(e) => {
            setBody(e.target.value);
          }}
          label="Write your post here..."
          variant="outlined"
          color="primary"
          fullWidth
          multiline
          rows={4}
          required
        />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form> */}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a new POST</DialogTitle>
        <DialogContent>
          <TextField
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            label="Title of post"
            variant="outlined"
            color="primary"
            fullWidth
            required
          />
          <TextField
            onChange={(e) => {
              setBody(e.target.value);
            }}
            label="Write your post here..."
            variant="outlined"
            color="primary"
            fullWidth
            multiline
            rows={4}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            Cancel
          </Button>

          <Button variant="contained" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={posts}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </Container>
  );
};

export default Table1;
