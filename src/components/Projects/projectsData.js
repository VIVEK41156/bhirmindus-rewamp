export const PROJECTS = [
  {
    id: 'forex',
    slug: 'forex',
    title: 'Forex',
    eyebrow: 'Financial Markets',
    image: '/projects/cine-forex.png',
    accent: '#4A9FE8',
    align: 'left',
    teaser:
      'International currency and derivatives markets through our regulated partner platform — secure, scalable, and built for every trader level.',
    type: 'external',
    externalUrl: 'https://ngvtu.com/',
    externalLabel: 'Visit NGCB Trading Platform',
    paragraphs: [
      'Access international currency and derivatives markets through our partner platform — built for both new and experienced traders with secure infrastructure and competitive spreads.',
    ],
    detailSections: [
      {
        id: 'overview',
        position: [2.8, 0.15, 0],
        camera: { position: [0, 0.2, 6.8], lookAt: [2.8, 0.15, 0] },
        paragraphs: [
          'Birmingham Industries partners with Newton Global Commercial Business (NGCB) to offer access to major, minor, and exotic currency pairs through a secure trading environment.',
          'Whether you are learning the markets or managing advanced strategies, the platform combines low spreads, flexible leverage, and robust execution.',
        ],
      },
    ],
  },
  {
    id: 'commodity',
    slug: 'commodity-trading',
    title: 'Commodity Trading',
    eyebrow: 'Global Supply',
    image: '/projects/cine-commodity.png',
    accent: '#C8A96E',
    align: 'right',
    teaser:
      'Wholesale trading of pulses, rice, sugars, spices, and nuts — sourced from certified producers locally and worldwide.',
    paragraphs: [
      'Our teams having procured a wide variety of primary agricultural products have established a great platform for wholesale trading of these commodities.',
      'A variety of pulses, rices, sugars, spices and nuts are presently being sourced from certified producers both locally and internationally.',
      'We pride ourselves in focusing on clear and quality driven supply chains that deliver top notch raw produce to both national and overseas markets.',
    ],
    links: [
      { before: "You can view our range of products ", label: 'here', href: 'https://www.birmindus.com/products', after: '.' },
      { before: 'If you have any other requirements then do get in touch with our ', label: 'sales team', href: 'mailto:sales@birmindus.com', after: ' and we will do our best to meet your needs.' },
    ],
    detailSections: [
      { id: 'platform', position: [2.8, 0.2, 0], camera: { position: [0, 0.2, 6.8], lookAt: [2.8, 0.2, 0] }, paragraphs: ['Our teams having procured a wide variety of primary agricultural products have established a great platform for wholesale trading of these commodities.'] },
      { id: 'range', position: [-2.8, 0.3, -14], camera: { position: [0.2, 0.4, -6], lookAt: [-2.8, 0.3, -14] }, paragraphs: ['A variety of pulses, rices, sugars, spices and nuts are presently being sourced from certified producers both locally and internationally.'] },
      { id: 'quality', position: [2.8, 0, -28], camera: { position: [-0.1, 0.25, -20], lookAt: [2.8, 0, -28] }, paragraphs: ['We pride ourselves in focusing on clear and quality driven supply chains that deliver top notch raw produce to both national and overseas markets.'], links: [
        { before: "You can view our range of products ", label: 'here', href: 'https://www.birmindus.com/products', after: '.' },
        { before: 'If you have any other requirements then do get in touch with our ', label: 'sales team', href: 'mailto:sales@birmindus.com', after: ' and we will do our best to meet your needs.' },
      ]},
    ],
  },
  {
    id: 'manufacturing',
    slug: 'contract-manufacturing',
    title: 'Contract Manufacturing',
    eyebrow: 'Production Excellence',
    image: '/projects/cine-manufacturing.png',
    accent: '#3D3DB8',
    align: 'left',
    teaser:
      'ISO-certified starch and food-grade manufacturing at 8,000-ton capacity — from pilot batches to full commercial production.',
    paragraphs: [
      'Birmingham Industries delivers end-to-end contract manufacturing for food-grade starches, modified derivatives, and allied industrial products — combining scale, precision, and internationally audited processes.',
      'Our South Indian facility operates at 8,000-ton capacity with ISO 9001, ISO 22000, FSSC 22000, and BRCGS certifications — enabling partners to launch and scale without capital-intensive infrastructure.',
      'From pilot batches to full commercial runs, we align QA, logistics, and documentation with your specifications so your brand reaches markets faster.',
    ],
    links: [
      { before: 'Explore our product portfolio ', label: 'here', href: 'https://www.birmindus.com/products', after: ', or email our ' },
      { before: '', label: 'sales team', href: 'mailto:sales@birmindus.com', after: ' for manufacturing enquiries.' },
    ],
    detailSections: [
      { id: 'capability', position: [2.8, 0.15, 0], camera: { position: [0, 0.2, 6.8], lookAt: [2.8, 0.15, 0] }, paragraphs: ['Birmingham Industries delivers end-to-end contract manufacturing for food-grade starches, modified derivatives, and allied industrial products — combining scale, precision, and internationally audited processes.'] },
      { id: 'facility', position: [-2.8, 0.35, -14], camera: { position: [0.2, 0.45, -6], lookAt: [-2.8, 0.35, -14] }, paragraphs: ['Our South Indian facility operates at 8,000-ton capacity with ISO 9001, ISO 22000, FSSC 22000, and BRCGS certifications — enabling partners to launch and scale without capital-intensive infrastructure.'] },
      { id: 'partner', position: [0, 0.05, -28], camera: { position: [0, 0.3, -20], lookAt: [0, 0.05, -28] }, paragraphs: ['From pilot batches to full commercial runs, we align QA, logistics, and documentation with your specifications so your brand reaches markets faster.'], links: [
        { before: 'Explore our product portfolio ', label: 'here', href: 'https://www.birmindus.com/products', after: ', or email our ' },
        { before: '', label: 'sales team', href: 'mailto:sales@birmindus.com', after: ' for manufacturing enquiries.' },
      ]},
    ],
  },
  {
    id: 'farming',
    slug: 'corporate-farming',
    title: 'Corporate Farming',
    eyebrow: 'Land & Livestock',
    image: '/projects/cine-farming.png',
    accent: '#52B788',
    align: 'right',
    teaser:
      '500 acres in Tiruchirappalli — arable and pastoral farming, livestock, and sustainable land stewardship with local farmers and MIT Agriculture.',
    paragraphs: [
      'Birmingham Industries is the proud owner of 500 acres of agricultural land near to our associated Agricultural College in Tiruchirappalli District, Tamil Nadu, India. We have several projects running within this acreage including arable and pastoral farming.',
      'Agricultural practices are deep seated in the culture of this region and we are working hand in hand with local farmers who hold a wealth of knowledge on traditional farming practices. By enabling a collaboration between farmers and students from the MIT College of Agriculture, we hope to develop sustainable practices that respect the land and that can be shared.',
      'We are currently working with cattle and smaller ruminants like goats to evaluate their grazing patterns and their contribution to land fertility. Our livestock are well settled into the land and happily expanding their families; to the joy of our students, farmers and faculty.',
      'As an organization we endorse sustainable practices and plan to devote some of our land to the afforestation efforts being undertaken nationwide. We are always on the look out for partners who share such values and who can assist with identifying the correct methods for afforestation and other eco-friendly projects like renewable energy harnessing.',
    ],
    detailSections: [
      { id: 'land', position: [2.8, 0.2, 0], camera: { position: [0, 0.25, 6.8], lookAt: [2.8, 0.2, 0] }, paragraphs: ['Birmingham Industries is the proud owner of 500 acres of agricultural land near to our associated Agricultural College in Tiruchirappalli District, Tamil Nadu, India. We have several projects running within this acreage including arable and pastoral farming.'] },
      { id: 'collab', position: [-2.8, 0.3, -14], camera: { position: [0.2, 0.4, -6], lookAt: [-2.8, 0.3, -14] }, paragraphs: ['Agricultural practices are deep seated in the culture of this region and we are working hand in hand with local farmers who hold a wealth of knowledge on traditional farming practices. By enabling a collaboration between farmers and students from the MIT College of Agriculture, we hope to develop sustainable practices that respect the land and that can be shared.'] },
      { id: 'livestock', position: [2.8, -0.05, -28], camera: { position: [-0.15, 0.2, -20], lookAt: [2.8, -0.05, -28] }, paragraphs: ['We are currently working with cattle and smaller ruminants like goats to evaluate their grazing patterns and their contribution to land fertility. Our livestock are well settled into the land and happily expanding their families; to the joy of our students, farmers and faculty.'] },
      { id: 'sustain', position: [0, 0.1, -42], camera: { position: [0, 0.35, -34], lookAt: [0, 0.1, -42] }, paragraphs: ['As an organization we endorse sustainable practices and plan to devote some of our land to the afforestation efforts being undertaken nationwide. We are always on the look out for partners who share such values and who can assist with identifying the correct methods for afforestation and other eco-friendly projects like renewable energy harnessing.'] },
    ],
  },
  {
    id: 'ravens',
    slug: 'ravens-ait',
    title: "Raven's Ait",
    subtitle: '(4You Hospitality Services Ltd.)',
    eyebrow: 'Hospitality Partnership',
    image: '/projects/cine-ravens.png',
    accent: '#E2C994',
    align: 'left',
    teaser:
      'Thames island hospitality partnership — creating facilities for locals and visitors across generations.',
    paragraphs: [
      'The island has limitless potential to provide hospitality services and amenities to the neighborhood. We are excited to be on board in the creation of facilities that may be enjoyed by the locals and visitors for many generations to come.',
      'We promise to help create opportunities for exponential growth, whilst implementing new technologies and systems to achieve revenue and quality-oriented management and reporting. We look forward to a long and prosperous partnership with Raven’s Ait (4You Hospitality Services Ltd).',
    ],
    externalLink: { label: 'www.ravensait.co.uk', href: 'http://www.ravensait.co.uk/' },
    detailSections: [
      { id: 'intro', position: [2.8, 0.15, 0], camera: { position: [0, 0.2, 6.8], lookAt: [2.8, 0.15, 0] }, paragraphs: ["Raven's Ait — a premier riverside island venue on the Thames, partnered with 4You Hospitality Services Ltd."] },
      { id: 'vision', position: [-2.8, 0.25, -14], camera: { position: [0.15, 0.35, -6], lookAt: [-2.8, 0.25, -14] }, paragraphs: ['The island has limitless potential to provide hospitality services and amenities to the neighborhood. We are excited to be on board in the creation of facilities that may be enjoyed by the locals and visitors for many generations to come.'] },
      { id: 'growth', position: [0, 0.05, -28], camera: { position: [0, 0.28, -20], lookAt: [0, 0.05, -28] }, paragraphs: ['We promise to help create opportunities for exponential growth, whilst implementing new technologies and systems to achieve revenue and quality-oriented management and reporting. We look forward to a long and prosperous partnership with Raven’s Ait (4You Hospitality Services Ltd).'], externalLink: { label: 'www.ravensait.co.uk', href: 'http://www.ravensait.co.uk/' } },
    ],
  },
  {
    id: 'mit',
    slug: 'mit-institutions',
    title: 'Musiri Institute of Technology',
    eyebrow: 'Education Partnership',
    image: '/projects/cine-mit.png',
    accent: '#C32D1E',
    align: 'right',
    teaser:
      'Collaboration with MIT College of Agriculture and Technology — international standards and advanced agri-education across Tamil Nadu.',
    paragraphs: [
      'We are in collaboration with the Musiri Institute of Technology (MIT) in Tamil Nadu, India, in particular their College of Agriculture and Technology.',
      'We are working with the institution to bring management frameworks and operations upto international standards, which may in turn assist with developing an intercontinental knowledge share and exchange programme. Together, we continue to explore and apply advanced agricultural technologies and implement the latest techniques to enhance the learning experience of students.',
      'This multifaceted educational institution offers a wide range of courses including Polytechnic, Arts and Science, Teacher Education and Health Science, all delivered with comprehensive teaching practices that ready students for their industry specific work spaces.',
      '“Education starts in the early years”: this holistic approach is demonstrated within the CBSE School that is onsite and which caters to infant, junior and senior secondary students. The MIT group of institutions is situated over a large site spread over the Vellalapatti, Musiri and Trichy districts in Tamil Nadu.',
    ],
    externalLink: { label: 'www.mitinstitutions.org', href: 'https://mitinstitutions.org/' },
    detailSections: [
      { id: 'collab', position: [2.8, 0.2, 0], camera: { position: [0, 0.2, 6.8], lookAt: [2.8, 0.2, 0] }, paragraphs: ['We are in collaboration with the Musiri Institute of Technology (MIT) in Tamil Nadu, India, in particular their College of Agriculture and Technology.'] },
      { id: 'standards', position: [-2.8, 0.35, -14], camera: { position: [0.2, 0.45, -6], lookAt: [-2.8, 0.35, -14] }, paragraphs: ['We are working with the institution to bring management frameworks and operations upto international standards, which may in turn assist with developing an intercontinental knowledge share and exchange programme. Together, we continue to explore and apply advanced agricultural technologies and implement the latest techniques to enhance the learning experience of students.'] },
      { id: 'courses', position: [2.8, -0.05, -28], camera: { position: [-0.1, 0.25, -20], lookAt: [2.8, -0.05, -28] }, paragraphs: ['This multifaceted educational institution offers a wide range of courses including Polytechnic, Arts and Science, Teacher Education and Health Science, all delivered with comprehensive teaching practices that ready students for their industry specific work spaces.'] },
      { id: 'holistic', position: [0, 0.1, -42], camera: { position: [0, 0.32, -34], lookAt: [0, 0.1, -42] }, paragraphs: ['“Education starts in the early years”: this holistic approach is demonstrated within the CBSE School that is onsite and which caters to infant, junior and senior secondary students. The MIT group of institutions is situated over a large site spread over the Vellalapatti, Musiri and Trichy districts in Tamil Nadu.'], externalLink: { label: 'www.mitinstitutions.org', href: 'https://mitinstitutions.org/' } },
    ],
  },
];

export function getProjectBySlug(slug) {
  return PROJECTS.find((p) => p.slug === slug) ?? null;
}
