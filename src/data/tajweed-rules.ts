export interface TajweedExample {
  text: string;
  rule: string;
  description: string;
  audioUrl?: string;
}

export interface TajweedLesson {
  id: number;
  title: string;
  duration: string;
  level: string;
  completed: boolean;
  videoUrl?: string;
  description?: string;
}

export interface TajweedRule {
  id: number;
  name: string;
  progress: number;
  lessons: number;
  completed: number;
  description: string;
  subLessons: TajweedLesson[];
  examples: TajweedExample[];
}

export const tajweedRules: TajweedRule[] = [
  {
    id: 1,
    name: "النون الساكنة والتنوين",
    progress: 80,
    lessons: 5,
    completed: 4,
    description:
      "أحكام النون الساكنة والتنوين هي من أهم أحكام التجويد وتنقسم إلى أربعة أقسام: الإظهار، الإدغام، الإقلاب، والإخفاء.",
    subLessons: [
      {
        id: 101,
        title: "الإظهار",
        duration: "8 دقائق",
        level: "مبتدئ",
        completed: true,
      },
      {
        id: 102,
        title: "الإدغام بغنة",
        duration: "10 دقائق",
        level: "مبتدئ",
        completed: true,
      },
      {
        id: 103,
        title: "الإدغام بغير غنة",
        duration: "7 دقائق",
        level: "مبتدئ",
        completed: true,
      },
      {
        id: 104,
        title: "الإقلاب",
        duration: "5 دقائق",
        level: "مبتدئ",
        completed: true,
      },
      {
        id: 105,
        title: "الإخفاء الحقيقي",
        duration: "12 دقائق",
        level: "متوسط",
        completed: false,
      },
    ],
    examples: [
      {
        text: "مِنْ بَعْدِ",
        rule: "إقلاب",
        description: "تقلب النون الساكنة إلى ميم مخفاة عند الباء",
      },
      {
        text: "مِنْ قَبْلِ",
        rule: "إخفاء",
        description: "تخفى النون الساكنة عند حروف الإخفاء",
      },
      {
        text: "مَنْ يَعْمَلْ",
        rule: "إدغام بغنة",
        description: "تدغم النون الساكنة في الياء مع الغنة",
      },
    ],
  },
  {
    id: 2,
    name: "الميم الساكنة",
    progress: 60,
    lessons: 3,
    completed: 2,
    description:
      "للميم الساكنة ثلاثة أحكام: الإخفاء الشفوي، الإدغام الشفوي، والإظهار الشفوي.",
    subLessons: [
      {
        id: 201,
        title: "الإخفاء الشفوي",
        duration: "8 دقائق",
        level: "مبتدئ",
        completed: true,
      },
      {
        id: 202,
        title: "الإدغام الشفوي",
        duration: "7 دقائق",
        level: "مبتدئ",
        completed: true,
      },
      {
        id: 203,
        title: "الإظهار الشفوي",
        duration: "6 دقائق",
        level: "مبتدئ",
        completed: false,
      },
    ],
    examples: [
      {
        text: "هُمْ بِالْآخِرَةِ",
        rule: "إخفاء شفوي",
        description: "تخفى الميم الساكنة عند الباء",
      },
      {
        text: "وَلَكُمْ مَا",
        rule: "إدغام شفوي",
        description: "تدغم الميم الساكنة في الميم",
      },
      {
        text: "كُنْتُمْ تَعْلَمُونَ",
        rule: "إظهار شفوي",
        description: "تظهر الميم الساكنة عند باقي الحروف",
      },
    ],
  },
  {
    id: 3,
    name: "المدود",
    progress: 40,
    lessons: 7,
    completed: 3,
    description:
      "المدود هي إطالة الصوت بحرف من حروف المد الثلاثة: الألف الساكنة المفتوح ما قبلها، والواو الساكنة المضموم ما قبلها، والياء الساكنة المكسور ما قبلها.",
    subLessons: [
      {
        id: 301,
        title: "المد الطبيعي",
        duration: "8 دقائق",
        level: "مبتدئ",
        completed: true,
      },
      {
        id: 302,
        title: "المد المتصل",
        duration: "10 دقائق",
        level: "متوسط",
        completed: true,
      },
      {
        id: 303,
        title: "المد المنفصل",
        duration: "9 دقائق",
        level: "متوسط",
        completed: true,
      },
      {
        id: 304,
        title: "المد اللازم",
        duration: "12 دقائق",
        level: "متقدم",
        completed: false,
      },
      {
        id: 305,
        title: "المد العارض للسكون",
        duration: "10 دقائق",
        level: "متوسط",
        completed: false,
      },
      {
        id: 306,
        title: "مد الصلة",
        duration: "7 دقائق",
        level: "متوسط",
        completed: false,
      },
      {
        id: 307,
        title: "مد البدل",
        duration: "6 دقائق",
        level: "متوسط",
        completed: false,
      },
    ],
    examples: [
      {
        text: "قَالَ",
        rule: "مد طبيعي",
        description: "مد الألف الساكنة المفتوح ما قبلها حركتين",
      },
      {
        text: "السَّمَاءِ",
        rule: "مد متصل",
        description: "مد واجب 4-5 حركات لاتصال حرف المد بالهمزة في كلمة واحدة",
      },
      {
        text: "بِمَا أُنزِلَ",
        rule: "مد منفصل",
        description: "مد جائز 4-5 حركات لانفصال حرف المد عن الهمزة في كلمتين",
      },
    ],
  },
  {
    id: 4,
    name: "القلقلة",
    progress: 20,
    lessons: 4,
    completed: 1,
    description:
      "القلقلة هي اضطراب المخرج عند النطق بالحرف الساكن حتى يسمع له نبرة قوية، وحروفها خمسة مجموعة في عبارة (قطب جد).",
    subLessons: [
      {
        id: 401,
        title: "تعريف القلقلة وحروفها",
        duration: "6 دقائق",
        level: "مبتدئ",
        completed: true,
      },
      {
        id: 402,
        title: "القلقلة الصغرى",
        duration: "8 دقائق",
        level: "متوسط",
        completed: false,
      },
      {
        id: 403,
        title: "القلقلة الوسطى",
        duration: "7 دقائق",
        level: "متوسط",
        completed: false,
      },
      {
        id: 404,
        title: "القلقلة الكبرى",
        duration: "9 دقائق",
        level: "متقدم",
        completed: false,
      },
    ],
    examples: [
      {
        text: "يَخْلُقُ",
        rule: "قلقلة صغرى",
        description: "قلقلة حرف القاف الساكن في وسط الكلمة",
      },
      {
        text: "الْفَلَقِ",
        rule: "قلقلة كبرى",
        description: "قلقلة حرف القاف الساكن في آخر الكلمة عند الوقف",
      },
      {
        text: "أَحَدٌ",
        rule: "قلقلة كبرى",
        description: "قلقلة حرف الدال الساكن في آخر الكلمة عند الوقف",
      },
    ],
  },
  {
    id: 5,
    name: "الراءات",
    progress: 0,
    lessons: 3,
    completed: 0,
    description:
      "أحكام الراء تشمل تفخيمها وترقيقها حسب حركتها وحركة ما قبلها وموقعها من الكلمة.",
    subLessons: [
      {
        id: 501,
        title: "تفخيم الراء",
        duration: "9 دقائق",
        level: "متوسط",
        completed: false,
      },
      {
        id: 502,
        title: "ترقيق الراء",
        duration: "8 دقائق",
        level: "متوسط",
        completed: false,
      },
      {
        id: 503,
        title: "جواز الوجهين في الراء",
        duration: "7 دقائق",
        level: "متقدم",
        completed: false,
      },
    ],
    examples: [
      { text: "رَبِّ", rule: "تفخيم", description: "تفخم الراء المفتوحة" },
      { text: "كَرِيمٌ", rule: "ترقيق", description: "ترقق الراء المكسورة" },
      {
        text: "مِصْرَ",
        rule: "تفخيم",
        description: "تفخم الراء المفتوحة المسبوقة بحرف ساكن قبله حرف مكسور",
      },
    ],
  },
  {
    id: 6,
    name: "اللام الساكنة",
    progress: 0,
    lessons: 2,
    completed: 0,
    description:
      "اللام الساكنة لها حكمان: التفخيم والترقيق، وتفخم في لفظ الجلالة (الله) إذا سبقت بفتح أو ضم، وترقق إذا سبقت بكسر.",
    subLessons: [
      {
        id: 601,
        title: "تفخيم اللام",
        duration: "7 دقائق",
        level: "مبتدئ",
        completed: false,
      },
      {
        id: 602,
        title: "ترقيق اللام",
        duration: "6 دقائق",
        level: "مبتدئ",
        completed: false,
      },
    ],
    examples: [
      {
        text: "قَالَ اللَّهُ",
        rule: "تفخيم",
        description: "تفخم لام لفظ الجلالة إذا سبقت بفتح",
      },
      {
        text: "بِسْمِ اللَّهِ",
        rule: "ترقيق",
        description: "ترقق لام لفظ الجلالة إذا سبقت بكسر",
      },
      {
        text: "قُلِ اللَّهُمَّ",
        rule: "تفخيم",
        description: "تفخم لام لفظ الجلالة إذا سبقت بضم",
      },
    ],
  },
  {
    id: 7,
    name: "الوقف والابتداء",
    progress: 0,
    lessons: 4,
    completed: 0,
    description:
      "علم الوقف والابتداء يهتم بكيفية الوقف على الكلمات في القرآن الكريم وكيفية الابتداء بها بعد الوقف.",
    subLessons: [
      {
        id: 701,
        title: "الوقف التام",
        duration: "8 دقائق",
        level: "متوسط",
        completed: false,
      },
      {
        id: 702,
        title: "الوقف الكافي",
        duration: "7 دقائق",
        level: "متوسط",
        completed: false,
      },
      {
        id: 703,
        title: "الوقف الحسن",
        duration: "6 دقائق",
        level: "متوسط",
        completed: false,
      },
      {
        id: 704,
        title: "الوقف القبيح",
        duration: "5 دقائق",
        level: "متوسط",
        completed: false,
      },
    ],
    examples: [
      {
        text: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ◌",
        rule: "وقف تام",
        description: "الوقف على نهاية الآية حيث تم المعنى",
      },
      {
        text: "إِيَّاكَ نَعْبُدُ ◌ وَإِيَّاكَ نَسْتَعِينُ",
        rule: "وقف كافي",
        description: "الوقف على كلام تام في نفسه متعلق بما بعده",
      },
      {
        text: "بِسْمِ اللَّهِ ◌ الرَّحْمَٰنِ الرَّحِيمِ",
        rule: "وقف حسن",
        description: "الوقف على كلام متعلق بما بعده لفظاً ومعنى",
      },
    ],
  },
];

