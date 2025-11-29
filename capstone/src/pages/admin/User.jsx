import { useEffect, useState } from "react";
import UserModal from "../../components/UserModal"; // pastikan path sesuai

export default function User() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add"); // add / edit
  const [selectedUser, setSelectedUser] = useState(null);

  const loadUsers = async () => {
    const res = await fetch("http://localhost/capstone_backend/users/get_users.php");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // OPEN ADD USER MODAL
  const openAddModal = () => {
    setModalType("add");
    setSelectedUser(null);
    setShowModal(true);
  };

  // OPEN EDIT USER MODAL
  const openEditModal = (user) => {
    setModalType("edit");
    setSelectedUser(user);
    setShowModal(true);
  };

  const deleteUser = async (id) => {
    if (!confirm("Yakin ingin menghapus user ini?")) return;

    const res = await fetch(
      `http://localhost/capstone_backend/users/delete_user.php?id=${id}`,
      { method: "DELETE" }
    );

    const data = await res.json();
    if (data.success) {
      alert("User berhasil dihapus!");
      loadUsers();
    } else {
      alert("Gagal menghapus user!");
    }
  };

  // FORM SUBMIT HANDLER
    const submitUser = async (form) => {
    try {
        let url =
        modalType === "add"
            ? "http://localhost/capstone_backend/users/create_user.php"
            : "http://localhost/capstone_backend/users/update_user.php";

        const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        });

        const text = await res.text(); // TANGKAP RAW RESPONSE
        console.log("RAW RESPONSE:", text);

        const data = JSON.parse(text);

        if (data.success) {
        alert(data.message);
        setShowModal(false);
        loadUsers();
        } else {
        alert("Gagal: " + data.message);
        }
    } catch (err) {
        alert("ERROR: " + err.message);
        console.log(err);
    }
    };



  return (
    <div className="p-8 w-full">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Daftar User</h2>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          onClick={openAddModal}
        >
          Buat User Baru
        </button>
      </div>

      {/* HEADER */}
      <div className="grid grid-cols-4 text-sm font-semibold border-b pb-4 mb-4">
        <span>User</span>
        <span className="text-center">Email</span>
        <span className="text-center">Role</span>
        <span className="text-right">Aksi</span>
      </div>

      {users.map((user) => (
        <div key={user.id} className="grid grid-cols-4 bg-white border rounded-lg p-4 mb-3">
          <span>{user.name}</span>
          <span className="text-center">{user.email}</span>
          <span className="text-center">{user.role}</span>

          <div className="flex justify-end gap-2">

            <button
              className="bg-blue-500 text-white px-4 py-1 rounded-lg"
              onClick={() => openEditModal(user)}
            >
              Edit
            </button>

            <button
              className="bg-red-500 text-white px-4 py-1 rounded-lg"
              onClick={() => deleteUser(user.id)}
            >
              Hapus
            </button>
          </div>
        </div>
      ))}

      {/* SHOW MODAL */}
      {showModal && (
        <UserModal
          type={modalType}
          userData={selectedUser}
          close={() => setShowModal(false)}
          submit={submitUser}
        />
      )}
    </div>
  );
}
