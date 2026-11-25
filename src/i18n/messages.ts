import type { Language } from "./types";

const pt = {
  meta: {
    language: "pt-BR",
    title: "Gustavo Fernandez | Desenvolvedor Full Stack",
    description:
      "Gustavo Fernandez, desenvolvedor full stack e cientista da computação pela UNIFAL. Projetos, trajetória e experimentos em uma interface inspirada em terminais retrofuturistas.",
    locale: "pt_BR",
  },
  skip: "Pular para o conteúdo",
  navigation: {
    sobre: "Início",
    resumo: "Trajetória",
    projetos: "Projetos",
    contato: "Contato",
  },
  nav: {
    home: "Gustavo Fernandez — início",
    label: "Navegação principal",
    language: "Idioma do site",
    effects: "Efeitos visuais",
    effectsToggle: "Ativar ou desativar os efeitos visuais",
    reducedMotion:
      "Efeitos desativados pela preferência de movimento reduzido do sistema",
  },
  profile: {
    role: "Desenvolvedor full stack",
    availability: "Aberto a novas oportunidades",
    introduction:
      "Cientista da Computação pela UNIFAL. Desenvolvo interfaces e APIs com React, TypeScript, Node.js e Java, conectando boas ideias a problemas reais.",
    about:
      "Gosto de entender como as coisas funcionam e de transformar essa curiosidade em código. Minha experiência passa por aplicações de saúde e finanças, integrações, processamento assíncrono e testes automatizados.",
    interests:
      "Fora do código, encontro inspiração em universos como Matrix, Cyberpunk, BioShock Infinite e Alien: Isolation. Este terminal é um pouco disso tudo: tecnologia, nostalgia e vontade de criar algo meu.",
  },
  hero: {
    portfolio: "PORTFÓLIO PESSOAL",
    experimentation: "DESENVOLVIMENTO & EXPERIMENTAÇÃO",
    explore: "Explorar projetos",
    signal: "SINAL_VISUAL",
    conversion: "VÍDEO CONVERTIDO EM CARACTERES",
    playing: "Animação ativa",
    paused: "Imagem estática",
    journey: "Conheça minha trajetória",
  },
  resume: {
    button: "Baixar currículo",
    contact: "Currículo em PDF",
    choose: "Escolha o idioma do currículo",
    portuguese: "Português (PDF)",
    english: "English (PDF)",
    downloadPortuguese: "Baixar currículo em português",
    downloadEnglish: "Download resume in English",
  },
  journey: {
    label: "Sobre mim e trajetória",
    command: "sobre-mim",
    title: "O caminho até aqui.",
    subtitle: "Curiosidade como ponto de partida.",
    education: "FORMAÇÃO",
    languages: "IDIOMAS",
    languageList: "Português fluente / Inglês avançado / Espanhol básico",
    experience: "EXPERIÊNCIA",
    tools: "FERRAMENTAS DE TRABALHO",
    technologies: "Tecnologias",
  },
  projects: {
    label: "Projetos selecionados",
    command: "projetos",
    title: "Ideias que viraram código.",
    description:
      "Uma seleção do que venho construindo, entre soluções do dia a dia e novas possibilidades.",
    laboratory: "O laboratório continua no GitHub.",
    studies: "Estudos, trabalhos acadêmicos e outros experimentos.",
    repositories: "Explorar repositórios",
    explore: "Explorar projeto",
    technologies: "Tecnologias de",
    interface: "Interface do projeto",
    archive: "ARQUIVO",
    close: "Fechar detalhes",
    features: "O que o projeto faz",
    stack: "Tecnologias utilizadas",
    visit: "Visitar projeto",
    documentation: "Ver documentação",
    previous: "Anterior",
    next: "Próxima",
    gallery: "Capturas do projeto",
    screenshot: "Captura",
    of: "de",
    publicDemo: "DEMONSTRAÇÃO PÚBLICA",
  },
  contact: {
    label: "Contato",
    command: "contato",
    title: "Vamos abrir uma conversa?",
    introduction:
      "Tem uma oportunidade, uma ideia para tirar do papel ou só quer trocar uma ideia sobre tecnologia?",
    inbox: "Minha caixa de entrada está aberta.",
    email: "E-mail",
    form: "Enviar mensagem",
    newMessage: "NOVA_MENSAGEM",
    channel: "CANAL DIRETO",
    legend: "Sua mensagem",
    company: "Empresa",
    emailLabel: "Seu e-mail",
    emailPlaceholder: "voce@exemplo.com",
    messageLabel: "Sua mensagem",
    messagePlaceholder:
      "Me conte sobre a oportunidade, uma ideia ou um projeto...",
    sending: "Enviando mensagem...",
    send: "Enviar mensagem",
    success: "Mensagem enviada. Obrigado pelo contato!",
    note: "Envio via Formspree. Seu e-mail será usado para responder ao contato.",
    errors: {
      email: "Informe um e-mail válido.",
      message: "Escreva uma mensagem com pelo menos 8 caracteres.",
      submission:
        "Não foi possível enviar a mensagem. Tente novamente ou entre em contato por e-mail.",
    },
  },
  footer: {
    tagline: "Um pouco de nostalgia. Muitas linhas de código.",
    back: "Voltar ao início",
  },
};

