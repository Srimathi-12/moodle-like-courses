const API_BASE_URL = "https://lmsbackend.shiksak.com/webservice/rest/server.php";

/**
 * Get user information from the Moodle API
 * @param {string} token - The user's authentication token
 * @returns {Promise<Object>} User information object
 */
export const getUserInfo = async (token) => {
  if (!token) throw new Error("Missing auth token");
  
  const url = `${API_BASE_URL}?moodlewsrestformat=json&wsfunction=core_webservice_get_site_info&wstoken=${token}`;
  
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch user info");
  
  return response.json();
};

/**
 * Fetch course content data
 * @param {string} token - The user's authentication token
 * @param {number|string} courseid - The course ID to fetch data for
 * @returns {Promise<Object>} Course content data
 */
export const getCourseContents = async (token, courseid) => {
  if (!token) throw new Error("Missing auth token");
  if (!courseid) throw new Error("Missing course ID");
  
  const url = `${API_BASE_URL}?moodlewsrestformat=json&wsfunction=core_course_get_contents&wstoken=${token}&courseid=${courseid}`;
  
  const response = await fetch(url);
  return response.json();
};

/**
 * Fetch enrolled users for a course
 * @param {string} token - The user's authentication token
 * @param {number|string} courseid - The course ID to fetch participants for
 * @returns {Promise<Array>} Array of enrolled users
 */
export const getEnrolledUsers = async (token, courseid) => {
  if (!token) throw new Error("Missing auth token");
  if (!courseid) throw new Error("Missing course ID");
  
  const url = `${API_BASE_URL}?moodlewsrestformat=json&wsfunction=core_enrol_get_enrolled_users&wstoken=${token}&courseid=${courseid}`;
  
  const response = await fetch(url);
  return response.json();
};

/**
 * Fetch grade data for a course
 * @param {string} token - The user's authentication token
 * @param {number|string} courseid - The course ID to fetch grades for
 * @returns {Promise<Object>} Grade data
 */
export const getGradesTable = async (token, courseid) => {
  if (!token) throw new Error("Missing auth token");
  if (!courseid) throw new Error("Missing course ID");
  
  const url = `${API_BASE_URL}?moodlewsrestformat=json&wsfunction=gradereport_user_get_grades_table&wstoken=${token}&courseid=${courseid}`;
  
  const response = await fetch(url);
  console.log(response, "responsessssss");
  return response.json();
};

/**
 * Parse error message from Moodle API response
 * @param {Object} result - API response containing error data
 * @returns {string} User-friendly error message
 */
export const parseErrorMessage = (result) => {
  if (!result) return "Unknown error";
  
  if (result.errorcode === "notingroup") {
    return "You are not in any group that has access to this content.";
  } else if (result.errorcode === "nopermissions") {
    return "You don't have permission to view this content.";
  }
  
  return result.message || `API Error: ${result.errorcode || "Unknown error"}`;
};

export default {
  getUserInfo,
  getCourseContents,
  getEnrolledUsers,
  getGradesTable,
  parseErrorMessage
};