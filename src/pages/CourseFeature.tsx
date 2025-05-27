// import { useState, useEffect } from "react";
// import { useParams, useLocation } from "react-router-dom";

// const TabContent = () => {
//   const [activeTab, setActiveTab] = useState("Course");
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [userData, setUserData] = useState(null);
//   const [apiResponse, setApiResponse] = useState(null); // For debugging

//   const { courseid } = useParams();
//   const location = useLocation();
  
//   const tabs = ["Course", "Participants", "Grades", "Competencies"];

//   // Debug info banner to help troubleshoot
//   const DebugInfo = () => (
//     <div className="bg-gray-100 p-4 rounded-lg mb-4 text-sm">
//       <h3 className="font-bold">Debug Information:</h3>
//       <p>Course ID: {courseid || "Not available"}</p>
//       <p>Token Available: {userData ? "Yes" : "No"}</p>
//       <p>Selected Tab: {activeTab}</p>
//       <p>Loading: {loading ? "Yes" : "No"}</p>
//       <p>Error: {error ? error : "None"}</p>
//       {apiResponse && (
//         <details>
//           <summary className="cursor-pointer text-blue-600">API Response (click to expand)</summary>
//           <pre className="mt-2 p-2 bg-gray-200 overflow-auto max-h-40">
//             {JSON.stringify(apiResponse, null, 2)}
//           </pre>
//         </details>
//       )}
//     </div>
//   );

//   useEffect(() => {
//     // Retrieve user data from location state or sessionStorage
//     const userDataFromState = location.state?.userData;
//       const userDataFromStorage = JSON.parse(sessionStorage.getItem('moodleUserData') || 'null');
      
//       const user = userDataFromState || userDataFromStorage;
      
//     if (user) {
//       setUserData(user?.token);
//     }
//   },[]);

//   const fetchData = async (tab) => {
//     // Reset states
//     setError(null);
//     setData(null);
//     setApiResponse(null);
    
//     // Validate required params
//     if (!userData) {
//       setError("Authentication token is missing. Please log in again.");
//       return;
//     }
    
//     if (!courseid) {
//       setError("Course ID is missing. Please navigate to a valid course.");
//       return;
//     }

//     setLoading(true);
//     let wsfunction = "";
//     let extraParams = `&courseid=${courseid}`;

//     switch (tab) {
//       case "Course":
//         wsfunction = "core_course_get_contents";
//         break;
//       case "Participants":
//         wsfunction = "core_enrol_get_enrolled_users";
//         break;
//       case "Grades":
//         wsfunction = "gradereport_user_get_grade_items";
//         break;
//       case "Competencies":
//         wsfunction = "core_competency_list_course_competencies";
//         break;
//       default:
//         setError(`Unknown tab: ${tab}`);
//         setLoading(false);
//         return;
//     }

//     const apiUrl = `https://lmsbackend.shiksak.com/webservice/rest/server.php?moodlewsrestformat=json&wsfunction=${wsfunction}&wstoken=${userData}${extraParams}`;
    
//     try {
//       console.log(`Fetching ${tab} data from: ${apiUrl}`);
//       const response = await fetch(apiUrl);
      
//       if (!response.ok) {
//         throw new Error(`Server returned ${response.status}: ${response.statusText}`);
//       }
      
//       const result = await response.json();
//       console.log(`${tab} data:`, result);
      
//       // Check if the response contains an error
//       if (result.exception || result.errorcode) {
//         setError(`API Error: ${result.message || result.errorcode || "Unknown error"}`);
//         setApiResponse(result); // Store the error response for debugging
//         return;
//       }
      
//       setApiResponse(result); // Store for debugging
//       setData(result);
//     } catch (err) {
//       console.error(`Error fetching ${tab} data:`, err);
//       setError(`Failed to fetch ${tab} data: ${err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//       fetchData(activeTab);
//   }, [activeTab, courseid, userData]);

//   // Custom Grade Item Component
//   const GradeItem = ({ item, isHeader = false }) => {
//     // If it's a header row
//     if (isHeader) {
//       return (
//         <div className="grid grid-cols-7 gap-4 py-3 px-4 bg-gray-100 font-medium rounded-t-lg">
//           <div>Grade item</div>
//           <div>Calculated weight</div>
//           <div>Grade</div>
//           <div>Range</div>
//           <div>Percentage</div>
//           <div>Feedback</div>
//           <div>Contribution to course total</div>
//         </div>
//       );
//     }
    
