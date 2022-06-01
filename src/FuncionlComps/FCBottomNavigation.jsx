import React from 'react'
import { BottomNavigation, BottomNavigationAction } from "@mui/material"
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';
import { useNavigate } from 'react-router-dom';

export default function FCBottomNavigation({ UserDetails }) {
  const navigate = useNavigate()
  const studentDetails = UserDetails

  return (
    <BottomNavigation sx={{ width: '100%', position: 'absolute', bottom: 0 }} style={{ borderTop: "0.2px solid black", background: "#FFFFFF" }}>
      <BottomNavigationAction label="MenuBook" icon={<MenuBookIcon />} onClick={() => navigate("/classForStudent", { state: studentDetails })} />
      <BottomNavigationAction label="Notification" icon={<NotificationAddIcon />} />
      <BottomNavigationAction label='Search' icon={<SearchIcon />} onClick={() => navigate("/searchClassesPage", { state: studentDetails })} />
      <BottomNavigationAction label="Home" icon={<HomeIcon color="primary" />} onClick={() => navigate("/studentHomePage", { state: studentDetails })} />
    </BottomNavigation>
  )
}
