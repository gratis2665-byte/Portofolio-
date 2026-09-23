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
  name: 'Alfi',
  title: 'Trainer & Fasilitator Pelatihan',
  location: 'Jakarta & Bandung, Indonesia',
  bio: 'Trainer dan fasilitator pelatihan yang suka nemenin teman-teman, mahasiswa, dan tim kantor buat belajar public speaking, ngobrol lebih asik, dan bangun rasa percaya diri tanpa takut canggung.',
  email: 'gratis2665@gmail.com',
  whatsappNumber: '6281289214470',
  linkedinUrl: 'https://linkedin.com',
  availabilityStatus: 'Terbuka untuk workshop kampus, in-house training kantor, dan mentoring santai 1-on-1',
  specializations: [
    'Public Speaking & Trik Tampil Percaya Diri',
    'Komunikasi Asertif & Kekompakan Tim',
    'Manajemen Waktu & Produktivitas Harian',
    'Dasar Kepemimpinan Buat Pemula',
    'Ice Breaking Seru & Fasilitasi Interaktif',
    'Penyusunan Modul & Workbook Belajar Praktis',
  ],
};

export const WORK_EXPERIENCES: WorkExperience[] = [
  {
    id: 'exp-1',
    role: 'Trainer & Fasilitator Pelatihan',
    company: 'Lembaga Pengembangan SDM & Talenta',
    location: 'Jakarta & Kelas Online',
    period: '2024 — Sekarang',
    type: 'Penuh Waktu (Full-time)',
    description:
      'Membawakan dan mendampingi kelas komunikasi asik, teknik presentasi santai tanpa keringat dingin, dan sesi bonding tim baru. Gaya belajarnya 80% langsung praktik, simulasi seru, dan obrolan dua arah yang hidup.',
    achievements: [
      'Udah mandu 18+ angkatan kelas dengan lebih dari 280 teman belajar yang aktif.',
      'Dapet rating kepuasan peserta (CSAT) 4.92 / 5.00 karena penyampaian yang ramah dan gampang ditangkap.',
      'Ngerancang 6 modul belajar dan buku panduan latihan yang langsung bisa dipraktikkan di kantor maupun kampus.',
    ],
    skills: ['Public Speaking', 'Fasilitasi Workshop', 'Ice Breaking', 'Komunikasi Asertif', 'Belajar Seru', 'Desain Modul'],
  },
  {
    id: 'exp-2',
    role: 'Fasilitator Workshop & Pelatih Komunitas',
    company: 'Komunitas Pengembangan Diri & Komunikasi',
    location: 'Bandung & Hybrid',
    period: '2023 — 2024',
    type: 'Inisiatif Komunitas & Workshop',
    description:
      'Bikin dan mandu rangkaian kelas santai "Bicara Pede Tanpa Panik" buat teman-teman mahasiswa dan profesional muda yang sering ngerasa minder atau deg-degan parah pas disuruh ngomong di depan forum.',
    achievements: [
      'Ngegelar 14 sesi workshop santai yang ngebantu peserta mengatasi demam panggung.',
      'Nemenin lebih dari 85 peserta yang awalnya pemalu banget sampai akhirnya berani maju dan bersuara lantang.',
      'Nyusun tips latihan pernapasan perut dan olah vokal praktis yang gampang dicoba kapan aja.',
    ],
    skills: ['Olah Vokal', 'Bahasa Tubuh', 'Mentoring 1-on-1', 'Dinamika Kelompok', 'Storytelling'],
  },
  {
    id: 'exp-3',
    role: 'Koordinator Pelatihan & Asisten Fasilitator',
    company: 'Pusat Pelatihan Keterampilan Mahasiswa',
    location: 'Bandung, Indonesia',
    period: '2022 — 2023',
    type: 'Paruh Waktu (Part-time)',
    description:
      'Ikut ngawal kelancaran belasan kelas dan seminar kepemimpinan, nyiapin game ice breaking biar kelas gak ngantuk, dan nemenin simulasi kelompok kecil.',
    achievements: [
      'Ngemudiin jalannya 12 acara seminar dan workshop mahasiswa biar acaranya tetap hidup dan tepat waktu.',
      'Bikin bank game ice breaking seru yang sukses bikin suasana kelas jadi akrab dan gak canggung.',
    ],
    skills: ['Koordinasi Acara', 'Evaluasi Kelas', 'Manajemen Suasana', 'Ice Breaking', 'Komunikasi Santai'],
  },
];

export const EDUCATION_DATA: Education[] = [
  {
    id: 'edu-1',
    degree: 'Sarjana Ilmu Komunikasi (S.I.Kom.)',
    institution: 'Universitas Terkemuka di Indonesia',
    year: '2019 — 2023',
    honors: 'Predikat Sangat Memuaskan (IPK 3.78 / 4.00)',
    description:
      'Fokus studi pada Komunikasi Publik, Psikologi Komunikasi, Teori Pembelajaran Orang Dewasa, serta Manajemen Pelatihan & Pengembangan Sumber Daya Manusia.',
    certifications: [
      { name: 'Sertifikasi Fasilitator Pelatihan (Training of Trainers - ToT)', issuer: 'Lembaga Sertifikasi Profesi / BNSP', year: '2024' },
      { name: 'Certified Professional Public Speaker (CPPS)', issuer: 'Lembaga Komunikasi Publik Indonesia', year: '2023' },
      { name: 'Sertifikasi Manajemen Fasilitasi & Dinamika Kelompok', issuer: 'Asosiasi Fasilitator Indonesia', year: '2023' },
      { name: 'Effective Coaching & Mentoring Skills', issuer: 'Human Capital Institute', year: '2024' },
    ],
  },
];

export const TRAINING_PROGRAMS: TrainingProgram[] = [
  {
    id: 'prog-1',
    title: 'Teknik Presentasi & Public Speaking Memikat untuk Pemula',
    level: 'Pemula (Fondasi & Praktik)',
    duration: '2 Hari Workshop (8 Jam) / 4 Sesi Fleksibel',
    targetAudience: 'Mahasiswa, Karyawan Baru, Profesional Muda, Siapa Saja yang Gugup Bicara di Depan Umum',
    description:
      'Pelatihan praktis dan menyenangkan untuk membangun rasa percaya diri berbicara di hadapan audiens. Membedah teknik mengontrol demam panggung, menyusun alur bicara yang sistematis, hingga memanfaatkan bahasa tubuh dan intonasi vokal yang meyakinkan.',
    popular: true,
    iconName: 'Mic',
    prerequisites: ['Kesiapan untuk berlatih dan mencoba berbicara', 'Tidak butuh pengalaman panggung sebelumnya'],
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Menaklukkan Gugup & Menguasai Rasa Percaya Diri',
        topics: ['Memahami Sumber Ketakutan Panggung', 'Latihan Pernapasan Diafragma & Rileksasi Cepat', 'Membangun Mindset Pembicara Positif'],
        handsOnLab: 'Latihan 60 detik perkenalan diri dengan artikulasi tegas dan tatap mata hangat.',
      },
      {
        moduleNumber: 2,
        title: 'Struktur Pesan: Pembukaan, Isi & Penutupan Berbobot',
        topics: ['Teknik Hook 30 Detik Pertama', 'Menyusun Poin Pesan dengan Rumus 3 Pilar', 'Call to Action & Penutupan yang Berkesan'],
        handsOnLab: 'Menyusun skrip presentasi 3 menit bertema topik favorit dengan lembar kerja terstruktur.',
      },
      {
        moduleNumber: 3,
        title: 'Olah Vokal, Bahasa Tubuh & Interaksi Audiens',
        topics: ['Variasi Intonasi, Tempo & Jeda Dramatis', 'Postur Terbuka, Gestur Tangan & Kontak Mata', 'Cara Menghidupkan Sesi Tanya Jawab'],
        handsOnLab: 'Simulasi presentasi mini di depan kelompok kecil dengan umpan balik apresiatif langsung.',
      },
    ],
    outcomes: [
      'Mampu mengendalikan rasa gugup dan gemetar saat berbicara di depan forum.',
      'Memiliki teknik menyusun pesan presentasi yang ringkas dan memikat.',
      'Tampil lebih meyakinkan dengan bahasa tubuh dan olah vokal yang proporsional.',
    ],
  },
  {
    id: 'prog-2',
    title: 'Komunikasi Efektif, Asertif & Kerja Sama Tim (Teamwork)',
    level: 'Semua Tingkat',
    duration: '1 - 2 Hari Workshop (6 - 10 Jam)',
    targetAudience: 'Anggota Tim, Koordinator Organisasi, Divisi Baru, Staf Perusahaan',
    description:
      'Mengasah keterampilan mendengarkan secara aktif, menyampaikan pendapat secara tegas namun santun (asertif), mengurai kesalahpahaman, dan mempererat kerja sama lintas rekan kerja dalam organisasi.',
    popular: true,
    iconName: 'Users',
    prerequisites: ['Keterbukaan untuk berdiskusi dan berbagi pengalaman'],
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Active Listening & Memahami Gaya Komunikasi',
        topics: ['Mendengarkan untuk Memahami, Bukan Sekadar Menjawab', '4 Tipe Gaya Komunikasi Pribadi', 'Menghindari Hambatan Asumsi & Prasangka'],
        handsOnLab: 'Permainan simulasi pesan berantai dan latihan paraphrasing pesan rekan bicara.',
      },
      {
        moduleNumber: 2,
        title: 'Komunikasi Asertif & Resolusi Perbedaan Sudut Pandang',
        topics: ['Perbedaan Pasif, Agresif, dan Asertif', 'Teknik "I-Statement" dalam Menyampaikan Umpan Balik', 'Menolak Permintaan dengan Sopan Tanpa Merusak Relasi'],
        handsOnLab: 'Roleplay skenario diskusi kerja riil dan latihan memberikan feedback membangun.',
      },
    ],
    outcomes: [
      'Terbiasa mendengarkan rekan kerja dengan empati dan fokus penuh.',
      'Percaya diri mengungkapkan masukan secara asertif tanpa menyinggung.',
      'Sinergi kerja sama dan suasana kerja tim menjadi jauh lebih sehat.',
    ],
  },
  {
    id: 'prog-3',
    title: 'Manajemen Waktu, Prioritas & Produktivitas Harian',
    level: 'Pemula',
    duration: '1 Hari Workshop (5 Jam)',
    targetAudience: 'Mahasiswa, Pekerja Kantoran, Siapa Saja yang Sering Merasa Kewalahan & Menunda Pekerjaan',
    description:
      'Metode praktis menata jadwal, menentukan prioritas tugas paling berdampak, mengatasi kebiasaan menunda-nunda (procrastination), dan mempertahankan energi positif sepanjang hari.',
    popular: false,
    iconName: 'Clock',
    prerequisites: ['Membawa daftar rencana kerja atau tugas harian'],
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Audit Waktu & Matriks Prioritas Eisenhower',
        topics: ['Mengenali Kebocoran Waktu Harian', 'Membedakan Tugas Urgent vs Important', 'Teknik Memilih 3 Prioritas Utama Hari Ini'],
        handsOnLab: 'Memetakan 15 tugas harian ke dalam 4 kuadran prioritas kerja.',
      },
      {
        moduleNumber: 2,
        title: 'Time-Blocking, Deep Work & Mengatasi Distraksi',
        topics: ['Teknik Pomodoro & Ritme Kerja Fokus', 'Mengelola Notifikasi dan Gangguan Ponsel', 'Membangun Rutinitas Pagi dan Sore yang Menenangkan'],
        handsOnLab: 'Menyusun jadwal mingguan realistis dengan alokasi buffer time istirahat.',
      },
    ],
    outcomes: [
      'Tugas-tugas harian terselesaikan lebih teratur tanpa stres berlebih.',
      'Mengurangi kebiasaan menunda pekerjaan penting.',
      'Memiliki keseimbangan waktu antara kerja, istirahat, dan kehidupan pribadi.',
    ],
  },
  {
    id: 'prog-4',
    title: 'Dasar Kepemimpinan & Keterampilan Fasilitasi Pertemuan',
    level: 'Pemula (Youth & Lead)',
    duration: '1 Hari Workshop (5 Jam)',
    targetAudience: 'Pemimpin Tim Pemula, Ketua Organisasi Mahasiswa, Fasilitator Komunitas',
    description:
      'Membekali calon pemimpin muda dengan keterampilan memoderasi rapat yang efektif, memecah kecanggungan forum, memotivasi rekan satu tim, dan mengambil keputusan secara partisipatif.',
    popular: false,
    iconName: 'Award',
    prerequisites: ['Pernah atau sedang menjadi pengurus tim/organisasi'],
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Karakter Pemimpin yang Melayani & Menginspirasi',
        topics: ['Prinsip Servant Leadership', 'Membangun Kepercayaan (Trust Building)', 'Menjadi Teladan dalam Kedisiplinan & Komitmen'],
        handsOnLab: 'Refleksi gaya kepemimpinan pribadi dan menyusun komitmen tim.',
      },
      {
        moduleNumber: 2,
        title: 'Teknik Fasilitasi Rapat & Mengambil Keputusan Bersama',
        topics: ['Menyusun Agenda Rapat yang Rapi dan Tepat Waktu', 'Memicu Ide Partisipatif dari Seluruh Anggota', 'Mencapai Konsensus Tanpa Perdebatan Buntu'],
        handsOnLab: 'Simulasi memimpin rapat pemecahan masalah dengan batas waktu ketat.',
      },
    ],
    outcomes: [
      'Mampu memimpin pertemuan secara terarah dan tepat waktu.',
      'Bisa menciptakan ruang diskusi yang aman bagi anggota untuk berpendapat.',
      'Meningkatkan rasa kepemilikan dan motivasi anggota tim.',
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

// 4 Program Showcase / Learning Cases for Pure Trainer
export const SHOWCASE_PROJECTS: ProjectShowcaseItem[] = [
  {
    id: 'public-speaking-workbook',
    number: '01',
    category: 'Modul Pelatihan & Lembar Kerja Mandiri',
    badge: 'Program Unggulan: 280+ Peserta',
    name: 'Buku Panduan & Workbook Public Speaking Pemula (SpeakUp)',
    subtitle: 'Panduan Praktis Langkah Demi Langkah Berbicara di Depan Umum',
    tagline: 'Langkah praktis menaklukkan rasa gugup dan tampil percaya diri.',
    description:
      'Buku kerja interaktif berisi lembar latihan pernapasan, formula pembukaan 30 detik pertama, panduan menyusun poin pesan, dan lembar evaluasi mandiri yang dirancang khusus untuk memandu pemula berbicara di depan umum secara percaya diri.',
    technologies: ['Workbook Aplikatif', 'Metode Andragogi', 'Latihan Pernapasan', 'Checklist Evaluasi', 'Storytelling Framework'],
    impactMetrics: [
      'Digunakan oleh 280+ peserta kelas workshop tatap muka & online',
      '98% peserta melaporkan rasa percaya diri meningkat saat presentasi',
      'Dilengkapi 12 kartu latihan intonasi dan olah vokal harian',
    ],
    architectureHighlights: [
      'Format latihan bergradasi santai dari perkenalan diri hingga pidato 5 menit',
      'Panduan visual posisi berdiri, gestur tangan terbuka, dan kontak mata hangat',
      'Rubrik umpan balik mandiri (self-assessment) yang mudah diisi',
    ],
    col1Img1: '/images/IMG_1900.jpeg',
    col1Img2: '/images/IMG_1888.jpeg',
    col2Img: '/images/IMG_1884.jpeg',
    ctaText: 'Pelajari Silabus Public Speaking',
  },
  {
    id: 'team-communication-simulation',
    number: '02',
    category: 'Program Workshop & Simulasi Dinamika Tim',
    badge: 'Workshop Kolaborasi Tim',
    name: 'Simulasi Pelatihan Komunikasi Efektif & Sinergi Tim (TeamSync)',
    subtitle: 'Sesi Workshop Penuh Praktik untuk Membangun Budaya Komunikasi Terbuka',
    tagline: 'Membangun sinergi dan komunikasi asertif antar rekan kerja.',
    description:
      'Program workshop interaktif 2 hari yang memadukan roleplay situasi kerja riil, permainan dinamika kelompok, dan teknik komunikasi asertif untuk menghilangkan sekat komunikasi dan memperkuat kepercayaan antar anggota tim.',
    technologies: ['Active Listening', 'Roleplay Skenario Kerja', 'Feedback Framework', 'Dinamika Kelompok', 'Asertifitas'],
    impactMetrics: [
      'Diikuti oleh 14 kelompok dan tim kerja pemula',
      'Evaluasi kepuasan peserta mencapai skor 4.94 / 5.00',
      'Meningkatkan transparansi dan keterbukaan dalam koordinasi kerja',
    ],
    architectureHighlights: [
      'Simulasi pemecahan masalah dengan batas waktu untuk melatih ketenangan tim',
      'Latihan pemberian kritik konstruktif menggunakan metode Situation-Behavior-Impact',
      'Sesi refleksi kelompok terpandu di akhir setiap aktivitas',
    ],
    col1Img1: '/images/IMG_1902.jpeg',
    col1Img2: '/images/IMG_1891.jpeg',
    col2Img: '/images/IMG_1897.jpeg',
    ctaText: 'Lihat Detail Workshop Tim',
  },
  {
    id: 'ice-breaking-toolkit',
    number: '03',
    category: 'Bank Media & Toolkit Fasilitasi',
    badge: 'Toolkit Teruji di 18+ Batch',
    name: 'Bank Ice Breaking Interaktif & In-House Training (IceBreak Pro)',
    subtitle: 'Kompilasi 40+ Aktivitas Pencair Suasana & Fasilitasi Korporat',
    tagline: 'Menciptakan energi positif dan antusiasme belajar di setiap sesi.',
    description:
      'Kumpulan permainan ice breaking, energizer singkat, dan aktivitas penutup yang teruji menghidupkan suasana kelas tanpa membuat peserta merasa canggung, lengkap dengan panduan debrief makna pembelajaran dan fasilitasi in-house.',
    technologies: ['In-House Training', 'Ice Breaking Terkurasi', 'Metode Debrief Pembelajaran', 'Fasilitasi Interaktif'],
    impactMetrics: [
      '40+ variasi ice-breaking terbagi berdasarkan ukuran kelas dan durasi',
      'Membantu menjaga tingkat fokus dan keterlibatan peserta di atas 90%',
      'Cocok untuk sesi tatap muka (onsite) maupun ruang virtual (Zoom/Meet)',
    ],
    architectureHighlights: [
      'Panduan langkah demi langkah memandu instruksi secara jelas dalam 2 menit',
      'Pertanyaan refleksi siap pakai untuk mengaitkan game ke inti materi',
      'Tips mitigasi jika ruangan pasif atau peserta merasa malu',
    ],
    col1Img1: '/images/IMG_1904.jpeg',
    col1Img2: '/images/IMG_1889.jpeg',
    col2Img: '/images/IMG_1901.jpeg',
    ctaText: 'Pelajari Toolkit Fasilitator',
  },
  {
    id: 'mentoring-personal-presentation',
    number: '04',
    category: 'Leadership Masterclass & Kelulusan Pelatihan',
    badge: 'Program Sertifikasi & Masterclass',
    name: 'Leadership Masterclass & Program Kelulusan Batch (LeadForward)',
    subtitle: 'Pendampingan Kepemimpinan Eksklusif & Perayaan Kelulusan Pelatihan',
    tagline: 'Mencetak pemimpin berkarakter dengan komunikasi berdampak.',
    description:
      'Program masterclass kepemimpinan dan komunikasi persuasif tingkat lanjut yang diakhiri dengan perayaan kelulusan batch, pemberian apresiasi sertifikat, dan komitmen aksi nyata bagi para profesional.',
    technologies: ['Maxwell Leadership', 'Komunikasi Persuasif', 'Apresiasi Sertifikasi', 'Personal Branding'],
    impactMetrics: [
      '35+ profesional telah lulus program sertifikasi intensif',
      '100% peserta berhasil mempraktikkan proyek kepemimpinan tim',
      'Membangun jejaring kolaborasi profesional yang solid dan suportif',
    ],
    architectureHighlights: [
      'Prinsip kepemimpinan berkarakter dan integritas komunikasi',
      'Simulasi penyelesaian konflik tim dan penanganan keberatan konsumen',
      'Sesi apresiasi kelulusan dan pembagian sertifikat resmi',
    ],
    col1Img1: '/images/IMG_1903.jpeg',
    col1Img2: '/images/IMG_1885.jpeg',
    col2Img: '/images/IMG_1899.jpeg',
    ctaText: 'Lihat Program Leadership',
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
    value: '280+',
    numericValue: 280,
    suffix: '+',
    label: 'Teman Belajar',
    subtext: 'Mahasiswa, staf tim, dan profesional muda yang berani mulai bicara di depan umum.',
    icon: 'Users',
  },
  {
    id: 'batches',
    value: '18+',
    numericValue: 18,
    suffix: '+',
    label: 'Batch & Sesi Seru',
    subtext: 'Workshop tatap muka maupun online dengan suasana santai dan minim teori berbelit.',
    icon: 'GraduationCap',
  },
  {
    id: 'satisfaction',
    value: '98.4%',
    numericValue: 98.4,
    suffix: '%',
    label: 'Ulasan Positif',
    subtext: 'Nilai rata-rata 4.92 / 5.00 untuk kejelasan materi, keramahan, dan suasana kelas yang nyaman.',
    icon: 'Star',
  },
  {
    id: 'clients',
    value: '100%',
    numericValue: 100,
    suffix: '%',
    label: 'Praktik Nyata',
    subtext: 'Bukan cuma dengerin ceramah, setiap peserta langsung simulasi dan dapat masukan hangat.',
    icon: 'Building',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Putri Andini',
    title: 'Mahasiswa & Peserta Workshop Public Speaking',
    company: 'Universitas di Bandung',
    content:
      'Dulu saya selalu gemetar dan blank setiap kali diminta presentasi di depan kelas. Tapi lewat workshop Mas Alfi, saya belajar teknik pernapasan dan cara menyusun pembukaan bicara yang membuat saya jauh lebih rileks. Pembawaan Mas Alfi ramah, sabar, dan tidak membuat kami merasa dihakimi!',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    trainingTopic: 'Teknik Presentasi & Public Speaking Memikat',
    category: 'university',
    verified: true,
  },
  {
    id: 'test-2',
    name: 'Reza Firmansyah',
    title: 'Ketua Komunitas Pemuda Kreatif',
    company: 'Komunitas Talenta Muda',
    content:
      'Sesi pelatihan komunikasi dan teamwork yang dibawakan Mas Alfi benar-benar hidup! Banyak roleplay, ice breaking-nya seru, dan semua anggota tim jadi berani mengungkapkan ide tanpa rasa sungkan. Suasana pelatihan tidak membosankan sama sekali.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    trainingTopic: 'Komunikasi Efektif & Sinergi Tim',
    category: 'community',
    verified: true,
  },
  {
    id: 'test-3',
    name: 'Dina Safitri',
    title: 'Staf Organisasi & Peserta Mentoring Privat',
    company: 'Lembaga Sosial & Komunitas',
    content:
      'Saya mengambil sesi privat 1-on-1 untuk persiapan pidato acara besar. Mas Alfi membedah intonasi dan bahasa tubuh saya secara mendetail dan memberi tips praktis yang langsung terasa perbedaannya. Hasilnya, acara berjalan lancar dan saya mendapat banyak pujian!',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    trainingTopic: 'Mentoring Intensif Presentasi 1-on-1',
    category: 'mentorship',
    verified: true,
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: '5 Trik Mengatasi Rasa Gugup dan Pikiran "Blank" Saat Bicara di Depan Umum',
    slug: 'mengatasi-gugup-bicara-depan-umum',
    excerpt:
      'Langkah praktis mengontrol detak jantung, rileksasi otot leher, dan menjaga alur pikiran tetap tenang saat berdiri di depan orang banyak.',
    publishedDate: '14 Maret 2026',
    readTime: '4 menit baca',
    category: 'Public Speaking',
    tags: ['PublicSpeaking', 'PercayaDiri', 'TipsPresentasi', 'Komunikasi'],
    content: `Rasa gugup sebelum berbicara di depan banyak orang adalah hal yang sangat wajar. Tubuh kita sedang melepaskan adrenalin tambahan. Namun, jika tidak dikelola dengan santai, rasa gugup bisa membuat pikiran "blank" mendadak.

Berikut adalah 5 trik yang selalu saya bagikan kepada teman-teman peserta kelas:

1. Kuasai Teknik Pernapasan 4-4-4
Tarik napas perlahan melalui hidung selama 4 detik, tahan 4 detik, lalu hembuskan perlahan lewat mulut selama 4 detik. Lakukan 3-4 kali tepat sebelum giliranmu bicara untuk menenangkan detak jantung.

2. Fokus Membantu Audiens, Bukan Memikirkan Diri Sendiri
Gugup sering muncul saat kita terlalu sibuk bertanya ke diri sendiri: "Apakah penampilanku aneh? Apakah suaraku bergetar?" Balik fokusnya menjadi: "Hal bermanfaat apa yang bisa kubagikan agar teman-teman yang mendengarkan ini terbantu?"

3. Jangan Menghafal Kata Demi Kata
Menghafal kalimat demi kalimat persis seperti teks buku adalah jebakan panik nomor satu. Saat lupa 1 kata, pikiran langsung macet. Hafalkan 3 poin inti atau alur ide ceritanya saja.

4. Kuasai 30 Detik Pertama
Latihlah kalimat pembukamu sampai lancar di luar kepala. Saat 30 detik pertama berhasil kamu lewati dengan senyuman dan nada rileks, sisa presentasimu akan mengalir jauh lebih ringan.

5. Cari 2 Orang yang Menatap Ramah
Tatap mata orang yang tersenyum atau mengangguk di barisan depan. Anggap mereka teman baikmu yang sedang antusias mendengarkan ceritamu.`,
  },
  {
    id: 'post-2',
    title: 'Rahasia Ice Breaking Asyik: Cara Mencairkan Suasana Tanpa Bikin Peserta Malu',
    slug: 'rahasia-ice-breaking-asyik',
    excerpt:
      'Cara fasilitator membaca dinamika ruangan dan memilih aktivitas pencair suasana yang seru, hangat, dan tidak bikin peserta canggung.',
    publishedDate: '28 Februari 2026',
    readTime: '5 menit baca',
    category: 'Fasilitasi & Kelas',
    tags: ['IceBreaking', 'Fasilitator', 'Komunikasi'],
    content: `Banyak orang merasa ngeri saat mendengar kata "ice breaking" karena takut dipaksa joget di depan umum atau disuruh melakukan hal-hal yang memalukan.

Sebagai fasilitator atau pemateri, tugas kita adalah membuat suasana kelas terasa aman dan menyenangkan, bukan membuat orang merasa tertekan.

3 Kunci Ice Breaking yang Disukai Peserta:
1. Penjelasan Singkat (Di Bawah 1 Menit)
Jangan pilih game yang peraturannya berbelit-belit. Kalau instruksinya saja butuh 5 menit, semangat peserta keburu hilang sebelum game dimulai.

2. Tanpa Hukuman yang Memalukan
Hindari hukuman coret muka, joget konyol, atau sanksi yang bikin peserta introvert merasa risih. Gantilah dengan apresiasi hangat bagi semua yang ikut serta.

3. Hubungkan Game ke Materi Pembelajaran
Ice breaking yang bagus punya jembatan makna. Misalnya, game menyusun kata bisa dijadikan refleksi betapa pentingnya kejelasan instruksi dalam komunikasi tim.

Dengan begitu, peserta tidak hanya tertawa lepas, tapi juga langsung siap masuk ke materi inti dengan pikiran segar.`,
  },
  {
    id: 'post-3',
    title: 'Menyusun Alur Materi Pelatihan: Dari Pembuka Menarik Sampai Penutup Berkesan',
    slug: 'menyusun-alur-materi-pelatihan',
    excerpt:
      'Struktur 3 babak sederhana yang bikin peserta tetap antusias menyimak dari menit pertama hingga akhir sesi tanpa rasa bosan.',
    publishedDate: '15 Februari 2026',
    readTime: '6 menit baca',
    category: 'Desain Pelatihan',
    tags: ['Fasilitator', 'TipsPresentasi', 'PublicSpeaking'],
    content: `Pernahkah kamu ikut sesi pelatihan di mana pematerinya pintar sekali, tapi kamu merasa mengantuk dan tersesat di tengah jalan? Sering kali masalahnya bukan di ilmunya, melainkan di cara menyusun alur ceritanya.

Gunakan rumus struktur 3 babak ini untuk materi apa pun:

1. Pembuka (Hook & Kenapa Ini Penting Bagi Mereka)
Jangan langsung pamer gelar atau definisi teori yang tebal. Mulailah dengan cerita masalah nyata yang sering mereka hadapi sehari-hari, lalu tunjukkan apa untungnya buat mereka jika menyimak sesi ini sampai habis.

2. Isi (Maksimal 3 Gagasan Utama dengan Contoh Nyata)
Otak manusia sulit mengingat lebih dari 3 ide besar dalam satu sesi. Pecah materi menjadi 3 bagian sederhana. Untuk setiap bagian, berikan rumus: Penjelasan Singkat -> Contoh Nyata -> Latihan Ringan.

3. Penutup (Rangkuman & Satu Aksi Kecil)
Akhiri sesi bukan cuma dengan kata "sekian dan terima kasih". Berikan rangkuman ringkas 1 menit dan tantang peserta untuk melakukan satu tindakan nyata besok pagi.

Ketika alur materimu rapi, kamu sebagai pembicara tidak akan kebingungan, dan peserta pulang dengan pemahaman yang utuh.`,
  },
  {
    id: 'post-4',
    title: 'Bicara Lebih Rileks: Cara Mengatur Pernapasan dan Intonasi Suara yang Enak Didengar',
    slug: 'cara-mengatur-pernapasan-intonasi-suara',
    excerpt:
      'Teknik vokal sederhana agar suaramu tidak cepat serak, terdengar hangat, dan tidak membosankan saat berbicara di depan forum.',
    publishedDate: '02 Februari 2026',
    readTime: '4 menit baca',
    category: 'Public Speaking',
    tags: ['PublicSpeaking', 'PercayaDiri', 'Komunikasi'],
    content: `Banyak pembicara yang baru 15 menit presentasi sudah merasa tenggorokannya kering dan kehabisan napas di ujung kalimat. Itu tanda bahwa kita masih bernapas dari dada, bukan dari diafragma.

Berikut latihan vokal 5 menit sebelum naik panggung:

1. Pernapasan Perut (Diafragma)
Letakkan tangan di perut. Tarik napas sampai perut mengembang, bukan bahu yang terangkat. Hembuskan perlahan dengan desisan "sssshhhh". Ini membuat fondasi suaramu bulat dan tidak melengking.

2. Bermain Tempo dan Jeda
Jangan berbicara seperti kereta cepat tanpa rem. Berikan jeda 1-2 detik setelah kamu menyampaikan poin penting. Jeda memberikan waktu bagi audiens untuk mencerna, sekaligus memberi kesempatan bagi paru-parumu untuk mengambil napas baru.

3. Hindari Nada Monoton
Bayangkan intonasi suaramu seperti lagu, ada nada tinggi saat bersemangat, nada sedang saat menjelaskan, dan nada rendah yang tenang saat memberikan kesimpulan penting.`,
  },
  {
    id: 'post-5',
    title: 'Tips Bikin Slide Presentasi yang Bersih, Nyaman Dilihat, dan Gampang Dipahami',
    slug: 'tips-bikin-slide-presentasi-bersih',
    excerpt:
      'Trik menyederhanakan slide presentasi agar tidak penuh dengan teks semrawut dan tetap berfokus pada pesan utamamu.',
    publishedDate: '20 Januari 2026',
    readTime: '5 menit baca',
    category: 'Tips Presentasi',
    tags: ['TipsPresentasi', 'Komunikasi', 'PublicSpeaking'],
    content: `Slide presentasi adalah alat bantu visual, bukan contekan naskah yang harus dibaca kata demi kata oleh pembicara.

Prinsip Sederhana Membuat Slide yang Nyaman:

1. Aturan Satu Ide per Slide
Jika ada dua topik berbeda, pisahkan menjadi dua slide. Lebih baik punya 15 slide yang bersih dan berganti cepat, daripada 5 slide yang penuh sesak seperti koran.

2. Kurangi Teks Paragraf, Pakai Kata Kunci
Audiens tidak bisa membaca paragraf panjang sekaligus mendengarkan suaramu secara bersamaan. Ambil inti sari kata kuncinya saja, biar suaramu yang menjelaskan rinciannya.

3. Kontras Warna yang Jelas
Gunakan latar belakang bersih (seperti putih atau abu-abu terang) dengan tulisan gelap yang kontras. Hindari warna teks yang mirip dengan warna latar karena bikin mata cepat lelah.

Ketika slide-mu bersih, perhatian audiens akan kembali tertuju kepadamu sebagai pembicara utama.`,
  },
  {
    id: 'post-6',
    title: 'Menghadapi Pertanyaan Sulit di Tengah Presentasi Tanpa Panik',
    slug: 'menghadapi-pertanyaan-sulit-tanpa-panik',
    excerpt:
      'Cara cerdas menjawab pertanyaan tak terduga dengan tenang, profesional, dan tetap menjaga kendali ruang kelas.',
    publishedDate: '10 Januari 2026',
    readTime: '4 menit baca',
    category: 'Public Speaking',
    tags: ['PercayaDiri', 'PublicSpeaking', 'TipsPresentasi'],
    content: `Salah satu ketakutan terbesar saat presentasi adalah ketika seseorang di ruangan mengajukan pertanyaan yang kita tidak tahu jawabannya.

Ingat satu hal: Sebagai pembicara, kamu tidak dituntut menjadi ensiklopedia berjalan yang tahu segala hal di dunia.

Langkah Menjawab dengan Tenang:
1. Dengarkan Sampai Selesai & Beri Apresiasi
Jangan potong pertanyaan orang. Setelah selesai, katakan: "Pertanyaan yang sangat bagus dan jeli, terima kasih sudah menanyakannya."

2. Ulangi Inti Pertanyaannya
Mengulangi pertanyaan memastikan seluruh ruangan mendengar, sekaligus memberimu waktu 3-5 detik ekstra untuk berpikir dengan jernih.

3. Jika Memang Belum Tahu, Akui dengan Elegan
Katakan dengan jujur: "Untuk data spesifik tersebut, saya belum memegangnya saat ini. Boleh minta kontakmu nanti supaya saya kirimkan referensi lengkapnya setelah sesi ini?" Sikap jujur jauh lebih dihargai daripada mengarang jawaban asal-asalan.`,
  },
  {
    id: 'post-7',
    title: '3 Game Singkat 3 Menit yang Langsung Bikin Kelas Mengantuk Jadi Melek Lagi',
    slug: '3-game-singkat-penghilang-ngantuk',
    excerpt:
      'Aktivitas energizer praktis tanpa alat ribet untuk menghidupkan kembali suasana kelas setelah jam makan siang.',
    publishedDate: '26 Desember 2025',
    readTime: '4 menit baca',
    category: 'Ice Breaking',
    tags: ['IceBreaking', 'Fasilitator', 'PercayaDiri'],
    content: `Jam rawan dalam sesi pelatihan biasanya adalah pukul 13.30 sampai 14.30 WIB, tepat setelah makan siang. Kalau kamu paksakan langsung materi berat, mata peserta akan mulai redup satu per satu.

Berikut 3 game cepat yang bisa kamu pakai:

1. Game "Tepuk Ganjil Genap"
Minta seluruh peserta berdiri. Jika fasilitator menyebut angka ganjil, mereka tepuk 1x. Jika angka genap, mereka melompat kecil di tempat. Permainan refleks sederhana ini mengalirkan darah kembali ke otak dalam 2 menit.

2. Game "Tebak Kata Tanpa Suara"
Bagi peserta berpasangan. Satu orang memeragakan satu kata terkait topik kelas hanya dengan gerakan tubuh, pasangannya menebak dalam 30 detik. Tawa yang pecah seketika melenyapkan rasa kantuk.

3. Peregangan "Pohon Tertimpa Angin"
Instruksikan peserta merentangkan tangan ke atas dan condong ke kanan-kiri bersama-sama. Gerakan fisik ringan terbukti secara ilmiah mengembalikan pasokan oksigen ke paru-paru.`,
  },
  {
    id: 'post-8',
    title: 'Seni Mendengarkan Aktif: Cara Bikin Lawan Bicara Merasa Dihargai Sepenuhnya',
    slug: 'seni-mendengarkan-aktif-komunikasi',
    excerpt:
      'Kunci komunikasi bukan cuma pandai merangkai kata, tapi kesediaan membuka telinga dan hati untuk memahami orang lain.',
    publishedDate: '12 Desember 2025',
    readTime: '5 menit baca',
    category: 'Komunikasi Efektif',
    tags: ['Komunikasi', 'PercayaDiri', 'Fasilitator'],
    content: `Sebagian besar masalah dalam tim kantor atau organisasi bukan karena kurang bicara, melainkan karena semua orang sibuk memikirkan apa yang mau mereka katakan selanjutnya tanpa benar-benar menyimak.

Prinsip Mendengarkan Aktif (Active Listening):
- Letakkan Gawai & Berikan Kontak Mata Hangat
Ketika orang lain sedang berbicara, jauhkan layar ponsel. Hadirlah seutuhnya di momen tersebut.

- Jangan Memotong Kalimat
Tahan dorongan untuk langsung menyanggah atau memberi saran sebelum lawan bicaramu menyelesaikan kalimatnya secara utuh.

- Gunakan Parafrasa Konfirmasi
Setelah mereka selesai, cobalah konfirmasi dengan lembut: "Jadi maksudmu seperti ini ya... apakah pemahamanku sudah tepat?" Kalimat ini menunjukkan bahwa kamu benar-benar peduli pada apa yang mereka sampaikan.`,
  },
  {
    id: 'post-9',
    title: 'Bahasa Tubuh yang Bikin Kamu Terlihat Ramah Sekaligus Meyakinkan di Panggung',
    slug: 'bahasa-tubuh-ramah-dan-meyakinkan',
    excerpt:
      'Panduan posisi tangan, tatapan mata, dan cara berdiri yang memancarkan ketenangan serta keterbukaan kepada audiens.',
    publishedDate: '28 November 2025',
    readTime: '5 menit baca',
    category: 'Public Speaking',
    tags: ['PublicSpeaking', 'PercayaDiri', 'TipsPresentasi'],
    content: `Sebelum kamu mengucapkan sepatah kata pun di panggung, audiens sudah membaca pesan lewat bahasa tubuhmu.

Hindari Kebiasaan Ini:
- Tangan masuk ke dalam saku celana terus-menerus (terkesan menyembunyikan sesuatu atau acuh).
- Melipat tangan di dada (terkesan defensif atau tertutup).
- Mondar-mandir tanpa tujuan jelas seperti orang resah.

Coba Terapkan Gestur Ini:
1. Posisi Berdiri Segitiga Kokoh
Buka kaki selebar bahu. Tumpuan badan seimbang di kedua kaki agar kamu tidak bergoyang ke kanan dan kiri.

2. Posisi Tangan di "Area Kotak Kejujuran"
Biarkan tangan terbuka di area antara pusar dan dada. Gunakan telapak tangan terbuka saat menjelaskan ide untuk memberikan kesan ramah dan terbuka.

3. Senyum Hangat Tulus di 5 Detik Pertama
Senyuman pertama yang tulus langsung mencairkan dinding jarak antara kamu dan audiens.`,
  },
  {
    id: 'post-10',
    title: 'Cara Mengajak Peserta yang Pendiam Supaya Mau Ikut Terlibat Tanpa Dipaksa',
    slug: 'mengajak-peserta-pendiam-terlibat',
    excerpt:
      'Trik fasilitator mendekati peserta introvert dengan cara yang santai, aman, dan tanpa rasa terintimidasi.',
    publishedDate: '15 November 2025',
    readTime: '4 menit baca',
    category: 'Fasilitasi & Kelas',
    tags: ['Fasilitator', 'IceBreaking', 'Komunikasi'],
    content: `Di hampir setiap kelas pelatihan, selalu ada peserta yang duduk paling belakang dan sangat hemat bicara. Bukan karena mereka tidak peduli, tapi sering kali karena mereka butuh waktu untuk merasa aman di lingkungan baru.

Cara Melibatkan Mereka Secara Nyaman:
1. Gunakan Format Diskusi Berpasangan (Think-Pair-Share)
Daripada langsung menembak pertanyaan ke forum besar, minta mereka mengobrol dulu dengan teman di sebelahnya selama 2 menit. Setelah itu, baru minta salah satu pasangan membagikan obrolannya. Berbicara berdua jauh lebih ringan daripada bicara di depan 30 orang.

2. Berikan Pilihan Media Tertulis
Sediakan sticky notes atau kuis interaktif ponsel. Orang yang pemalu saat bicara lisan sering kali punya pemikiran paling mendalam saat menuliskan ide.

3. Hargai Jawaban Kecil Mereka
Saat mereka mulai berani berpendapat, berikan apresiasi tulus. Ini membangun rasa percaya diri mereka untuk sesi-sesi berikutnya.`,
  },
  {
    id: 'post-11',
    title: 'Membuka Presentasi dalam 30 Detik Pertama: Trik Hook yang Bikin Orang Langsung Noleh',
    slug: 'trik-hook-pembuka-presentasi-30-detik',
    excerpt:
      '3 formula kalimat pembuka yang langsung merebut perhatian audiens daripada sekadar perkenalan nama yang membosankan.',
    publishedDate: '01 November 2025',
    readTime: '4 menit baca',
    category: 'Public Speaking',
    tags: ['PublicSpeaking', 'TipsPresentasi', 'PercayaDiri'],
    content: `Kebanyakan orang membuka presentasi dengan gaya yang sangat standar: "Selamat pagi semuanya, nama saya Budi, hari ini saya akan mempresentasikan tentang topik X."

Gaya pembuka seperti itu sering membuat audiens langsung melirik ke layar ponsel mereka.

Coba Gunakan 3 Formula Hook Ini:

1. Lempar Pertanyaan Imajinasi
"Pernahkah kamu merasa sudah menyiapkan materi presentasi berhari-hari, tapi begitu berdiri di panggung tiba-tiba semua ide hilang begitu saja?" Semua orang yang pernah mengalaminya akan langsung mengangguk dan memperhatikanmu.

2. Mulai dengan Fakta Mengejutkan
"Tahukah kamu, survei membuktikan bahwa ketakutan nomor satu bagi banyak orang bukanlah kematian, melainkan berbicara di hadapan orang banyak?"

3. Buka dengan Cerita Singkat Beremosi
"Tiga tahun lalu, saya pernah berdiri di panggung ini dengan lutut yang gemetar hebat sampai kartu catatan saya jatuh ke lantai..." Cerita pribadi yang jujur selalu menarik empati audiens secara instan.`,
  },
  {
    id: 'post-12',
    title: 'Ice Breaking Santai untuk Kelas Online Zoom atau Google Meet yang Seru',
    slug: 'ice-breaking-santai-kelas-online',
    excerpt:
      'Ide permainan virtual interaktif tanpa perlu instal aplikasi tambahan yang bikin peserta online aktif menyalakan kamera.',
    publishedDate: '18 Oktober 2025',
    readTime: '5 menit baca',
    category: 'Ice Breaking Virtual',
    tags: ['IceBreaking', 'Fasilitator', 'Komunikasi'],
    content: `Tantangan terbesar kelas online (Zoom atau Google Meet) adalah layar hitam di mana hampir semua peserta mematikan kamera dan mikrofon.

Berikut 2 game online sederhana yang terbukti ampuh:

1. Game "Tunjukkan Benda Berwarna Biru di Mejamu"
Beri waktu 30 detik bagi semua peserta untuk mencari benda berwarna tertentu di dekat mereka lalu menunjukkannya ke kamera. Seketika layar akan penuh dengan peserta yang tersenyum memperlihatkan cangkir, buku, atau bolpoin mereka.

2. Kuis Cepat di Kolom Chat
Ajukan pertanyaan lucu dan santai di kolom chat, misalnya: "Jika kamu harus makan satu jenis makanan seumur hidup, kamu pilih mi instan atau nasi goreng?" Mintalah mereka mengetik serentak dalam hitungan ketiga. Obrolan di chat langsung ramai dan akrab.

Begitu rasa canggung di ruang virtual mencair, penyampaian materi online akan terasa jauh lebih hidup dan dua arah.`,
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'gal-1',
    title: 'Dokumentasi Akbar: Program Sinergi & Pengembangan Talenta',
    description: 'Foto bersama outdoor puluhan peserta pelatihan dan fasilitator dalam balutan seragam polo marun, menandai penutupan sesi sinergi tim.',
    quote: 'Energi kebersamaan itu menular; begitu satu orang berani tersenyum dan membuka diri, seisi ruangan ikut terhubung.',
    shortStory: 'Sesi luar ruangan ini membuktikan bahwa batas kaku antardivisi bisa runtuh hanya dalam beberapa jam permainan kolaboratif. Di awal pagi, peserta masih bergerombol dengan rekan satu divisi masing-masing. Namun setelah serangkaian simulasi pemecahan masalah dan tantangan kekompakan tanpa sekat jabatan, tawa lepas dan kerja sama mengalir alami. Momen penutupan dengan foto bersama 50+ peserta berseragam polo marun ini menjadi saksi bahwa sinergi sejati tumbuh saat kita berani saling percaya.',
    takeaway: 'Komunikasi tim yang sehat berawal dari ruang aman di mana setiap orang merasa setara dan didengar tanpa rasa takut dihakimi.',
    imageUrl: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80',
    fallbackUrl: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80',
    category: 'corporate',
    date: 'Maret 2026',
    location: 'Area Outdoor Pelatihan, Bandung',
    client: 'Program Pengembangan Talenta Korporasi',
    participantCount: 50,
    highlights: ['Foto Bersama 50+ Peserta', 'Energi Positif & Kebersamaan', 'Penutupan Program Sinergi'],
  },
  {
    id: 'gal-2',
    title: 'Pelatihan ASB: Manajemen Tim Efektif & Sinergi',
    description: 'Sesi pelatihan in-house di ruang training korporat dengan pemaparan strategi komunikasi kepemimpinan dan manajemen tim efektif.',
    quote: 'Pemimpin yang hebat bukan yang paling banyak bicara, melainkan yang paling jeli mendengarkan kebutuhan timnya.',
    shortStory: 'Dalam sesi in-house training ini, fokus utama kami adalah merombak gaya rapat yang biasanya tegang menjadi ruang diskusi yang cair dan solutif. Melalui simulasi peran (roleplay), para team lead belajar menyampaikan masukan dengan empati, mendengarkan aktif tanpa menyela, dan merangkum kesimpulan dengan jelas dalam 60 detik. Peserta mengaku dinamika kerja harian mereka langsung berubah lebih suportif setelah kelas ini.',
    takeaway: 'Gunakan rumus apresiasi dulu, baru kemudian jelaskan solusi konkret. Percakapan tersulit pun akan terasa jauh lebih ringan.',
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
    fallbackUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
    category: 'corporate',
    date: 'Februari 2026',
    location: 'Corporate Training Hall, Jakarta',
    client: 'ASB Management Team',
    participantCount: 30,
    highlights: ['Pelatihan ASB', 'Manajemen Tim Efektif', 'Presentasi Audiens Fokus'],
  },
  {
    id: 'gal-3',
    title: 'Workshop Public Speaking: Olah Vokal & Gestur',
    description: 'Sesi interaktif fasilitator memandu teknik artikulasi, kontak mata, dan penggunaan bahasa tubuh terbuka di hadapan peserta meja U-Shape.',
    quote: 'Gemetar itu wajar, tapi suara yang bulat dan tatapan mata yang hangat bisa dilatih sampai jadi kebiasaan alami.',
    shortStory: 'Di kelas meja U-Shape ini, setiap peserta mendapat panggung aman untuk mempraktikkan olah vokal diafragma dan bahasa tubuh terbuka. Salah satu peserta yang awalnya mengaku tangannya selalu berkeringat dingin saat memegang mikrofon, berhasil membawakan pembuka presentasi 2 menit dengan nada tenang dan meyakinkan setelah mencoba latihan pernapasan 4-4-4 bersama Alfi.',
    takeaway: 'Kuasai 30 detik pertama dengan napas perut dan kontak mata ramah. 90% rasa panik panggung akan mereda seketika.',
    imageUrl: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1200&q=80',
    fallbackUrl: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1200&q=80',
    category: 'corporate',
    date: 'Februari 2026',
    location: 'Ruang Seminar Modern, Jakarta',
    client: 'Professional Development Series',
    participantCount: 25,
    highlights: ['Praktik Panggung & Olah Vokal', 'Format Interaktif U-Shape', 'Feedback Instan'],
  },
  {
    id: 'gal-4',
    title: 'Sesi Kelulusan Batch Workshop Komunikasi Korporat',
    description: 'Momen kebersamaan peserta dan trainer seusai simulasi presentasi akhir batch pelatihan komunikasi efektif internal.',
    quote: 'Kelulusan bukan garis akhir, melainkan awal keberanian untuk bersuara lantang di meja-meja keputusan kantor.',
    shortStory: 'Momen kelulusan batch ini selalu menggetarkan hati. Selama 3 minggu pelatihan intensif, peserta melewati tantangan dari presentasi 1 lawan 1 hingga simulasi pitching di hadapan manajemen. Melihat transformasi dari yang awalnya cemas menjadi percaya diri saat memaparkan ide di panggung penutupan adalah hadiah terbaik bagi seorang fasilitator.',
    takeaway: 'Rasa percaya diri bukan hadiah sulap semalam, melainkan buah dari latihan kecil yang diulang secara konsisten.',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
    fallbackUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
    category: 'corporate',
    date: 'Januari 2026',
    location: 'Training Room Perusahaan, Jakarta Selatan',
    client: 'Divisi Operasional & Layanan',
    participantCount: 16,
    highlights: ['Simulasi Presentasi Akhir', 'Kelulusan Batch Lengkap', 'Apresiasi Peserta Teraktif'],
  },
  {
    id: 'gal-5',
    title: 'Konsolidasi Tim & Workshop Budaya Kerja Positif',
    description: 'Sesi diskusi kelompok dan sharing session yang diakhiri foto bersama ceria penuh semangat kolaborasi di ruang rapat kantor.',
    quote: 'Suasana kerja yang asik bukan kebetulan, tapi hasil kesepakatan sadar untuk saling menghargai ide-ide kecil.',
    shortStory: 'Sesi konsolidasi tim di innovation lounge ini membongkar hambatan komunikasi tak terlihat antarbagian. Dengan metode sticky notes anonim dan diskusi melingkar santai, tim berhasil menumpahkan ganjalan pekerjaan secara konstruktif dan pulang dengan senyuman serta komitmen baru yang menyatukan mereka.',
    takeaway: 'Kepercayaan tim tumbuh saat komunikasi tidak hanya berisi instruksi tugas, tetapi juga perhatian personal yang tulus.',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    fallbackUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    category: 'bootcamp',
    date: 'Januari 2026',
    location: 'Innovation Office Lounge, Jakarta',
    client: 'Tim Project & Sustainability',
    participantCount: 18,
    highlights: ['Budaya Kolaborasi Terbuka', 'Suasana Kelas Ceria', 'Refleksi Nilai Bersama'],
  },
  {
    id: 'gal-6',
    title: 'Presentasi Strategis & Evaluasi Dinamika Tim',
    description: 'Diskusi meja bundar dan pemaparan di whiteboard untuk menganalisis hambatan komunikasi internal dan menyusun peta solusi.',
    quote: 'Ide yang brilian akan sia-sia jika dibungkus dengan cara komunikasi yang rumit dan berputar-putar.',
    shortStory: 'Di sesi ruang rapat eksekutif ini, kami membedah whiteboard interaktif untuk menyederhanakan data angka yang rumit menjadi narasi visual yang renyah dipahami. Peserta diajak berpikir dari sudut pandang pendengar: "Apa manfaat ide ini untuk kelanjutan operasional kita besok pagi?"',
    takeaway: 'Sederhanakan pesanmu sampai anak usia 12 tahun pun paham intisarinya. Kejelasan adalah bentuk tertinggi dari keahlian.',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    fallbackUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    category: 'corporate',
    date: 'Desember 2025',
    location: 'Executive Boardroom, Jakarta Pusat',
    client: 'Strategic Team Leaders',
    participantCount: 12,
    highlights: ['Analisis Whiteboard Interaktif', 'Pemecahan Masalah Rapat', 'Action Plan Tim'],
  },
  {
    id: 'gal-7',
    title: 'Diskusi Kolaboratif & Pemecahan Masalah Kelompok',
    description: 'Praktikum kelompok kecil menggunakan media tablet dan laptop dalam menganalisis studi kasus komunikasi antardivisi.',
    quote: 'Dua kepala yang saling mendukung selalu menghasilkan ide yang jauh lebih cerdas dibanding satu kepala yang egois.',
    shortStory: 'Peserta bootcamp dibagi menjadi kelompok kecil beranggotakan 4-5 orang untuk memecahkan kasus krisis komunikasi di dunia nyata. Dalam 45 menit praktikum, mereka belajar membagi peran juru bicara, merumuskan poin argumen, dan saling melengkapi masukan tanpa ada yang mendominasi pembicaraan.',
    takeaway: 'Kolaborasi sejati adalah seni meramu sudut pandang yang berbeda menjadi satu melodi solusi yang harmonis.',
    imageUrl: 'https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?auto=format&fit=crop&w=1200&q=80',
    fallbackUrl: 'https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?auto=format&fit=crop&w=1200&q=80',
    category: 'bootcamp',
    date: 'Desember 2025',
    location: 'Creative Learning Space, Tangerang',
    client: 'Bootcamp Leadership Muda',
    participantCount: 20,
    highlights: ['Kolaborasi Berbasis Perangkat Digital', 'Dinamika Kelompok Hangat', 'Presentasi Singkat'],
  },
  {
    id: 'gal-8',
    title: 'Seminar Binar Academy: Komunikasi & Fasilitasi Digital',
    description: 'Sesi seminar inspiratif di panggung auditorium membahas pentingnya keterampilan komunikasi manusiawi di era transformasi digital.',
    quote: 'Di era digital yang serba cepat, kehangatan manusiawi dalam berkomunikasi justru menjadi keunggulan paling mahal.',
    shortStory: 'Berdiri di depan puluhan talenta digital Binar Academy, kami mengupas seni mempertahankan perhatian audiens di dunia yang penuh distraksi notifikasi gawai. Kuncinya adalah interaktivitas berkelanjutan: libatkan mereka setiap 3-4 menit dengan pertanyaan reflektif atau kuis cepat.',
    takeaway: 'Jangan jadikan audiens penonton pasif. Jadikan mereka rekan seperjalanan dalam petualangan cerita presentasimu.',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    fallbackUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    category: 'university',
    date: 'November 2025',
    location: 'Auditorium Binar Academy, Jakarta',
    client: 'Binar Academy Community',
    participantCount: 45,
    highlights: ['Komunikasi di Era Digital', 'Sesi Tanya Jawab Hangat', 'Sharing Pengalaman Nyata'],
  },
  {
    id: 'gal-9',
    title: 'Customer Journey Mapping & Interaksi Konsumen',
    description: 'Fasilitasi pemetaan diagram alur pengalaman pelanggan pada flipchart dengan pelibatan aktif seluruh anggota kelompok.',
    quote: 'Mendengarkan keluhan konsumen dengan tulus adalah langkah awal membangun kesetiaan tanpa syarat.',
    shortStory: 'Fasilitasi flipchart visual ini memandu tim customer experience memetakan titik-titik emosi pelanggan saat berinteraksi dengan layanan. Dari momen bingung hingga lega, peserta belajar memilih kata-kata empati yang tepat untuk meredakan kekecewaan konsumen di lapangan.',
    takeaway: 'Empati bukan sekadar berkata "kami mengerti", tetapi hadir mencari solusi konkret dengan nada suara yang tenang.',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80',
    fallbackUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80',
    category: 'corporate',
    date: 'November 2025',
    location: 'Meeting Room Korporasi, Jakarta',
    client: 'Divisi Customer Experience',
    participantCount: 15,
    highlights: ['Fasilitasi Flipchart Visual', 'Customer Journey Mapping', 'Diskusi Kasus Konsumen'],
  },
  {
    id: 'gal-10',
    title: 'Teknik Gestur Panggung & Bahasa Tubuh',
    description: 'Pelatihan teknik komunikasi non-verbal, olah vokal, dan kontrol panggung untuk tampil memikat dan meyakinkan di depan umum.',
    quote: 'Tubuhmu berbicara lebih dulu sebelum bibirmu sempat mengeluarkan kata pertama di atas panggung.',
    shortStory: 'Di kelas ini, kami melatih gestur kotak kejujuran (open palm gestures) dan postur berdiri kokoh segitiga. Peserta yang terbiasa memasukkan tangan ke saku celana atau melipat tangan di dada diajak merasakan betapa gestur terbuka langsung membuat audiens merasa disambut dengan hangat.',
    takeaway: 'Biarkan telapak tanganmu terbuka menghadap ke depan. Itu sinyal universal alam bawah sadar bahwa kamu tulus dan dapat dipercaya.',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',
    fallbackUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',
    category: 'university',
    date: 'Oktober 2025',
    location: 'Ruang Kelas Pelatihan, Bandung',
    client: 'Komunitas Public Speaking Muda',
    participantCount: 28,
    highlights: ['Bahasa Tubuh & Gestur', 'Kekuatan Gestur Panggung', 'Praktik Satu per Satu'],
  },
  {
    id: 'gal-11',
    title: 'Circle Forum: Sesi Berbagi Pengalaman & Refleksi Kelas',
    description: 'Metode forum melingkar santai tanpa sekat meja untuk mendorong keterbukaan emosional dan active listening antar peserta.',
    quote: 'Saat lingkaran dibentuk tanpa meja pembatas, ego runtuh dan kejujuran hati mulai berbicara.',
    shortStory: 'Metode forum melingkar santai di ruang terbuka Yogyakarta ini menjadi salah satu sesi paling menyentuh. Tanpa panggung dan tanpa mikrofon, peserta bergantian menceritakan kegagalan dan ketakutan terbesar mereka saat memimpin. Ruangan hening, penuh rasa hormat, dan diakhiri dengan tepuk tangan saling menguatkan.',
    takeaway: 'Kerapuhan (vulnerability) bukan tanda kelemahan, melainkan jembatan terkuat untuk membangun persaudaraan sejati.',
    imageUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80',
    fallbackUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80',
    category: 'bootcamp',
    date: 'Oktober 2025',
    location: 'Open Space Center, Yogyakarta',
    client: 'Youth Leadership Program',
    participantCount: 22,
    highlights: ['Format Forum Melingkar', 'Active Listening Eksploratif', 'Refleksi Pribadi Peserta'],
  },
  {
    id: 'gal-12',
    title: 'Maxwell Leadership Session: Kepemimpinan Berkarakter',
    description: 'Workshop eksklusif Maxwell Leadership yang dihadiri para profesional dan eksekutif untuk memperkuat karakter kepemimpinan.',
    quote: 'Kepemimpinan bukan tentang gelar jabatan di kartu nama, melainkan pengaruh positif yang kita tinggalkan di hati orang lain.',
    shortStory: 'Sesi eksklusif bersama para profesional dan eksekutif ini menggali 5 tingkatan kepemimpinan John C. Maxwell. Kami membedah bagaimana seorang leader memfasilitasi dialog dua arah dengan tim bawahan agar mereka merasa diberdayakan, bukan sekadar diperintah.',
    takeaway: 'Orang tidak peduli seberapa banyak kamu tahu, sampai mereka tahu seberapa besar kamu peduli pada mereka.',
    imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80',
    fallbackUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80',
    category: 'conference',
    date: 'September 2025',
    location: 'Function Room Hotel Bintang 5, Surabaya',
    client: 'Maxwell Leadership Network',
    participantCount: 35,
    highlights: ['Prinsip Kepemimpinan Maxwell', 'Foto Bersama Eksklusif', 'Networking Eksekutif'],
  },
  {
    id: 'gal-13',
    title: 'Keynote Speech: Menguasai Panggung di Depan Ratusan Audiens',
    description: 'Pemaparan akbar di podium seminar hall mengenai seni public speaking yang sistematis, runtut, dan berdampak kuat.',
    quote: 'Panggung besar bukan untuk menakut-nakuti, melainkan corong pengeras agar pesan kebaikanmu terdengar lebih luas.',
    shortStory: 'Di hadapan 150+ delegasi di grand convention hall Jakarta, pemaparan berdurasi 45 menit ini mengalir dinamis dengan slide visual minimalis dan cerita interaktif. Ketika seluruh ruangan serentak berdiri mengikuti simulasi gerakan vokal bersama, energi positifnya terasa menggetarkan seisi ruangan.',
    takeaway: 'Kuasai cerita pribadimu. Statistik membuat orang berpikir, tapi cerita tuluslah yang menggerakkan orang untuk bertindak.',
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80',
    fallbackUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80',
    category: 'conference',
    date: 'September 2025',
    location: 'Grand Convention Hall, Jakarta',
    client: 'Konferensi Komunikasi Nasional',
    participantCount: 150,
    highlights: ['Penguasaan Panggung Besar', 'Slide Visual Minimalis', 'Tepuk Tangan Antusias'],
  },
  {
    id: 'gal-14',
    title: 'Workshop Sales: Jurus Lengkap Menjual Pelengkap Garansi',
    description: 'Sesi pelatihan intensif komunikasi persuasi dan penanganan keberatan bagi tim sales lapangan korporasi ritel.',
    quote: 'Menjual bukan memaksa orang membeli, melainkan mengedukasi mereka agar terhindar dari risiko kerugian.',
    shortStory: 'Pelatihan sales lapangan di Surabaya ini menekankan teknik komunikasi persuasi berbasis solusi perlindungan. Tim sales diajak berlatih mengajukan pertanyaan pembuka yang menggali kekhawatiran pembeli gawai, alih-alih langsung mendesak dengan brosur promo yang melelahkan.',
    takeaway: 'Tanyakan kebutuhan mereka dulu. Penjualan yang berhasil selalu dimulai dari rasa ingin menolong, bukan target angka semata.',
    imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80',
    fallbackUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80',
    category: 'corporate',
    date: 'Agustus 2025',
    location: 'Ballroom Hotel Hartono, Surabaya',
    client: 'Retail Sales Force Division',
    participantCount: 40,
    highlights: ['Teknik Komunikasi Persuasif', 'Penanganan Keberatan Konsumen', 'Roleplay Sales Lapangan'],
  },
  {
    id: 'gal-15',
    title: 'Praktikum Dinamika Tim & Simulasi Lapangan',
    description: 'Sesi pemecahan masalah kolaboratif di mana tim bekerja sama menyelesaikan tantangan terstruktur dengan bimbingan fasilitator.',
    quote: 'Tantangan kelompok mengajarkan kita bahwa hasil terbaik diraih saat setiap anggota menyumbangkan kelebihannya.',
    shortStory: 'Di sesi praktikum studio Depok ini, peserta ditantang menyusun menara komunikasi menggunakan bahan sederhana dalam waktu terbatas. Simulasi ini melatih koordinasi pembagian tugas, mendengarkan instruksi di bawah tekanan waktu, dan cara tetap tenang serta saling mendukung saat rencana awal gagal.',
    takeaway: 'Saat situasi darurat melanda, nada suara yang tenang dan instruksi yang terstruktur jauh lebih berharga daripada kepanikan.',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    fallbackUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    category: 'bootcamp',
    date: 'Juli 2025',
    location: 'Workshop Studio, Depok',
    client: 'Pusat Pelatihan Komunitas',
    participantCount: 24,
    highlights: ['Praktikum Studi Kasus', 'Kerja Sama Tim Padu', 'Debriefing Pembelajaran'],
  },
  {
    id: 'gal-16',
    title: 'Temu Karyawan & Gathering Sinergi Antar Divisi',
    description: 'Sesi gathering akbar korporasi dengan ratusan karyawan, dimeriahkan ice breaking massal dan pembekalan motivasi kerja.',
    quote: 'Kapal yang besar hanya bisa melaju cepat jika semua pendayung mengayuh ke arah mata angin yang sama.',
    shortStory: 'Momen kebersamaan 80+ karyawan di hall pertemuan Jakarta ini diisi dengan refleksi perjalanan perusahaan dan apresiasi peran setiap lini kerja. Dari staf pendukung hingga manajer, semua larut dalam sesi komitmen bersama untuk saling menyemangati menghadapi target tahun depan.',
    takeaway: 'Rayakan kemenangan-kemenangan kecil timmu. Pengakuan yang tulus membakar semangat kerja jauh lebih lama daripada tuntutan.',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    fallbackUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    category: 'corporate',
    date: 'Juli 2025',
    location: 'Hall Pertemuan Telkom, Jakarta',
    client: 'Divisi SDM & Hubungan Karyawan',
    participantCount: 80,
    highlights: ['Gathering Massal Meriah', 'Ice Breaking Akbar', 'Membangun Kebanggaan Bersama'],
  },
  {
    id: 'gal-17',
    title: 'Sesi Energizer, Ice Breaking, & Team Harmony',
    description: 'Aktivitas santai di ruang studio berlantai kayu untuk mencairkan ketegangan, membangun keakraban, dan melatih kekompakan gerak.',
    quote: 'Ketika tubuh bergerak bebas dan pikiran rileks, kreativitas yang terpendam akan menyembul keluar tanpa dipaksa.',
    shortStory: 'Di studio berlantai kayu Bandung, kami mengajak peserta melepaskan sepatu dan bergerak santai mengikuti ritme musik permainan kelompok. Latihan peregangan ringan dan senam konsentrasi ini melunturkan kekakuan leher dan punggung setelah berjam-jam fokus menyimak materi.',
    takeaway: 'Istirahatkan tubuhmu setiap 60-90 menit saat belajar. Gerakan tubuh menyuplai kembali oksigen segar ke dalam sel-sel otak.',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    fallbackUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    category: 'bootcamp',
    date: 'Juni 2025',
    location: 'Studio Gerak & Kebugaran, Bandung',
    client: 'Kelas Pengembangan Diri Pemuda',
    participantCount: 22,
    highlights: ['Pencair Suasana Ramah', 'Refleksi Tanpa Tekanan', 'Keakraban Alami Peserta'],
  },
  {
    id: 'gal-18',
    title: 'Pelatihan Komunikasi Mahasiswa Baru: Bicara Pede di Depan Dosen & Forum',
    description: 'Workshop interaktif di auditorium kampus mendampingi mahasiswa baru agar percaya diri saat presentasi tugas dan aktif di organisasi.',
    quote: 'Suaramu di masa muda adalah modal paling berharga untuk menciptakan perubahan di sekitarmu.',
    shortStory: 'Menghadapi masa transisi dari bangku sekolah ke dunia perkuliahan sering kali membuat mahasiswa baru merasa minder dan takut bertanya. Di workshop ini, 65 mahasiswa baru berlatih cara menyusun argumen 3 poin saat presentasi tugas kuliah dan etika mengemukakan pendapat di forum organisasi mahasiswa tanpa rasa gentar.',
    takeaway: 'Berani salah di ruang latihan jauh lebih mulia daripada diam membisu selamanya karena takut dihakimi.',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    fallbackUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    category: 'university',
    date: 'Mei 2025',
    location: 'Auditorium Kampus Utama, Bandung',
    client: 'BEM & Himpunan Mahasiswa',
    participantCount: 65,
    highlights: ['Bicara Pede di Depan Kelas', 'Simulasi Presentasi Tugas', 'Antusiasme Mahasiswa Baru'],
  },
  {
    id: 'gal-19',
    title: 'Simposium Komunikasi Pemimpin Masa Depan: Seni Negosiasi & Public Speaking',
    description: 'Sesi plenary talk di hadapan para delegasi muda nasional membongkar strategi komunikasi efektif dan cara mengatasi demam panggung.',
    quote: 'Negosiasi terbaik bukanlah saat satu pihak menang mutlak, melainkan saat kedua pihak merasa dihargai martabatnya.',
    shortStory: 'Di hadapan 120 delegasi muda nasional di Plenary Hall JCC, sesi ini membongkar seni negosiasi win-win dan teknik panggung untuk menggalang dukungan publik. Melalui simulasi mediasi diplomasi, peserta mempraktikkan cara mencari titik temu di tengah perbedaan pandangan yang tajam.',
    takeaway: 'Kekuatan persuasi sejati terletak pada kemampuanmu melihat dunia dari kacamata orang yang sedang kamu ajak bicara.',
    imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80',
    fallbackUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80',
    category: 'conference',
    date: 'April 2025',
    location: 'Plenary Hall JCC, Jakarta',
    client: 'National Youth Forum',
    participantCount: 120,
    highlights: ['Plenary Talk 100+ Delegasi', 'Trik Mengatasi Demam Panggung', 'Tanya Jawab Interaktif'],
  },
];

export const CLIENT_LOGOS = [
  { name: 'Komunitas Pemuda Kreatif', category: 'Komunitas' },
  { name: 'Himpunan Mahasiswa Komunikasi', category: 'Kampus' },
  { name: 'Pusat Pengembangan Talenta', category: 'Lembaga Pelatihan' },
  { name: 'Klub Public Speaking Kampus', category: 'Organisasi Mahasiswa' },
  { name: 'Forum Pemimpin Muda', category: 'Komunitas' },
  { name: 'Ruang Kolaborasi Belajar', category: 'Inisiatif Edukasi' },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'LinkedIn', url: 'https://linkedin.com', handle: 'alfi-trainer', icon: 'Linkedin' },
  { name: 'Email', url: 'mailto:gratis2665@gmail.com', handle: 'gratis2665@gmail.com', icon: 'Mail' },
  { name: 'WhatsApp', url: 'https://wa.me/6281289214470', handle: '+62 812-8921-4470', icon: 'Phone' },
];