//     // For aggregation/total rows
//     if (item.itemtype === 'category') {
//       return (
//         <div className="grid grid-cols-7 gap-4 py-3 px-4 border-t border-gray-200 bg-gray-50">
//           <div className="font-medium flex items-center">
//             <span className="mr-2">Σ</span>
//             {item.itemname || "Course total"}
//           </div>
//           <div>{item.weightformatted || "-"}</div>
//           <div>{item.gradeformatted || "-"}</div>
//           <div>{`0–${item.grademax || 100}`}</div>
//           <div>{item.percentageformatted || "-"}</div>
//           <div>{item.feedback || "-"}</div>
//           <div>{item.contributiontocoursetotalformatted || "-"}</div>
//         </div>
//       );
//     }
    
//     // Regular grade items
//     const itemTypeIcon = getItemTypeIcon(item.itemmodule || item.itemtype);
    
//     return (
//       <div className="grid grid-cols-7 gap-4 py-3 px-4 border-t border-gray-200 hover:bg-gray-50">
//         <div className="flex items-center">
//           <span className="mr-2">{itemTypeIcon}</span>
//           <span>{item.itemname || "Unnamed item"}</span>
//         </div>
//         <div>{item.weightformatted || "-"}</div>
//         <div>{item.gradeformatted || "-"}</div>
//         <div>{`0–${item.grademax || 100}`}</div>
//         <div>{item.percentageformatted || "-"}</div>
//         <div>{item.feedback || "-"}</div>
//         <div>{item.contributiontocoursetotalformatted || "-"}</div>
//       </div>
//     );
//   };

//   // Helper function to get icons for different item types
//   const getItemTypeIcon = (type) => {
//     switch (type) {
//       case 'lesson':
//         return '📚';
//       case 'assignment':
//         return '📝';
//       case 'quiz':
//         return '❓';
//       case 'forum':
//         return '💬';
//       default:
//         return '📄';
//     }
//   };

//   // Collapsible grade category (for better organization)
//   const GradeCategory = ({ category, items }) => {
//     const [isOpen, setIsOpen] = useState(true);
    
//     return (
//       <div className="border rounded-lg mb-4 overflow-hidden">
//         <div 
//           className="flex justify-between items-center p-3 bg-blue-50 cursor-pointer"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           <h3 className="font-medium">{category}</h3>
//           <button className="focus:outline-none">
//             {isOpen ? '▼' : '►'}
//           </button>
//         </div>
        
//         {isOpen && (
//           <div className="bg-white">
//             {items.map((item, idx) => (
//               <GradeItem key={idx} item={item} />
//             ))}
//       </div>
//         )}
//     </div>
//   );
//   };

//   const renderContent = () => {
//     if (loading) return <p className="mt-6 text-gray-600">Loading {activeTab}...</p>;
//     if (error) return <p className="mt-6 text-red-600">{error}</p>;
//     if (!data) return <p className="mt-6 text-gray-600">No data available.</p>;

//     switch (activeTab) {
//       case "Course":
//         // Handle array or error object
//         if (!Array.isArray(data)) {
//           return <p className="mt-6 text-red-600">Unexpected data format for Course.</p>;
//         }
        
//         return (
//           <div className="space-y-4 mt-6">
//             {data.length > 0 ? (
//               data.map((section, index) => (
//                 <div key={index} className="border rounded-lg p-4">
//                   <h2 className="text-xl font-bold">{section.name || "Unnamed Section"}</h2>
//                   {section.summary && (
//                     <div className="mt-2 text-gray-600">{section.summary}</div>
//                   )}
//                   {section.modules && section.modules.length > 0 ? (
//                     <div className="mt-3">
//                       {section.modules.map((mod, idx) => (
//                         <p key={idx} className="text-blue-600 mt-2 cursor-pointer">
//                           📄 {mod.name || "Unnamed Module"}
//                         </p>
//                       ))}
//                     </div>
//                   ) : (
//                     <p className="text-gray-500 mt-2">No modules in this section</p>
//                   )}
//                 </div>
//               ))
//             ) : (
//               <p>No course content available.</p>
//             )}
//           </div>
//         );

