import React, { useState } from 'react'
import { BottomNavigation, BottomNavigationAction } from "@mui/material"
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';
import { useNavigate } from 'react-router-dom';

export default function FCBottomNavigation({ UserDetails }) {
  const navigate = useNavigate()
  const studentDetails = UserDetails
  const [value, setValue] = useState()

  return (
    <BottomNavigation
      sx={{ width: '100%', position: 'absolute', bottom: 0 }}
      value={value}
      onChange={(event, newValue) => setValue(newValue)}
      showLabels
      style={{ borderTop: "0.2px solid black", background: "#FFFFFF" }}
    >
      <BottomNavigationAction label="מסך הבית" icon={<HomeIcon />} onClick={() => navigate("/studentHomePage", { state: studentDetails })} />
      <BottomNavigationAction label="שיעורים שלי" icon={<MenuBookIcon />} onClick={() => navigate("/classForStudent", { state: studentDetails })} />
      <BottomNavigationAction label="התראות" icon={<NotificationAddIcon />} />
      <BottomNavigationAction label='חיפוש שיעור' icon={<SearchIcon />} onClick={() => navigate("/searchClassesPage", { state: studentDetails })} />
    </BottomNavigation>
  )
}
