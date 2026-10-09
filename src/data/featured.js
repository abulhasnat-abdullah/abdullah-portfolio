// Target path: src/data/featured.js
// Highlighted projects: compact case studies — the key ideas only, with the
// full write-up linked — rendered by components/sections/FeaturedProjects.jsx.
// Each entry follows the same shape, so adding another is a data change
// only; any block can be left out.
//
// Every figure in VENTRA's entry comes from the ME 366 final report;
// simulation-only results are labelled as such.

const V = '/images/featured/ventra'

export const featuredProjects = [
  {
    id: 'ventra',
    name: 'VENTRA',
    title: 'Autonomous UAV for Indoor Exploration & Tunnel Inspection',
    summary:
      'A LiDAR-guided drone that flies where GPS can’t reach. It maps and explores indoor spaces on its own, and inspects vertical shafts by centring itself on every scan.',
    cutout: `${V}/drone-cutout.webp`,
    cutoutAlt: 'The VENTRA quadrotor with its orange LiDAR mount and propeller guards',
    youtube: 'HdqpsQmI8uY',
    links: [{ label: 'Full details on GitHub', href: 'https://github.com/abulhasnat-abdullah/Indoor_drone_project' }],
    missions: [
      {
        name: 'Indoor exploration',
        image: `${V}/corridor-3d.webp`,
        imageAlt: 'VENTRA flying down a corridor with the live 3D reconstruction overlaid',
        text: 'Maps rooms and corridors with LiDAR SLAM, picks the edge of the unknown as its next goal, and stacks scans at different heights into a 3D model.',
      },
      {
        name: 'Shaft & tunnel inspection',
        image: `${V}/shaft-sim.webp`,
        imageAlt: 'Simulated shaft descent with the mission dashboard and the growing point cloud',
        text: 'Descends a vertical shaft while centring itself on every scan, turns above the floor and climbs back out with a 3D profile of the shaft.',
      },
    ],

    gallery: [
      { src: `${V}/flight-cage.webp`, caption: 'Flight testing' },
      { src: `${V}/build-bench.webp`, caption: 'Integration on the bench' },
      { src: `${V}/cad-exploded.webp`, caption: 'Exploded CAD' },
      { src: `${V}/showcase.webp`, caption: 'Project showcase' },
    ],
  },
]
