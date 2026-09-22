import {
  PersonalInfo,
  WorkExperience,
  Education,
  TrainingProgram,
  Project,
  TrainingStat,
  Testimonial,
  BlogPost,
  GalleryPhoto,
  SocialLink,
  WhatsAppTemplate,
} from '../types';

export const PERSONAL_INFO: PersonalInfo = {
  fullName: 'Alfi',
  title: 'Spesialis IT & Principal Technical Trainer',
  location: 'Jakarta & Bandung, Indonesia',
  bio: 'Spesialis IT, Arsitek Cloud Native, dan Pelatih Teknis Senior dengan lebih dari 8 tahun pengalaman dalam merancang sistem skala besar serta melatih lebih dari 5.200 engineer di 45+ korporasi dan institusi terkemuka di Indonesia.',
  email: 'gratis2665@gmail.com',
  whatsappNumber: '6281289214470',
  linkedinUrl: 'https://linkedin.com',
  githubUrl: 'https://github.com',
  specializations: [
    'Arsitektur Cloud Native & Kubernetes (CKA)',
    'Arsitektur Mikroservis & Distributed Systems',
    'Enterprise Fullstack (React 19, TypeScript, Clean Architecture)',
    'DevOps, GitOps (ArgoCD) & Infrastructure as Code (Terraform)',
    'Integrasi AI Generatif & Sistem LLM Produksi',
    'Konsultasi Arsitektur & Audit FinOps',
  ],
};

export const WORK_EXPERIENCES: WorkExperience[] = [
  {
    id: 'exp-1',
    role: 'Principal Technical Trainer & Cloud Architect',
    company: 'Tech Talent Accelerator Indonesia',
    location: 'Jakarta & Remote',
    period: '2022 — Sekarang',
    type: 'Full-time & Corporate Consultant',
    description:
      'Memimpin perancangan kurikulum pelatihan engineering kelas enterprise, memfasilitasi program in-house bootcamp untuk BUMN dan korporasi, serta memberikan konsultasi modernisasi arsitektur cloud.',
    achievements: [
      'Melatih lebih dari 3.200 software engineer, DevOps lead, dan arsitek sistem.',
      'Meraih rata-rata kepuasan peserta (CSAT) 4.96/5.00 dari 80+ batch korporasi.',
      'Mengembangkan simulator praktikum interaktif berbasis Kubernetes & Docker sandbox.',
    ],
    skills: ['Kubernetes', 'Golang', 'TypeScript', 'AWS/GCP', 'ArgoCD', 'Pedagogi Teknis'],
  },
  {
    id: 'exp-2',
    role: 'Senior Lead IT Specialist & Backend Architect',
    company: 'PT Solusi Finansial Digital (Fintech)',
    location: 'Jakarta, Indonesia',
    period: '2019 — 2022',
    type: 'Full-time',
    description:
      'Bertanggung jawab atas arsitektur backend payment switch, integrasi payment gateway berkecepatan tinggi, dan automasi infrastruktur Kubernetes multi-cloud.',
    achievements: [
      'Merancang engine transaksi dengan throughput 5.000+ TPS dan P99 latency < 45ms.',
      'Memangkas biaya infrastruktur cloud hingga 34% per bulan melalui optimasi FinOps.',
      'Menerapkan standar Zero Downtime Deployment dan continuous compliance.',
    ],
    skills: ['Microservices', 'Apache Kafka', 'PostgreSQL', 'Redis', 'Docker', 'OpenTelemetry'],
  },
  {
    id: 'exp-3',
    role: 'Software Engineer & Technical Instructor',
    company: 'Inovasi Edukasi Teknologi',
    location: 'Bandung, Indonesia',
    period: '2017 — 2019',
    type: 'Full-time',
    description:
      'Membangun aplikasi web skala menengah, merancang API RESTful dan GraphQL, serta menjadi instruktur utama bootcamp pemrograman fullstack.',
    achievements: [
      'Membimbing 1.200+ peserta dari nol hingga siap kerja di industri teknologi.',
      'Menulis kurikulum Clean Code dan arsitektur frontend modern.',
    ],
    skills: ['React', 'Node.js', 'Clean Architecture', 'CI/CD', 'Git'],
  },
];

