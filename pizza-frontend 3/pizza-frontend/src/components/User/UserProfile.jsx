import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Avatar, Card, CardContent, Typography, Grid, Button, TextField, Box } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import logo from '../../assets/logo.jpg';
import { toast } from "react-toastify";

const UserProfile = () => {
  const { auth, updateAuth } = useContext(AuthContext);
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phoneNumber: '',
    // password: ''
  });

  useEffect(() => {
    if (auth) {
      setFormData({
        name: auth.username || '',
        email: auth.userEmail || '',
        address: auth.userAddress || '',
        phoneNumber: auth.phoneNo || '',
        // password: ''
      });
    }
  }, [auth]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:8084/customer/update/${auth.userId}`, formData, {
        headers: {
          Authorization: `Bearer ${auth.token}` 
        }
      });
      
      updateAuth({
        username: formData.name,
        userEmail: formData.email,
        userAddress: formData.address,
        phoneNo: formData.phoneNumber
      });
      setIsEditing(false);
      toast.success("User details updated succesfully")
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', mt: 14 }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar
              alt="Profile Picture"
              src={logo}
              sx={{ width: 100, height: 100 }}
            />
          </Grid>
          <Grid item xs>
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <Box mb={2}>
                  <TextField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    type='number'
                  />
                  {/* <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  /> */}
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => setIsEditing(false)}
                  sx={{ ml: 2 }}
                >
                  Cancel
                </Button>
              </form>
            ) : (
              <>
                <Typography variant="h5" component="div">
                  {formData.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {formData.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formData.address}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formData.phoneNumber}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </Button>
              </>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
