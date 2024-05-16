"use client";

import { useState, useEffect } from "react";
import FormModal from "@/components/FormData";
import Table from "@/components/Table";
import Button from "@/components/Button";
import FormUpdate from "@/components/FormUpdate";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false); // Check if the FormData Component is open or not
  const [entries, setEntries] = useState([]); //Stores All The Entries
  const [selectedEntries, setSelectedEntries] = useState([]); //store all the Selected Entries
  const [isOpenUpdate, setIsOpenUpdate] = useState(false); // Check if the FormUpdate Component is open or not
  const [updateSelect, setUpdateSelect] = useState({
    id: "",
    name: "",
    phone: "",
    email: "",
    hobbies: "",
  }); // Store The Entry which need to update
  const [sending, setSending] = useState(false); //manage Loading Button While Email Is Sending
  const [searchQuery, setSearchQuery] = useState(""); //Store Search Query
  const [darkMode, setDarkMode] = useState(false); // Store Dark Mode State

  useEffect(() => {
    fetchEntries();
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  //FEATCHING ENTRIES API CALL
  const fetchEntries = async () => {
    try {
      const res = await fetch("/api/getEntries", { method: "GET", cache: 'no-store' });
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      setEntries(data);
    } catch (error) {
      console.log('Fetch entries failed: ', error);
    }
  };

  //ADD ENTRY API CALL
  const handleSave = async (formData) => {
    try {
      const response = await fetch("/api/addEntry", {
        method: "POST",
        cache: 'no-store',
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        fetchEntries();
      } else {
        console.log('Failed to save entry');
      }
    } catch (error) {
      console.log('Save entry failed: ', error);
    }
  };

  //DELETE ENTRY API CALL
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/deleteEntries/${id}`, { method: "DELETE", cache: 'no-store' });
      if (!response.ok) throw new Error('Delete entry failed');
      fetchEntries();
    } catch (error) {
      console.log('Delete entry failed: ', error);
    }
  };

  //EDIT ENTRY API CALL
  const handleEdit = (e) => {
    setUpdateSelect({
      id: e._id,
      name: e.name,
      phone: e.phone,
      email: e.email,
      hobbies: e.hobbies,
    });
    setIsOpenUpdate(true);
  };

  //UPDATE ENTRY API CALL
  const handleSaveUpdate = async (formData) => {
    try {
      const response = await fetch(`/api/updateEntry/${formData.id}`, {
        method: "PUT",
        cache: 'no-store',
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        fetchEntries();
      } else {
        console.log('Failed to update entry');
      }
    } catch (error) {
      console.log('Update entry failed: ', error);
    }
  };

  //HANDLE SELECTED ENTRY
  const handleSelect = (entry, isSelected) => {
    if (isSelected) {
      setSelectedEntries([...selectedEntries, entry]);
    } else {
      setSelectedEntries(selectedEntries.filter((e) => e._id !== entry._id));
    }
  };

  // SEND EMAIL API CALL
  const handleSendEmail = async () => {
    setSending(true);
    console.log(selectedEntries);

    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        cache: 'no-store',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedRows: selectedEntries }),
      });

      if (response.ok) {
        setSending(false);
        alert("Email sent successfully");
      } else {
        const errorData = await response.json();
        alert(`Error sending email: ${errorData.message}`);
      }
    } catch (e) {
      setSending(false);
      console.log('Send email failed: ', e);
      alert("Error sending email: An unexpected error occurred");
    }
  };

  // Filter entries based on search query
  const filteredEntries = entries.filter((entry) =>
    Object.values(entry).some(
      (val) =>
        typeof val === "string" &&
        val.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className={`w-full mx-auto p-4 min-h-screen bg-slate-300 dark:bg-[#121212] dark:text-slate-50`}>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-center mb-4 md:mb-0 md:flex-grow">Manage Entries</h1>
        <button
          onClick={toggleDarkMode}
          className="dark:bg-white dark:text-black bg-gray-500 px-4 py-2 rounded focus:outline-none"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center mb-8 w-full">
        <input
          type="text"
          placeholder="Search by any attribute"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 text-black rounded-l-full border border-gray-400 focus:outline-none focus:ring focus:border-blue-500 flex-grow w-full md:w-96 bg-slate-100 dark:bg-gray-700 dark:text-white dark:border-gray-600 mb-4 md:mb-0"
        />
        <Button
          onClick={() => setIsOpen(true)}
          loading={sending}
          className="rounded-r-full md:ml-2 w-full md:w-auto"
        >
          Add New Data
        </Button>
      </div>
      <div className="overflow-x-auto w-full flex-grow">
        <Table
          entries={filteredEntries}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSelect={handleSelect}
        />
      </div>
      <div className="flex justify-center mt-8 w-full">
        <Button onClick={handleSendEmail} loading={sending} className="w-full md:w-auto">
          {sending ? "Sending Email..." : "Send Email"}
        </Button>
      </div>
      <FormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={handleSave}
      />
      <FormUpdate
        isOpenUpdate={isOpenUpdate}
        onCloseUpdate={() => setIsOpenUpdate(false)}
        onSaveUpdate={handleSaveUpdate}
        data={updateSelect}
      />
    </div>
  );
}