export const EDUCATION_DATA: Education[] = [
  {
    id: 'edu-1',
    degree: 'Sarjana Komputer (S.Kom.) — Teknik Informatika',
    institution: 'Institut Teknologi Nasional',
    year: '2013 — 2017',
    honors: 'Lulusan Terbaik (IPK 3.88 / 4.00)',
    description:
      'Fokus penelitian pada Sistem Terdistribusi, Kriptografi Terapan, dan Skalabilitas Basis Data Terdistribusi.',
    certifications: [
      { name: 'Certified Kubernetes Administrator (CKA)', issuer: 'Cloud Native Computing Foundation (CNCF)', year: '2023' },
      { name: 'AWS Certified Solutions Architect — Professional', issuer: 'Amazon Web Services', year: '2022' },
      { name: 'Master Trainer Tersertifikasi BNSP (Level 6)', issuer: 'Badan Nasional Sertifikasi Profesi', year: '2021' },
      { name: 'Google Cloud Certified Professional Cloud Architect', issuer: 'Google Cloud Platform', year: '2023' },
    ],
  },
];

export const TRAINING_PROGRAMS: TrainingProgram[] = [
  {
    id: 'prog-1',
    title: 'Cloud Native, Docker & Kubernetes (CKA Mastery)',
    level: 'Intermediate - Advanced',
    duration: '4 Hari Intensif (32 Jam) / 6 Minggu',
    targetAudience: 'DevOps Engineer, Backend Developer, SysAdmin, Solution Architect',
    description:
      'Pelatihan komprehensif menguasai orkestrasi kontainer Kubernetes dari dasar hingga deployment klaster multi-node di lingkungan produksi nyata. Berorientasi pada kesiapan sertifikasi CKA dan problem solving di dunia kerja.',
    popular: true,
    iconName: 'Server',
    prerequisites: ['Dasar Linux & Command Line', 'Pemahaman Jaringan Dasar'],
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Containerization Fundamental & Docker Engine Mastery',
        topics: ['Linux Namespaces & Cgroups', 'Multi-stage Dockerfile Optimization', 'Container Security & Distroless Images'],
        handsOnLab: 'Membangun image mikroservis ramping (<25MB) dengan rootless security scanner.',
      },
      {
        moduleNumber: 2,
        title: 'Arsitektur Kubernetes Core & Pod Networking',
        topics: ['Control Plane Internals & etcd', 'Deployments, StatefulSets & DaemonSets', 'CNI Plugins, Services & Ingress NGINX'],
        handsOnLab: 'Deployment arsitektur HA Kubernetes di klaster lokal dan konfigurasikan ingress TLS otomatis.',
      },
      {
        moduleNumber: 3,
        title: 'Storage, Configuration & Zero Downtime Deployments',
        topics: ['Persistent Volumes & CSI', 'ConfigMaps & SealedSecrets', 'Rolling Updates, Blue-Green & Canary Deployment'],
        handsOnLab: 'Simulasi traffic switching live tanpa kehilangan request pada transaksi aktif.',
      },
      {
        moduleNumber: 4,
        title: 'GitOps Workflow (ArgoCD), Observability & Hardening',
        topics: ['ArgoCD Declarative GitOps', 'Prometheus & Grafana Monitoring', 'RBAC & NetworkPolicies Enactment'],
        handsOnLab: 'Membangun pipeline GitOps otomatis dari commit GitHub hingga sinkronisasi cluster.',
      },
    ],
    outcomes: [
      'Mampu mengoperasikan klaster Kubernetes skala produksi secara mandiri.',
      'Siap 100% menghadapi ujian sertifikasi resmi CKA.',
      'Menerapkan pipeline GitOps standar industri di perusahaan.',
    ],
  },
  {
    id: 'prog-2',
    title: 'Enterprise Fullstack & Clean Architecture',
    level: 'All Levels',
    duration: '3 Hari Intensif / 4 Minggu Modular',
    targetAudience: 'Software Engineer, Frontend / Backend Lead, Engineering Manager',
    description:
      'Penguasaan mendalam pengembangan aplikasi modern berbasis TypeScript, React 19, arsitektur micro-frontend, dan Clean Architecture backend yang mudah diuji serta dipelihara jangka panjang.',
    popular: true,
    iconName: 'Layers',
    prerequisites: ['Dasar JavaScript / TypeScript', 'Pengalaman Web Development'],
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Clean Architecture & Domain-Driven Design (DDD)',
        topics: ['Entities, Use Cases & Repository Pattern', 'Dependency Inversion & Test-Driven Development', 'Decoupling Framework dari Business Logic'],
        handsOnLab: 'Refactor aplikasi monolitik menjadi Clean Architecture modular dengan 90%+ unit test coverage.',
      },
      {
        moduleNumber: 2,
        title: 'Modern Frontend Engineering dengan React 19 & TypeScript',
        topics: ['Server Components & Server Actions', 'Custom Hooks & Performant State Management', 'Design System Architecture & Tailwind'],
        handsOnLab: 'Membangun dashboard interaktif real-time dengan streaming data dan virtual scrolling.',
      },
      {
        moduleNumber: 3,
        title: 'Robust API Design & Database Tuning',
        topics: ['REST vs GraphQL vs gRPC Benchmark', 'PostgreSQL Query Optimization & Indexing', 'Distributed Caching Strategy dengan Redis'],
        handsOnLab: 'Optimasi query kompleks hingga latency turun 80% pada beban 10.000 concurrent users.',
      },
    ],
    outcomes: [
      'Struktur kode tim menjadi bersih, modular, dan bebas technical debt.',
      'Peningkatan kecepatan delivery fitur hingga 2x lipat.',
      'Kemampuan merancang modul frontend dan backend standar enterprise.',
    ],
  },
  {
    id: 'prog-3',
    title: 'Applied Generative AI & LLM Systems di Produksi',
    level: 'Intermediate',
    duration: '3 Hari Intensif (24 Jam)',
    targetAudience: 'AI Engineer, Fullstack Developer, Product Architect, Tech Lead',
    description:
      'Praktik langsung mengintegrasikan teknologi Large Language Model (Gemini 2.5/Flash), arsitektur RAG (Retrieval-Augmented Generation), vector databases, dan AI Agents ke dalam sistem aplikasi nyata yang aman.',
    popular: false,
    iconName: 'Sparkles',
    prerequisites: ['Dasar Python atau TypeScript', 'Pemahaman REST API'],
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Prinsip LLM, Prompt Engineering & Structured Outputs',
        topics: ['Temperature & Token Optimization', 'JSON Schema Enforcement via SDK', 'Function Calling & Tool Execution'],
        handsOnLab: 'Membangun service ekstraksi data otomatis dengan validasi tipe data 100% akurat.',
      },
      {
        moduleNumber: 2,
        title: 'Enterprise RAG & Vector Database Architecture',
        topics: ['Semantic Chunking & Embedding Strategies', 'Vector Search dengan pgvector / Qdrant', 'Reranking & Context Compression'],
        handsOnLab: 'Implementasi asisten cerdas pencarian dokumen SOP perusahaan berbasis RAG akurat.',
      },
      {
        moduleNumber: 3,
        title: 'AI Multi-Agent Workflow & Security Guardrails',
        topics: ['Autonomous Agent Loops & Reasoning', 'Prompt Injection Prevention', 'Cost & Latency Optimization di Produksi'],
        handsOnLab: 'Deploy agent asisten otomatis yang mampu mengeksekusi workflow multi-step secara aman.',
      },
    ],
    outcomes: [
      'Mampu mengimplementasikan fitur AI Generatif siap produksi tanpa halusinasi.',
      'Arsitektur RAG teroptimasi biaya dan latency rendah.',
      'Keamanan sistem terlindungi dari prompt injection.',
    ],
  },
  {
    id: 'prog-4',
    title: 'Distributed Systems & High-Throughput Microservices',
    level: 'Advanced',
    duration: '3 Hari Intensif (24 Jam)',
    targetAudience: 'Senior Backend Engineer, Principal Engineer, Lead Architect',
    description:
      'Membedah arsitektur sistem terdistribusi, event-driven messaging menggunakan Apache Kafka, pola konsistensi data (Saga / Outbox Pattern), dan manajemen kegagalan sistem berkapasitas ribuan transaksi per detik.',
    popular: false,
    iconName: 'Cpu',
    prerequisites: ['Pengalaman Backend Mikroservis', 'Pemahaman Basis Data SQL'],
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Event-Driven Architecture & Apache Kafka Core',
        topics: ['Topic Partitioning, Consumers & Consumer Groups', 'Exactly-Once Semantics & Idempotency', 'Transactional Outbox Pattern'],
        handsOnLab: 'Membangun pipeline event processing tahan banting dengan garansi data zero loss.',
      },
      {
        moduleNumber: 2,
        title: 'Distributed Transactions & Resiliency Patterns',
        topics: ['Saga Orchestration vs Choreography', 'Circuit Breakers & Rate Limiting (Token Bucket)', 'Distributed Tracing dengan OpenTelemetry'],
        handsOnLab: 'Simulasi kegagalan network cascade dan implementasi auto-healing circuit breaker.',
      },
    ],
    outcomes: [
      'Sistem memiliki ketahanan tinggi saat traffic spike masif.',
      'Konsistensi data terjamin di seluruh mikroservis independen.',
      'Visibilitas menyeluruh pada latency antar-layanan melalui distributed tracing.',
    ],
  },
];

