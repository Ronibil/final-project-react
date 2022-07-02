import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function FCShowProfileSuperBtns({
  FutreClasses,
  StudentDetails,
  Phone,
}) {
  // const { state } = useLocation();

  const navigate = useNavigate();



  return (
    <div className="d-flex flex-column mt-2 text-center">
      <a
        className="btn btn-primary"
        href={`https://wa.me/${Phone}`}
        role="button"
      >
        בקשה ליצירת קשר
      </a>
      {/* <Button className="m-1" variant="primary">
        בקשה ליצירת קשר
      </Button> */}
      <Button
        className="m-1"
        onClick={() => {
          console.log(FutreClasses);
          navigate("/showSuperFutureClasses", {
            state: {
              FutreClasses,
              StudentDetails,
            },
          });
        }}
        variant="primary"
      >
        צפייה בשיעורים שלי
      </Button>
    </div>
  );
}
