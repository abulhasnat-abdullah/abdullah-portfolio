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
  { id: 'experience', label: 'Experience', icon: '💼' },
  { id: 'extracurricular', label: 'Activities', icon: '🤝' },
  { id: 'education', label: 'Education', icon: '🎓' },
  { id: 'projects', label: 'Projects', icon: '🚀' },
  { id: 'art-design', label: 'Art & Design', icon: '🎨' },
  { id: 'skills', label: 'Skills', icon: '🛠️' },
  { id: 'research', label: 'Research', icon: '🔬' },
  { id: 'certificates', label: 'Certificates', icon: '📜' },
  { id: 'contact', label: 'Contact', icon: '✉️' },
]

export const sections = [
  { id: 'about', categoryId: 'about', label: 'About', title: 'About Me' },
  { id: 'experience', categoryId: 'experience', label: 'Experience', title: 'Experience & Highlights' },
  { id: 'extracurricular', categoryId: 'extracurricular', label: 'Activities', title: 'Extra-Curricular Activities' },
  { id: 'education', categoryId: 'education', label: 'Education', title: 'Education' },
  { id: 'projects', categoryId: 'projects', label: 'Projects', title: 'Selected Projects' },
  { id: 'art-design', categoryId: 'art-design', label: 'Art & Design', title: 'Art & Design' },
  { id: 'skills', categoryId: 'skills', label: 'Skills', title: 'Technical Stack' },
  { id: 'research', categoryId: 'research', label: 'Research', title: 'Research Interests' },
  { id: 'certificates', categoryId: 'certificates', label: 'Certificates', title: 'Certifications & Courses' },
  { id: 'contact', categoryId: 'contact', label: 'Contact', title: 'Get In Touch' },
]

export const highlights = [
  { label: 'Team Role', value: 'Technical Lead · ERC Remote' },
  { label: 'Focus', value: 'ROS 2 · Nav2 · SLAM' },
  { label: 'Achievement', value: 'Robo Soccer Champion 2024' },
  { label: 'Stack', value: 'C++ · Python · Gazebo' },
]

export const experience = [
  {
    role: 'Technical Lead — ERC Remote',
    org: 'Team Interplanetar · BUET',
    period: 'Jan 2026 — Present',
    description:
      'Leading remote operations and autonomy integration for an international Mars-analog rover platform — architecture, simulation, and competition readiness.',
    tags: ['ROS2', 'Autonomy', 'Leadership'],
  },
  {
    role: 'Senior Coordinator, Software & Autonomy',
    org: 'BUET Interplanetary Mars Rover Team',
    period: '2024 — Present',
    description:
      'Owns the full autonomy pipeline: SLAM, Nav2 waypoint navigation, Gazebo digital twin, and competition-grade rover software architecture.',
    tags: ['Nav2', 'SLAM', 'Gazebo'],
  },
  {
    role: 'Member — Software Sub Team',
    org: 'Team Interplanetar',
    period: '2023 — 2025',
    description:
      'Contributed to rover perception, navigation packages, and ROS 2 integration across simulation and hardware bring-up.',
    tags: ['ROS2', 'Perception', 'C++'],
  },
  {
    role: 'Member',
    org: 'BUET Automobile Club',
    period: '2023 — Present',
    description:
      'Hands-on robotics competitions — BattleBot and Robo Soccer platforms with embedded control and mechanical integration.',
    tags: ['Embedded', 'Controls', 'Mechanical'],
  },
]

export const extracurricular = [
  {
    org: 'Team Interplanetar · BUET',
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



export const achievements = [
  {
    title: 'Champion — Robo Soccer Challenge',
    context: 'Intra BUET Robo Challenge 2024 · BUET Robotics Club',
    detail: 'Led team Siuuu with a radio-controlled four-wheel soccer bot built on BattleBot experience.',
  },
  {
    title: 'Closed-Loop Drone Simulation',
    context: 'ROS 2 Humble × ArduPilot integration',
    detail: 'Bridged aerial autopilot firmware with ROS 2 for integrated simulation and control validation.',
  },
  {
    title: 'BattleBot — NSARv1',
    context: 'BUET Automobile Club',
    detail: 'Combat robotics platform developed for intra-university BattleBot competition.',
  },
]

export const creativePortfolios = [
  {
    id: 'art',
    platform: 'Instagram',
    handle: '@aquarelle_verse',
    title: 'Aquarelle Verse',
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
    youtube: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    description:
      'Full autonomy stack — SLAM, Nav2 waypoint nav, ROS2 architecture, and Gazebo digital twin for a competition-grade Mars rover.',
    tags: ['ROS2', 'Nav2', 'SLAM', 'Gazebo', 'C++'],
  },
  {
    id: '02',
    title: 'warehouse_agv',
    status: 'in-progress',
    image: '/images/projects/warehouse_agv.png',
    youtube: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
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
    youtube: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
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
    youtube: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    description:
      'Speech-to-command interface — natural language parsed and mapped to motor commands via ROS2.',
    tags: ['Python', 'ROS2', 'NLP'],
  },
  {
    id: '05',
    title: 'Autonomous_Exploration',
    status: 'completed',
    href: 'https://github.com/abulhasnat-abdullah/Autonomous_Exploration',
    image: '/images/projects/Autonomous_Exploration.png',
    youtube: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    description: 'Autonomous exploration pipeline for mobile robots in unknown environments.',
    tags: ['ROS2', 'SLAM', 'Python'],
  },
  {
    id: '06',
    title: 'pointcloud_to_laserscan',
    status: 'completed',
    href: 'https://github.com/abulhasnat-abdullah/pointcloud_to_laserscan',
    image: '/images/projects/pointcloud_to_laserscan.png',
    youtube: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    description: 'Converts 3D point cloud data into 2D laser scans for navigation stack compatibility.',
    tags: ['ROS2', 'Perception', 'C++'],
  },
]

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
    category: 'Robotics & Autonomy',
    skills: ['ROS2', 'Nav2', 'MoveIt2', 'Gazebo', 'SLAM Toolbox', 'tf2', 'OMPL', 'PyBullet', 'RViz2'],
  },
  {
    category: 'Languages & Systems',
    skills: ['C', 'C++', 'Python', 'Bash', 'CMake', 'Linux', 'Ubuntu', 'Docker', 'Git'],
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
    category: 'Graphic Design',
    skills: ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign', 'Adobe After Effects'],
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