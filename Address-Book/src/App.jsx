import { useState } from 'react';
import './App.css';

const initialPeople = [];

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [people, setPeople] = useState(initialPeople);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddPerson = () => {
    if (Object.values(formData).every(field => field.trim())) {
      if (isEditing) {
        // Update existing person
        const updatedPeople = [...people];
        updatedPeople[editIndex] = formData;
        setPeople(updatedPeople);
      } else {
        // Add new person
        setPeople([...people, formData]);
      }
      setFormData({
        fullName: '',
        phoneNumber: '',
        address: '',
        city: '',
        state: '',
        zipCode: ''
      });
      setIsModalOpen(false);
      setIsEditing(false);
      setEditIndex(null);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      phoneNumber: '',
      address: '',
      city: '',
      state: '',
      zipCode: ''
    });
    setIsEditing(false);
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    setPeople(people.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setFormData(people[index]);
    setIsEditing(true);
    setEditIndex(index);
    setIsModalOpen(true);
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <img
            src="https://img.icons8.com/ios-filled/50/2563eb/address-book.png"
            alt="Address Book Icon"
            className="header-icon"
          />
          <h1>ADDRESS BOOK</h1>
        </div>
      </header>

      <section className="main-section">
        <div className="section-header">
          <h2>Person Details</h2>
          <button onClick={() => setIsModalOpen(true)} className="add-button">
            <span className="add-icon">+</span> Add Person
          </button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Fullname</th>
                <th>Address</th>
                <th>City</th>
                <th>State</th>
                <th>Zip Code</th>
                <th>Phone Number</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {people.map((person, index) => (
                <tr key={index}>
                  <td>{person.fullName}</td>
                  <td>{person.address}</td>
                  <td>{person.city}</td>
                  <td>{person.state}</td>
                  <td>{person.zipCode}</td>
                  <td>{person.phoneNumber}</td>
                  <td className="action-icons">
                    <button onClick={() => handleDelete(index)} className="action-button">
                      <img
                        src="https://img.icons8.com/ios-filled/50/000000/trash.png"
                        alt="Delete"
                        className="action-icon"
                      />
                    </button>
                    <button onClick={() => handleEdit(index)} className="action-button">
                      <img
                        src="https://img.icons8.com/ios-filled/50/000000/edit.png"
                        alt="Edit"
                        className="action-icon"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {isModalOpen && (
        <div className="modal open">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{isEditing ? 'EDIT PERSON DETAILS' : 'PERSON ADDRESS FORM'}</h2>
              <button onClick={() => {
                setIsModalOpen(false);
                handleReset();
              }} className="close-button">
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <select
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                  >
                    <option value="">Select City</option>
                    <option value="Mumbai">Chennai</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                  >
                    <option value="">Select State</option>
                    <option value="Maharashtra">Tamil Nadu</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="zipCode">Zip Code</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-actions">
                <button onClick={handleAddPerson} className="submit-button">
                  {isEditing ? 'Update' : 'Add'}
                </button>
                <button onClick={handleReset} className="reset-button">
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;