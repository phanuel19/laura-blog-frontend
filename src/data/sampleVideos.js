import {video} from '../services/VideoServices';

/* export const sampleVideos = [
  {
    id: 1,
    title: "Comprendre l'anxiété sociale",
    description:
      "Une explication simple de l'anxiété sociale et comment y faire face.",
    thumbnail:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    url: "/videos/video1.mp4",
    author: "Dr. Amani",
    date: "2024-11-01",
    categories: ["Santé mentale", "Anxiété"],
  },
  {
    id: 2,
    title: "10 min de relaxation guidée",
    description: "Une courte session pour vous détendre en pleine journée.",
    thumbnail:
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    url: "/videos/video2.mp4",
    author: "Calm Studio",
    date: "2024-11-02",
    categories: ["Relaxation", "Bien-être"],
  },
  {
    id: 3,
    title: "Comment gérer un burnout",
    description: "Les signes du burnout et comment y remédier efficacement.",
    thumbnail:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    url: "/videos/video3.mp4",
    author: "Loki Bright",
    date: "2024-11-03",
    categories: ["Santé mentale", "Travail"],
  },
  {
    id: 4,
    title: "Routine matinale apaisante",
    description: "Un exemple de routine matinale pour démarrer sereinement.",
    thumbnail:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    url: "/videos/video4.mp4",
    author: "Serenity Flow",
    date: "2024-11-04",
    categories: ["Bien-être", "Routine"],
  },
  {
    id: 5,
    title: "Comprendre la dépression",
    description: "Vidéo éducative pour mieux comprendre la dépression.",
    thumbnail:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    url: "/videos/video5.mp4",
    author: "Dr. Kone",
    date: "2024-11-05",
    categories: ["Santé mentale", "Dépression"],
  },
  // {
  //   id: 6,
  //   title: "Méditation pour le sommeil profond",
  //   description:
  //     "Guidance pour s'endormir paisiblement et améliorer la qualité du sommeil.",
  //   thumbnail:
  //     "https://images.unsplash.com/photo-1548613053-ffd2c528b927?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  //   url: "/videos/video6.mp4",
  //   author: "Zen Masters",
  //   date: "2024-11-06",
  //   categories: ["Méditation", "Sommeil"],
  // },
  {
    id: 7,
    title: "Gestion des attaques de panique",
    description: "Techniques immédiates pour calmer une crise d'angoisse.",
    thumbnail:
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    url: "/videos/video7.mp4",
    author: "Dr. Amani",
    date: "2024-11-07",
    categories: ["Anxiété", "Premiers secours psychologiques"],
  },
  {
    id: 8,
    title: "Yoga doux pour débutants",
    description: "Séance de 20 minutes pour découvrir le yoga en douceur.",
    thumbnail:
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    url: "/videos/video8.mp4",
    author: "Yoga Harmony",
    date: "2024-11-08",
    categories: ["Yoga", "Bien-être"],
  },
  {
    id: 9,
    title: "L'alimentation et la santé mentale",
    description:
      "Comment ce que vous mangez affecte votre humeur et votre cerveau.",
    thumbnail:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    url: "/videos/video9.mp4",
    author: "NutriMind",
    date: "2024-11-09",
    categories: ["Nutrition", "Santé mentale"],
  },
  {
    id: 10,
    title: "Exercices de respiration anti-stress",
    description: "3 méthodes simples pour réduire le stress en 5 minutes.",
    thumbnail:
      "https://images.unsplash.com/photo-1527525443983-6e60c75fff46?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    url: "/videos/video10.mp4",
    author: "Calm Studio",
    date: "2024-11-10",
    categories: ["Gestion du stress", "Respiration"],
  },
  {
    id: 11,
    title: "Reconnaître les troubles anxieux",
    description: "Les différents types d'anxiété et leurs symptômes.",
    thumbnail:
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    url: "/videos/video11.mp4",
    author: "Dr. Kone",
    date: "2024-11-11",
    categories: ["Santé mentale", "Anxiété"],
  },
  {
    id: 12,
    title: "Journaling thérapeutique",
    description: "Comment l'écriture peut améliorer votre santé mentale.",
    thumbnail:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    url: "/videos/video12.mp4",
    author: "Mindful Pages",
    date: "2024-11-12",
    categories: ["Thérapie", "Bien-être"],
  },
  {
    id: 13,
    title: "Musique pour la concentration",
    description: "Playlist de 1 heure pour améliorer la productivité.",
    thumbnail:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    url: "/videos/video13.mp4",
    author: "Sound Therapy",
    date: "2024-11-13",
    categories: ["Musique", "Productivité"],
  },
  {
    id: 14,
    title: "Les bases de la pleine conscience",
    description: "Introduction à la pratique de la mindfulness au quotidien.",
    thumbnail:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    url: "/videos/video14.mp4",
    author: "Present Moment",
    date: "2024-11-14",
    categories: ["Méditation", "Pleine conscience"],
  },
  {
    id: 15,
    title: "Gérer les conflits au travail",
    description:
      "Stratégies pour maintenir une bonne santé mentale en environnement professionnel.",
    thumbnail:
      "https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    url: "/videos/video15.mp4",
    author: "WorkLife Balance",
    date: "2024-11-15",
    categories: ["Travail", "Relations"],
  },
  {
    id: 16,
    title: "Auto-massage déstressant",
    description: "Techniques simples pour se masser et relâcher les tensions.",
    thumbnail:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    url: "/videos/video16.mp4",
    author: "Body Care",
    date: "2024-11-16",
    categories: ["Bien-être", "Détente"],
  },
  {
    id: 17,
    title: "Comprendre le TDAH chez l'adulte",
    description:
      "Symptômes et stratégies d'adaptation pour le trouble de l'attention.",
    thumbnail:
      "https://images.unsplash.com/photo-1491841573635-49f3530cb6f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    url: "/videos/video17.mp4",
    author: "NeuroMind",
    date: "2024-11-17",
    categories: ["Santé mentale", "TDAH"],
  },
  {
    id: 18,
    title: "Routine soirée pour mieux dormir",
    description:
      "Préparation du corps et de l'esprit pour un sommeil réparateur.",
    thumbnail:
      "https://images.unsplash.com/photo-1531353826977-0941b4779a1c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    url: "/videos/video18.mp4",
    author: "Sleep Well",
    date: "2024-11-18",
    categories: ["Sommeil", "Routine"],
  },
  {
    id: 19,
    title: "Techniques de grounding",
    description: "Exercices pour rester ancré lors de moments de dissociation.",
    thumbnail:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    url: "/videos/video19.mp4",
    author: "Dr. Amani",
    date: "2024-11-19",
    categories: ["Anxiété", "Premiers secours psychologiques"],
  },
  {
    id: 20,
    title: "L'art-thérapie à la maison",
    description: "Activités créatives simples pour exprimer ses émotions.",
    thumbnail:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    url: "/videos/video20.mp4",
    author: "Creative Healing",
    date: "2024-11-20",
    categories: ["Thérapie", "Art"],
  },
  {
    id: 21,
    title: "Gérer l'hypersensibilité",
    description: "Comment vivre sereinement avec une sensibilité élevée.",
    thumbnail:
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    url: "/videos/video21.mp4",
    author: "Sensitive Souls",
    date: "2024-11-21",
    categories: ["Développement personnel", "Émotions"],
  },
  {
    id: 22,
    title: "Histoires pour s'endormir",
    description: "Narration apaisante pour accompagner vers le sommeil.",
    thumbnail:
      "https://images.unsplash.com/photo-1495314736024-fa5e4b37b979?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    url: "/videos/video22.mp4",
    author: "Dream Tales",
    date: "2024-11-22",
    categories: ["Sommeil", "Détente"],
  },
  {
    id: 23,
    title: "La science du bonheur",
    description: "Ce que la recherche dit sur comment cultiver le bonheur.",
    thumbnail:
      "https://images.unsplash.com/photo-1545665277-5937489579f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    url: "/videos/video23.mp4",
    author: "Positive Mind",
    date: "2024-11-23",
    categories: ["Psychologie", "Bien-être"],
  },
  {
    id: 24,
    title: "Postures de yoga anti-stress",
    description: "5 positions pour libérer les tensions physiques et mentales.",
    thumbnail:
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    url: "/videos/video24.mp4",
    author: "Yoga Harmony",
    date: "2024-11-24",
    categories: ["Yoga", "Gestion du stress"],
  },
  {
    id: 25,
    title: "Créer des limites saines",
    description: "Apprendre à dire non et protéger son énergie.",
    thumbnail:
      "https://images.unsplash.com/photo-1491841573635-49f3530cb6f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    url: "/videos/video25.mp4",
    author: "Personal Growth",
    date: "2024-11-25",
    categories: ["Relations", "Développement personnel"],
  },
];
*/

export const sampleVideos = video.GetVideos