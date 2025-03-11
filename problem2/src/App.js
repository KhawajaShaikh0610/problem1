import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [records, setRecords] = useState([]);

  const addRecord = async () => {
    const randomId = Math.floor(Math.random() * 83) + 1;
    try {
      const response = await axios.get(
        `https://swapi.dev/api/people/${randomId}`
      );
      const newRecord = {
        id: randomId,
        name: response.data.name,
      };

      setRecords([...records, newRecord]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteRecord = (id) => {
    setRecords(records.filter((record) => record.id !== id));
  };

  return (
    <div>
      <button onClick={addRecord}>Add Record</button>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.name}</td>
              <td>
                <button onClick={() => deleteRecord(record.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