const en: typeof pt = {
  meta: {
    language: "en",
    title: "Gustavo Fernandez | Full Stack Developer",
    description:
      "Gustavo Fernandez, full stack developer and Computer Science graduate from UNIFAL. Projects, experience and experiments in a retrofuturistic terminal interface.",
    locale: "en_US",
  },
  skip: "Skip to content",
  navigation: {
    sobre: "Home",
    resumo: "Experience",
    projetos: "Projects",
    contato: "Contact",
  },
  nav: {
    home: "Gustavo Fernandez — home",
    label: "Main navigation",
    language: "Website language",
    effects: "Visual effects",
    effectsToggle: "Turn visual effects on or off",
    reducedMotion:
      "Effects disabled by your system's reduced motion preference",
  },
  profile: {
    role: "Full stack developer",
    availability: "Open to new opportunities",
    introduction:
      "Computer Science graduate from UNIFAL. I build interfaces and APIs with React, TypeScript, Node.js and Java, connecting good ideas to real-world problems.",
    about:
      "I like understanding how things work and turning that curiosity into code. My experience spans healthcare and finance applications, integrations, background processing and automated testing.",
    interests:
      "Beyond code, I find inspiration in worlds like The Matrix, Cyberpunk, BioShock Infinite and Alien: Isolation. This terminal brings a little of that together: technology, nostalgia and the drive to create something of my own.",
  },
  hero: {
    portfolio: "PERSONAL PORTFOLIO",
    experimentation: "DEVELOPMENT & EXPERIMENTATION",
    explore: "Explore projects",
    signal: "VISUAL_SIGNAL",
    conversion: "VIDEO CONVERTED INTO CHARACTERS",
    playing: "Animation playing",
    paused: "Static image",
    journey: "Explore my experience",
  },
  resume: {
    button: "Download resume",
    contact: "Resume in PDF",
    choose: "Choose the resume language",
    portuguese: "Português (PDF)",
    english: "English (PDF)",
    downloadPortuguese: "Baixar currículo em português",
    downloadEnglish: "Download resume in English",
  },
  journey: {
    label: "About me and experience",
    command: "about-me",
    title: "The path so far.",
    subtitle: "Curiosity is where it starts.",
    education: "EDUCATION",
    languages: "LANGUAGES",
    languageList: "Portuguese: fluent / English: advanced / Spanish: basic",
    experience: "EXPERIENCE",
    tools: "TOOLS OF THE TRADE",
    technologies: "Technologies",
  },
  projects: {
    label: "Selected projects",
    command: "projects",
    title: "Ideas turned into code.",
    description:
      "A selection of what I've been building, from everyday solutions to new possibilities.",
    laboratory: "The experiments continue on GitHub.",
    studies: "Studies, academic work and other experiments.",
    repositories: "Explore repositories",
    explore: "Explore project",
    technologies: "Technologies in",
    interface: "Project interface:",
    archive: "ARCHIVE",
    close: "Close project details",
    features: "What the project does",
    stack: "Technologies used",
    visit: "Visit project",
    documentation: "View documentation",
    previous: "Previous",
    next: "Next",
    gallery: "Project screenshots",
    screenshot: "Screenshot",
    of: "of",
    publicDemo: "PUBLIC DEMO",
  },
  contact: {
    label: "Contact",
    command: "contact",
    title: "Let's start a conversation.",
    introduction:
      "Have an opportunity, an idea to bring to life, or just want to talk about technology?",
    inbox: "My inbox is open.",
    email: "Email",
    form: "Send a message",
    newMessage: "NEW_MESSAGE",
    channel: "DIRECT CHANNEL",
    legend: "Your message",
    company: "Company",
    emailLabel: "Your email",
    emailPlaceholder: "you@example.com",
    messageLabel: "Your message",
    messagePlaceholder:
      "Tell me about the opportunity, an idea or a project...",
    sending: "Sending message...",
    send: "Send message",
    success: "Message sent. Thanks for getting in touch!",
    note: "Sent via Formspree. Your email will be used to reply to your message.",
    errors: {
      email: "Enter a valid email address.",
      message: "Write a message with at least 8 characters.",
      submission:
        "The message could not be sent. Please try again or contact me by email.",
    },
  },
  footer: {
    tagline: "A little nostalgia. Plenty of lines of code.",
    back: "Back to the top",
  },
};

export type Messages = typeof pt;
export const messages: Record<Language, Messages> = { pt, en };
