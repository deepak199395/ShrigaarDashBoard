import React, { useEffect, useState } from "react";
import "./Account.css";

const Account = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState(null);

  // ✅ Fetch Users
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://www.shrigaar.com/api/v1/shringar/User/GetAllUsersDetails/api62",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (data.success) {
        setUsers(data.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ UPDATE USER
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://api.shrigaar.com/api/v1/shringar/User/UpdateUsers/api64/${editUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editUser),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("User Updated ✅");
        setEditUser(null);
        fetchUsers();
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  // ✅ DELETE USER
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://api.shrigaar.com/api/v1/shringar/User/DeleteUsers/api65/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("User Deleted 🗑️");
        fetchUsers(); // 🔥 refresh list
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // ✅ Loading
  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div className="account-container">
      <h1 className="account-heading">Users List</h1>

      {/* ✅ EDIT FORM */}
      {editUser && (
        <form className="edit-form" onSubmit={handleUpdate}>
          <input
            value={editUser.FullName}
            onChange={(e) =>
              setEditUser({ ...editUser, FullName: e.target.value })
            }
            placeholder="Full Name"
          />

          <input
            value={editUser.Email}
            onChange={(e) =>
              setEditUser({ ...editUser, Email: e.target.value })
            }
            placeholder="Email"
          />

          <input
            value={editUser.phoneNumber}
            onChange={(e) =>
              setEditUser({ ...editUser, phoneNumber: e.target.value })
            }
            placeholder="Phone"
          />

          <button type="submit">Update</button>
          <button type="button" onClick={() => setEditUser(null)}>
            Cancel
          </button>
        </form>
      )}

      {/* ✅ USERS GRID */}
      <div className="account-grid">
        {users.map((user) => (
          <div className="user-card" key={user._id}>
            <h3>{user.FullName}</h3>

            <p><strong>Email:</strong> {user.Email}</p>
            <p><strong>Phone:</strong> {user.phoneNumber}</p>
            <p><strong>Gender:</strong> {user.Gender}</p>
            <p><strong>Age:</strong> {user.age}</p>

            <p>
              <strong>Address:</strong> {user.Address}, {user.City}, {user.State}
            </p>

            <span className={`status ${user.isActive ? "active" : "inactive"}`}>
              {user.isActive ? "Active" : "Inactive"}
            </span>

            {/* ✅ ACTION BUTTONS */}
            <div className="btn-group">
              <button
                className="edit-btn"
                onClick={() => setEditUser(user)}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => handleDelete(user._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Account;