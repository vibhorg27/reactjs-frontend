import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addEmployee, getEmployeeById, updateEmployee } from '../../services/EmployeeService';
import './payroll-form.scss';

function PayrollForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const initialFormData = {
    name: '',
    profileImage: '',
    gender: '',
    departments: [],
    salary: '',
    startDay: '',
    startMonth: '',
    startYear: '',
    notes: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    if (isEditMode) {
      const fetchEmployee = async () => {
        const response = await getEmployeeById(id);
        if (response.success) {
          setFormData(response.data);
        } else {
          setMessage({
            text: `Failed to load employee: ${response.error}`,
            type: 'error',
          });
        }
      };
      fetchEmployee();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setMessage({ text: '', type: '' });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      departments: checked
        ? [...prev.departments, value]
        : prev.departments.filter((dep) => dep !== value),
    }));
    setMessage({ text: '', type: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isEditMode) {
        response = await updateEmployee(id, formData);
        if (response.success) {
          setMessage({ text: 'Employee updated successfully!', type: 'success' });
          setTimeout(() => navigate('/'), 2000); // Redirect to home after 2 seconds
        }
      } else {
        response = await addEmployee(formData);
        if (response.success) {
          setMessage({ text: 'Employee added successfully!', type: 'success' });
          setFormData(initialFormData);
        }
      }
      if (!response.success) {
        setMessage({
          text: `Failed to ${isEditMode ? 'update' : 'add'} employee: ${response.error}`,
          type: 'error',
        });
      }
    } catch (error) {
      setMessage({
        text: `Error during submission: ${error.message}`,
        type: 'error',
      });
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setMessage({ text: '', type: '' });
  };

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const years = Array.from({ length: 26 }, (_, i) => 2000 + i);

  return (
    <div className="form-container">
      <h1 className="form-title">
        {isEditMode ? 'Edit Employee' : 'Employee Payroll Form'}
      </h1>
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit} className="payroll-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name..."
            required
          />
        </div>

        <div className="form-group">
          <label>Profile Image</label>
          <div className="radio-group">
            {['🧑‍💼', '👩‍💼', '🧑‍🎓', '👩‍🎓'].map((avatar, index) => (
              <label key={index} className="avatar-label">
                <input
                  type="radio"
                  name="profileImage"
                  value={avatar}
                  checked={formData.profileImage === avatar}
                  onChange={handleChange}
                />
                <span className="avatar">{avatar}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Gender</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === 'Male'}
                onChange={handleChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === 'Female'}
                onChange={handleChange}
              />
              Female
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Department</label>
          <div className="checkbox-group">
            {['HR', 'Sales', 'Finance', 'Engineer', 'Others'].map((dept) => (
              <label key={dept}>
                <input
                  type="checkbox"
                  name="departments"
                  value={dept}
                  checked={Array.isArray(formData.departments) && formData.departments.includes(dept)}
                  onChange={handleCheckboxChange}
                />
                {dept}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="salary">Salary</label>
          <input
            type="number"
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Start Date</label>
          <div className="date-group">
            <select
              name="startDay"
              value={formData.startDay}
              onChange={handleChange}
              required
            >
              <option value="">Day</option>
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
            <select
              name="startMonth"
              value={formData.startMonth}
              onChange={handleChange}
              required
            >
              <option value="">Month</option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <select
              name="startYear"
              value={formData.startYear}
              onChange={handleChange}
              required
            >
              <option value="">Year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <div className="button-group">
          <button type="button" className="cancel-button" onClick={resetForm}>
            Cancel
          </button>
          <button type="submit" className="submit-button">
            {isEditMode ? 'Update Employee' : 'Submit'}
          </button>
          <button type="button" className="reset-button" onClick={resetForm}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default PayrollForm;