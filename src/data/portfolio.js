export const profile = {
  name: 'Abul Hasnat Abdullah',
  shortName: 'Abul Hasnat',
  title: 'Robotics & Automation Engineer',
  subtitle: 'BSc Mechanical Engineering · BUET',
  tagline:
    'Robotics engineer by day — watercolour artist and graphic designer by passion.',
  bio: `Mechanical Engineering student at BUET focused on robotics and autonomous systems. I lead software and autonomy for Team Interplanetar's Mars rover program, bridging simulation, perception, and real-time navigation in GPS-denied environments. Outside engineering, I create watercolour art as Aquarelle Verse and design brand visuals, event creatives, and social media graphics.`,
  photo: '/images/profile/photo.png',
  email: 'abdkalam22@gmail.com',
  location: 'Dhaka, Bangladesh',
  links: {
    linkedin: 'https://linkedin.com/in/abul-hasnat-abdullah-2726aa304',
    github: 'https://github.com/abulhasnat-abdullah',
    email: 'mailto:abdkalam22@gmail.com',
    instagram: 'https://www.instagram.com/aquarelle_verse/',
    behance: 'https://www.behance.net/abulhaabdulla',
  },
  quote:
    'The best engineers don\'t wait for the right opportunity. They simulate it first.',
  credentials: ['CSWA', 'Robotics & ML', 'Artist', 'Graphics & Visual Design'],
  roles: [
    'Robotics & Automation Engineer',
    'Artist · Aquarelle Verse',
    'Graphics Designer',
    'Technical Lead · Team Interplanetar',
  ],
}

export const categories = [
  { id: 'about', label: 'About', icon: '👤' },
  { id: 'education', label: 'Education', icon: '🎓' },
  { id: 'experience', label: 'Experience', icon: '💼' },
  { id: 'projects', label: 'Projects', icon: '🚀' },
  { id: 'art-design', label: 'Art & Design', icon: '🎨' },
  { id: 'skills', label: 'Skills', icon: '🛠️' },
  { id: 'research', label: 'Research', icon: '🔬' },
  { id: 'certificates', label: 'Certificates', icon: '📜' },
  { id: 'achievements', label: 'Achievements', icon: '🏆' },
  { id: 'contact', label: 'Contact', icon: '✉️' },
]

export const sections = [
  { id: 'about', categoryId: 'about', label: 'About', title: 'About Me' },
  { id: 'education', categoryId: 'education', label: 'Education', title: 'Education' },
  { id: 'experience', categoryId: 'experience', label: 'Experience', title: 'Experience & Activities' },
  { id: 'projects', categoryId: 'projects', label: 'Projects', title: 'Selected Projects' },
  { id: 'art-design', categoryId: 'art-design', label: 'Art & Design', title: 'Art & Design' },
  { id: 'skills', categoryId: 'skills', label: 'Skills', title: 'Technical Stack' },
  { id: 'research', categoryId: 'research', label: 'Research', title: 'Research Interests' },
  { id: 'certificates', categoryId: 'certificates', label: 'Certificates', title: 'Certifications & Courses' },
  { id: 'achievements', categoryId: 'achievements', label: 'Achievements', title: 'Achievements' },
  { id: 'contact', categoryId: 'contact', label: 'Contact', title: 'Get In Touch' },
]

export const highlights = [
  { label: 'Team Role', value: 'Technical Lead · ERC Remote' },
  { label: 'Focus', value: 'ROS 2 · Nav2 · SLAM' },
  { label: 'Achievement', value: 'Robo Soccer Champion 2024' },
  { label: 'Stack', value: 'C++ · Python · Gazebo' },
]

