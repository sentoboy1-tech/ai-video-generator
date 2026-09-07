import React, { useState } from 'react';

interface GenerationFormProps {
  onSubmit: (prompt: string, duration: number) => void;
  isLoading: boolean;
}

export default function GenerationForm({ onSubmit, isLoading }: GenerationFormProps) {
  const [prompt, setPrompt] = useState('');
  const [duration, setDuration] = useState(10);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSubmit(prompt, duration);
      setPrompt('');
      setDuration(10);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/10 backdrop-blur-md border border-purple-500/30 rounded-2xl p-8 shadow-xl"
    >
      <div className="space-y-6">
        {/* Prompt Input */}
        <div>
          <label htmlFor="prompt" className="block text-sm font-semibold text-white mb-3">
            Video Prompt
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the video you want to generate... (e.g., 'A serene landscape with mountains and waterfalls at sunset')"
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-purple-400/30 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            rows={4}
            disabled={isLoading}
          />
          <p className="text-xs text-purple-300 mt-2">
            Be descriptive and creative. The more detail, the better the result.
          </p>
        </div>

        {/* Duration Slider */}
        <div>
          <label htmlFor="duration" className="block text-sm font-semibold text-white mb-3">
            Video Duration: <span className="text-purple-300">{duration}s</span>
          </label>
          <input
            id="duration"
            type="range"
            min="5"
            max="60"
            step="5"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full h-2 bg-purple-400/30 rounded-lg appearance-none cursor-pointer accent-purple-500"
            disabled={isLoading}
          />
          <div className="flex justify-between text-xs text-purple-300 mt-2">
            <span>5s</span>
            <span>60s</span>
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                <span>Generating...</span>
              </>
            ) : (
              <>
                <span>✨</span>
                <span>Generate Video</span>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
