'use client';

import React, { useState } from 'react';
import GenerationForm from './components/generationform';
import VideoCard from './components/videocard';

interface VideoGeneration {
  id: string;
  prompt: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  videoUrl?: string;
  duration?: number;
  createdAt: Date;
  error?: string;
}

export default function App() {
  const [videos, setVideos] = useState<VideoGeneration[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateVideo = async (prompt: string, duration: number) => {
    const newVideo: VideoGeneration = {
      id: Date.now().toString(),
      prompt,
      status: 'processing',
      duration,
      createdAt: new Date(),
    };

    setVideos([newVideo, ...videos]);
    setIsLoading(true);

    try {
      // Replace with your AI API endpoint
      const response = await fetch('/api/generate-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, duration }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate video');
      }

      const data = await response.json();

      setVideos((prevVideos) =>
        prevVideos.map((v) =>
          v.id === newVideo.id
            ? {
                ...v,
                status: 'completed',
                videoUrl: data.videoUrl,
              }
            : v
        )
      );
    } catch (error) {
      setVideos((prevVideos) =>
        prevVideos.map((v) =>
          v.id === newVideo.id
            ? {
                ...v,
                status: 'failed',
                error: error instanceof Error ? error.message : 'Unknown error',
              }
            : v
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteVideo = (id: string) => {
    setVideos((prevVideos) => prevVideos.filter((v) => v.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-2">AI Video Generator</h1>
          <p className="text-purple-200">Transform your ideas into stunning videos with AI</p>
        </div>

        {/* Generation Form */}
        <div className="mb-12">
          <GenerationForm onSubmit={handleGenerateVideo} isLoading={isLoading} />
        </div>

        {/* Videos Grid */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Generated Videos</h2>
          {videos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-purple-300 text-lg">No videos generated yet. Create one to get started!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onDelete={() => handleDeleteVideo(video.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
