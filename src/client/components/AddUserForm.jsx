import React, { useState } from "react";

const AddUserForm = () => {
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // TODO: Add the user to the database

    setName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <button type="submit">Add User</button>
    </form>
  );
};

export default AddUserForm;