const contactTranslations = {
  en: {
    backToHome: "← Back to Home",
    heading: "Contact Us",
    intro:
      "Have a question, found a bug, or want to share feedback? We'd love to hear from you.",
    sendMessage: "Send Us a Message",
    form: {
      namePlaceholder: "Your name",
      emailPlaceholder: "you@example.com",
      messagePlaceholder: "Your question, feedback, or bug report…",
      nameLabel: "Name",
      emailLabel: "Email",
      messageLabel: "Message",
      submit: "Send Message",
      submitting: "Sending…",
    },
    success: {
      title: "Message sent!",
      body: "Thanks for reaching out — we'll get back to you soon.",
      again: "Send another message",
    },
    error: "Something went wrong — please try again or reach out via GitHub.",
  },
  es: {
    backToHome: "← Volver al inicio",
    heading: "Contáctanos",
    intro:
      "¿Tienes una pregunta, encontraste un error o quieres compartir tus comentarios? Nos encantaría saber de ti.",
    sendMessage: "Envíanos un Mensaje",
    form: {
      namePlaceholder: "Tu nombre",
      emailPlaceholder: "tu@ejemplo.com",
      messagePlaceholder: "Tu pregunta, comentario o reporte de error…",
      nameLabel: "Nombre",
      emailLabel: "Correo electrónico",
      messageLabel: "Mensaje",
      submit: "Enviar Mensaje",
      submitting: "Enviando…",
    },
    success: {
      title: "¡Mensaje enviado!",
      body: "Gracias por contactarnos — te responderemos pronto.",
      again: "Enviar otro mensaje",
    },
    error:
      "Algo salió mal — por favor inténtalo de nuevo o contáctanos vía GitHub.",
  },
  zh: {
    backToHome: "← 返回首页",
    heading: "联系我们",
    intro: "有问题、发现了 bug 或想分享反馈？我们很乐意听取您的意见。",
    sendMessage: "发送消息",
    form: {
      namePlaceholder: "您的姓名",
      emailPlaceholder: "you@example.com",
      messagePlaceholder: "您的问题、反馈或错误报告……",
      nameLabel: "姓名",
      emailLabel: "电子邮件",
      messageLabel: "消息",
      submit: "发送消息",
      submitting: "发送中……",
    },
    success: {
      title: "消息已发送！",
      body: "感谢您的联系——我们会尽快回复您。",
      again: "再发一条消息",
    },
    error: "出现错误——请重试或通过 GitHub 联系我们。",
  },
} as const;

export default contactTranslations;