// LinkedIn-style "Experience" list — one card per organisation/club, each
// grouping every role held there (like LinkedIn groups stacked positions
// under one company). This also folds in what used to be the separate
// "Activities" (extra-curricular) tab, since both are the same thing: ECA.
// Every entry needs a `logo`; drop the image file at the given path under
// /public (see scripts/README note at the bottom of this file).
export const experience = [
  {
    org: 'Team Interplanetar · BUET',
    logo: '/images/organizations/team-interplanetar.png',
    totalDuration: '1 yr 4 mos',
    roles: [
      {
        title: 'Sub Team Lead — Software & Autonomy Subteam',
        period: 'Jul 2026 — Present',
        duration: '1 mo',
        type: 'Full-time',
        location: 'BUET · Hybrid',
        tags: ['ROS2', 'Autonomy', 'Leadership'],
      },
      {
        title: 'Technical Lead — ERC Remote & Senior Coordinator — Software & Autonomy',
        period: 'Jan 2026 — Jul 2026',
        duration: '7 mos',
        type: 'Full-time',
        location: 'BUET · Hybrid',
        tags: ['ROS2', 'Microcontrollers', 'Autonomy'],
      },
      {
        title: 'Senior Coordinator — Dronning Sub Team',
        period: 'Jan 2026 — Jul 2026',
        duration: '7 mos',
        type: 'Full-time',
        location: 'BUET · Hybrid',
        tags: ['Drones', 'Coordination', 'ROS2'],
      },
      {
        title: 'Member — Software & Autonomy Subteam',
        period: 'Apr 2025 — Jan 2026',
        duration: '10 mos',
        type: 'Full-time',
        location: 'BUET · Hybrid',
        tags: ['ROS2', 'Microcontrollers', 'Perception'],
      },
    ],
  },
  {
    org: 'BUET Automobile Club',
    logo: '/images/organizations/buet-automobile-club.png',
    totalDuration: '3 yrs 7 mos',
    roles: [
      {
        title: 'Additional Chief Executive (Design)',
        period: 'Jul 2026 — Present',
        duration: '1 mo',
        type: 'Part-time',
        location: 'BUET · Hybrid',
        tags: ['Graphic Design', 'Leadership', 'Visual Design'],
      },
      {
        title: 'Executive (Design)',
        period: 'Apr 2025 — Jul 2026',
        duration: '1 yr 4 mos',
        type: 'Full-time',
        location: 'BUET',
        tags: ['Graphic Design', 'Social Media Graphic Design'],
      },
      {
        title: 'Member',
        period: 'Jan 2023 — Apr 2025',
        duration: '2 yrs 4 mos',
        type: 'Full-time',
        location: 'BUET',
        tags: ['Graphic Design', 'Social Media Graphic Design', 'Robotics'],
      },
    ],
  },
  {
    org: 'BUET Robotics Society',
    logo: '/images/organizations/buet-robotics-society.png',
    totalDuration: '1 yr 1 mo',
    roles: [
      {
        title: 'Deputy Head (Design)',
        period: 'Jul 2026 — Present',
        duration: '1 mo',
        type: 'Part-time',
        location: 'BUET · Hybrid',
        tags: ['Graphic Design', 'Visual Design', 'Leadership'],
      },
      {
        title: 'Executive',
        period: 'Jul 2025 — Present',
        duration: '1 yr 1 mo',
        type: 'Part-time',
        location: 'BUET',
        tags: ['Graphic Design', 'Event Design'],
      },
    ],
  },
  {
    org: 'IMechE BUET Student Chapter',
    logo: '/images/organizations/imeche-buet.png',
    totalDuration: '2 yrs 8 mos',
    roles: [
      {
        title: 'Affiliate Member',
        period: 'Dec 2023 — Present',
        duration: '2 yrs 8 mos',
        type: 'Member',
        location: 'BUET',
        tags: ['Mechanical Engineering', 'Professional Development'],
      },
    ],
  },
  {
    org: 'AllStar',
    logo: '/images/organizations/allstar.png',
    totalDuration: '5 yrs 4 mos',
    roles: [
      {
        title: 'Graphics Operative',
        period: 'Apr 2021 — Present',
        duration: '5 yrs 4 mos',
        type: 'Part-time',
        location: 'Remote',
        tags: ['Social Media Graphic Design', 'Information Graphics', 'Visual Design'],
      },
    ],
  },
  {
    org: 'Ongikar',
    logo: '/images/organizations/ongikar.png',
    totalDuration: '5 yrs 2 mos',
    roles: [
      {
        title: 'Co-Founder, CTO',
        period: 'Jun 2021 — Present',
        duration: '5 yrs 2 mos',
        type: 'Non-profit',
        location: 'Dhaka, Bangladesh',
        tags: ['Leadership', 'Management', 'Technology'],
      },
    ],
  },
  {
    org: 'Notre Dame Art Club',
    logo: '/images/organizations/notre-dame-art-club.png',
    totalDuration: '2 yrs 2 mos',
    roles: [
      {
        title: 'President — Creative Department',
        period: 'Sep 2021 — Oct 2022',
        duration: '1 yr 2 mos',
        type: 'Leadership',
        location: 'Notre Dame College, Dhaka · Hybrid',
        tags: ['Creative Arts', 'Visual Arts', 'Leadership'],
      },
      {
        title: 'Member',
        period: 'Sep 2020 — Aug 2021',
        duration: '1 yr',
        type: 'Member',
        location: 'Notre Dame College, Dhaka',
        tags: ['Creative Arts', 'Visual Arts'],
      },
    ],
  },
  {
    org: 'Brain Stormers',
    logo: '/images/organizations/brain-stormers.png',
    totalDuration: '8 mos',
    roles: [
      {
        title: 'Chemistry Instructor',
        period: 'Jul 2022 — Feb 2023',
        duration: '8 mos',
        type: 'Part-time',
        location: 'Coaching Centre',
        tags: ['Chemistry', 'Teaching'],
      },
    ],
  },
  {
    org: 'Apars Classroom',
    logo: '/images/organizations/apars-classroom.png',
    totalDuration: '2 mos',
    roles: [
      {
        title: 'Content Analyst',
        period: 'Jun 2024 — Jul 2024',
        duration: '2 mos',
        type: 'Seasonal',
        location: 'Remote',
        tags: ['Content Management', 'Editing', 'Proofreading'],
      },
    ],
  },
]

