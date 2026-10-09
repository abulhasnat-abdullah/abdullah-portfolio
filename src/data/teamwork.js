// Target path: src/data/teamwork.js
// The Teamwork section (components/sections/Teamwork.jsx): my work in
// Team Interplanetar, BUET's Mars rover team. Kept deliberately general —
// it's a competition team, so methods stay off the page. The role timeline
// is read from `experience` and the team projects from `projects` (team:
// 'interplanetar') in portfolio.js, so neither is duplicated here.

const T = '/images/teamwork'

export const teamwork = {
  team: 'Team Interplanetar',
  tagline: 'BUET’s Mars rover team',
  website: 'https://buetinterplanetar.com/',
  role: 'Software & Autonomy Sub-Team Lead',
  summary:
    'I lead the rover’s software and autonomy work, and contribute across its electrical system, communication link and operator tools.',
  competitions: ['ERC Remote', 'Australian Rover Challenge', 'Anatolian Rover Challenge'],
  focus: [
    'Autonomous navigation',
    'Localization & state estimation',
    '3D LiDAR mapping',
    'Path planning',
    'AI perception',
    'Communication',
    'Electrical',
    'Operator GUI',
  ],
  photo: { src: `${T}/rover-forest.webp`, alt: 'The Interplanetar rover on rough ground under trees' },

  // One uniform row.
  gallery: [
    { src: `${T}/rover-fog.webp`, caption: 'Field run' },
    { src: `${T}/map-corridors.webp`, caption: '3D map · corridors' },
    { src: `${T}/map-building.webp`, caption: '3D map · building' },
    { src: `${T}/sensor-mast.webp`, caption: 'Sensor mast' },
  ],
}
