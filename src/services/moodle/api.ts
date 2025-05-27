import { toast } from 'sonner';
import { getConfig } from './config';

/**
 * Generic function to make Moodle API requests
 */
export const callMoodleApi = async <T>(wsfunction: string, params: Record<string, any> = {}): Promise<T> => {
  const config = getConfig();
  
  // Validate configuration
  if (!config.baseUrl || !config.token) {
    throw new Error('Moodle API not configured. Please initialize first.');
  }

  const url = new URL(`${config.baseUrl}webservice/rest/server.php`);
  
  // Common parameters
  const requestParams = {
    wstoken: config.token,
    wsfunction,
    moodlewsrestformat: 'json',
    ...params
  };
  
  // Add all parameters to URL
  Object.keys(requestParams).forEach(key => 
    url.searchParams.append(key, requestParams[key])
  );

  try {
    console.log('Connecting to Moodle API:', url.toString().replace(/wstoken=([^&]*)/, 'wstoken=****'));
    
    // First try with CORS mode
    let response;
    try {
      response = await fetch(url.toString(), {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
    } catch (corsError) {
      console.error('CORS request failed, trying with no-cors mode:', corsError);
      // If CORS fails, try with no-cors as fallback (limited functionality)
      response = await fetch(url.toString(), {
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    if (!response.ok) {
      // Handle different HTTP status codes
      let errorMessage = '';
      
      switch (response.status) {
        case 403:
          errorMessage = 'Access forbidden. Your token may not have the required permissions.';
          break;
        case 404:
          errorMessage = 'API endpoint not found. Please check your Moodle URL.';
          break;
        case 401:
          errorMessage = 'Unauthorized. Your token may be invalid or expired.';
          break;
        default:
          const errorText = await response.text();
          console.error('HTTP error response:', errorText);
          errorMessage = `HTTP error ${response.status}: ${errorText}`;
      }
      
      throw new Error(errorMessage);
    }
    
    // Handle special case for no-cors mode which doesn't allow reading the response
    if (response.type === 'opaque') {
      console.warn('Response is opaque due to no-cors mode. Cannot read content.');
      throw new Error('CORS issue detected. Your Moodle server may not allow cross-origin requests from this app.');
    }
    
    const data = await response.json();
    
    // Check for Moodle exception
    if (data.exception) {
      console.error('Moodle API error:', data);
      throw new Error(`Moodle API error: ${data.message || data.exception}`);
    }
    
    return data as T;
  } catch (error) {
    console.error('Moodle API call failed:', error);

    // Provide more specific error messages based on error type
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      toast.error('Network error: Could not connect to Moodle. Check your URL and network connection.');
    } else if (error instanceof TypeError && error.message.includes('NetworkError')) {
      toast.error('CORS error: Your Moodle server does not allow requests from this app. Contact your Moodle administrator to enable CORS.');
    } else if (error instanceof Error && error.message.includes('CORS')) {
      toast.error('CORS policy blocked connection. Your Moodle server needs CORS enabled for this domain.');
    } else if (error instanceof Error) {
      toast.error(`Moodle API error: ${error.message}`);
    } else {
      toast.error('Failed to connect to Moodle');
    }
    
    throw error;
  }
};