export const education = [
  {
    id: 'buet',
    institution: 'Bangladesh University of Engineering and Technology',
    logo: '/images/education/buet.png',
    degree: 'Bachelor of Science - B.Sc., Mechanical Engineering',
    period: 'Jul 2022 — Present',
    grade: null,
    note: 'Junior',
    activities: 'BUET Automobile Club, BUET Robotics Society',
    skills: ['Computer-Aided Design (CAD)', 'Mechanical Drawings'],
    moreSkillsCount: 7,
  },
  {
    id: 'notre-dame',
    institution: 'Notre Dame College',
    logo: '/images/education/notre-dame.png',
    degree: 'Higher Secondary School Certificate, Science',
    period: 'Jun 2020 — Feb 2023',
    grade: 'GPA 5.00/5.00',
    note: null,
    activities: 'Notre Dame Art Club, Notre Eco and Space Club, Notre Dame Outward Bound Adventure Club',
    skills: ['Graphic Design', 'Python (Programming Language)'],
    moreSkillsCount: 3,
  },
  {
    id: 'rajuk',
    institution: 'RAJUK Uttara Model College',
    logo: '/images/education/rajuk.png',
    degree: 'Secondary School Certificate, Science',
    period: null,
    grade: 'GPA 5.00/5.00',
    note: null,
    activities: 'Rajuk College Art Club',
    skills: ['Acrylic Painting', 'Watercolor paintings'],
    moreSkillsCount: 7,
  },
]



// Drop the certificate image at the given path under /public (see the note
// at the bottom of this file for the folder to use).
export const achievements = [
  {
    title: 'Champion — Robo Soccer Challenge',
    context: 'Intra BUET Robo Challenge 2024 · BUET Robotics Club',
    detail: 'Led team Siuuu with a radio-controlled four-wheel soccer bot built on BattleBot experience.',
    image: '/images/achievements/robo-soccer-challenge-certificate.png',
  },
]

export const creativePortfolios = [
  {
    id: 'art',
    platform: 'Instagram',
    handle: '@aquarelle_verse',
    title: 'Art Gallery - Aquarelle Verse',
    role: 'Artist',
    description:
      'Watercolour paintings, visual studies, and creative experiments — a growing collection of original art shared on Instagram.',
    href: 'https://www.instagram.com/aquarelle_verse/',
    tags: ['Watercolour', 'Visual Art', 'Illustration', 'Painting'],
    theme: 'art',
  },
  {
    id: 'design',
    platform: 'Behance',
    handle: 'abulhaabdulla',
    title: 'Graphic Design Portfolio',
    role: 'Graphics Designer',
    description:
      'Brand visuals, social media graphics, information design, and event creatives — from club branding to editorial layouts.',
    href: 'https://www.behance.net/abulhaabdulla',
    tags: ['Graphic Design', 'Visual Design', 'Branding', 'Social Media'],
    theme: 'design',
  },
]