//       case "Participants":
//         if (!Array.isArray(data)) {
//           return <p className="mt-6 text-red-600">Unexpected data format for Participants.</p>;
//         }
        
//         return (
//           <div className="mt-6 space-y-2">
//             {data.length > 0 ? (
//               data.map((user, i) => (
//                 <div key={i} className="border p-2 rounded flex items-center">
//                   <span className="mr-2">👤</span>
//                   <div>
//                     <div className="font-medium">{user.fullname || "Unknown User"}</div>
//                     <div className="text-sm text-gray-500">
//                       {user.roles && user.roles.length > 0 
//                         ? `Role: ${user.roles[0].shortname || user.roles[0].name || "Unknown"}`
//                         : "No role specified"}
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p>No participants found.</p>
//             )}
//           </div>
//         );

//       case "Grades":
//         // Check for expected data structure
//         if (!data.usergrades || !Array.isArray(data.usergrades)) {
//           return (
//             <div className="mt-6">
//               <h2 className="text-xl font-semibold mb-6">Student Grades</h2>
              
//               {/* Enhanced Grades UI (Fallback version when API data is not in expected format) */}
//               <div className="border rounded-lg overflow-hidden">
//                 <GradeItem isHeader={true} item={{}} />
                
//                 <div className="divide-y divide-gray-200">
//                   {/* Lesson Item */}
//                   <GradeItem item={{
//                     itemname: "abc",
//                     itemmodule: "lesson",
//                     gradeformatted: "-",
//                     grademax: 100,
//                     percentageformatted: "-",
//                     feedback: "-",
//                     contributiontocoursetotalformatted: "-",
//                     weightformatted: "-"
//                   }} />
                  
//                   {/* Assignment Item */}
//                   <GradeItem item={{
//                     itemname: "Assignment",
//                     itemmodule: "assignment",
//                     gradeformatted: "-",
//                     grademax: 100,
//                     percentageformatted: "-",
//                     feedback: "-",
//                     contributiontocoursetotalformatted: "-",
//                     weightformatted: "-"
//                   }} />
                  
//                   {/* Course Total */}
//                   <GradeItem item={{
//                     itemname: "Course total",
//                     itemtype: "category",
//                     gradeformatted: "-",
//                     grademax: 200,
//                     percentageformatted: "-",
//                     feedback: "-",
//                     contributiontocoursetotalformatted: "-",
//                     weightformatted: "-"
//                   }} />
//                 </div>
//               </div>
              
//               <div className="mt-4 text-sm text-gray-500">
//                 <p>Note: This is displaying sample grade data. Connect to the Moodle API for actual grades.</p>
//               </div>
//             </div>
//           );
//         }
        
//         // Process and organize grade data
//         const userGrades = data.usergrades[0] || {};
//           const gradeItems = userGrades.gradeitems || [];
//         const courseTotal = gradeItems.find(item => item.itemtype === 'course') || {};
//         const regularItems = gradeItems.filter(item => item.itemtype !== 'course');
          
//           return (
//             <div className="mt-6">
//               <div className="flex items-center mb-6">
//                 <h2 className="text-xl font-semibold">Grades for {userGrades.userfullname || "Student"}</h2>
//               </div>
              
//               <div className="border rounded-lg overflow-hidden">
//               <GradeItem isHeader={true} item={{}} />
                
//                 <div className="divide-y divide-gray-200">
//                 {regularItems.map((item, idx) => (
//                       <GradeItem key={idx} item={item} />
//                 ))}
                  
//                   {/* Always show course total */}
//                 <GradeItem 
//                   item={courseTotal.itemname ? courseTotal : {
//                     itemname: "Course total",
//                     itemtype: "category",
//                     gradeformatted: "-",
//                     grademax: 200,
//                     percentageformatted: "-",
//                     feedback: "-",
//                     contributiontocoursetotalformatted: "-",
//                     weightformatted: "-"
//                   }} 
//                 />
//               </div>
//             </div>
//           </div>
//         );

//       case "Competencies":
//         // Check for expected data structure
//         if (!data.competencies && !Array.isArray(data.competencies)) {
//           return <p className="mt-6 text-red-600">Unexpected data format for Competencies.</p>;
//         }
        
