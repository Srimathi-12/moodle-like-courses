import { useLocation } from 'react-router-dom';

function SectionPage() {
  const location = useLocation();
  const section = location.state?.section;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-2">Section Page</h1>
      {section ? (
        <>
          <p className="text-lg">
            You selected: <strong>{section.name}</strong>
          </p>
          {/* You can also display more section details here */}
        </>
      ) : (
        <p>No section data found.</p>
      )}
    </div>
  );
}

export default SectionPage;