export const projects = [
  {
    id: '01',
    title: 'interplanetar_mars_rover',
    status: 'live',
    href: 'https://github.com/abulhasnat-abdullah/interplanetar_mars_rover',
    image: '/images/projects/interplanetar_mars_rover.png',
    // youtube: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    description:
      'Full autonomy stack — SLAM, Nav2 waypoint nav, ROS2 architecture, and Gazebo digital twin for a competition-grade Mars rover.',
    tags: ['ROS2', 'Nav2', 'SLAM', 'Gazebo', 'C++'],
  },
  {
    id: '02',
    title: 'warehouse_agv',
    status: 'in-progress',
    image: '/images/projects/warehouse_agv.png',
    // youtube: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    description:
      'Warehouse AGV for logistics — Nav2 navigation, obstacle avoidance, and kinodynamically constrained path replanning in simulation.',
    tags: ['Nav2', 'RRT*', 'C++', 'Gazebo'],
  },
  {
    id: '03',
    title: 'arm_visualizer',
    status: 'completed',
    href: 'https://github.com/abulhasnat-abdullah/arm_visualizer',
    image: '/images/projects/arm_visualizer.png',
    youtube: 'https://youtu.be/Fh9B8C97Wrs',
    description:
      'Real-time 3D robot arm visualization with joint states, end-effector trajectories, and workspace envelopes.',
    tags: ['Python', 'RViz2', 'URDF'],
  },
  {
    id: '04',
    title: 'voice_controlled_robot',
    status: 'completed',
    href: 'https://github.com/abulhasnat-abdullah/voice_controlled_robot',
    image: '/images/projects/voice_controlled_robot.png',
    youtube: 'https://youtu.be/T1xi8z0nOks',
    description:
      'Speech-to-command interface — natural language parsed and mapped to motor commands via ROS2.',
    tags: ['Python', 'ROS2', 'NLP'],
  },
  {
    id: '05',
    title: 'BattleBot-NSARv1',
    status: 'completed',
    // Drop the project photo at this path under /public (see note below).
    image: '/images/projects/battlebot-nsarv1.png',
    description:
      'Combat robotics platform built for intra-university BattleBot competition — chassis, drivetrain, and weapon mechanism engineered for BUET Automobile Club.',
    tags: ['Combat Robotics', 'Mechanical Design', 'Embedded Control'],
  },
  {
    id: '06',
    title: 'SoccerBot-Siuuu',
    status: 'completed',
    image: '/images/projects/soccerbot-siuuu.png',
    description:
      'Championship-winning radio-controlled four-wheel soccer bot built for the Intra BUET Robo Soccer Challenge — tuned for agility and precise ball control.',
    tags: ['RC Robotics', 'Mechanical Design', 'Competition'],
  },
  {
    id: '07',
    title: 'Autonomous GPS-Denied Tunnel Inspection Drone',
    status: 'in-progress',
    image: '/images/projects/gps-denied-tunnel-inspection-drone.png',
    description:
      'Autonomous inspection drone for GPS-denied tunnels — SLAM-based localization and obstacle-aware navigation for underground infrastructure inspection.',
    tags: ['ROS2', 'SLAM', 'Drones', 'GPS-Denied Navigation'],
  },
]

// ---------------------------------------------------------------------
// Image folders to create under /public (Vite serves /public at the site
// root, so these are the paths referenced above):
//   public/images/organizations/   → one logo per org used in `experience`
//   public/images/achievements/    → certificate image(s) used in `achievements`
//   public/images/projects/        → already exists; add the 3 new project photos
// Recommended logo size: square, ~256×256px, transparent or white background.
// ---------------------------------------------------------------------

