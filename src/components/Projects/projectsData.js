export const PROJECTS_HUB = [
  {
    id: 'forex',
    slug: null,
    title: 'Forex',
    tagline: 'International currency & financial markets',
    image: '/projects/project-forex.png',
    externalUrl: 'https://ngvtu.com/',
    accent: '#3D8FD8',
  },
  {
    id: 'commodity',
    slug: 'commodity-trading',
    title: 'Commodity Trading',
    tagline: 'Global agricultural procurement & wholesale supply',
    image: '/projects/project-commodity.png',
    accent: '#C8A96E',
  },
  {
    id: 'manufacturing',
    slug: 'contract-manufacturing',
    title: 'Contract Manufacturing',
    tagline: 'Certified large-scale starch & food-grade production',
    image: '/projects/project-manufacturing.png',
    accent: '#3D3DB8',
  },
  {
    id: 'farming',
    slug: 'corporate-farming',
    title: 'Corporate Farming',
    tagline: 'Sustainable agri-business across 500 acres',
    image: '/projects/project-farming.png',
    accent: '#4CAF6E',
  },
  {
    id: 'ravens',
    slug: 'ravens-ait',
    title: "Raven's Ait",
    tagline: 'Premium Thames island hospitality partnership',
    image: '/projects/project-ravens.png',
    accent: '#E2C994',
  },
  {
    id: 'mit',
    slug: 'mit-institutions',
    title: 'MIT Institutions',
    tagline: 'Education & agricultural technology collaboration',
    image: '/projects/project-mit.png',
    accent: '#C32D1E',
  },
];

