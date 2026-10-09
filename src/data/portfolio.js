export const profile = {
  name: 'Abul Hasnat Abdullah',
  shortName: 'abd',
  title: 'Robotics & Automation Engineer',
  subtitle: 'BSc Mechanical Engineering · BUET',
  eduLine1: 'Undergraduate Student (Junior Year)',
  eduLine2: 'Department of Mechanical Engineering, BUET',
  bio: `Hi, I'm Abdullah. I'm a Mechanical Engineering student at BUET, focused on robotics and autonomous systems. I currently lead the software and autonomy team of Team Interplanetar, a Mars rover of BUET, where I work on developing control systems, implementing SLAM, and building an Autonomy Stack with custom behaviour trees to adapt in complex mission. When I'm away from my engineering projects, you'll usually find me painting under the name Aquarelle Verse, or designing visuals and branding for different events and creatives. I love building things that are both highly functional and visually beautiful.`,
  photo: '/images/profile/photo.webp',
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

// The site is a single scroll now: this list is the document order of the
// page, and doubles as the nav / scroll-spy source. `kicker` is the small
// line printed above each section title.
//
// `navPrimary` marks the handful that appear in the top bar — all ten
// would overflow it. The side rail and the mobile menu still list every
// section, so nothing becomes unreachable.
export const sections = [
  { navPrimary: true, id: 'about', label: 'About', title: 'About Me', kicker: 'Who I am', note: 'the short version' },
  { id: 'dashboard', label: 'Dashboard', title: 'At a Glance', kicker: 'Live numbers', note: 'updated as you read' },
  { id: 'education', label: 'Education', title: 'Education', kicker: 'Where I studied', note: 'still learning' },
  { id: 'experience', label: 'Experience', title: 'Experience & Activities', kicker: 'Where I work', note: 'the teams I build with' },
  { navPrimary: true, id: 'teamwork', label: 'Teamwork', title: 'Teamwork', kicker: 'Mars rover team', note: 'built together' },
  { navPrimary: true, id: 'featured', label: 'Highlights', title: 'Highlighted Projects', kicker: 'Case study', note: 'in brief' },
  { navPrimary: true, id: 'projects', label: 'Projects', title: 'Projects', kicker: 'What I build', note: 'hover a row to peek' },
  { navPrimary: true, id: 'art-design', label: 'Art & Design', title: 'Art & Design', kicker: 'The other half', note: 'painted by hand' },
  { navPrimary: true, id: 'skills', label: 'Skills', title: 'Technical Stack', kicker: 'What I use', note: 'daily drivers' },
  { id: 'research', label: 'Research', title: 'Research Interests', kicker: 'What I explore', note: 'favourite rabbit holes' },
  { id: 'certificates', label: 'Certificates', title: 'Certifications & Courses', kicker: 'Credentials', note: 'homework, verified' },
  { id: 'achievements', label: 'Achievements', title: 'Achievements', kicker: 'Recognition', note: 'proud of these' },
  { navPrimary: true, id: 'contact', label: 'Contact', title: 'Get In Touch', kicker: 'Say hello', note: 'I reply fast' },
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
    logo: '/images/organizations/team-interplanetar.webp',
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
    logo: '/images/organizations/buet-robotics-society.webp',
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
    logo: '/images/organizations/imeche-buet.webp',
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
    logo: '/images/organizations/allstar.webp',
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
    logo: '/images/organizations/ongikar.webp',
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
    logo: '/images/organizations/notre-dame-art-club.webp',
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
    logo: '/images/organizations/brain-stormers.webp',
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
    logo: '/images/organizations/apars-classroom.webp',
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
    logo: '/images/education/buet.webp',
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
    logo: '/images/education/notre-dame.webp',
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
    logo: '/images/education/rajuk.webp',
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
    image: '/images/achievements/robo-soccer-challenge-certificate.webp',
  },
]

