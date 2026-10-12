// Everything the site shows lives here. Edit this file, not the HTML.

window.PORTFOLIO = {
  name: 'Stylianos Kyriakou',
  firstName: 'Stylianos',
  handle: 'HotVaDer',
  location: 'Limassol, Cyprus',

  githubUser: 'HotVaDer',
  avatar: 'https://github.com/HotVaDer.png?size=400',
  email: 'skyria05@ucy.ac.cy',
  phone: '+357 99 216265',
  linkedin: '', // TODO: full LinkedIn URL (hidden until set)

  // TODO: make this sound like you
  bio: [
    "I'm Stylianos, a developer from Limassol, Cyprus. I like taking an idea from a scribble in a notebook to something that actually runs.",
    'Lately that means university projects, startup experiments like PhysioPath, and small automations that save me time.',
  ],

  skills: ['Python', 'Java', 'C', 'PHP', 'SQL', 'JavaScript', 'Selenium', 'LaTeX'],

  // The boarding pass on the first page
  ticket: {
    flight: 'GT2RS',
    from: 'LIM', fromCity: 'Limassol, CY',
    to: 'ANY', toCity: 'Anywhere',
    passenger: 'KYRIAKOU/S',
  },

  // One notebook page per project
  projects: [
    {
      title: 'PhysioPath',
      kind: 'Startup idea',
      description: 'Voice notes from physiotherapists turned into home exercise programs for patients and clinical notes for the clinic, in Greek, for small practices in Cyprus and Greece.',
      tags: ['Startup', 'Voice → text', 'Healthcare'],
      note: 'talk for 30s → get the whole plan',
      repo: 'https://github.com/HotVaDer/PhysioPath',
      live: '',
      image: '', // e.g. 'assets/img/physiopath.png' (16:9 works best)
    },
    {
      title: 'Exotic Lives',
      kind: 'E-commerce · Reptile shop',
      description: 'Online reptile shop in Cyprus: food, terrariums, lighting and habitat supplies, delivered across Cyprus and to Greece, plus a custom bioactive terrarium building service.',
      tags: ['Next.js', 'Supabase', 'Stripe'],
      note: 'bioactive terrariums, built to order',
      repo: '', // private
      live: 'https://exoticlives.com',
      image: 'assets/img/exoticlives.jpg',
    },
    {
      title: 'Fancy Accessories',
      kind: 'E-commerce · Beauty',
      description: 'Online store for gold-toned jewellery, Arabic perfumes and Korean cosmetics, with free shipping to Greece and Cyprus on orders over €100.',
      tags: ['Next.js', 'Supabase', 'Vercel'],
      note: 'everyday luxury, honestly priced',
      repo: '', // private
      live: 'https://fancy-accessories.vercel.app',
      image: 'assets/img/fancy-accessories.jpg',
    },
    {
      title: 'POAA Marathon',
      kind: 'Charity · Fundraiser',
      description: 'Greek-language fundraising site for the 2026 YGEIA Sea Marathon in Limassol, where 30 volunteers swam 8.5 km and ran 21 km to support POAA Limassol, which works for people with disabilities.',
      tags: ['Next.js', 'Static export', 'Charity'],
      note: '8.5\u00a0km swim + 21\u00a0km run',
      repo: '', // private
      live: 'https://poaa-marathon.vercel.app',
      image: 'assets/img/poaa.jpg',
    },
  ],

  // "More in the garage": live list of public repos
  repoCount: 6,
  hiddenRepos: ['HotVaDer.github.io', 'HotVaDer', 'skills-review-pull-requests'],

  contactBlurb: 'Got an idea, a project, or a spare seat in a GT2 RS? My inbox is open.',

  // The scribbled to-do list on the notes page
  notes: [
    { text: 'ship the next idea', done: false },
    { text: 'learn Robin Hood hashing', done: true },
    { text: 'hot lap on the Nordschleife', done: false },
    { text: 'GT2 RS (saving up…)', done: false },
  ],
};
