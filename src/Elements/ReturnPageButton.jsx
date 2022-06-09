import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import { useNavigate } from "react-router-dom";


function ReturnPageButton({ GoTo }) {
  const navigate = useNavigate();
  return (
    <button onClick={GoTo} style={{ transform: "rotateY(180deg)", background: "rgb(228, 233, 190, 0.6)", borderRadius: 50, border: "solid rgb(228, 233, 190) 1px", position: "fixed", top: "3%", right: "5%" }}>
      <ArrowBackSharpIcon />
    </button>
  );
}

export default ReturnPageButton;