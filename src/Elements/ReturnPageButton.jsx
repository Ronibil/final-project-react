import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import { useNavigate } from "react-router-dom";


function ReturnPageButton({ GoTo }) {
  const navigate = useNavigate();
  return (
    <button onClick={GoTo} style={{ transform: "rotateY(180deg)", background: "#E4E9BE", borderRadius: 50, border: "solid #E4E9BE 1px" }}>
      <ArrowBackSharpIcon />
    </button>
  );
}

export default ReturnPageButton;