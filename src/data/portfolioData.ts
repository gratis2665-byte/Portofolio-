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
  bio: 'Trainer dan fasilitator pelatihan berdedikasi tinggi yang fokus mendampingi peserta, mahasiswa, dan tim dalam membangun keterampilan komunikasi, public speaking, rasa percaya diri, serta manajemen waktu secara interaktif, ramah, dan aplikatif.',
  email: 'gratis2665@gmail.com',
  whatsappNumber: '6281289214470',
  linkedinUrl: 'https://linkedin.com',
  availabilityStatus: 'Tersedia untuk In-House Training, Workshop Kampus & Mentoring Privat',
  specializations: [
    'Teknik Presentasi & Public Speaking Memikat',
    'Komunikasi Efektif & Dinamika Kerja Sama Tim',
    'Manajemen Waktu, Prioritas & Produktivitas Harian',
    'Dasar Kepemimpinan & Pengambilan Keputusan (Pemula)',
    'Ice Breaking Dinamis & Fasilitasi Workshop Interaktif',
    'Penyusunan Modul Pelatihan & Workbook Aplikatif',
  ],
};

export const WORK_EXPERIENCES: WorkExperience[] = [
  {
    id: 'exp-1',
    role: 'Trainer & Fasilitator Pelatihan',
    company: 'Lembaga Pengembangan SDM & Talenta',
    location: 'Jakarta & Daring (Online)',
    period: '2024 — Sekarang',
    type: 'Penuh Waktu (Full-time)',
    description:
      'Merancang dan memfasilitasi program pelatihan komunikasi efektif, teknik presentasi, serta orientasi anggota tim baru. Menggunakan metode pembelajaran orang dewasa (andragogi) yang 80% berbasis simulasi, roleplay, dan diskusi interaktif.',
    achievements: [
      'Memfasilitasi 18+ batch kelas pelatihan dengan total lebih dari 280 peserta aktif.',
      'Meraih skor kepuasan peserta (CSAT) 4.92 / 5.00 pada aspek kejelasan penyampaian dan keramahan fasilitator.',
      'Mengembangkan 6 modul pelatihan dan buku panduan peserta (participant workbook) yang aplikatif.',
    ],
    skills: ['Public Speaking', 'Fasilitasi Workshop', 'Ice Breaking', 'Komunikasi Asertif', 'Andragogi', 'Desain Modul'],
  },
  {
    id: 'exp-2',
    role: 'Fasilitator Workshop & Pelatih Komunitas',
    company: 'Komunitas Pengembangan Diri & Komunikasi',
    location: 'Bandung & Hybrid',
    period: '2023 — 2024',
    type: 'Inisiatif Komunitas & Workshop',
    description:
      'Menginisiasi dan memimpin rangkaian workshop pengembangan rasa percaya diri, teknik berbicara di depan umum tanpa gugup, serta manajemen waktu untuk mahasiswa dan profesional muda.',
    achievements: [
      'Menyelenggarakan 14 sesi workshop bertajuk "Bicara Percaya Diri Tanpa Panik".',
      'Membantu lebih dari 85 peserta pemalu berani tampil berbicara di depan forum.',
      'Menyusun panduan latihan pernapasan diafragma dan artikulasi vokal yang dibagikan secara luas.',
    ],
    skills: ['Olah Vokal', 'Body Language', 'Mentoring 1-on-1', 'Dinamika Kelompok', 'Storytelling'],
  },
  {
    id: 'exp-3',
    role: 'Koordinator Pelatihan & Asisten Fasilitator',
    company: 'Pusat Pelatihan Keterampilan Mahasiswa',
    location: 'Bandung, Indonesia',
    period: '2022 — 2023',
    type: 'Paruh Waktu (Part-time)',
    description:
      'Membantu pengelolaan sarana pelatihan, menyiapkan lembar evaluasi peserta, mendampingi sesi ice breaking, dan memfasilitasi kelompok kecil dalam simulasi studi kasus.',
    achievements: [
      'Mengoordinasikan kelancaran 12 program seminar dan workshop kepemimpinan mahasiswa.',
      'Menyusun bank permainan ice breaking yang meningkatkan partisipasi aktif peserta hingga 50%.',
    ],
    skills: ['Koordinasi Acara', 'Evaluasi Pelatihan', 'Manajemen Kelas', 'Ice Breaking', 'Komunikasi Antar Personal'],
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
    label: 'Peserta Pelatihan Terbimbing',
    subtext: 'Mahasiswa, staf organisasi, dan profesional muda yang mengasah keterampilan komunikasi.',
    icon: 'Users',
  },
  {
    id: 'batches',
    value: '18+',
    numericValue: 18,
    suffix: '+',
    label: 'Batch Workshop & Pelatihan',
    subtext: 'Sesi workshop online maupun tatap muka langsung dengan pendekatan praktis interaktif.',
    icon: 'GraduationCap',
  },
  {
    id: 'satisfaction',
    value: '98.4%',
    numericValue: 98.4,
    suffix: '%',
    label: 'Tingkat Kepuasan Peserta (CSAT)',
    subtext: 'Rata-rata penilaian 4.92 / 5.00 pada aspek keramahan, kesabaran, dan kejelasan materi.',
    icon: 'Star',
  },
  {
    id: 'clients',
    value: '100%',
    numericValue: 100,
    suffix: '%',
    label: 'Praktik Interaktif Langsung',
    subtext: 'Setiap peserta aktif berlatih dan mendapatkan umpan balik langsung di setiap sesi.',
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
    title: '5 Langkah Praktis Mengatasi Rasa Gugup dan "Blank" Saat Bicara di Depan Umum',
    slug: 'mengatasi-gugup-bicara-depan-umum',
    excerpt:
      'Panduan sederhana untuk mengontrol detak jantung, rileksasi otot leher, dan menjaga alur pikiran tetap jernih saat berdiri di hadapan audiens.',
    publishedDate: '14 Maret 2026',
    readTime: '4 menit baca',
    category: 'Public Speaking',
    tags: ['PublicSpeaking', 'PercayaDiri', 'TipsPresentasi', 'Komunikasi'],
    content: `Rasa gugup sebelum berbicara di depan banyak orang adalah reaksi biologis yang sangat wajar. Tubuh kita sedang mempersiapkan energi tambahan. Namun, jika tidak dikelola, rasa gugup bisa membuat pikiran "blank" mendadak.

Berikut adalah 5 langkah praktis yang selalu saya bagikan kepada para peserta pelatihan:

1. Kuasai Teknik Pernapasan 4-4-4
Tarik napas perlahan melalui hidung selama 4 detik, tahan 4 detik, lalu hembuskan perlahan lewat mulut selama 4 detik. Lakukan 3-4 siklus tepat sebelum nama Anda dipanggil ke panggung untuk menurunkan ritme detak jantung.

2. Fokus pada Audiens, Bukan pada Diri Sendiri
Ketakutan muncul saat kita terlalu memikirkan: "Apakah saya terlihat konyol? Apakah jas saya rapi?" Ubah fokus Anda menjadi: "Informasi berharga apa yang ingin saya bagikan agar audiens terbantu hari ini?"

3. Jangan Menghafal Kata per Kata
Menghafal kalimat demi kalimat adalah jalan pintas menuju rasa panik. Begitu Anda lupa 1 kata, seluruh kalimat berikutnya runtuh. Hafalkanlah "peta konsep" atau 3 poin utama yang ingin Anda sampaikan.

4. 30 Detik Pertama yang Terlatih
Latihlah kalimat pembuka Anda hingga fasih di luar kepala. Begitu Anda sukses melewati 30 detik pertama dengan tenang, sisa presentasi akan mengalir dengan sendirinya.

5. Anggap Audiens Sebagai Sahabat Baru
Tatap mata 2 atau 3 orang di barisan depan yang memiliki tatapan ramah. Jadikan mereka jangkar ketenangan Anda di awal sesi.`,
  },
  {
    id: 'post-2',
    title: 'Seni Memilih Ice Breaking yang Menyenangkan Tanpa Bikin Audiens Canggung',
    slug: 'seni-ice-breaking-menyenangkan',
    excerpt:
      'Cara fasilitator membaca dinamika ruangan dan memilih aktivitas pencair suasana yang relevan, berenergi, serta tidak membuat peserta merasa dipaksa.',
    publishedDate: '28 Februari 2026',
    readTime: '5 menit baca',
    category: 'Fasilitasi Pelatihan',
    tags: ['IceBreaking', 'Fasilitator', 'Workshop', 'ManajemenKelas'],
    content: `Banyak peserta pelatihan merasa takut saat mendengar kata "ice breaking" karena khawatir disuruh melakukan hal-hal yang memalukan atau tidak ada hubungannya dengan topik pelatihan.

Fasilitator yang andal memahami bahwa tujuan ice breaking adalah:
- Membangun rasa aman secara psikologis di ruangan
- Mengaktifkan fokus dan konsentrasi peserta
- Menghubungkan peserta satu sama lain secara wajar

Prinsip Ice Breaking yang Berhasil:
1. Sederhana dalam Instruksi: Jangan pilih permainan yang membutuhkan penjelasan peraturan lebih dari 1 menit. Jika instruksinya rumit, energi peserta akan habis sebelum game dimulai.
2. Tidak Ada yang Dipermalukan: Hindari game dengan hukuman coret muka atau sanksi memalukan. Berikan apresiasi kepada seluruh partisipan.
3. Selalu Lakukan Debrief Singkat: Hubungkan aktivitas tersebut dengan materi. Misalnya, game menyusun kata bisa dijadikan pengantar untuk materi koordinasi tim.

Dengan pendekatan yang tepat, ice breaking menjadi jembatan ampuh untuk membuka gerbang partisipasi aktif peserta sepanjang sesi pelatihan.`,
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'gal-1',
    title: 'Dokumentasi Akbar: Program Sinergi & Pengembangan Talenta',
    description: 'Foto bersama outdoor puluhan peserta pelatihan dan fasilitator dalam balutan seragam polo marun, menandai penutupan sesi sinergi tim.',
    imageUrl: '/images/IMG_1897.jpeg',
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
    imageUrl: '/images/IMG_1896.jpeg',
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
    imageUrl: '/images/IMG_1895.jpeg',
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
    imageUrl: '/images/IMG_1894.jpeg',
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
    imageUrl: '/images/IMG_1893.jpeg',
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
    imageUrl: '/images/IMG_1892.jpeg',
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
    imageUrl: '/images/IMG_1891.jpeg',
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
    imageUrl: '/images/IMG_1890.jpeg',
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
    imageUrl: '/images/IMG_1889.jpeg',
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
    imageUrl: '/images/IMG_1888.jpeg',
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
    imageUrl: '/images/IMG_1886.jpeg',
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
    imageUrl: '/images/IMG_1883.jpeg',
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
    imageUrl: '/images/IMG_1884.jpeg',
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
    imageUrl: '/images/IMG_1885.jpeg',
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
    imageUrl: '/images/IMG_1882.jpeg',
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
    imageUrl: '/images/IMG_1881.jpeg',
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
    imageUrl: '/images/IMG_1880.jpeg',
    category: 'bootcamp',
    date: 'Juni 2025',
    location: 'Studio Gerak & Kebugaran, Bandung',
    client: 'Kelas Pengembangan Diri Pemuda',
    participantCount: 22,
    highlights: ['Pencair Suasana Ramah', 'Refleksi Tanpa Tekanan', 'Keakraban Alami Peserta'],
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
