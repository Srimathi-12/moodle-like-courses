import { useNavigate } from 'react-router-dom';


interface Module {
  id: number;
  name: string;
  modname: string;
  description?: string;
  url?: string;
  contents?: any[];
}

interface Section {
  id: number;
  name: string;
  summary?: string;
  modules?: Module[];
}

interface CourseTabProps {
  data: Section[];
}

function cleanSummary(summary) {
  if (!summary || typeof summary !== 'string') return '';
  const htmlStart = summary.indexOf('<');
  return htmlStart !== -1 ? summary.slice(htmlStart) : '';
}
const navigate = useNavigate();


const CourseTab: React.FC<CourseTabProps> = ({ data }) => {
  if (!data || !Array.isArray(data)) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-700">Invalid course data format</p>
      </div>
    );
  }
  const handleClick = () => {
    // Navigate to /section and send section/module data via route state
    navigate('student/section', { state: { section: data } });
  };



  return (
    <div className="mt-4 border rounded-lg p-4">
      <h3 className="text-lg font-medium mb-3">Course Contents</h3>
      {data.length === 0 ? (
        <p>No course content available.</p>
      ) : (
            <div className="space-y-4">
          {data.map((section, index) => (
            <div key={index} className="border rounded-lg p-3">
              <h4 className="font-medium">{section.name}</h4>
              {section.summary && (
                <div
                  className="mt-2 text-sm text-gray-600"
                  dangerouslySetInnerHTML={{ __html: cleanSummary(section.summary) }}
                />
              )}


              {section.modules && section.modules.length > 0 ? (
                <ul className="mt-3 space-y-2">
                  {section.modules.map((module, moduleIndex) => (
                    <li key={moduleIndex} className="pl-4 border-l-2 border-gray-200">
                      <div className="flex items-center"  onClick={() => navigate('/studentDetail/section', { state: { section: module } })}>
                        <span className="mr-2">{getModuleIcon(module.modname)}</span>
                        <span className="font-medium">{module.name}</span>
                      </div>
                      {module.description && (
                        <div className="mt-1 text-sm text-gray-600 pl-6"
                          dangerouslySetInnerHTML={{ __html: module.description }}
                        />
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-sm text-gray-500">No modules in this section</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Helper function to get module type icon
const getModuleIcon = (type: string): string => {
  switch (type) {
    case "quiz":
      return "📝";
    case "assign":
      return "📄";
    case "forum":
      return "💬";
    case "resource":
      return "📎";
    case "url":
      return "🔗";
    case "page":
      return "📃";
    case "book":
      return "📚";
    default:
      return "📌";
  }
};

export default CourseTab;