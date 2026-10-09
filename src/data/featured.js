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
    tagline:
      'A LiDAR-anchored quadrotor that localizes, maps and explores where satellite navigation cannot reach.',
    summary:
      'A 500 mm quadrotor that flies where GPS can’t reach. A Pixhawk running PX4 keeps it stable while a Raspberry Pi running ROS 2 maps, plans and anchors its position to a 360° LiDAR map instead of satellites.',
    meta: [
      { label: 'Course', value: 'ME 366 · Electro-Mechanical System Design, BUET' },
      { label: 'Team', value: 'Group B9 · 4 members · 15 weeks · 2026' },
    ],
    cutout: `${V}/drone-cutout.webp`,
    cutoutAlt: 'The VENTRA quadrotor with its orange LiDAR mount and propeller guards',
    youtube: 'HdqpsQmI8uY',
    links: [{ label: 'Full details on GitHub', href: 'https://github.com/abulhasnat-abdullah/Indoor_drone_project' }],
    tags: ['PX4', 'ROS 2', 'SLAM Toolbox', 'Nav2', 'EKF2', 'LiDAR', 'Gazebo'],

    metrics: [
      { value: '24.8 m', label: 'Autonomous shaft descent and return in simulation, no wall contact' },
      { value: '7 cm', label: 'Altitude deviation holding 1.15 m in a 283 s GPS-free flight' },
      { value: '1–5 cm', label: 'Bore-centre accuracy across five shaft shapes' },
      { value: '10 Hz', label: 'LiDAR pose fed back into the PX4 estimator' },
    ],

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
        text: 'Descends a vertical shaft while centring itself on every scan, turns 0.5 m above the floor and climbs out with a radius-versus-depth profile.',
      },
    ],

    keyIdeas: [
      {
        title: 'Map-anchored position',
        text: 'The SLAM pose is fed back into PX4’s EKF2, so position no longer resets over dark or plain floors.',
      },
      {
        title: 'No SLAM in the shaft',
        text: 'Each scan’s point of maximum clearance is the bore centre — an absolute fix that never drifts.',
      },
      {
        title: 'Avoidance before the autopilot',
        text: 'A braking-limited filter in the command path, since PX4’s own collision prevention is off in Offboard.',
      },
      {
        title: 'Built to survive vibration',
        text: 'Cracked PETG mounts were redesigned in PLA with gussets and rubber standoffs; a 4S pack restored thrust.',
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
