import { useState, useEffect, useRef } from "react";
import { getAudioUrl } from "@/data/quran-audio";

interface AudioPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  playbackRate: number;
  isLoading: boolean;
  error: string | null;
}

interface AudioPlayerControls {
  play: () => void;
  pause: () => void;
  toggle: () => void;
  stop: () => void;
  setVolume: (volume: number) => void;
  mute: () => void;
  unmute: () => void;
  toggleMute: () => void;
  setPlaybackRate: (rate: number) => void;
  seek: (time: number) => void;
  loadAudio: (reciterId: string, surahNumber: number) => void;
}

export function useAudioPlayer(): [AudioPlayerState, AudioPlayerControls] {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<AudioPlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    isMuted: false,
    playbackRate: 1,
    isLoading: false,
    error: null,
  });

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const updateTime = () => {
      setState((prev) => ({
        ...prev,
        currentTime: audio.currentTime,
      }));
    };

    const handleLoadedMetadata = () => {
      setState((prev) => ({
        ...prev,
        duration: audio.duration,
        isLoading: false,
      }));
    };

    const handleEnded = () => {
      setState((prev) => ({
        ...prev,
        isPlaying: false,
        currentTime: 0,
      }));
    };

    const handleError = () => {
      setState((prev) => ({
        ...prev,
        error: "Error loading audio",
        isLoading: false,
      }));
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audio.pause();
    };
  }, []);

  // Controls
  const controls: AudioPlayerControls = {
    play: () => {
      if (audioRef.current) {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
          setState((prev) => ({ ...prev, error: "Error playing audio" }));
        });
        setState((prev) => ({ ...prev, isPlaying: true }));
      }
    },
    pause: () => {
      if (audioRef.current) {
        audioRef.current.pause();
        setState((prev) => ({ ...prev, isPlaying: false }));
      }
    },
    toggle: () => {
      if (state.isPlaying) {
        controls.pause();
      } else {
        controls.play();
      }
    },
    stop: () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setState((prev) => ({ ...prev, isPlaying: false, currentTime: 0 }));
      }
    },
    setVolume: (volume: number) => {
      if (audioRef.current) {
        audioRef.current.volume = volume;
        setState((prev) => ({ ...prev, volume }));
      }
    },
    mute: () => {
      if (audioRef.current) {
        audioRef.current.muted = true;
        setState((prev) => ({ ...prev, isMuted: true }));
      }
    },
    unmute: () => {
      if (audioRef.current) {
        audioRef.current.muted = false;
        setState((prev) => ({ ...prev, isMuted: false }));
      }
    },
    toggleMute: () => {
      if (state.isMuted) {
        controls.unmute();
      } else {
        controls.mute();
      }
    },
    setPlaybackRate: (rate: number) => {
      if (audioRef.current) {
        audioRef.current.playbackRate = rate;
        setState((prev) => ({ ...prev, playbackRate: rate }));
      }
    },
    seek: (time: number) => {
      if (audioRef.current) {
        audioRef.current.currentTime = time;
        setState((prev) => ({ ...prev, currentTime: time }));
      }
    },
    loadAudio: (reciterId: string, surahNumber: number) => {
      if (audioRef.current) {
        const wasPlaying = state.isPlaying;
        if (wasPlaying) {
          audioRef.current.pause();
        }

        setState((prev) => ({ ...prev, isLoading: true, error: null }));

        try {
          const audioUrl = getAudioUrl(reciterId, surahNumber);
          console.log("Loading audio URL:", audioUrl);
          audioRef.current.src = audioUrl;
          audioRef.current.load();

          // Add event listener for successful loading
          const loadHandler = () => {
            console.log("Audio loaded successfully");
            setState((prev) => ({ ...prev, isLoading: false }));
            if (wasPlaying) {
              audioRef.current?.play().catch((error) => {
                console.error("Error playing audio:", error);
                setState((prev) => ({
                  ...prev,
                  error: "Error playing audio",
                  isPlaying: false,
                }));
              });
            }
            audioRef.current?.removeEventListener("loadeddata", loadHandler);
          };

          // Add event listener for loading errors
          const errorHandler = () => {
            console.error("Error loading audio");
            setState((prev) => ({
              ...prev,
              isLoading: false,
              error: "تعذر تحميل الصوت. يرجى المحاولة مرة أخرى.",
            }));
            audioRef.current?.removeEventListener("error", errorHandler);
          };

          audioRef.current.addEventListener("loadeddata", loadHandler);
          audioRef.current.addEventListener("error", errorHandler);
        } catch (error) {
          console.error("Error setting up audio:", error);
          setState((prev) => ({
            ...prev,
            isLoading: false,
            error: "حدث خطأ أثناء تحميل الصوت",
          }));
        }
      }
    },
  };

  return [state, controls];
}