export interface ProjectShowcaseItem {
  id: string;
  number: string;
  category: string;
  badge: string;
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  technologies: string[];
  impactMetrics: string[];
  architectureHighlights: string[];
  col1Img1: string;
  col1Img2: string;
  col2Img: string;
  ctaText: string;
  liveUrl?: string;
  githubUrl?: string;
}

// 4 Featured Projects from user's attached design
export const SHOWCASE_PROJECTS: ProjectShowcaseItem[] = [
  {
    id: 'venture-universe',
    number: '01',
    category: 'Eksplorasi Antariksa & Simulasi 3D',
    badge: 'New: Maiden Crewed Voyage to Mars 2026',
    name: 'Venture Past Our Sky Across the Universe',
    subtitle: 'Platform Eksplorasi Antariksa & Simulasi Deep-Space 3D',
    tagline: 'Discover the universe in ways once unimaginable.',
    description:
      'Platform visualisasi eksplorasi kosmik interaktif berskala global. Menghadirkan simulasi trajektori roket secara real-time, rendering 3D lanskap planet fotorealistik dengan WebGL/Three.js, dan sistem pelacakan misi antariksa yang presisi.',
    technologies: ['Three.js', 'React 19', 'WebGL / GLSL', 'Tailwind CSS', 'Web Audio API', 'TypeScript'],
    impactMetrics: [
      'Rendering fotorealistik 60 FPS di seluruh perangkat modern',
      'Diakses oleh 240.000+ pengguna eksplorasi sains interaktif',
      'Optimasi aset 3D mesh hemat memori hingga 65%',
    ],
    architectureHighlights: [
      'Procedural terrain generation dengan custom GLSL fragment shaders',
      'Simulasi orbital mechanics terisolasi via Web Workers background',
      'Audio spasial ambient adaptif berbasis jarak navigasi kamera',
    ],
    col1Img1:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=85',
    col1Img2:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85',
    col2Img:
      'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=85',
    ctaText: 'Mulai Simulasi 3D Antariksa',
  },
  {
    id: 'launch-coding-career',
    number: '02',
    category: 'EdTech & Platform Pembelajaran Interaktif',
    badge: 'Program Unggulan: 100+ Modul Interaktif',
    name: 'Launch Your Coding Career With Real-World Training',
    subtitle: 'LMS Generasi Baru dengan Integrated Browser IDE Sandbox',
    tagline: 'Hands-on practice that turns learners into engineers.',
    description:
      'Platform edukasi pemrograman dan DevOps full-stack dengan simulator browser terminal interaktif. Dilengkapi grading otomatis real-time, kurikulum terstruktur dari fundamental hingga arsitektur cloud tingkat lanjut.',
    technologies: ['Next.js 15', 'Docker in Browser / WebContainers', 'Tailwind CSS', 'Monaco Editor', 'Node.js'],
    impactMetrics: [
      '5.200+ siswa dan engineer berhasil lulus program terapan',
      'Completion rate 88% (3.2x lebih tinggi dari rata-rata industri MOOC)',
      'Feedback instan eksekusi kode < 300ms via WebAssembly',
    ],
    architectureHighlights: [
      'Isolated sandbox runtime menggunakan WebAssembly & WebContainers',
      'Stateful collaboration room via WebSocket multiplexing',
      'Gamifikasi modular dengan continuous assessment automated pipeline',
    ],
    col1Img1:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=85',
    col1Img2:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=85',
    col2Img:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=85',
    ctaText: 'Pelajari Kurikulum & Sandbox',
  },
  {
    id: 'deep-space-ai',
    number: '03',
    category: 'AI Workspace & Generative Intelligence',
    badge: 'AI-Powered: Multimodal Real-time Analytics',
    name: 'Unified AI Canvas for Next-Gen Engineering',
    subtitle: 'Workspace AI Multi-Agent untuk Analisis Data & Otomasi Sistem',
    tagline: 'Empowering engineers to build faster with contextual AI.',
    description:
      'Ruang kerja kolaboratif berbasis kecerdasan buatan terpadu untuk pengembang sistem enterprise. Menyediakan generator arsitektur cloud, analisis log otomatis berbasis RAG, dan asisten coding agent otonom.',
    technologies: ['Gemini 2.5', 'React 19', 'Vector DB (pgvector)', 'FastAPI', 'TypeScript', 'Tailwind CSS'],
    impactMetrics: [
      'Reduksi waktu penanganan insiden infrastruktur hingga 52%',
      '99.9% uptime dengan distributed multi-agent supervisor loop',
      'Efisiensi biaya token 40% berkat smart semantic cache',
    ],
    architectureHighlights: [
      'Hierarchical Multi-Agent workflow dengan function calling',
      'Semantic caching layer menggunakan Redis Vector Search',
      'Real-time streaming LLM response dengan HTTP Server-Sent Events',
    ],
    col1Img1:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=85',
    col1Img2:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=85',
    col2Img:
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=85',
    ctaText: 'Coba AI Engineering Canvas',
  },
  {
    id: 'studio-identity',
    number: '04',
    category: 'Brand Architecture & Design Systems',
    badge: 'Enterprise Design: Scalable Tokens 2026',
    name: 'Crafting Next-Generation Digital Experiences',
    subtitle: 'Sistem Desain Komprehensif & Identitas Visual Studio Kreatif',
    tagline: 'Pixel-perfect aesthetics engineered for impact.',
    description:
      'Sistem desain modular dan identitas brand kelas dunia untuk startup teknologi dan korporasi digital. Mengintegrasikan tipografi kontras tinggi, palet warna gelap modern, dan aset visual siap produksi.',
    technologies: ['Figma Tokens', 'Tailwind CSS', 'Framer Motion', 'Radix UI', 'React 19', 'Storybook'],
    impactMetrics: [
      'Dipakai di lebih dari 20+ produk digital enterprise',
      'Konsistensi komponen UI 100% di seluruh tim engineering',
      'Peningkatan kecepatan prototyping hingga 3x lipat',
    ],
    architectureHighlights: [
      'Design token pipeline terintegrasi otomatis dari Figma ke Tailwind',
      'Strict accessibility compliance (WCAG 2.1 AAA)',
      'Multi-platform asset export pipeline otomatis',
    ],
    col1Img1:
      'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=85',
    col1Img2:
      'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1200&q=85',
    col2Img:
      'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=85',
    ctaText: 'Lihat Desain & Identitas Brand',
  },
];

