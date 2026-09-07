import React from 'react';

interface Video {
  id: string;
  prompt: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  videoUrl?: string;
  duration?: number;
  createdAt: Date;
  error?: string;
}

interface VideoCardProps {
  video: Video;
  onDelete: () => void;
}

export default function VideoCard({ video, onDelete }: VideoCardProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-400';
      case 'processing':
        return 'text-yellow-400';
      case 'failed':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return '✓';
      case 'processing':
        return '⟳';
      case 'failed':
        return '✕';
      default:
        return '○';
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-purple-500/30 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200 group">
      {/* Video Preview */}
      <div className="relative bg-black/40 aspect-video flex items-center justify-center overflow-hidden">
        {video.videoUrl ? (
          <video
            src={video.videoUrl}
            controls
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full">
            {video.status === 'processing' && (
              <>
                <div className="animate-spin h-12 w-12 border-4 border-purple-500 border-t-pink-500 rounded-full mb-3"></div>
                <p className="text-purple-300 text-sm">Generating video...</p>
              </>
            )}
            {video.status === 'failed' && (
              <>
                <div className="text-4xl mb-3">���️</div>
                <p className="text-red-300 text-sm text-center px-4">{video.error || 'Failed to generate'}</p>
              </>
            )}
            {video.status === 'pending' && (
              <>
                <div className="text-4xl mb-3">⏳</div>
                <p className="text-gray-300 text-sm">Pending...</p>
              </>
            )}
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 space-y-3">
        {/* Status */}
        <div className="flex items-center gap-2">
          <span className={`${getStatusColor(video.status)} font-semibold text-sm flex items-center gap-1`}>
            <span>{getStatusIcon(video.status)}</span>
            {video.status.charAt(0).toUpperCase() + video.status.slice(1)}
          </span>
          {video.duration && (
            <span className="text-xs text-purple-300 bg-purple-500/20 px-2 py-1 rounded">
              {video.duration}s
            </span>
          )}
        </div>

        {/* Prompt */}
        <p className="text-sm text-white/80 line-clamp-3 leading-relaxed">
          {video.prompt}
        </p>

        {/* Date */}
        <p className="text-xs text-purple-300/60">
          {formatDate(video.createdAt)}
        </p>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          {video.videoUrl && (
            <a
              href={video.videoUrl}
              download
              className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white text-xs font-semibold py-2 px-3 rounded transition-all duration-200 text-center"
            >
              Download
            </a>
          )}
          <button
            onClick={onDelete}
            className="flex-1 bg-red-600/50 hover:bg-red-600 text-white text-xs font-semibold py-2 px-3 rounded transition-all duration-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