export interface TajweedCourse {
  id: number;
  title: string;
  lessons: number;
  duration: string;
  level: string;
  instructor: string;
  image: string;
  description?: string;
}

export const tajweedCourses: TajweedCourse[] = [
  {
    id: 1,
    title: "أساسيات التجويد للمبتدئين",
    lessons: 12,
    duration: "3 ساعات",
    level: "مبتدئ",
    instructor: "الشيخ محمد الحصري",
    image:
      "https://images.unsplash.com/photo-1519817650390-64a93db51149?w=600&q=80",
    description:
      "دورة شاملة للمبتدئين تغطي أساسيات علم التجويد وتطبيقاته العملية في قراءة القرآن الكريم.",
  },
  {
    id: 2,
    title: "إتقان المخارج والصفات",
    lessons: 8,
    duration: "2.5 ساعة",
    level: "متوسط",
    instructor: "الشيخ عبد الباسط عبد الصمد",
    image:
      "https://images.unsplash.com/photo-1563296291-14f16db1f1ee?w=600&q=80",
    description:
      "دورة متخصصة في مخارج الحروف وصفاتها مع تدريبات عملية لتحسين النطق.",
  },
  {
    id: 3,
    title: "أحكام التجويد المتقدمة",
    lessons: 10,
    duration: "4 ساعات",
    level: "متقدم",
    instructor: "الشيخ محمود خليل الحصري",
    image:
      "https://images.unsplash.com/photo-1585036156171-384164a8c675?w=600&q=80",
    description:
      "دورة متقدمة تتناول الأحكام الدقيقة في علم التجويد والقراءات المختلفة.",
  },
];

export interface FeaturedLesson {
  id: number;
  title: string;
  duration: string;
  level: string;
  image: string;
  description?: string;
}

export const featuredLessons: FeaturedLesson[] = [
  {
    id: 1,
    title: "الإدغام بغنة",
    duration: "10 دقائق",
    level: "مبتدئ",
    image:
      "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=600&q=80",
    description:
      "شرح مفصل لحكم الإدغام بغنة مع أمثلة تطبيقية من القرآن الكريم.",
  },
  {
    id: 2,
    title: "المد المتصل",
    duration: "15 دقيقة",
    level: "متوسط",
    image:
      "https://images.unsplash.com/photo-1585036156171-384164a8c675?w=600&q=80",
    description:
      "شرح حكم المد المتصل وكيفية تطبيقه في القراءة مع تدريبات صوتية.",
  },
  {
    id: 3,
    title: "الإخفاء الحقيقي",
    duration: "12 دقيقة",
    level: "مبتدئ",
    image:
      "https://images.unsplash.com/photo-1614849286521-4c58b2f0ff15?w=600&q=80",
    description: "شرح حكم الإخفاء الحقيقي وحروفه الخمسة عشر مع أمثلة تطبيقية.",
  },
];
