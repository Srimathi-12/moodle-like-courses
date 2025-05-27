import React from 'react';

const GradesTab = (props) => {
  console.log("GradesTab received props:", props);

  const data = props.data || {};
  const tables = Array.isArray(data.tables) ? data.tables : [];

  return (
    <div className="p-4">
      <h2 className="text-lg font-medium mb-4">Grade Information</h2>

      {/* Debug Section */}
      <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
        <h3 className="font-medium mb-2">Debug Info:</h3>
        <p>Has data: {data ? "Yes" : "No"}</p>
        <p>Has tables: {Array.isArray(data.tables) ? "Yes" : "No"}</p>
        <p>Tables length: {tables.length}</p>
      </div>

      {/* Raw JSON Preview */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Raw Data:</h3>
        <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto max-h-96">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>

      {/* Render First Table if available */}
      {tables.length > 0 ? (
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-50 p-4 font-medium">
            Student: {tables[0]?.userfullname || "Unknown"}
          </div>

          <div className="p-4">
            <h3 className="font-medium mb-2">Grade Items:</h3>

            {Array.isArray(tables[0]?.tabledata) && tables[0].tabledata.length > 0 ? (
              tables[0].tabledata.map((item, index) => {
                // Case 1: Structured table with header and rows
                if (item?.header && Array.isArray(item?.rows)) {
                  const header = item.header;
                  const rows = item.rows;

                  return (
                    <div key={index} className="mb-4 p-3 border rounded">
                      <h4 className="font-medium mb-2">Item {index + 1}</h4>
                      <table className="w-full text-sm text-left border">
                        <thead className="bg-gray-200">
                          <tr>
                            {header.map((h, i) => (
                              <th key={i} className="p-2 border">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {rows.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                              {row.map((col, colIndex) => (
                                <td key={colIndex} className="p-2 border">{col}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                }

                // Case 2: Flat array of objects (e.g., row.itemname, row.leader, etc.)
                else if (Array.isArray(item) && item.length > 0 && typeof item[0] === "object") {
                  return (
                    <div key={index} className="mb-4 p-3 border rounded">
                      <h4 className="font-medium mb-2">Item {index + 1}</h4>
                      <table className="w-full text-sm text-left border">
                        <thead className="bg-gray-200">
                          <tr>
                            {Object.keys(item[0]).map((key, i) => (
                              <th key={i} className="p-2 border">{key}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {item.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                              {Object.values(row).map((val, valIndex) => (
                                <td key={valIndex} className="p-2 border">{val}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                }

                // Fallback: invalid structure
                else {
                  return (
                    <div key={index} className="mb-4 p-3 border rounded">
                      <h4 className="font-medium mb-2">Item {index + 1}</h4>
                      <p className="text-red-500">Invalid or missing table structure</p>
                    </div>
                  );
                }
              })
            ) : (
              <p className="text-gray-500">No grade items found.</p>
            )}
          </div>
        </div>
      ) : (
        <p>No student data available.</p>
      )}


    </div>
  );
};

export default GradesTab;
