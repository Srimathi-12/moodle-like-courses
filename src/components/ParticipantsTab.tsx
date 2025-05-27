import { useState } from "react";

interface Role {
  id: number;
  name: string;
  shortname: string;
}

interface User {
  id: number;
  fullname: string;
  email?: string;
  profileimageurl?: string;
  suspended?: boolean;
  roles?: Role[];
}

interface ParticipantsTabProps {
  data: User[];
}

const ParticipantsTab: React.FC<ParticipantsTabProps> = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterRole, setFilterRole] = useState<string>("");
  
  if (!data) return <p>No participant data available.</p>;
  
  // Check if data is an array (expected for participants)
  if (!Array.isArray(data)) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-700">Expected an array of participants but received invalid data format</p>
      </div>
    );
  }
  
  if (data.length === 0) {
    return <p className="p-4">No participants found for this course.</p>;
  }

  // Extract all unique roles from the data
  const allRoles = new Set<string>();
  data.forEach(user => {
    if (user.roles && Array.isArray(user.roles)) {
      user.roles.forEach(role => allRoles.add(role.name));
    } else {
      allRoles.add("Student");
    }
  });
  
  // Filter participants based on search term and role filter
  const filteredParticipants = data.filter(user => {
    const matchesSearch = user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (user.email || "").toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = !filterRole || 
                        (user.roles && Array.isArray(user.roles) && 
                         user.roles.some(role => role.name === filterRole)) ||
                        (filterRole === "Student" && (!user.roles || !user.roles.length));
    
    return matchesSearch && matchesRole;
  });

  return (
    <div className="mt-4">
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex-grow">
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full px-4 py-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <select
            className="px-4 py-2 border rounded-lg"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="">All roles</option>
            {[...allRoles].sort().map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>
      </div>
      
      <p className="mb-4 font-medium">
        Showing {filteredParticipants.length} of {data.length} participants
      </p>
      
      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredParticipants.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {user.profileimageurl && (
                      <img 
                        className="h-8 w-8 rounded-full mr-3" 
                        src={user.profileimageurl} 
                        alt={`${user.fullname}'s avatar`} 
                      />
                    )}
                    <div className="font-medium text-gray-900">{user.fullname}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email || "No email available"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.roles && Array.isArray(user.roles) && user.roles.length > 0 
                    ? user.roles.map(role => role.name).join(", ")
                    : "Student"
                  }
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.suspended ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {user.suspended ? 'Suspended' : 'Active'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ParticipantsTab;