const backend = {
  about: '/api/about.json',
  packages: {
    _root: '/api/packages/packages.json',
    info: (id) => `/api/packages/info/${id}.json`,
  },
  sketches: '/api/sketches.json',
}

export default backend;