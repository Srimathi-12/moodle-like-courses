import { useState } from "react";

const DebugInfo = ({ courseid, userData, userRole, activeTab, loading, error, apiResponse }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-4 text-sm">
      <div className="flex justify-between items-center">
        <h3 className="font-bold">Debug Information:</h3>
        <button 
          onClick={() => setExpanded(!expanded)}
          className="text-blue-600 text-xs underline"
        >
          {expanded ? "Hide details" : "Show details"}
        </button>
      </div>
      
      {expanded && (
        <>
          <p>Course ID: {courseid || "Not available"}</p>
          <p>Token Available: {userData ? "Yes" : "No"}</p>
          <p>User Role: {userRole}</p>
          <p>Selected Tab: {activeTab}</p>
          <p>Loading: {loading ? "Yes" : "No"}</p>
          <p>Error: {error || "None"}</p>
          {apiResponse && (
            <details>
              <summary className="cursor-pointer text-blue-600">API Response (click to expand)</summary>
              <pre className="mt-2 p-2 bg-gray-200 overflow-auto max-h-40">
                {JSON.stringify(apiResponse, null, 2)}
              </pre>
            </details>
          )}
        </>
      )}
    </div>
  );
};

export default DebugInfo;