export const PROJECTS: Project[] = SHOWCASE_PROJECTS.map((p) => ({
  id: p.id,
  title: p.name,
  subtitle: p.subtitle,
  category: p.category,
  description: p.description,
  technologies: p.technologies,
  imageUrl: p.col2Img,
  githubUrl: p.githubUrl,
  liveUrl: p.liveUrl,
  featured: true,
  impactMetrics: p.impactMetrics,
  architectureHighlights: p.architectureHighlights,
}));

export const TRAINING_STATS: TrainingStat[] = [
  {
    id: 'participants',
    value: '5.200+',
    numericValue: 5200,
    suffix: '+',
    label: 'Engineer & Profesional Lulus',
    subtext: 'Software engineer, DevOps lead, arsitek sistem, dan mahasiswa di seluruh Indonesia.',
    icon: 'Users',
  },
  {
    id: 'batches',
    value: '140+',
    numericValue: 140,
    suffix: '+',
    label: 'Batch Pelatihan Selesai',
    subtext: 'Program in-house corporate bootcamp, webinar teknis, dan workshop intensif.',
    icon: 'GraduationCap',
  },
  {
    id: 'satisfaction',
    value: '98.8%',
    numericValue: 98.8,
    suffix: '%',
    label: 'Kepuasan Peserta (CSAT)',
    subtext: 'Rata-rata rating 4.94 / 5.00 dari ribuan kuesioner evaluasi independen.',
    icon: 'Star',
  },
  {
    id: 'clients',
    value: '45+',
    numericValue: 45,
    suffix: '+',
    label: 'Korporasi & Institusi BUMN',
    subtext: 'Termasuk perbankan, telekomunikasi, fintech unicorn, dan kementerian.',
    icon: 'Building',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Budi Hartono',
    title: 'VP of Engineering',
    company: 'Fintech Unicorn Indonesia',
    content:
      'Materi Kubernetes dan Clean Architecture yang dibawakan Mas Alfi sangat aplikatif dan langsung menyelesaikan bottleneck arsitektur microservices di tim kami. Rasio 80% hands-on lab membuat engineer kami langsung percaya diri mengelola production cluster.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    trainingTopic: 'Cloud Native & Kubernetes CKA',
    category: 'corporate',
    verified: true,
  },
  {
    id: 'test-2',
    name: 'Siti Rahmawati',
    title: 'Head of Learning & Development',
    company: 'BUMN Perbankan Terbesar',
    content:
      'Kerja sama bootcamp 6 minggu bersama Mas Alfi menghasilkan peningkatan kompetensi nyata. Peserta tidak hanya paham sintaksis, tetapi mengerti arsitektur distributed systems dan security best practices kelas enterprise.',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    trainingTopic: 'Enterprise Fullstack Architecture',
    category: 'corporate',
    verified: true,
  },
  {
    id: 'test-3',
    name: 'Dimas Prasetyo',
    title: 'Senior DevOps Specialist',
    company: 'Alumni CKA Batch #28',
    content:
      'Setelah ikut workshop Mas Alfi selama 4 hari, saya berhasil lulus ujian CKA dalam percobaan pertama dengan skor 94%! Simulasi lab troubleshooting yang diberikan persis dengan skenario ujian sebenarnya.',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    trainingTopic: 'Kubernetes CKA Mastery',
    category: 'bootcamp',
    verified: true,
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Mengapa Zero Downtime Deployment di Kubernetes Sering Gagal dan Cara Mengatasinya',
    slug: 'kubernetes-zero-downtime-pitfalls',
    excerpt:
      'Bedah tuntas konfigurasi readinessProbe, preStop lifecycle hooks, serta terminasi graceful TCP connection yang wajib diterapkan pada traffic tinggi.',
    publishedDate: '12 Maret 2026',
    readTime: '6 menit baca',
    category: 'Cloud Native',
    tags: ['Kubernetes', 'DevOps', 'ZeroDowntime', 'Production'],
    content: `Banyak tim berasumsi bahwa dengan menggunakan Deployment Kubernetes standar dan RollingUpdate, aplikasi mereka secara otomatis mendapatkan jaminan Zero Downtime. Namun pada kenyataannya, saat traffic padat, error 502 Bad Gateway atau 504 Gateway Timeout kerap muncul saat proses deploy berlangsung.

Mengapa hal ini terjadi?

1. Keterlambatan Sinkronisasi Iptables / IPVS
Saat Pod lama dihentikan dan Pod baru dibuat, kube-proxy memerlukan waktu beberapa milidetik hingga beberapa detik untuk memperbarui routing table di seluruh node. Jika pod lama langsung dimatikan sebelum routing diperbarui, request masih akan dikirimkan ke IP Pod yang telah mati.

2. Solusi: preStop Hook dengan Sleep Sederhana
Menambahkan preStop hook sederhana \`sleep 10\` memberikan jeda yang cukup bagi ingress controller dan service routing untuk menghapus pod dari daftar endpoint aktif sebelum aplikasi menerima sinyal SIGTERM.

3. Konfigurasi Graceful Shutdown
Pastikan aplikasi backend menangani sinyal SIGTERM dengan benar—berhenti menerima koneksi baru namun menyelesaikan transaksi aktif yang sedang berjalan.

Dengan kombinasi readinessProbe yang ketat, preStop hook, dan terminationGracePeriodSeconds yang terukur, Anda dapat mencapai 100% zero downtime deploy di lingkungan produksi.`,
  },
  {
    id: 'post-2',
    title: 'Arsitektur RAG di Produksi: Menghindari Halusinasi LLM dengan Hybrid Vector Search',
    slug: 'production-rag-hybrid-search',
    excerpt:
      'Strategi menggabungkan Dense Vector Embeddings dan BM25 Sparse Search untuk pencarian dokumen enterprise dengan akurasi semantik tertinggi.',
    publishedDate: '24 Februari 2026',
    readTime: '8 menit baca',
    category: 'Applied AI',
    tags: ['GenerativeAI', 'RAG', 'VectorDB', 'Gemini'],
    content: `Dalam membangun asisten AI untuk dokumen perusahaan, mengandalkan vector embeddings semata seringkali menghasilkan kesalahan ketika pengguna mencari istilah spesifik seperti kode produk, nomor pasal undang-undang, atau nama variabel teknis.

Kelemahan Dense Embedding Murni:
Vector embedding sangat bagus untuk menangkap makna konseptual, namun buruk dalam mencocokkan kata kunci eksak (exact keyword matching).

Pendekatan Hybrid Search:
1. Dense Retrieval (Cosine Similarity pada Embeddings) untuk menangkap konteks dan makna sinonim.
2. Sparse Retrieval (BM25 Algorithm) untuk memastikan kata kunci spesifik dan nomor referensi ditemukan dengan tepat.
3. Reranking Layer (Reciprocal Rank Fusion atau Cross-Encoder) untuk menggabungkan skor dari kedua metode sebelum dikirimkan ke model Gemini.

Hasil pengujian menunjukkan bahwa Hybrid Search meningkatkan akurasi jawaban model hingga 35% dibandingkan vector search tunggal pada dokumen finansial dan legal korporasi.`,
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'gal-1',
    title: 'In-House Bootcamp Kubernetes CKA — PT Bank Mandiri',
    description: 'Sesi pelatihan intensif 4 hari mengenai arsitektur container enterprise, disaster recovery, dan persiapan sertifikasi CKA bersama 28 software engineer.',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    category: 'corporate',
    date: 'Januari 2026',
    location: 'Menara Mandiri, Jakarta',
    client: 'PT Bank Mandiri (Persero) Tbk',
    participantCount: 28,
    highlights: ['100% Praktikum Lab', 'Multi-Node Cluster Deployment', 'Simulasi Ujian CKA'],
  },
  {
    id: 'gal-2',
    title: 'Workshop Cloud Native & GitOps — Telkom Indonesia',
    description: 'Pelatihan hands-on implementasi ArgoCD GitOps, Terraform automation, dan monitoring Prometheus Grafana untuk tim infrastruktur digital.',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
    category: 'corporate',
    date: 'November 2025',
    location: 'Telkom Landmark Tower, Jakarta',
    client: 'PT Telkom Indonesia',
    participantCount: 35,
    highlights: ['ArgoCD Pipeline Setup', 'Terraform State Management', 'Security Hardening'],
  },
  {
    id: 'gal-3',
    title: 'Keynote Speaker: Masa Depan Arsitektur AI di Indonesia',
    description: 'Sesi plenary session di hadapan 450+ developer dan tech lead mengenai integrasi LLM & Agen AI pada sistem produksi berskala besar.',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    category: 'conference',
    date: 'Oktober 2025',
    location: 'Grand Ballroom, Bandung',
    client: 'National Tech Summit 2025',
    participantCount: 450,
    highlights: ['Keynote Presentation', 'Live Coding Agent', 'Sesi Tanya Jawab Interaktif'],
  },
];

