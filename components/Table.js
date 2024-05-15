
      export default function Table({ entries, onEdit, onDelete, onSelect }) {
        return (
          <div className="overflow-x-auto w-full">
            <table className="min-w-full bg-gray-400 border">
              <thead>
                <tr>
                  <th className="py-2 px-4 border">Select</th>
                  <th className="py-2 px-4 border">ID</th>
                  <th className="py-2 px-4 border">Name</th>
                  <th className="py-2 px-4 border">Phone Number</th>
                  <th className="py-2 px-4 border">Email</th>
                  <th className="py-2 px-4 border">Hobbies</th>
                  <th className="py-2 px-4 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => (
                  <tr key={entry._id} className="hover:bg-gray-500 dark:hover:bg-gray-600">
                    <td className="py-2 px-4 border">
                      <input type="checkbox" onChange={(e) => onSelect(entry, e.target.checked)} />
                    </td>
                    <td className="py-2 px-4 border">{index + 1}</td>
                    <td className="py-2 px-4 border">{entry.name}</td>
                    <td className="py-2 px-4 border">{entry.phone}</td>
                    <td className="py-2 px-4 border">{entry.email}</td>
                    <td className="py-2 px-4 border">{entry.hobbies}</td>
                    <td className="py-2 px-4 border">
                      <button
                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                        onClick={() => onEdit(entry)}
                      >
                        Update
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                        onClick={() => onDelete(entry._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
    
      
    