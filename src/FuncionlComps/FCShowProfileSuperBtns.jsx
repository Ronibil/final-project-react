import React from "react";
import { Button } from "react-bootstrap";

export default function FCShowProfileSuperBtns() {
  return (
    <div className="d-flex flex-column mb-2 text-center">
      <Button className="m-1" variant="outline-primary">
        <b>בקשה ליצירת קשר</b>
      </Button>
      <Button className="m-1" variant="outline-primary">
        <b>צפייה בשיעורים שלי </b>
      </Button>
    </div>
  );
}
