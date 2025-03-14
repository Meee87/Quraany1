export interface ReciterAudio {
  id: string;
  baseUrl: string;
  audioType: string;
}

export const recitersAudio: Record<string, ReciterAudio> = {
  mishary: {
    id: "mishary",
    baseUrl: "https://server8.mp3quran.net/afs",
    audioType: "mp3",
  },
  sudais: {
    id: "sudais",
    baseUrl: "https://server11.mp3quran.net/sds",
    audioType: "mp3",
  },
  minshawi: {
    id: "minshawi",
    baseUrl: "https://server13.mp3quran.net/minsh",
    audioType: "mp3",
  },
  husary: {
    id: "husary",
    baseUrl: "https://server7.mp3quran.net/husr",
    audioType: "mp3",
  },
  shuraim: {
    id: "shuraim",
    baseUrl: "https://server10.mp3quran.net/shr",
    audioType: "mp3",
  },
  ajmy: {
    id: "ajmy",
    baseUrl: "https://server8.mp3quran.net/ahmad_huth",
    audioType: "mp3",
  },
  ghamdi: {
    id: "ghamdi",
    baseUrl: "https://server7.mp3quran.net/s_gmd",
    audioType: "mp3",
  },
  juhany: {
    id: "juhany",
    baseUrl: "https://server8.mp3quran.net/jhn",
    audioType: "mp3",
  },
  matroud: {
    id: "matroud",
    baseUrl: "https://server11.mp3quran.net/matrood",
    audioType: "mp3",
  },
  basfar: {
    id: "basfar",
    baseUrl: "https://server7.mp3quran.net/basfer",
    audioType: "mp3",
  },
};

// Get audio URL for a specific surah by a specific reciter
export const getAudioUrl = (reciterId: string, surahNumber: number): string => {
  const reciter = recitersAudio[reciterId];
  if (!reciter) return "";

  // Format surah number with leading zeros (e.g., 001, 002, etc.)
  const formattedSurahNumber = surahNumber.toString().padStart(3, "0");

  return `${reciter.baseUrl}/${formattedSurahNumber}.${reciter.audioType}`;
};
