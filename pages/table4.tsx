import * as React from "react";
import { Container, Typography, TextField, Button } from "@mui/material";

//DIALOG FORM
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import DataTable from "react-data-table-component";

import axios from "axios";
import { useEffect, useState } from "react";

interface IUser {
  name: string;
  rollNo: number;
  age: number;
  gender: string;
  state: string;
  pincode: number;
  country: string;
}

const Table4 = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  const [open, setOpen] = useState(false);

  const [all, setAll]= useState([])

  // const [name, setName] = useState<string>("");
  // //  const [rollNo, setRollNo] = useState<number>();
  // const [age, setAge] = useState<number>();
  // const [gender, setGender] = useState<string>("");
  // const [state, setState] = useState<string>("");
  // const [pincode, setPincode] = useState<number>();
  // const [country, setCountry] = useState<string>("");
  const [user, setUser] = useState<IUser>({
    name: "",
    rollNo: 0,
    pincode: 0,
    age: 0,
    gender: "",
    state: "",
    country: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //fetch users
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get("http://localhost:4000/userGet")
        console.log(res.data)
        //setAll(res.data.data)
        setUsers(res.data.data)
        //console.log('all',all)
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, []);

  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
console.log(user)
    const sendUser = async () => {
      try {
        await axios
          .post<{
            name: string;
            // rollNo: number;
            age: number;
            gender: string;
            state: string;
            pinCode: number;
            country: string;
          }>(
            "",
            // {
            //   headers: {
            //     "Content-Type": "application/json",
            //   },
            // },
            user
          )
          .then((res) => {
            console.log(res, "post sent");
            setUsers([...users, user]);
          });
      } catch (error) {
        console.log(error);
      }
    };
    sendUser();

    handleClose();
  };

    // const handleDelete = (rollNo: number) => {
    //   const newUsers = users.filter((user) => {
    //     return user.rollNo !== rollNo;
    //   });

    //   setUsers(newUsers);
    // };

  const handleDelete = async (rollNo: number) => {
    try {
      const respose = await axios.delete("http://localhost:4000/delUser/:id");
    } catch (error) {
      console.log(error);
    }
  };
  const columns = [
    {
      name: "name",
      selector: (row: { name: string }) => row.name,
    },
    {
      name: "roll no",
      selector: (row: { rollNo: number }) => row.rollNo,
    },
    {
      name: "age",
      selector: (row: { age: number }) => row.age,
    },
    {
      name: "gender",
      selector: (row: { gender: string }) => row.gender,
    },
    {
      name: "state",
      selector: (row: { state: string }) => row.state,
    },
    {
      name: "pincode",
      selector: (row: { pincode: number }) => row.pincode,
    },
    {
      name: "country",
      selector: (row: { country: string }) => row.country,
    },
    {
      name: "Action",
      cell: (row: { rollNo: number }) => (
        <Button variant="outlined" onClick={() => handleDelete(row.rollNo)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Container>
      <Button variant="outlined" onClick={handleClickOpen}>
        CREATE USER
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a new user</DialogTitle>
        <DialogContent>
          <TextField
            onChange={(e) => {
              setUser({ ...user, name: e.target.value });
            }}
            label="Name"
            variant="outlined"
            color="primary"
            fullWidth
            required
          />
          <TextField
            onChange={(e) => {
              setUser({ ...user, age: parseInt(e.target.value) });
            }}
            label="Age"
            variant="outlined"
            color="primary"
            fullWidth
            required
          />
          <TextField
            onChange={(e) => {
              setUser({ ...user, gender: e.target.value });
            }}
            label="Gender"
            variant="outlined"
            color="primary"
            fullWidth
            required
          />
          <TextField
            onChange={(e) => {
              setUser({ ...user, state: e.target.value });
            }}
            label="State"
            variant="outlined"
            color="primary"
            fullWidth
            required
          />
          <TextField
            onChange={(e) => {
              setUser({ ...user, pincode: parseInt(e.target.value) });
            }}
            label="Pincode"
            variant="outlined"
            color="primary"
            fullWidth
            required
          />
          <TextField
            onChange={(e) => {
              setUser({ ...user, country: e.target.value });
            }}
            label="Country"
            variant="outlined"
            color="primary"
            fullWidth
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
        <DataTable
          title="Users"
          columns={columns}
          data={users}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="500px"
        />
      </div>
      <div>
        {
  // all.map((u) => {return <h1>{u.name}</h1>})
  //       for(let x of all){
  //         return (<h1>{x}</h1>
  // )
  //       }
        }
      </div>
    </Container>
  );
};

export default Table4;