// This file contains sample text for a few surahs
// In a real application, you would fetch this from an API
import { quranSurahs } from "./quran-surahs";

export interface Ayah {
  number: number;
  text: string;
  translation?: string;
}

export interface SurahText {
  id: number;
  name: string;
  ayahs: Ayah[];
}

export const surahTexts: Record<number, SurahText> = {
  1: {
    id: 1,
    name: "الفاتحة",
    ayahs: [
      { number: 1, text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ" },
      { number: 2, text: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ" },
      { number: 3, text: "الرَّحْمَٰنِ الرَّحِيمِ" },
      { number: 4, text: "مَالِكِ يَوْمِ الدِّينِ" },
      { number: 5, text: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ" },
      { number: 6, text: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ" },
      {
        number: 7,
        text: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
      },
    ],
  },
  2: {
    id: 2,
    name: "البقرة",
    ayahs: [
      { number: 1, text: "الم" },
      {
        number: 2,
        text: "ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ",
      },
      {
        number: 3,
        text: "الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ",
      },
      {
        number: 4,
        text: "وَالَّذِينَ يُؤْمِنُونَ بِمَا أُنزِلَ إِلَيْكَ وَمَا أُنزِلَ مِن قَبْلِكَ وَبِالْآخِرَةِ هُمْ يُوقِنُونَ",
      },
      {
        number: 5,
        text: "أُولَٰئِكَ عَلَىٰ هُدًى مِّن رَّبِّهِمْ ۖ وَأُولَٰئِكَ هُمُ الْمُفْلِحُونَ",
      },
      // Add more ayahs as needed
    ],
  },
  36: {
    id: 36,
    name: "يس",
    ayahs: [
      { number: 1, text: "يس" },
      { number: 2, text: "وَالْقُرْآنِ الْحَكِيمِ" },
      { number: 3, text: "إِنَّكَ لَمِنَ الْمُرْسَلِينَ" },
      { number: 4, text: "عَلَىٰ صِرَاطٍ مُّسْتَقِيمٍ" },
      { number: 5, text: "تَنزِيلَ الْعَزِيزِ الرَّحِيمِ" },
      // Add more ayahs as needed
    ],
  },
  67: {
    id: 67,
    name: "الملك",
    ayahs: [
      {
        number: 1,
        text: "تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
      },
      {
        number: 2,
        text: "الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا ۚ وَهُوَ الْعَزِيزُ الْغَفُورُ",
      },
      {
        number: 3,
        text: "الَّذِي خَلَقَ سَبْعَ سَمَاوَاتٍ طِبَاقًا ۖ مَّا تَرَىٰ فِي خَلْقِ الرَّحْمَٰنِ مِن تَفَاوُتٍ ۖ فَارْجِعِ الْبَصَرَ هَلْ تَرَىٰ مِن فُطُورٍ",
      },
      {
        number: 4,
        text: "ثُمَّ ارْجِعِ الْبَصَرَ كَرَّتَيْنِ يَنقَلِبْ إِلَيْكَ الْبَصَرُ خَاسِئًا وَهُوَ حَسِيرٌ",
      },
      {
        number: 5,
        text: "وَلَقَدْ زَيَّنَّا السَّمَاءَ الدُّنْيَا بِمَصَابِيحَ وَجَعَلْنَاهَا رُجُومًا لِّلشَّيَاطِينِ ۖ وَأَعْتَدْنَا لَهُمْ عَذَابَ السَّعِيرِ",
      },
      // Add more ayahs as needed
    ],
  },
  112: {
    id: 112,
    name: "الإخلاص",
    ayahs: [
      { number: 1, text: "قُلْ هُوَ اللَّهُ أَحَدٌ" },
      { number: 2, text: "اللَّهُ الصَّمَدُ" },
      { number: 3, text: "لَمْ يَلِدْ وَلَمْ يُولَدْ" },
      { number: 4, text: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ" },
    ],
  },
};

// Function to get surah text by ID
export const getSurahText = (surahId: number): SurahText | null => {
  // If we have the surah text, return it
  if (surahTexts[surahId]) {
    return surahTexts[surahId];
  }

  // If we don't have the text, create a placeholder with a message
  // This ensures we always return something even if the surah isn't in our data
  return {
    id: surahId,
    name: quranSurahs.find((s) => s.id === surahId)?.name || `سورة ${surahId}`,
    ayahs: [
      {
        number: 1,
        text: "لم يتم تحميل نص السورة بعد. يرجى الانتظار أو تحديث الصفحة.",
      },
    ],
  };
};
