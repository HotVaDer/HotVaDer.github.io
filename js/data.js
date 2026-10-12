// Everything the site shows lives here. Edit this file, not the HTML.

window.PORTFOLIO = {
  name: 'Stylianos Kyriakou',
  firstName: 'Stylianos',
  handle: 'HotVaDer',
  location: 'Limassol, Cyprus',

  githubUser: 'HotVaDer',
  avatar: 'https://github.com/HotVaDer.png?size=400',
  email: '',    // TODO: public contact email (hidden until set)
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
      title: 'Mini search engine',
      kind: 'Java · Data structures',
      description: "A search engine inspired by Google's indexing, built on custom data structures (a hashing trie, a min-heap and Robin Hood hashing) to index and retrieve results efficiently.",
      tags: ['Java', 'Algorithms', 'Hashing'],
      note: 'Robin Hood hashing = best name in CS',
      repo: 'https://github.com/HotVaDer/EPL231-Data-Structures',
      live: '',
      image: '',
    },
    {
      title: 'UCY gym booker',
      kind: 'Python · Automation',
      description: 'Selenium automation that books slots at the University of Cyprus sports centre gym, so I never have to race anyone for the good time slots.',
      tags: ['Python', 'Selenium', 'Automation'],
      note: 'never miss leg day',
      repo: 'https://github.com/HotVaDer/ucy-gym-booker',
      live: '',
      image: '',
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
