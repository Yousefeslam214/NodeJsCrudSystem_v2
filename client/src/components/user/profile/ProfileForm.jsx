import React from 'react';
import './profile.css';

const ProfileForm = ({ formData, handleInputChange, handleUpdate, userRoles }) => {
  return (
    <form className="profileForm" onSubmit={handleUpdate}>
      <h2>Update Profile</h2>
      <input
        type="text"
        name="userName"
        value={formData.userName}
        onChange={handleInputChange}
        placeholder="Name"
      />
      <input
        type="number"
        name="age"
        value={formData.age}
        onChange={handleInputChange}
        placeholder="Age"
        min="12"
        max="80"
      />
      <select
        name="role"
        value={formData.role}
        onChange={handleInputChange}
        className="roleSelect"
      >
        {Object.values(userRoles).map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
      <button type="submit" className="updateButton">Update</button>
    </form>
  );
};

export default ProfileForm;
