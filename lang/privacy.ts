const privacyTranslations = {
  en: {
    backToHome: "← Back to Home",
    heading: "Privacy Policy",
    lastUpdated: "Last updated: February 28, 2026",
    s1: {
      title: "1. Information We Collect",
      body: "NarrVoca collects the following data to provide its language-learning services:",
      items: [
        {
          label: "Account information",
          desc: "email address and authentication credentials via Supabase Auth.",
        },
        {
          label: "Learning data",
          desc: "your written responses to story checkpoints, accuracy scores, and vocabulary mastery progress.",
        },
        {
          label: "Usage data",
          desc: "which story nodes you have visited and completed.",
        },
        {
          label: "Preferences",
          desc: "your chosen display language and practice language.",
        },
      ],
    },
    s2: {
      title: "2. How We Use Your Data",
      items: [
        "To authenticate you and maintain your session.",
        "To track your progress through narrative stories and vocabulary mastery.",
        "To schedule spaced-repetition reviews for vocabulary words.",
        "To pass your written responses to OpenAI GPT-4o-mini for automated grading. Responses are not stored by OpenAI for training without your consent.",
      ],
    },
    s3: {
      title: "3. Third-Party Services",
      body: "NarrVoca uses the following third-party services, each with their own privacy policies:",
      items: [
        { label: "Supabase", desc: "database and authentication hosting." },
        { label: "OpenAI", desc: "LLM grading via GPT-4o-mini." },
        { label: "Google (Gemini)", desc: "writing practice feedback." },
        { label: "Vercel", desc: "application hosting and deployment." },
      ],
    },
    s4: {
      title: "4. Data Retention",
      body: "Your account data and learning history are retained as long as your account is active. You may request deletion of your account and associated data by contacting us at the address below.",
    },
    s5: {
      title: "5. Contact",
      body: "For privacy-related inquiries, please use our",
      link: "contact form",
    },
  },
  es: {
    backToHome: "← Volver al inicio",
    heading: "Política de Privacidad",
    lastUpdated: "Última actualización: 28 de febrero de 2026",
    s1: {
      title: "1. Información que Recopilamos",
      body: "NarrVoca recopila los siguientes datos para proporcionar sus servicios de aprendizaje de idiomas:",
      items: [
        {
          label: "Información de cuenta",
          desc: "dirección de correo electrónico y credenciales de autenticación a través de Supabase Auth.",
        },
        {
          label: "Datos de aprendizaje",
          desc: "tus respuestas escritas a los puntos de control de las historias, puntuaciones de precisión y progreso en el dominio del vocabulario.",
        },
        {
          label: "Datos de uso",
          desc: "qué nodos de historia has visitado y completado.",
        },
        {
          label: "Preferencias",
          desc: "tu idioma de visualización y de práctica elegidos.",
        },
      ],
    },
    s2: {
      title: "2. Cómo Usamos tus Datos",
      items: [
        "Para autenticarte y mantener tu sesión.",
        "Para rastrear tu progreso a través de las historias narrativas y el dominio del vocabulario.",
        "Para programar revisiones de repetición espaciada para palabras de vocabulario.",
        "Para enviar tus respuestas escritas a OpenAI GPT-4o-mini para calificación automatizada. OpenAI no almacena las respuestas para entrenamiento sin tu consentimiento.",
      ],
    },
    s3: {
      title: "3. Servicios de Terceros",
      body: "NarrVoca utiliza los siguientes servicios de terceros, cada uno con sus propias políticas de privacidad:",
      items: [
        {
          label: "Supabase",
          desc: "alojamiento de base de datos y autenticación.",
        },
        { label: "OpenAI", desc: "calificación mediante GPT-4o-mini." },
        {
          label: "Google (Gemini)",
          desc: "retroalimentación de práctica de escritura.",
        },
        { label: "Vercel", desc: "alojamiento y despliegue de aplicaciones." },
      ],
    },
    s4: {
      title: "4. Retención de Datos",
      body: "Tus datos de cuenta e historial de aprendizaje se conservan mientras tu cuenta esté activa. Puedes solicitar la eliminación de tu cuenta y los datos asociados contactándonos en la dirección indicada.",
    },
    s5: {
      title: "5. Contacto",
      body: "Para consultas relacionadas con la privacidad, por favor usa nuestro",
      link: "formulario de contacto",
    },
  },
  zh: {
    backToHome: "← 返回首页",
    heading: "隐私政策",
    lastUpdated: "最后更新：2026年2月28日",
    s1: {
      title: "1. 我们收集的信息",
      body: "NarrVoca 收集以下数据以提供其语言学习服务：",
      items: [
        {
          label: "账户信息",
          desc: "通过 Supabase Auth 提供的电子邮件地址和身份验证凭据。",
        },
        {
          label: "学习数据",
          desc: "您对故事检查点的书面回答、准确率分数和词汇掌握进度。",
        },
        { label: "使用数据", desc: "您访问和完成的故事节点。" },
        { label: "偏好设置", desc: "您选择的显示语言和练习语言。" },
      ],
    },
    s2: {
      title: "2. 我们如何使用您的数据",
      items: [
        "对您进行身份验证并维护您的会话。",
        "跟踪您在叙事故事中的进度和词汇掌握情况。",
        "为词汇安排间隔重复复习。",
        "将您的书面回答传递给 OpenAI GPT-4o-mini 进行自动评分。未经您同意，OpenAI 不会将回答用于训练。",
      ],
    },
    s3: {
      title: "3. 第三方服务",
      body: "NarrVoca 使用以下第三方服务，每项服务均有其自己的隐私政策：",
      items: [
        { label: "Supabase", desc: "数据库和身份验证托管。" },
        { label: "OpenAI", desc: "通过 GPT-4o-mini 进行 LLM 评分。" },
        { label: "Google (Gemini)", desc: "写作练习反馈。" },
        { label: "Vercel", desc: "应用托管和部署。" },
      ],
    },
    s4: {
      title: "4. 数据保留",
      body: "只要您的账户处于活动状态，您的账户数据和学习历史记录将被保留。您可以通过以下地址联系我们，请求删除您的账户和相关数据。",
    },
    s5: {
      title: "5. 联系方式",
      body: "有关隐私方面的查询，请使用我们的",
      link: "联系表单",
    },
  },
} as const;

export default privacyTranslations;
