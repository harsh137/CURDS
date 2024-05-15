import { useState, useEffect } from 'react';

export default function FormUpdate({ isOpenUpdate, onCloseUpdate, onSaveUpdate, data }) {
  const [form, setForm] = useState({
    id: '',
    name: '',
    phone: '',
    email: '',
    hobbies: '',
  });

  useEffect(() => {
    setForm(data);
  }, [data]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
    const phoneRegex= /^\d+$/
    if (form.name && form.phone && form.email && form.hobbies ) {

      if( phoneRegex.test(form.phone)&&form.phone.length==10){
        
        if(emailRegex.test(form.email)){
            onSaveUpdate(form);
            onCloseUpdate();
    } else {
      alert('Invalid Email');
      }
      } else {
        alert('Phone number should be 10 digits');
      }
      } else {
        alert('All fields are required');
        }
    }
  

  if (!isOpenUpdate) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1 text-black"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1 text-black"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1 text-black"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Hobbies</label>
            <input
              type="text"
              name="hobbies"
              value={form.hobbies}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1 text-black"
              required
            />
          </div>
          <div className="mt-4">
            <button type="submit" className="bg-blue-500 text-white p-2 rounded mr-2">Save</button>
            <button type="button" className="bg-gray-500 text-white p-2 rounded" onClick={onCloseUpdate}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
