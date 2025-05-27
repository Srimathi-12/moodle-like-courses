
import { toast } from 'sonner';

// API Configuration
export interface MoodleConfig {
  baseUrl: string;
  token: string;
}

// Store configuration
let config: MoodleConfig = {
  baseUrl: '',
  token: ''
};

/**
 * Initialize the Moodle API with base URL and token
 */
export const initializeMoodleApi = (baseUrl: string, token: string) => {
  config.baseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  config.token = token;
  
  // Save to localStorage for persistence
  localStorage.setItem('moodleConfig', JSON.stringify(config));
  
  return config;
};

/**
 * Load configuration from localStorage if exists
 */
export const loadMoodleConfig = (): boolean => {
  const savedConfig = localStorage.getItem('moodleConfig');
  
  if (savedConfig) {
    config = JSON.parse(savedConfig);
    return true;
  }
  
  return false;
};

/**
 * Get the current configuration
 * @internal Used by other modules
 */
export const getConfig = (): MoodleConfig => {
  return { ...config };
};
