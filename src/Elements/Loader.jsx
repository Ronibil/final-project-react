import React from 'react'
const loader = {
  border: "10px solid #f3f3f3",
  borderTop: "10px solid #3498db",
  borderRadius: "50%",
  width: "80px",
  height: "80px",
  animation: "spin 1s linear infinite"
  } 


const Loader = () => <div style={loader}></div>;

export default Loader;