export const PROJECT_DETAILS = {
  'commodity-trading': {
    title: 'Commodity Trading',
    eyebrow: 'Global Supply',
    image: '/projects/project-commodity.png',
    accent: '#C8A96E',
    sections: [
      {
        id: 'intro',
        position: [2.6, 0.2, 0],
        camera: { position: [0, 0.2, 6.5], lookAt: [2.6, 0.2, 0] },
        paragraphs: [
          'Our teams having procured a wide variety of primary agricultural products have established a great platform for wholesale trading of these commodities.',
        ],
      },
      {
        id: 'range',
        position: [-2.6, 0.35, -12],
        camera: { position: [0.2, 0.45, -4.5], lookAt: [-2.6, 0.35, -12] },
        paragraphs: [
          'A variety of pulses, rices, sugars, spices and nuts are presently being sourced from certified producers both locally and internationally.',
        ],
      },
      {
        id: 'quality',
        position: [2.6, -0.1, -24],
        camera: { position: [-0.15, 0.25, -16], lookAt: [2.6, -0.1, -24] },
        paragraphs: [
          'We pride ourselves in focusing on clear and quality driven supply chains that deliver top notch raw produce to both national and overseas markets.',
        ],
        links: [
          {
            type: 'inline',
            before: "You can view our range of products ",
            label: 'here',
            href: 'https://www.birmindus.com/products',
            after: '.',
          },
          {
            type: 'inline',
            before: 'If you have any other requirements then do get in touch with our ',
            label: 'sales team',
            href: 'mailto:sales@birmindus.com',
            after: ' and we will do our best to meet your needs.',
          },
        ],
      },
    ],
  },

  'contract-manufacturing': {
    title: 'Contract Manufacturing',
    eyebrow: 'Production Excellence',
    image: '/projects/project-manufacturing.png',
    accent: '#3D3DB8',
    sections: [
      {
        id: 'capability',
        position: [2.6, 0.15, 0],
        camera: { position: [0, 0.2, 6.5], lookAt: [2.6, 0.15, 0] },
        paragraphs: [
          'Birmingham Industries delivers end-to-end contract manufacturing for food-grade starches, modified derivatives, and allied industrial products — combining scale, precision, and internationally audited processes.',
        ],
      },
      {
        id: 'facility',
        position: [-2.6, 0.4, -12],
        camera: { position: [0.25, 0.5, -4.5], lookAt: [-2.6, 0.4, -12] },
        paragraphs: [
          'Our South Indian facility operates at 8,000-ton capacity with ISO 9001, ISO 22000, FSSC 22000, and BRCGS certifications — enabling partners to launch and scale formulations without capital-intensive infrastructure.',
        ],
      },
      {
        id: 'partner',
        position: [0, 0.05, -24],
        camera: { position: [0, 0.3, -16], lookAt: [0, 0.05, -24] },
        paragraphs: [
          'From pilot batches to full commercial runs, we align QA, logistics, and documentation with your specifications so your brand reaches markets faster and with uncompromising quality.',
        ],
        links: [
          {
            type: 'inline',
            before: 'Explore our product portfolio ',
            label: 'here',
            href: 'https://www.birmindus.com/products',
            after: ', or contact our ',
          },
          {
            type: 'inline',
            before: '',
            label: 'sales team',
            href: 'mailto:sales@birmindus.com',
            after: ' to discuss contract manufacturing requirements.',
          },
        ],
      },
    ],
  },

  'corporate-farming': {
    title: 'Corporate Farming',
    eyebrow: 'Land & Livestock',
    image: '/projects/project-farming.png',
    accent: '#4CAF6E',
    sections: [
      {
        id: 'land',
        position: [2.6, 0.2, 0],
        camera: { position: [0, 0.25, 6.5], lookAt: [2.6, 0.2, 0] },
        paragraphs: [
          'Birmingham Industries is the proud owner of 500 acres of agricultural land near to our associated Agricultural College in Tiruchirappalli District, Tamil Nadu, India. We have several projects running within this acreage including arable and pastoral farming.',
        ],
      },
      {
        id: 'collaboration',
        position: [-2.6, 0.35, -12],
        camera: { position: [0.2, 0.45, -4.5], lookAt: [-2.6, 0.35, -12] },
        paragraphs: [
          'Agricultural practices are deep seated in the culture of this region and we are working hand in hand with local farmers who hold a wealth of knowledge on traditional farming practices. By enabling a collaboration between farmers and students from the MIT College of Agriculture, we hope to develop sustainable practices that respect the land and that can be shared.',
        ],
      },
      {
        id: 'livestock',
        position: [2.6, -0.05, -24],
        camera: { position: [-0.2, 0.2, -16], lookAt: [2.6, -0.05, -24] },
        paragraphs: [
          'We are currently working with cattle and smaller ruminants like goats to evaluate their grazing patterns and their contribution to land fertility. Our livestock are well settled into the land and happily expanding their families; to the joy of our students, farmers and faculty.',
        ],
      },
      {
        id: 'sustainability',
        position: [0, 0.1, -36],
        camera: { position: [0, 0.35, -28], lookAt: [0, 0.1, -36] },
        paragraphs: [
          'As an organization we endorse sustainable practices and plan to devote some of our land to the afforestation efforts being undertaken nationwide. We are always on the look out for partners who share such values and who can assist with identifying the correct methods for afforestation and other such eco-friendly projects like renewable energy harnessing.',
        ],
      },
    ],
  },

  'ravens-ait': {
    title: "Raven's Ait",
    subtitle: '(4You Hospitality Services Ltd.)',
    eyebrow: 'Hospitality Partnership',
    image: '/projects/project-ravens.png',
    accent: '#E2C994',
    sections: [
      {
        id: 'venue',
        position: [2.6, 0.15, 0],
        camera: { position: [0, 0.2, 6.5], lookAt: [2.6, 0.15, 0] },
        paragraphs: ["Raven's Ait"],
      },
      {
        id: 'potential',
        position: [-2.6, 0.3, -12],
        camera: { position: [0.15, 0.4, -4.5], lookAt: [-2.6, 0.3, -12] },
        paragraphs: [
          'The island has limitless potential to provide hospitality services and amenities to the neighborhood. We are excited to be on board in the creation of facilities that may be enjoyed by the locals and visitors for many generations to come.',
        ],
      },
      {
        id: 'partnership',
        position: [0, 0.05, -24],
        camera: { position: [0, 0.28, -16], lookAt: [0, 0.05, -24] },
        paragraphs: [
          'We promise to help create opportunities for exponential growth, whilst implementing new technologies and systems to achieve revenue and quality-oriented management and reporting. We look forward to a long and prosperous partnership with Raven’s Ait (4You Hospitality Services Ltd).',
        ],
        externalLink: {
          label: 'www.ravensait.co.uk',
          href: 'http://www.ravensait.co.uk/',
        },
      },
    ],
  },

  'mit-institutions': {
    title: 'Musiri Institute of Technology',
    eyebrow: 'Education Partnership',
    image: '/projects/project-mit.png',
    accent: '#C32D1E',
    sections: [
      {
        id: 'collaboration',
        position: [2.6, 0.2, 0],
        camera: { position: [0, 0.2, 6.5], lookAt: [2.6, 0.2, 0] },
        paragraphs: [
          'We are in collaboration with the Musiri Institute of Technology (MIT) in Tamil Nadu, India, in particular their College of Agriculture and Technology.',
        ],
      },
      {
        id: 'standards',
        position: [-2.6, 0.35, -12],
        camera: { position: [0.2, 0.45, -4.5], lookAt: [-2.6, 0.35, -12] },
        paragraphs: [
          'We are working with the institution to bring management frameworks and operations upto international standards, which may in turn assist with developing an intercontinental knowledge share and exchange programme. Together, we continue to explore and apply advanced agricultural technologies and implement the latest techniques to enhance the learning experience of students.',
        ],
      },
      {
        id: 'courses',
        position: [2.6, -0.05, -24],
        camera: { position: [-0.15, 0.25, -16], lookAt: [2.6, -0.05, -24] },
        paragraphs: [
          'This multifaceted educational institution offers a wide range of courses including Polytechnic, Arts and Science, Teacher Education and Health Science, all delivered with comprehensive teaching practices that ready students for their industry specific work spaces.',
        ],
      },
      {
        id: 'holistic',
        position: [0, 0.1, -36],
        camera: { position: [0, 0.32, -28], lookAt: [0, 0.1, -36] },
        paragraphs: [
          '“Education starts in the early years”: this holistic approach is demonstrated within the CBSE School that is onsite and which caters to infant, junior and senior secondary students. The MIT group of institutions is situated over a large site spread over the Vellalapatti, Musiri and Trichy districts in Tamil Nadu.',
        ],
        externalLink: {
          label: 'www.mitinstitutions.org',
          href: 'https://mitinstitutions.org/',
        },
      },
    ],
  },
};

export function getProjectBySlug(slug) {
  return PROJECT_DETAILS[slug] ?? null;
}
