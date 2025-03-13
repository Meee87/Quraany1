// قائمة المقرئين
export type Reciter = {
  id: string;
  name: string;
  arabicName: string;
  country: string;
  style?: string; // نمط القراءة (حفص، ورش، إلخ)
  imageUrl?: string;
};

export const reciters: Reciter[] = [
  {
    id: "mishary",
    name: "Mishary Rashid Alafasy",
    arabicName: "مشاري راشد العفاسي",
    country: "الكويت",
    style: "حفص عن عاصم",
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=mishary",
  },
  {
    id: "sudais",
    name: "Abdurrahman As-Sudais",
    arabicName: "عبد الرحمن السديس",
    country: "المملكة العربية السعودية",
    style: "حفص عن عاصم",
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=sudais",
  },
  {
    id: "minshawi",
    name: "Mohamed Siddiq Al-Minshawi",
    arabicName: "محمد صديق المنشاوي",
    country: "مصر",
    style: "حفص عن عاصم",
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=minshawi",
  },
  {
    id: "husary",
    name: "Mahmoud Khalil Al-Husary",
    arabicName: "محمود خليل الحصري",
    country: "مصر",
    style: "حفص عن عاصم",
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=husary",
  },
  {
    id: "shuraim",
    name: "Saud Al-Shuraim",
    arabicName: "سعود الشريم",
    country: "المملكة العربية السعودية",
    style: "حفص عن عاصم",
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=shuraim",
  },
  {
    id: "ajmy",
    name: "Ahmed Al-Ajmy",
    arabicName: "أحمد العجمي",
    country: "المملكة العربية السعودية",
    style: "حفص عن عاصم",
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=ajmy",
  },
  {
    id: "ghamdi",
    name: "Saad Al-Ghamdi",
    arabicName: "سعد الغامدي",
    country: "المملكة العربية السعودية",
    style: "حفص عن عاصم",
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=ghamdi",
  },
  {
    id: "juhany",
    name: "Abdullah Al-Juhany",
    arabicName: "عبد الله الجهني",
    country: "المملكة العربية السعودية",
    style: "حفص عن عاصم",
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=juhany",
  },
  {
    id: "matroud",
    name: "Abdullah Matroud",
    arabicName: "عبد الله مطرود",
    country: "المملكة العربية السعودية",
    style: "حفص عن عاصم",
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=matroud",
  },
  {
    id: "basfar",
    name: "Abdullah Basfar",
    arabicName: "عبد الله بصفر",
    country: "المملكة العربية السعودية",
    style: "حفص عن عاصم",
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=basfar",
  },
];

// الحصول على مقرئ بواسطة المعرف
export const getReciterById = (id: string): Reciter | undefined => {
  return reciters.find((reciter) => reciter.id === id);
};
