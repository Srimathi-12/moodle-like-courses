
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { initializeMoodleApi, loadMoodleConfig } from '@/services/moodle/config';
import { callMoodleApi } from '@/services/moodle/api';
import { toast } from 'sonner';
import { Loader2, ExternalLink } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface MoodleApiConfigProps {
  onConfigured: () => void;
}

const MoodleApiConfig: React.FC<MoodleApiConfigProps> = ({ onConfigured }) => {
  const [baseUrl, setBaseUrl] = useState('https://lms.shiksak.com');
  const [token, setToken] = useState('');
  const [isConfigured, setIsConfigured] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [diagnosticInfo, setDiagnosticInfo] = useState<string | null>(null);

  useEffect(() => {
    // Check if already configured
    const config = loadMoodleConfig();
    if (config) {
      setBaseUrl(config.baseUrl || 'https://lms.shiksak.com');
      setToken(config.token || '');
      if (config.baseUrl && config.token) {
        setIsConfigured(true);
        onConfigured();
      }
    }
  }, [onConfigured]);

  const testConnection = async (url: string, token: string): Promise<boolean> => {
    setIsTesting(true);
    setDiagnosticInfo(null);
    setError(null);
  
    try {
      const siteInfo = await callMoodleApi(url, token, 'core_webservice_get_site_info', {});
      console.log('Moodle connection successful:', siteInfo);
      setDiagnosticInfo(`Connection successful! Site name: ${siteInfo.sitename || 'Unknown'}`);
      return true;
    } catch (error) {
      console.error('Moodle connection test failed:', error);
  
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setDiagnosticInfo(`Diagnostic info: ${errorMessage}`);
  
      if (errorMessage.includes('CORS')) {
        setError('CORS Error: Your Moodle server needs to have CORS enabled for this domain. Contact your Moodle administrator.');
      } else if (errorMessage.includes('NetworkError') || errorMessage.includes('Failed to fetch')) {
        setError('Network Error: Cannot reach the Moodle server. Check your URL and internet connection.');
      } else if (errorMessage.includes('Invalid token')) {
        setError('Invalid Token: The provided web service token was rejected by the server.');
      } else {
        setError(`Connection failed: ${errorMessage}`);
      }
  
      return false;
    } finally {
      setIsTesting(false);
    }
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setDiagnosticInfo(null);
    
    // Validate URL format
    if (!baseUrl || !baseUrl.includes('://')) {
      setError('Please enter a valid Moodle URL (e.g., https://yourmoodle.example.com)');
      return;
    }
    
    // Validate token
    if (!token) {
      setError('Please enter your Moodle API token');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Format URL (remove trailing slash if present)
      const formattedUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
      
      // First initialize the API with the provided credentials
      initializeMoodleApi(formattedUrl, token);
      
      // Test the connection
      const connectionSuccessful = await testConnection(formattedUrl, token);
      
      if (connectionSuccessful) {
        setIsConfigured(true);
        toast.success('Moodle API configured successfully');
        onConfigured();
      } else {
        // Reset the config if connection failed
        localStorage.removeItem('moodleConfig');
      }
    } catch (error) {
      console.error('Failed to configure Moodle API:', error);
      if (error instanceof Error) {
        setError(`Configuration failed: ${error.message}`);
      } else {
        setError('Failed to configure Moodle API');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    localStorage.removeItem('moodleConfig');
    setIsConfigured(false);
    setBaseUrl('https://lms.shiksak.com');
    setToken('');
    setError(null);
    setDiagnosticInfo(null);
    toast.info('Moodle API configuration reset');
  };

  const handleSimpleTest = async () => {
    if (!baseUrl || !token) {
      setError('Please enter both URL and token before testing');
      return;
    }
    
    const formattedUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    initializeMoodleApi(formattedUrl, token);
    await testConnection(formattedUrl, token);
  };

  if (isConfigured) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Moodle API Configured</CardTitle>
          <CardDescription>Your Moodle connection is active</CardDescription>
        </CardHeader>
        <CardContent>
          {diagnosticInfo && (
            <Alert className="mb-4">
              <AlertDescription>{diagnosticInfo}</AlertDescription>
            </Alert>
          )}
          <div className="text-sm text-gray-500 mb-4">
            <p>Connected to: {baseUrl}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleReset}>Reset Configuration</Button>
          <Button variant="secondary" onClick={handleSimpleTest} disabled={isTesting}>
            {isTesting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Test Connection'}
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connect to Moodle</CardTitle>
        <CardDescription>Enter your Moodle instance details</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Connection Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {diagnosticInfo && (
          <Alert className="mb-4">
            <AlertDescription>{diagnosticInfo}</AlertDescription>
          </Alert>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="baseUrl" className="text-sm font-medium">
              Moodle URL
            </label>
            <Input 
              id="baseUrl"
              type="url" 
              placeholder="https://yourmoodle.example.com" 
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              disabled={isLoading}
              required
            />
            <p className="text-xs text-gray-500">
              Enter the full URL to your Moodle site (e.g., https://lms.shiksak.com)
            </p>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="token" className="text-sm font-medium">
              API Token
            </label>
            <Input 
              id="token"
              type="password" 
              placeholder="Your Moodle Web Service Token" 
              value={token}
              onChange={(e) => setToken(e.target.value)}
              disabled={isLoading}
              required
            />
            <p className="text-xs text-gray-500">
              You can generate a token in Site Administration → Server → Web Services → Tokens
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button 
              type="submit" 
              className="flex-1" 
              disabled={isLoading || isTesting}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                'Connect to Moodle'
              )}
            </Button>
            
            <Button 
              type="button"
              variant="outline"
              onClick={handleSimpleTest}
              disabled={isLoading || isTesting}
            >
              {isTesting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Testing...
                </>
              ) : (
                'Test Only'
              )}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <h3 className="text-sm font-medium mb-2">Common Connection Issues:</h3>
          <ul className="text-xs text-gray-500 space-y-1 list-disc pl-4">
            <li>CORS is not enabled on your Moodle server - most common issue</li>
            <li>Web Services are not properly configured on your Moodle site</li>
            <li>Your token doesn't have the necessary permissions</li>
            <li>The protocol in the URL is incorrect (http vs https)</li>
          </ul>
          
          <div className="mt-3">
            <h3 className="text-sm font-medium mb-1">For Shiksak Moodle (lms.shiksak.com):</h3>
            <p className="text-xs text-gray-500">
              Contact your administrator to enable CORS for this domain, or access through the native Moodle mobile app.
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Alternatively, you might need to use a CORS proxy to access the API.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodleApiConfig;

