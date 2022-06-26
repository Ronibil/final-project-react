import React from "react";
import { Button } from "react-bootstrap";

export default function FCShowProfileSuperBtns() {
  return (
    <div className="d-flex flex-column mt-2 text-center">
      <Button className="m-1" variant="primary">
        בקשה ליצירת קשר
      </Button>
      <Button className="m-1" variant="primary">
        צפייה בשיעורים שלי
      </Button>
    </div>
  );
}