export const WHATSAPP_TEMPLATES: WhatsAppTemplate[] = [
  {
    id: 'undangan-workshop',
    title: 'Undangan Workshop & Pelatihan',
    description: 'Mengundang Alfi sebagai trainer atau fasilitator sesi workshop.',
    topic: 'Undangan Workshop',
    message:
      'Halo Mas Alfi, kami tertarik mengundang Mas Alfi sebagai trainer / fasilitator sesi workshop komunikasi dan public speaking. Bolehkah kami berkonsultasi mengenai ketersediaan jadwal dan proposal silabusnya?',
  },
  {
    id: 'sesi-mentoring-privat',
    title: 'Mentoring Privat 1-on-1',
    description: 'Sesi bimbingan privat untuk persiapan presentasi, pidato, atau wawancara.',
    topic: 'Mentoring Privat',
    message:
      'Halo Mas Alfi, saya ingin mengikuti bimbingan privat 1-on-1 untuk mengasah teknik presentasi dan rasa percaya diri berbicara di depan umum. Apakah ada slot jadwal dalam waktu dekat?',
  },
  {
    id: 'pelatihan-in-house-tim',
    title: 'Pelatihan Tim & Organisasi',
    description: 'Program pelatihan komunikasi dan sinergi tim untuk organisasi atau institusi.',
    topic: 'Pelatihan Tim',
    message:
      'Halo Mas Alfi, kami ingin menyelenggarakan pelatihan komunikasi efektif dan teamwork untuk tim kami. Mohon informasi modul pelatihan dan estimasi penawarannya. Terima kasih.',
  },
  {
    id: 'konsultasi-silabus',
    title: 'Konsultasi Topik & Silabus',
    description: 'Diskusi awal mengenai kebutuhan materi pelatihan yang sesuai untuk audiens Anda.',
    topic: 'Konsultasi Silabus',
    message:
      'Halo Mas Alfi, saya melihat portofolio pelatihan Mas Alfi dan ingin berdiskusi mengenai penyesuaian materi pelatihan yang cocok untuk kebutuhan peserta kami.',
  },
];