export const CLIENT_LOGOS = [
  { name: 'Bank Mandiri', category: 'Perbankan BUMN' },
  { name: 'Telkom Indonesia', category: 'Telekomunikasi' },
  { name: 'BCA Digital', category: 'Perbankan Swasta' },
  { name: 'Fintech Unicorn', category: 'Finansial Digital' },
  { name: 'Kementerian Kominfo', category: 'Pemerintahan' },
  { name: 'Astra Graphia', category: 'Enterprise IT' },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'LinkedIn', url: 'https://linkedin.com', handle: 'alfi-it-specialist', icon: 'Linkedin' },
  { name: 'GitHub', url: 'https://github.com', handle: 'alfi-dev', icon: 'Github' },
  { name: 'Email', url: 'mailto:gratis2665@gmail.com', handle: 'gratis2665@gmail.com', icon: 'Mail' },
  { name: 'WhatsApp', url: 'https://wa.me/6281289214470', handle: '+62 812-8921-4470', icon: 'Phone' },
];

export const WHATSAPP_TEMPLATES: WhatsAppTemplate[] = [
  {
    id: 'corporate-training',
    title: 'Pelatihan Korporasi In-House',
    description: 'Konsultasi silabus khusus untuk tim engineering perusahaan atau BUMN.',
    topic: 'Training Korporasi',
    message:
      'Halo Mas Alfi, saya ingin berkonsultasi mengenai rencana in-house technical training untuk tim software engineering di perusahaan kami.',
  },
  {
    id: 'cka-bootcamp',
    title: 'Bootcamp Kubernetes CKA',
    description: 'Pendaftaran batch terdekat sertifikasi resmi CKA.',
    topic: 'Kubernetes CKA',
    message:
      'Halo Mas Alfi, saya tertarik untuk mengikuti program Bootcamp Intensif Kubernetes CKA batch berikutnya. Mohon info jadwal dan detail registrasi.',
  },
  {
    id: 'architecture-consulting',
    title: 'Konsultasi Arsitektur & Cloud',
    description: 'Review arsitektur mikroservis, audit FinOps, atau modernisasi sistem.',
    topic: 'Konsultasi Arsitektur',
    message:
      'Halo Mas Alfi, kami membutuhkan sesi konsultasi arsitektur cloud / modernisasi microservices untuk sistem kami. Apakah ada jadwal luang minggu ini?',
  },
  {
    id: 'blogger-project-upload',
    title: 'Kustomisasi Proyek Portofolio',
    description: 'Bantuan atau diskusi mengenai fitur upload gambar proyek via Blogger.',
    topic: 'Proyek Portofolio',
    message:
      'Halo Mas Alfi, saya sedang melihat portofolio Anda dan ingin berdiskusi mengenai proyek kolaborasi / integrasi sistem.',
  },
];