export const creativePortfolios = [
  {
    id: 'art',
    platform: 'Instagram',
    handle: '@aquarelle_verse',
    title: 'Watercolour Art · Aquarelle Verse',
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

// `team: 'interplanetar'` marks work done in Team Interplanetar: it is
// listed in Projects with a small team tag, and also in the Teamwork
// section.
export const projects = [
  {
    id: '01',
    team: 'interplanetar',
    title: 'Autonmous Navigation Stack for Mars Rover',
    status: 'live',
    href: 'https://github.com/abulhasnat-abdullah/interplanetar_mars_rover',
    image: '/images/projects/interplanetar_mars_rover.webp',
    // youtube: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    description:
      'Full autonomy stack — SLAM, Nav2 waypoint nav, ROS2 architecture, and Gazebo digital twin for a competition-grade Mars rover.',
    tags: ['ROS2', 'Nav2', 'SLAM', 'Gazebo', 'C++'],
  },
  {
    id: '17',
    team: 'interplanetar',
    title: 'Rover Robotic Arm — URDF, Control GUI & MoveIt 2 IK',
    status: 'in-progress',
    href: 'https://github.com/abulhasnat-abdullah/rover_arm_urdf',
    image: '/images/projects/rover-arm.webp',
    gallery: ['/images/projects/rover-arm-cad.webp', '/images/projects/rover-arm-urdf.webp'],
    description:
      'Six-joint rover arm taken from CAD to a URDF, with a control GUI for the operators and inverse kinematics through a MoveIt 2 setup.',
    tags: ['ROS2', 'URDF', 'MoveIt 2', 'Inverse Kinematics', 'GUI'],
  },
  {
    id: '02',
    title: 'Warehouse AGV Simulation',
    status: 'in-progress',
    image: '/images/projects/warehouse_agv.webp',
    // youtube: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    description:
      'Warehouse AGV for logistics — Nav2 navigation, obstacle avoidance, and kinodynamically constrained path replanning in simulation.',
    tags: ['Nav2', 'RRT*', 'C++', 'Gazebo'],
  },
  {
    id: '03',
    title: 'VENTRA — Autonomous UAV for Indoor Exploration & Tunnel Inspection',
    status: 'completed',
    href: 'https://github.com/abulhasnat-abdullah/Indoor_drone_project',
    image: '/images/projects/gps-denied-tunnel-inspection-drone.webp',
    video: '/images/projects/gps-denied-tunnel-inspection-drone.mp4',
    description:
      'LiDAR-anchored quadrotor for GPS-denied indoor exploration and shaft inspection — PX4 + ROS 2, SLAM pose fed back to EKF2, frontier exploration and a SLAM-free shaft mode. Full case study in Highlighted Projects.',
    tags: ['PX4', 'ROS2', 'SLAM', 'Nav2', 'GPS-Denied Navigation'],
  },
  {
    id: '16',
    team: 'interplanetar',
    title: 'FastDEM Terrain Mapping & Nav2 Traversability Costmap Plugin',
    status: 'completed',
    href: 'https://github.com/abulhasnat-abdullah/nav2_traversability_layer',
    image: '/images/projects/fastdem-traversability.webp',
    description:
      'FastDEM elevation mapping on the rover, and a Nav2 costmap plugin I wrote that turns its slope, step and roughness layers into traversability costs.',
    tags: ['ROS2', 'Nav2', 'Costmap Plugin', 'FastDEM', 'C++'],
  },
  {
    id: '18',
    title: 'Autonomous Vertical Shaft Inspection',
    status: 'completed',
    href: 'https://github.com/abulhasnat-abdullah/shaft_inspection',
    image: '/images/featured/ventra/shaft-sim.webp',
    description:
      'GPS-denied shaft inspection for a drone: every 2D LiDAR scan yields the bore centre as an absolute position fix for PX4, so it descends centred, turns above the floor and climbs out with a 3D cloud and radius profile.',
    tags: ['PX4', 'ROS2', 'LiDAR', 'Gazebo', 'Python'],
  },
  {
    id: '04',
    team: 'interplanetar',
    title: 'Swerve Drive Setup with CAN-Bus & ROS2 Control',
    status: 'in-progress',
    image: '/images/projects/swerve-drive-canbus-ros2.webp',
    video: '/images/projects/swerve-drive-canbus-ros2.mp4',
    description:
      'Swerve drive module built around SteadyWin motors on a CAN-Bus network, integrated with ros2_control for closed-loop drive and steering commands.',
    tags: ['ROS2', 'ros2_control', 'CAN-Bus', 'SteadyWin', 'Swerve Drive'],
  },
  {
    id: '05',
    title: 'Closed Loop Drone Simulation',
    status: 'completed',
    image: '/images/projects/closed-loop-drone-simulation.webp',
    description:
      'Closed-loop drone simulation spanning both PX4 SITL and ArduPilot SITL, with ROS2 in the loop for guidance, control, and mission testing.',
    tags: ['ROS2', 'PX4', 'ArduPilot', 'SITL', 'Drones'],
  },
  {
    id: '06',
    title: 'BattleBot-NSARv1',
    status: 'completed',
    // Drop the project photo at this path under /public (see note below).
    image: '/images/projects/battlebot-nsarv1.webp',
    description:
      'Combat robotics platform built for intra-university BattleBot competition — chassis, drivetrain, and weapon mechanism engineered for BUET Automobile Club.',
    tags: ['Combat Robotics', 'Mechanical Design', 'Embedded Control'],
  },
  {
    id: '07',
    title: 'SoccerBot-Siuuu',
    status: 'completed',
    image: '/images/projects/soccerbot-siuuu.webp',
    description:
      'Championship-winning radio-controlled four-wheel soccer bot built for the Intra BUET Robo Soccer Challenge — tuned for agility and precise ball control.',
    tags: ['RC Robotics', 'Mechanical Design', 'Competition'],
  },
  {
    id: '08',
    title: 'Arm URDF & Visualization',
    status: 'completed',
    href: 'https://github.com/abulhasnat-abdullah/arm_visualizer',
    image: '/images/projects/arm_visualizer.webp',
    youtube: 'https://youtu.be/Fh9B8C97Wrs',
    description:
      'Real-time 3D robot arm visualization with joint states, end-effector trajectories, and workspace envelopes.',
    tags: ['Python', 'RViz2', 'URDF'],
  },
  {
    id: '09',
    title: 'Voice Controlled Turtlebot3 Simulation',
    status: 'completed',
    href: 'https://github.com/abulhasnat-abdullah/voice_controlled_robot',
    image: '/images/projects/voice_controlled_robot.webp',
    youtube: 'https://youtu.be/T1xi8z0nOks',
    description:
      'Speech-to-command interface — natural language parsed and mapped to motor commands via ROS2.',
    tags: ['Python', 'ROS2', 'NLP'],
  },
  {
    id: '10',
    team: 'interplanetar',
    title: 'Autonomous Navigation GUI',
    status: 'in-progress',
    image: '/images/projects/autonomous-navigation-gui.webp',
    description:
      'Custom GUI for monitoring and commanding autonomous navigation — live map, waypoint goals, and robot state feedback in one dashboard.',
    tags: ['ROS2', 'Nav2', 'GUI', 'Python'],
  },
  {
    id: '11',
    team: 'interplanetar',
    title: 'Gazebo ROS2 Digital Twin of BUET Mars Rover',
    status: 'completed',
    image: '/images/projects/buet-mars-rover-digital-twin.webp',
    description:
      'Full Gazebo/ROS2 digital twin of the BUET Mars Rover — matched kinematics and sensor suite for simulating missions before hardware trials.',
    tags: ['ROS2', 'Gazebo', 'URDF', 'Simulation'],
  },
  {
    id: '12',
    title: 'Portfolio Website',
    status: 'live',
    image: '/images/projects/portfolio-website.webp',
    description:
      'This site — a React, Vite, and Framer Motion portfolio built to showcase experience, projects, and skills.',
    tags: ['React', 'Vite', 'SCSS', 'Framer Motion'],
  },
  {
    id: '14',
    team: 'interplanetar',
    title: 'Rover Field Test — Prochesta V1',
    status: 'completed',
    image: '/images/projects/rover-field-test-prochesta-v1.webp',
    description:
      'Prochesta V1 rover trials and development documentation, covering platform testing, setup, and operational readiness.',
    tags: ['Field Testing', 'Rover', 'Documentation'],
  },
  {
    id: '15',
    team: 'interplanetar',
    title: 'Differential Drive Setup with ROS2 Control',
    status: 'completed',
    image: '/images/projects/differential-drive-ros2-control.webp',
    description:
      'Differential drive platform running ros2_control, with a teleoperation interface for manual rover driving.',
    tags: ['ROS2', 'ros2_control', 'Differential Drive', 'Teleoperation'],
  },
]

// ---------------------------------------------------------------------
// Image folders to create under /public (Vite serves /public at the site
// root, so these are the paths referenced above):
//   public/images/organizations/   → one logo per org used in `experience`
//   public/images/achievements/    → certificate image(s) used in `achievements`
//   public/images/projects/        → add a photo/screenshot for each of the
//                                     8 new projects (ids 08–15 above,
//                                     filenames listed next to each
//                                     project's `image` field)
// Recommended logo size: square, ~256×256px, transparent or white background.
// ---------------------------------------------------------------------

export const certificates = [
  {
    id: 'cswa',
    issuer: 'Dassault Systèmes · SOLIDWORKS',
    title: 'SOLIDWORKS CAD Design Associate (CSWA)',
    date: 'Dec 2024',
    credentialId: 'C-C8WTER59UF',
    image: '/images/certificates/cswa.webp',
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
    image: '/images/certificates/cswp-prep.webp',
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
    image: '/images/certificates/ros2-map-localization.webp',
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
    image: '/images/certificates/ros2-odometry-control.webp',
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
    image: '/images/certificates/ros2-plan-navigation.webp',
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
    skills: ['ROS2', 'Nav2', 'MoveIt2', 'Gazebo', 'SLAM Toolbox', 'PyBullet', 'RViz2'],
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
    title: 'Multi-Robot Heterogeneous Systems',
    description:
      'Engineering cooperative autonomy and physical task-sharing between aerial drones (UAVs) and ground vehicles (UGVs).',
    tags: ['UAV-UGV', 'Cooperative Autonomy', 'Task Allocation'],
  },
]