export const certificates = [
  {
    id: 'cswa',
    issuer: 'Dassault Systèmes · SOLIDWORKS',
    title: 'SOLIDWORKS CAD Design Associate (CSWA)',
    date: 'Dec 2024',
    credentialId: 'C-C8WTER59UF',
    image: '/images/certificates/cswa.png',
    href: null,
    tags: ['SolidWorks', 'CAD', 'CSWA'],
  },
  {
    id: 'cswp-prep',
    issuer: 'Udemy · Tayseer Almattar',
    title: 'SOLIDWORKS: Become a Certified Professional Today (CSWP)',
    date: 'Nov 2025',
    hours: '4.5 hours',
    credentialId: 'UC-5686837b-a19e-4ea1-94a8-6e38d16168e8',
    image: '/images/certificates/cswp-prep.png',
    href: 'https://ude.my/UC-5686837b-a19e-4ea1-94a8-6e38d16168e8',
    tags: ['SolidWorks', 'CSWP', 'CAD'],
  },
  {
    id: 'ros2-map',
    issuer: 'Udemy · Antonio Brandi',
    title: 'Self Driving and ROS 2 — Map & Localization',
    date: 'Jun 2025',
    hours: '25 hours',
    credentialId: 'UC-a7b8c265-f41e-4be7-a5bc-76880a8c3815',
    image: '/images/certificates/ros2-map-localization.png',
    href: 'https://ude.my/UC-a7b8c265-f41e-4be7-a5bc-76880a8c3815',
    tags: ['ROS2', 'SLAM', 'Localization'],
  },
  {
    id: 'ros2-odometry',
    issuer: 'Udemy · Antonio Brandi',
    title: 'Self Driving and ROS 2 — Odometry & Control',
    date: 'Nov 2025',
    hours: '29 hours',
    credentialId: 'UC-2f8654be-0af0-4c81-bf7d-a8ec7d870da0',
    image: '/images/certificates/ros2-odometry-control.png',
    href: 'https://ude.my/UC-2f8654be-0af0-4c81-bf7d-a8ec7d870da0',
    tags: ['ROS2', 'Control', 'Odometry'],
  },
  {
    id: 'ros2-plan',
    issuer: 'Udemy · Antonio Brandi',
    title: 'Self Driving and ROS 2 — Plan & Navigation',
    date: 'Mar 2026',
    hours: '28.5 hours',
    credentialId: 'UC-efdf32b0-3dc4-4acb-9b99-33cc51693832',
    image: '/images/certificates/ros2-plan-navigation.png',
    href: 'https://ude.my/UC-efdf32b0-3dc4-4acb-9b99-33cc51693832',
    tags: ['ROS2', 'Nav2', 'Planning'],
  },
]

export const skillGroups = [
  {
    category: 'Languages & Systems',
    skills: ['C', 'C++', 'Python', 'Bash', 'CMake', 'Linux', 'Ubuntu', 'Docker', 'Git'],
  },
  {
    category: 'Robotics & Autonomy',
    skills: ['ROS2', 'Nav2', 'MoveIt2', 'Gazebo', 'SLAM Toolbox', 'tf2', 'OMPL', 'PyBullet', 'RViz2'],
  },
  {
    category: 'Perception & ML',
    skills: ['OpenCV', 'PyTorch', 'TensorFlow', 'scikit-learn', 'NumPy', 'SciPy', 'Pandas'],
  },
  {
    category: 'Simulation',
    skills: ['SolidWorks Simulation', 'ANSYS', 'COMSOL'],
  },
  {
    category: 'Design & CAD',
    skills: ['SolidWorks', 'AutoCAD', 'Fusion360'],
  },
  {
    category: 'Graphic Design & Animation',
    skills: ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign', 'Adobe After Effects'],
  },
  {
    category: 'Web Development',
    skills: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'React', 'Vite'],
  },

]


export const researchInterests = [
  {
    title: 'Kinodynamic Motion Planning',
    description:
      'RRT* extended with velocity bounds, torque limits, and inertial dynamics. Real-time replanning where geometric planners fail.',
    tags: ['RRT*', 'OMPL', 'Dynamic Constraints'],
  },
  {
    title: 'Autonomous Mobile Robotics',
    description:
      'SLAM and localization for GPS-denied environments. Multi-sensor fusion — LiDAR, IMU, and camera into coherent world models.',
    tags: ['SLAM', 'Sensor Fusion', 'LiDAR'],
  },
  {
    title: 'Industrial Automation & HRC',
    description:
      'AGVs operating safely alongside humans. Task planning aware of human intent, proximity, and proactive replanning.',
    tags: ['AGV Routing', 'HRC', 'Collision Prediction'],
  },
  {
    title: 'Mars Analog Terrain Navigation',
    description:
      'Traversability analysis and perception pipelines for planetary surfaces — regolith, rocks, and steep slopes.',
    tags: ['Traversability', 'Terrain Classification', '3D Localization'],
  },
]