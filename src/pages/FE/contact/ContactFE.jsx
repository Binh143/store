import React, { useEffect } from "react";

const ContactFE = () => {
  useEffect(() => {
    document.title = "Contact Page | FakeStore";
  }, []);
  return <div>contact</div>;
};

export default ContactFE;
