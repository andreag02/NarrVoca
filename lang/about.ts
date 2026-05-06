const aboutTranslations = {
  en: {
    backToHome: "← Back to Home",
    heading: "About NarrVoca",
    mission: {
      title: "Our Mission",
      body: "NarrVoca is a narrative-driven vocabulary acquisition platform for Spanish and Mandarin learners. We believe language is best learned through story — immersive, context-rich narratives that make vocabulary stick naturally. Every word you encounter in NarrVoca is grounded in a scene, a character, a moment — not a flashcard.",
    },
    whatWeDo: {
      title: "What We Do",
      items: [
        "Branching short stories with bilingual text (target language + English)",
        "Real-time LLM grading of your written responses via GPT-4o-mini",
        "Adaptive branching — checkpoint nodes gate progression based on your score",
        "Spaced repetition scheduling for every vocabulary word you encounter",
        "Automatic sync of learned words into your personal vocabulary list",
      ],
    },
    team: {
      title: "The Team",
    },
    academic: {
      title: "Academic Context",
      body: "NarrVoca was developed as a capstone project for CSCI 6333 — Database Systems at the University of Texas Rio Grande Valley (Spring 2026). It extends the original Vocora language-learning platform with a structured relational database layer for narrative-based learning.",
    },
  },
  es: {
    backToHome: "← Volver al inicio",
    heading: "Acerca de NarrVoca",
    mission: {
      title: "Nuestra Misión",
      body: "NarrVoca es una plataforma de adquisición de vocabulario basada en narrativas para estudiantes de español y mandarín. Creemos que el idioma se aprende mejor a través de historias: narrativas inmersivas y ricas en contexto que hacen que el vocabulario se asimile de forma natural. Cada palabra que encuentras en NarrVoca está enmarcada en una escena, un personaje, un momento — no en una tarjeta de memoria.",
    },
    whatWeDo: {
      title: "Lo que Hacemos",
      items: [
        "Historias cortas ramificadas con texto bilingüe (idioma objetivo + inglés)",
        "Calificación en tiempo real de tus respuestas escritas mediante GPT-4o-mini",
        "Ramificación adaptativa: los nodos de control regulan el progreso según tu puntuación",
        "Programación de repetición espaciada para cada palabra de vocabulario que encuentres",
        "Sincronización automática de palabras aprendidas en tu lista de vocabulario personal",
      ],
    },
    team: {
      title: "El Equipo",
    },
    academic: {
      title: "Contexto Académico",
      body: "NarrVoca fue desarrollado como proyecto final para CSCI 6333 — Sistemas de Bases de Datos en la Universidad de Texas en el Valle del Río Grande (Primavera 2026). Amplía la plataforma de aprendizaje de idiomas Vocora original con una capa de base de datos relacional estructurada para el aprendizaje basado en narrativas.",
    },
  },
  zh: {
    backToHome: "← 返回首页",
    heading: "关于 NarrVoca",
    mission: {
      title: "我们的使命",
      body: "NarrVoca 是一个面向西班牙语和普通话学习者的叙事驱动词汇习得平台。我们相信，语言最好通过故事来学习——沉浸式、情境丰富的叙事能让词汇自然地留在脑海中。在 NarrVoca 中，你遇到的每一个词都根植于一个场景、一个角色、一个时刻——而非一张记忆卡片。",
    },
    whatWeDo: {
      title: "我们的功能",
      items: [
        "带有双语文本的分支短篇故事（目标语言 + 英语）",
        "通过 GPT-4o-mini 对您的书面回答进行实时 AI 评分",
        "自适应分支——检查点节点根据您的得分控制进度",
        "对您遇到的每个词汇进行间隔重复调度",
        "自动将已学词汇同步到您的个人词汇列表",
      ],
    },
    team: {
      title: "团队成员",
    },
    academic: {
      title: "学术背景",
      body: "NarrVoca 作为德克萨斯大学里奥格兰德河谷分校 CSCI 6333——数据库系统课程（2026年春季）的毕业项目而开发。它在原有的 Vocora 语言学习平台基础上，为基于叙事的学习增加了结构化关系数据库层。",
    },
  },
} as const;

export default aboutTranslations;