//         return (
//           <div className="mt-6 space-y-2">
//             {data.competencies?.length > 0 ? (
//               data.competencies.map((comp, i) => (
//                 <div key={i} className="border p-2 rounded">
//                   <div className="font-medium">✅ {comp.competency?.shortname || "Unnamed Competency"}</div>
//                   {comp.competency?.description && (
//                     <div className="text-sm text-gray-600 mt-1">{comp.competency.description}</div>
//                   )}
//                 </div>
//               ))
//             ) : (
//               <p>No competencies found for this course.</p>
//             )}
//           </div>
//         );

//       default:
//         return <p>Unknown tab</p>;
//     }
//   };

//   const retryFetch = () => {
//     fetchData(activeTab);
//   };

//   return (
//     <div className="max-w-5xl mx-auto mt-10 px-4">
//       <h1 className="text-3xl font-bold mb-4">Course ID: {courseid || "Unknown"}</h1>
      
//       {/* Debug Panel (toggle this for production) */}
//       {/* <DebugInfo /> */}

//       {/* Missing auth warning */}
//       {!userData && (
//         <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
//           <p className="font-bold">Authentication Required</p>
//           <p>No authentication token found. Please log in again to access course data.</p>
//         </div>
//       )}

//       {/* Tabs */}
//       <div className="border-b border-gray-200">
//         <nav className="flex space-x-8" aria-label="Tabs">
//           {tabs.map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`pb-4 px-1 text-sm font-medium border-b-2 transition-colors ${
//                 activeTab === tab
//                   ? "text-blue-600 border-blue-600"
//                   : "text-gray-500 hover:text-gray-700 border-transparent"
//               }`}
//             >
//               {tab}
//             </button>
//           ))}
//         </nav>
//       </div>

//       {/* Content */}
//       {renderContent()}

//       {/* Error retry button */}
//       {error && (
//         <button 
//           onClick={retryFetch}
//           className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           Retry
//         </button>
//       )}
//     </div>
//   );
// };

// export default TabContent;

import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

