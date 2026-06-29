import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import  "../Style/CreateStaff.css"
import {fetchStaff,addStaff} from "../features/staff/staffSlice";
import UpdateStaffModal from "../components/modals/UpdateStaffModal";
import ConfirmDeleteModal from "../components/modals/ConfirmDeleteModal";

const CreateStaff = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState(null);
  const dispatch = useDispatch();

// READ DATA FROM REDUX STORE
  const { staffList, loading, error } = useSelector((state) => state.staff);

  console.log("staff list ===============>",staffList);


// FETCH DATA ON PAGE LOAD
  useEffect(() => {
    dispatch(fetchStaff());
  }, [dispatch]);

// ADD STAFF
  const handleAddStaff = () => {

    const newStaff = {
      category: "offStore",
      staffName: "Deepak Yadav",
      age: 24,
      empNumber: "EMP500",
      dob: "2001-05-10",
      salary: 35000,
      city: "Pune",
      position: "Frontend Developer",
      dateOfJoining: "2026-01-10",
      lastWorkingDay: null,
    };

    dispatch(addStaff(newStaff));
  };

// UPDATE STAFF - Open Modal
  const handleUpdateStaff = (staff) => {
    setSelectedStaff(staff);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStaff(null);
  };

  // DELETE STAFF - Open Modal
  const handleDeleteStaff = (staff) => {
    setStaffToDelete(staff);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setStaffToDelete(null);
  };

// LOADING
  if (loading) {
    return <h1 className="loading">Loading...</h1>;
  }
// ERROR
  if (error) {
    return <h1 className="error">{error}</h1>;
  }
return (
    <div className="staff-container">
   <div className="header-section">
     <h1 className="main-heading">
          Staff Management
        </h1>

        <button
          className="add-btn"
          onClick={handleAddStaff}
        >
          Add Staff
        </button>
      </div>
     <div className="staff-grid">

        {staffList.map((staff) => (
          <div
            className="staff-card"
            key={staff._id}
          >

            <div className="top-section">

              <h2 className="staff-name">
                {staff.staffName}
              </h2>

              <span className="category-badge">
                {staff.category}
              </span>
            </div>
             <div className="staff-details">

              <p>
                <strong>Employee No:</strong> {staff.empNumber}
              </p>

              <p>
                <strong>Age:</strong> {staff.age}
              </p>

              <p>
                <strong>DOB:</strong> {staff.dob?.slice(0, 10)}
              </p>

              <p>
                <strong>Position:</strong> {staff.position}
              </p>

              <p>
                <strong>City:</strong> {staff.city}
              </p>

              <p>
                <strong>Salary:</strong> ₹{staff.salary}
              </p>

              <p>
                <strong>Date of Joining:</strong> {staff.dateOfJoining?.slice(0, 10)}
              </p>

              {staff.lastWorkingDay && (
                <p>
                  <strong>Last Working Day:</strong> {staff.lastWorkingDay?.slice(0, 10)}
                </p>
              )}

              <p>
                <strong>Created:</strong> {staff.createdAt?.slice(0, 10)}
              </p>

              <p>
                <strong>Updated:</strong> {staff.updatedAt?.slice(0, 10)}
              </p>

            </div>
            <div className="button-group">

              <button
                className="update-btn"
                onClick={() =>
                  handleUpdateStaff(staff)
                }
              >
                Update
              </button>
              <button
                className="delete-btn"
                onClick={() =>
                  handleDeleteStaff(staff)
                }
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <UpdateStaffModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        staffData={selectedStaff}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        staffData={staffToDelete}
      />
    </div>
  );
};

export default CreateStaff;