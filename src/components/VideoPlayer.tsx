import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoPlayerProps {
  src: string;
  title: string;
  onClose: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, title, onClose }) => {
  React.useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose} // Close on overlay click
    >
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-3xl aspect-video relative flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the player
      >
        <div className="flex justify-between items-center p-3 sm:p-4 border-b bg-slate-50">
          <h3 className="text-md sm:text-lg font-semibold text-gray-800 truncate pr-2">{title}</h3>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close video player" className="rounded-full">
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
        </div>
        <div className="flex-grow bg-black">
          <video 
            src={src} 
            controls 
            autoPlay 
            className="w-full h-full" 
            onError={(e) => {
              console.error("Video error:", e);
              // Optionally, you could show a user-friendly error message here
            }}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;