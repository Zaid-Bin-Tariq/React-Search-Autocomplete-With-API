import { useState, useEffect } from "react";
import "./App.css";
import Suggestions from "./Suggestions";

function App() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);

  function handleChange(event) {
    const query = event.target.value.toLowerCase();
    setSearchParams(query);
    if (query.length > 1) {
      const filteredData =
        users && users.length
          ? users.filter((item) => item.toLowerCase().indexOf(query) > -1)
          : [];
      setFilteredUsers(filteredData);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }

  async function fetchListOfUsers(prams) {
    try {
      setLoading(true);
      const response = await fetch("http://dummyjson.com/users");
      const data = await response.json();
      if (data && data.users && data.users.length) {
        setUsers(data.users.map((item) => item.firstName));
        setLoading(false);
        setError(null);
      }
      console.log(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError(error);
    }
  }

  function handleClick(e) {
    setShowDropdown(false);
    setFilteredUsers([]);
    setSearchParams(e.target.innerText);
  }

  useEffect(() => {
    fetchListOfUsers();
  }, []);
  console.log(users, filteredUsers);

  return (
    <>
      <div className="container">
        {loading ? (
          <h1>Loading data, please wait!</h1>
        ) : (
          <input
            onChange={handleChange}
            value={searchParams}
            name="search-users"
            placeholder="Search users here ..."
          />
        )}
      </div>
      {showDropdown && (
        <Suggestions handleClick={handleClick} data={filteredUsers} />
      )}
    </>
  );
}

export default App;