const TabContent = () => {
  const [activeTab, setActiveTab] = useState("Course");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [apiResponse, setApiResponse] = useState(null); // For debugging
  const [userRole, setUserRole] = useState("student"); // Default role assumption

  const { courseid } = useParams();
  const location = useLocation();

  const tabs = ["Course", "Participants"];

  // Debug info banner to help troubleshoot
  const DebugInfo = () => (
    <div className="bg-gray-100 p-4 rounded-lg mb-4 text-sm">
      <h3 className="font-bold">Debug Information:</h3>
      <p>Course ID: {courseid || "Not available"}</p>
      <p>Token Available: {userData ? "Yes" : "No"}</p>
      <p>User Role: {userRole}</p>
      <p>Selected Tab: {activeTab}</p>
      <p>Loading: {loading ? "Yes" : "No"}</p>
      <p>Error: {error ? error : "None"}</p>
      {apiResponse && (
        <details>
          <summary className="cursor-pointer text-blue-600">API Response (click to expand)</summary>
          <pre className="mt-2 p-2 bg-gray-200 overflow-auto max-h-40">
            {JSON.stringify(apiResponse, null, 2)}
          </pre>
        </details>
      )}
    </div>
  );

  useEffect(() => {
    // Retrieve user data from location state or sessionStorage
    const userDataFromState = location.state?.userData;
    const userDataFromStorage = JSON.parse(sessionStorage.getItem('moodleUserData') || 'null');
      
    const user = userDataFromState || userDataFromStorage;

    if (user) {
      setUserData(user?.token);
      
      // Store user role if available
      if (user?.role) {
        setUserRole(user.role);
      } else {
        // If no role is stored, fetch the user's info to determine their role
        fetchUserInfo(user?.token);
      }
    }
  }, []);

  // Fetch current user's information to determine their role
  const fetchUserInfo = async (token) => {
    if (!token) return;

    try {
      const apiUrl = `https://lmsbackend.shiksak.com/webservice/rest/server.php?moodlewsrestformat=json&wsfunction=core_webservice_get_site_info&wstoken=${token}`;
      
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch user info: ${response.status}`);
      }
      
      const userInfo = await response.json();
      
      // Determine user role based on capabilities or userid
      // This is simplified - you might need to adjust based on your Moodle configuration
      if (userInfo.userid) {
        // For demo purposes, check if user has admin capabilities
        // You may need to fetch actual capabilities with another API call
      const isAdmin = userInfo.userissiteadmin || false;
      const role = isAdmin ? "admin" : "student";
      setUserRole(role);

        // Save this info for future use
        const updatedUserData = JSON.parse(sessionStorage.getItem('moodleUserData') || '{}');
      updatedUserData.role = role;
        sessionStorage.setItem('moodleUserData', JSON.stringify(updatedUserData));
      }
    } catch (err) {
      console.error("Error fetching user info:", err);
    }
  };

  const fetchData = async (tab) => {
    // Reset states
    setError(null);
    setData(null);
    setApiResponse(null);

    // Validate required params
    if (!userData) {
      setError("Authentication token is missing. Please log in again.");
      return;
    }
    
    if (!courseid) {
      setError("Course ID is missing. Please navigate to a valid course.");
      return;
    }

    setLoading(true);
    let wsfunction = "";
    let extraParams = `&courseid=${courseid}`;

      switch (tab) {
        case "Course":
        wsfunction = "core_course_get_contents";
          break;
        case "Participants":
        wsfunction = "core_enrol_get_enrolled_users";
          break;
        case "Grades":
        // Use different grade functions based on user role
        // For students, fetch only their own grades
        wsfunction = "gradereport_user_get_grades_table";
        // No need for userid param - it defaults to current user
          break;
        default:
        setError(`Unknown tab: ${tab}`);
          setLoading(false);
          return;
      }

    const apiUrl = `https://lmsbackend.shiksak.com/webservice/rest/server.php?moodlewsrestformat=json&wsfunction=${wsfunction}&wstoken=${userData}${extraParams}`;
    
    try {
      console.log(`Fetching ${tab} data from: ${apiUrl}`);
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      console.log(`${tab} data:`, result);
      
      // Check if the response contains an error
      if (result.exception || result.errorcode) {
        setError(`API Error: ${result.message || result.errorcode || "Unknown error"}`);
        setApiResponse(result); // Store the error response for debugging
        
        // Handle special case for grade permissions error
        if (tab === "Grades" && result.errorcode === "nopermissions") {
          // Fallback to user's own grades
          fetchOwnGrades();
        }
        return;
      }

      setApiResponse(result); // Store for debugging
      setData(result);
    } catch (err) {
      console.error(`Error fetching ${tab} data:`, err);
      setError(`Failed to fetch ${tab} data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Fallback function to get current user's own grades
  const fetchOwnGrades = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const apiUrl = `https://lmsbackend.shiksak.com/webservice/rest/server.php?moodlewsrestformat=json&wsfunction=gradereport_user_get_grade_items&wstoken=${userData}&courseid=${courseid}`;
      
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.exception || result.errorcode) {
        throw new Error(result.message || result.errorcode || "Unknown error");
      }
      
      setApiResponse(result);
      setData(result);
      setError(null); // Clear previous error
    } catch (err) {
      console.error("Error fetching own grades:", err);
      setError(`Failed to fetch your grades: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData) {
      fetchData(activeTab);
    }
  }, [activeTab, courseid, userData]);

  // Custom Grade Item Component
  const GradeItem = ({ item, isHeader = false }) => {
    // If it's a header row
    if (isHeader) {
      return (
        <div className="grid grid-cols-7 gap-4 py-3 px-4 bg-gray-100 font-medium rounded-t-lg">
          <div>Grade item</div>
          <div>Calculated weight</div>
          <div>Grade</div>
          <div>Range</div>
          <div>Percentage</div>
          <div>Feedback</div>
          <div>Contribution to course total</div>
        </div>
      );
    }

    // For aggregation/total rows
    if (item.itemtype === 'category' || item.itemtype === 'course') {
      return (
        <div className="grid grid-cols-7 gap-4 py-3 px-4 border-t border-gray-200 bg-gray-50">
          <div className="font-medium flex items-center">
            <span className="mr-2">Σ</span>
            {item.itemname || "Course total"}
          </div>
          <div>{item.weightformatted || "-"}</div>
          <div>{item.gradeformatted || "-"}</div>
          <div>{`0–${item.grademax || 100}`}</div>
          <div>{item.percentageformatted || "-"}</div>
          <div>{item.feedback || "-"}</div>
          <div>{item.contributiontocoursetotalformatted || "-"}</div>
        </div>
      );
    }
    
    // Regular grade items
    const itemTypeIcon = getItemTypeIcon(item.itemmodule || item.itemtype);
    
        return (
      <div className="grid grid-cols-7 gap-4 py-3 px-4 border-t border-gray-200 hover:bg-gray-50">
        <div className="flex items-center">
          <span className="mr-2">{itemTypeIcon}</span>
          <span>{item.itemname || "Unnamed item"}</span>
        </div>
        <div>{item.weightformatted || "-"}</div>
        <div>{item.gradeformatted || "-"}</div>
        <div>{`0–${item.grademax || 100}`}</div>
        <div>{item.percentageformatted || "-"}</div>
        <div>{item.feedback || "-"}</div>
        <div>{item.contributiontocoursetotalformatted || "-"}</div>
          </div>
        );
  };

  // Table format grade rendering for gradereport_user_get_grades_table response format
  const GradeTable = ({ tableData }) => {
    if (!tableData || !tableData.tables || tableData.tables.length === 0) {
      return <p>No grade data available.</p>;
    }

    const table = tableData.tables[0]; // Use the first table
    
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              {table.tabledata.header.map((header, idx) => (
                <th 
                  key={idx} 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50"
                  dangerouslySetInnerHTML={{ __html: header.content }}
                />
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.tabledata.rows.map((row, rowIdx) => (
              <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                {row.map((cell, cellIdx) => (
                  <td 
                    key={cellIdx} 
                    className="px-4 py-3 text-sm text-gray-900"
                    dangerouslySetInnerHTML={{ __html: cell.content }}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Helper function to get icons for different item types
  const getItemTypeIcon = (type) => {
    switch (type) {
      case 'lesson':
        return '📚';
      case 'assignment':
        return '📝';
      case 'quiz':
        return '❓';
      case 'forum':
        return '💬';
      default:
        return '📄';
    }
  };

  // Collapsible grade category (for better organization)
  const GradeCategory = ({ category, items }) => {
    const [isOpen, setIsOpen] = useState(true);
    
    return (
      <div className="border rounded-lg mb-4 overflow-hidden">
        <div 
          className="flex justify-between items-center p-3 bg-blue-50 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <h3 className="font-medium">{category}</h3>
          <button className="focus:outline-none">
            {isOpen ? '▼' : '►'}
          </button>
        </div>
        
        {isOpen && (
          <div className="bg-white">
            {items.map((item, idx) => (
              <GradeItem key={idx} item={item} />
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderContent = () => {
    if (loading) return <p className="mt-6 text-gray-600">Loading {activeTab}...</p>;
    if (error) return <p className="mt-6 text-red-600">{error}</p>;
    if (!data) return <p className="mt-6 text-gray-600">No data available.</p>;

    switch (activeTab) {
      case "Course":
        // Handle array or error object
        if (!Array.isArray(data)) {
          return <p className="mt-6 text-red-600">Unexpected data format for Course.</p>;
        }
        
        return (
          <div className="space-y-4 mt-6">
            {data.length > 0 ? (
              data.map((section, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h2 className="text-xl font-bold">{section.name || "Unnamed Section"}</h2>
                  {section.summary && (
                    <div className="mt-2 text-gray-600">{section.summary}</div>
                  )}
                  {section.modules && section.modules.length > 0 ? (
                    <div className="mt-3">
                      {section.modules.map((mod, idx) => (
                        <p key={idx} className="text-blue-600 mt-2 cursor-pointer">
                          📄 {mod.name || "Unnamed Module"}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 mt-2">No modules in this section</p>
                  )}
                </div>
              ))
            ) : (
              <p>No course content available.</p>
            )}
          </div>
        );

      case "Participants":
        if (!Array.isArray(data)) {
          return <p className="mt-6 text-red-600">Unexpected data format for Participants.</p>;
        }
        
        return (
          <div className="mt-6 space-y-2">
            {data.length > 0 ? (
              data.map((user, i) => (
                <div key={i} className="border p-2 rounded flex items-center">
                  <span className="mr-2">👤</span>
                  <div>
                    <div className="font-medium">{user.fullname || "Unknown User"}</div>
                    <div className="text-sm text-gray-500">
                      {user.roles && user.roles.length > 0 
                        ? `Role: ${user.roles[0].shortname || user.roles[0].name || "Unknown"}`
                        : "No role specified"}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No participants found.</p>
            )}
          </div>
        );

      case "Grades":
        // Check which API was used based on response structure
        if (data.tables) {
          // This is the gradereport_user_get_grades_table format
          return (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Your Course Grades</h2>
              <GradeTable tableData={data} />
              
              <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                <p className="text-sm">
                  <strong>Note:</strong> You're viewing your personal grade report. Only instructors can view all participants' grades.
                </p>
              </div>
            </div>
          );
        }
        
        // Check for gradereport_user_get_grade_items format
        if (data.usergrades && Array.isArray(data.usergrades)) {
          const userGrades = data.usergrades[0] || {};
          const gradeItems = userGrades.gradeitems || [];
          const courseTotal = gradeItems.find(item => item.itemtype === 'course') || {};
          const regularItems = gradeItems.filter(item => item.itemtype !== 'course');
          
          return (
            <div className="mt-6">
              <div className="flex items-center mb-6">
                <h2 className="text-xl font-semibold">Grades for {userGrades.userfullname || "Student"}</h2>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <GradeItem isHeader={true} item={{}} />
                
                <div className="divide-y divide-gray-200">
                  {regularItems.map((item, idx) => (
                    <GradeItem key={idx} item={item} />
                  ))}
                  
                  {/* Always show course total */}
                  <GradeItem 
                    item={courseTotal.itemname ? courseTotal : {
                      itemname: "Course total",
                      itemtype: "category",
                      gradeformatted: "-",
                      grademax: 200,
                      percentageformatted: "-",
                      feedback: "-",
                      contributiontocoursetotalformatted: "-",
                      weightformatted: "-"
                    }} 
                  />
                </div>
              </div>
              
              <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                <p className="text-sm">
                  <strong>Note:</strong> You're viewing your personal grade report. Only instructors can view all participants' grades.
                </p>
              </div>
            </div>
          );
        }
        
        // Fallback display if data format is unexpected
        return (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-6">Course Grades</h2>
            
            <div className="border rounded-lg overflow-hidden">
              <GradeItem isHeader={true} item={{}} />
              
              <div className="divide-y divide-gray-200">
                {/* Sample grade items */}
                <GradeItem item={{
                  itemname: "Assignment 1",
                  itemmodule: "assignment",
                  gradeformatted: "-",
                  grademax: 100,
                  percentageformatted: "-",
                  feedback: "-",
                  contributiontocoursetotalformatted: "-",
                  weightformatted: "-"
                }} />
                
                <GradeItem item={{
                  itemname: "Quiz 1",
                  itemmodule: "quiz",
                  gradeformatted: "-",
                  grademax: 100,
                  percentageformatted: "-",
                  feedback: "-",
                  contributiontocoursetotalformatted: "-",
                  weightformatted: "-"
                }} />
                
                {/* Course Total */}
                <GradeItem item={{
                  itemname: "Course total",
                  itemtype: "category",
                  gradeformatted: "-",
                  grademax: 200,
                  percentageformatted: "-",
                  feedback: "-",
                  contributiontocoursetotalformatted: "-",
                  weightformatted: "-"
                }} />
              </div>
            </div>
            
            <div className="mt-4 text-red-100 p-4 rounded-lg">
              <p className="text-sm">
                <strong>Note:</strong> Unable to load grade data. Please ensure you have the necessary permissions.
              </p>
            </div>
          </div>
        );

      default:
        return <p>Unknown tab</p>;
    }
  };

  const retryFetch = () => {
    fetchData(activeTab);
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-4">Course ID: {courseid || "Unknown"}</h1>
      
      {/* Debug Panel (toggle this for production) */}
      {/* <DebugInfo /> */}

      {/* Missing auth warning */}
      {!userData && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
          <p className="font-bold">Authentication Required</p>
          <p>No authentication token found. Please log in again to access course data.</p>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            
            onClick={() => setActiveTab(tab)}
              className={`pb-4 px-1 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-500 hover:text-gray-700 border-transparent"
              }`}
          >
            {tab}
          </button>
        ))}
        </nav>
      </div>

      {/* Content */}
      {renderContent()}

      {/* Error retry button */}
      {error && (
        <button 
          onClick={retryFetch}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default TabContent;