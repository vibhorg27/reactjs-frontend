import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllEmployees, deleteEmployee } from '../../services/EmployeeService';
import './home.scss';

function Home() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');

  const fetchEmployees = async () => {
    const response = await getAllEmployees();
    if (response.success) {
      setEmployees(response.data);
      setError('');
    } else {
      setError('Failed to fetch employees: ' + response.error);
      setEmployees([]);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      const response = await deleteEmployee(id);
      if (response.success) {
        fetchEmployees(); // Refresh the list after deletion
      } else {
        setError('Failed to delete employee: ' + response.error);
      }
    }
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Employee List</h1>
      {error && <div className="error-message">{error}</div>}
      {employees.length === 0 && !error ? (
        <p>No employees found.</p>
      ) : (
        <table className="employee-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Profile Image</th>
              <th>Gender</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Start Date</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>{employee.profileImage}</td>
                <td>{employee.gender}</td>
                <td>{<p>{Array.isArray(employee.departments) ? employee.departments.join(', ') : 'N/A'}</p>}</td>
                <td>{employee.salary}</td>
                <td>{`${employee.startDay} ${employee.startMonth} ${employee.startYear}`}</td>
                <td>{employee.notes || '-'}</td>
                <td>
                  <Link to={`/edit-employee/${employee.id}`} className="edit-button">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(employee.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Home;