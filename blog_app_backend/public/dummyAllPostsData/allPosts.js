const allPosts = [
  {
    title: "Exploring the Depths of AI",
    description:
      "An in-depth look at artificial intelligence and its applications.",
    poster: "https://www.pexels.com/photo/code-projected-over-woman-3861969/",
    content: {
      _id: "5304",
      postContent: `<p style="text-align: center;"><span style="font-size: 36pt;"><span style="color: #e03e2d;"><strong>Exploring the Depths of AI</strong></span> </span></p>
        <p><span style="color: #2dc26b;">Artificial intelligence (AI)&nbsp;</span>has rapidly evolved from a futuristic concept to a transformative force reshaping our world. Its impact is felt across various sectors, from healthcare and finance to transportation and entertainment.</p>
        <p style="text-align: center;"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Dall-e_3_%28jan_%2724%29_artificial_intelligence_icon.png/800px-Dall-e_3_%28jan_%2724%29_artificial_intelligence_icon.png" alt="AI brain image" width="199" height="199"></p>
        <p><span style="text-decoration: underline;"><em>At the heart of AI lie several key disciplines, including machine learning, deep learning, and natural language processing. Machine learning empowers computers to learn from data without explicit programming.</em></span></p>
        <p><span style="text-decoration: underline;"><em><a href="https://en.wikipedia.org/wiki/Artificial_intelligence" target="_blank" rel="noopener">Explore Ai on wikipedia.</a></em></span></p>
        <p>This involves training algorithms on massive datasets to identify patterns, make predictions, and perform tasks such as image recognition, fraud detection, and personalized recommendations. Deep learning, a subset of machine learning, utilizes artificial neural networks with multiple layers to analyze complex data, such as images, text, and audio. This has led to breakthroughs in areas like computer vision, natural language understanding, and speech recognition.</p>
        <h1 style="text-align: center;">THANK YOU!</h1>
        <p>&nbsp;</p>`,
      createdAt: "2025-01-03T10:00:00Z",
      updatedAt: "2025-01-03T11:00:00Z",
    },
    author: {
      enrollment: "CS202101001",
      studentName: "John Doe",
      email: "john.doe@example.com",
      avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
      isAuthor: true,
    },
    summary:
      "This post discusses an in-depth look at artificial intelligence and its applications.",
    minutesRead: "6 mins",
    tags: ["AI", "ML", "Tech"],
    createdAt: "2025-01-03T10:00:00Z",
    updatedAt: "2025-01-03T12:00:00Z",
  },
  {
    title: "The Evolution of Blockchain Technology",
    description: "Discover how blockchain has transformed industries.",
    poster: "https://images.pexels.com/photos/843700/pexels-photo-843700.jpeg",
    content: {
      _id: "5305",
      postContent: `
        <p style="text-align: center;"><span style="font-size: 36pt;"><span style="color: #2e86de;"><strong>The Evolution of Blockchain Technology</strong></span></span></p>
        <p>Blockchain technology has revolutionized industries by offering transparency, decentralization, and security.</p>
        <p style="text-align: center;"><img src="https://www.pexels.com/photo/round-gold-colored-and-black-coin-on-person-s-hand-844125/" alt="Blockchain illustration" width="199" height="199"></p>
        <p>From cryptocurrencies like Bitcoin to supply chain management, blockchain has become a game-changer.</p>
        <p><span style="text-decoration: underline;"><a href="https://en.wikipedia.org/wiki/Blockchain" target="_blank" rel="noopener">Learn more about Blockchain on Wikipedia.</a></span></p>
        <h1 style="text-align: center;">THANK YOU!</h1>
        <p>&nbsp;</p>`,
      createdAt: "2025-01-03T12:00:00Z",
      updatedAt: "2025-01-03T13:00:00Z",
    },
    author: {
      enrollment: "CS202101002",
      studentName: "Jane Smith",
      email: "jane.smith@example.com",
      avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg",
      isAuthor: true,
    },
    summary:
      "This post explores how blockchain technology has transformed industries.",
    minutesRead: "7 mins",
    tags: ["Blockchain", "Cryptocurrency", "Tech"],
    createdAt: "2025-01-03T12:00:00Z",
    updatedAt: "2025-01-03T13:00:00Z",
  },
  {
    title: "Quantum Computing: The Next Frontier",
    description:
      "An introduction to the fascinating world of quantum computing.",
    poster: "https://images.pexels.com/photos/256219/pexels-photo-256219.jpeg",
    content: {
      _id: "5306",
      postContent: `
        <p style="text-align: center;"><span style="font-size: 36pt;"><span style="color: #8e44ad;"><strong>Quantum Computing: The Next Frontier</strong></span></span></p>
        <p>Quantum computing leverages quantum mechanics to solve problems that traditional computers cannot.</p>
        <p style="text-align: center;"><img src="https://www.researchgate.net/publication/323904792/figure/fig1/AS:606458647441408@1521602417763/Architecture-of-quantum-computing-platform.png"></p>
        <p>It holds the potential to revolutionize fields like cryptography, material science, and artificial intelligence.</p>
        <p><span style="text-decoration: underline;"><a href="https://en.wikipedia.org/wiki/Quantum_computing" target="_blank" rel="noopener">Explore Quantum Computing on Wikipedia.</a></span></p>
        <h1 style="text-align: center;">THANK YOU!</h1>
        <p>&nbsp;</p>`,
      createdAt: "2025-01-03T14:00:00Z",
      updatedAt: "2025-01-03T15:00:00Z",
    },
    author: {
      enrollment: "CS202101003",
      studentName: "Alice Brown",
      email: "alice.brown@example.com",
      avatarUrl: "https://randomuser.me/api/portraits/women/2.jpg",
      isAuthor: true,
    },
    summary:
      "This post introduces quantum computing and its potential applications.",
    minutesRead: "8 mins",
    tags: ["Quantum Computing", "Tech", "Innovation"],
    createdAt: "2025-01-03T14:00:00Z",
    updatedAt: "2025-01-03T15:00:00Z",
  },
  {
    title: "Understanding the Internet of Things (IoT)",
    description: "A closer look at IoT and its impact on everyday life.",
    poster:
      "https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg",
    content: {
      _id: "5307",
      postContent: `
        <p style="text-align: center;"><span style="font-size: 36pt;"><span style="color: #1abc9c;"><strong>Understanding the Internet of Things (IoT)</strong></span></span></p>
        <p>The Internet of Things (IoT) connects everyday devices to the internet, enabling smarter living.</p>
        <p style="text-align: center;"><img src="https://www.scnsoft.com/blog-pictures/internet-of-things/iot-architecture.png" alt="IoT devices" width="199" height="199"></p>
        <p>From smart homes to industrial automation, IoT is reshaping our interactions with technology.</p>
        <p><span style="text-decoration: underline;"><a href="https://en.wikipedia.org/wiki/Internet_of_things" target="_blank" rel="noopener">Learn about IoT on Wikipedia.</a></span></p>
        <h1 style="text-align: center;">THANK YOU!</h1>
        <p>&nbsp;</p>`,
      createdAt: "2025-01-03T16:00:00Z",
      updatedAt: "2025-01-03T17:00:00Z",
    },
    author: {
      enrollment: "CS202101004",
      studentName: "Michael Green",
      email: "michael.green@example.com",
      avatarUrl: "https://randomuser.me/api/portraits/men/2.jpg",
      isAuthor: true,
    },
    summary:
      "This post dives into the world of IoT and its influence on technology.",
    minutesRead: "5 mins",
    tags: ["IoT", "Tech", "Innovation"],
    createdAt: "2025-01-03T16:00:00Z",
    updatedAt: "2025-01-03T17:00:00Z",
  },
  {
    title: "The Future of Autonomous Vehicles",
    description:
      "Exploring how autonomous vehicles will change transportation.",
    poster: "https://images.pexels.com/photos/710166/pexels-photo-710166.jpeg",
    content: {
      _id: "5308",
      postContent: `
        <p style="text-align: center;"><span style="font-size: 36pt;"><span style="color: #e74c3c;"><strong>The Future of Autonomous Vehicles</strong></span></span></p>
        <p>Autonomous vehicles are revolutionizing the transportation industry, promising safer, more efficient travel.</p>
        <p style="text-align: center;"><img src="https://encyclopedia.pub/media/item_content/202104/606c0eebbd741sensors-21-00706-g004-550.jpg" alt="Autonomous vehicle" width="199" height="199"></p>
        <p><span style="text-decoration: underline;"><em>These vehicles use AI, sensors, and cameras to navigate without human intervention.</em></span></p>
        <p>They have the potential to reduce accidents, ease traffic congestion, and lower carbon emissions.</p>
        <p><span style="text-decoration: underline;"><a href="https://en.wikipedia.org/wiki/Autonomous_car" target="_blank" rel="noopener">Learn more about Autonomous Vehicles on Wikipedia.</a></span></p>
        <h1 style="text-align: center;">THANK YOU!</h1>
        <p>&nbsp;</p>`,
      createdAt: "2025-01-03T18:00:00Z",
      updatedAt: "2025-01-03T19:00:00Z",
    },
    author: {
      enrollment: "CS202101005",
      studentName: "Sarah White",
      email: "sarah.white@example.com",
      avatarUrl: "https://randomuser.me/api/portraits/women/3.jpg",
      isAuthor: true,
    },
    summary:
      "A deep dive into the impact of autonomous vehicles on future transportation.",
    minutesRead: "6 mins",
    tags: ["Autonomous Vehicles", "AI", "Tech"],
    createdAt: "2025-01-03T18:00:00Z",
    updatedAt: "2025-01-03T19:00:00Z",
  },
  {
    title: "The Rise of 5G Networks",
    description: "How 5G networks are transforming connectivity.",
    poster: "https://images.pexels.com/photos/767962/pexels-photo-767962.jpeg",
    content: {
      _id: "5309",
      postContent: `
        <p style="text-align: center;"><span style="font-size: 36pt;"><span style="color: #2980b9;"><strong>The Rise of 5G Networks</strong></span></span></p>
        <p>5G networks are poised to revolutionize the way we communicate and interact with the digital world.</p>
        <p style="text-align: center;"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjHDh6sgFrViEAkj-R5Omdfs7ZdPu8cey6Bw&s" alt="5G logo" width="199" height="199"></p>
        <p><span style="text-decoration: underline;"><em>With faster speeds and lower latency, 5G will unlock new possibilities for everything from virtual reality to autonomous cars.</em></span></p>
        <p>The transition to 5G will enable a new era of connectivity, improving mobile experiences and supporting new technologies.</p>
        <h1 style="text-align: center;">THANK YOU!</h1>
        <p>&nbsp;</p>`,
      createdAt: "2025-01-03T20:00:00Z",
      updatedAt: "2025-01-03T21:00:00Z",
    },
    author: {
      enrollment: "CS202101006",
      studentName: "David Lee",
      email: "david.lee@example.com",
      avatarUrl: "https://randomuser.me/api/portraits/men/3.jpg",
      isAuthor: true,
    },
    summary:
      "This post discusses the impact of 5G on connectivity and technology.",
    minutesRead: "5 mins",
    tags: ["5G", "Tech", "Connectivity"],
    createdAt: "2025-01-03T20:00:00Z",
    updatedAt: "2025-01-03T21:00:00Z",
  },
  {
    title: "Cybersecurity in the Digital Age",
    description:
      "The growing importance of cybersecurity in a connected world.",
    poster:
      "https://www.pexels.com/photo/close-up-view-of-system-hacking-5380642/",
    content: {
      _id: "5310",
      postContent: `
        <p style="text-align: center;"><span style="font-size: 36pt;"><span style="color: #27ae60;"><strong>Cybersecurity in the Digital Age</strong></span></span></p>
        <p>As we become increasingly dependent on digital platforms, cybersecurity has become more important than ever.</p>
        <p style="text-align: center;"><img src="https://www.pexels.com/photo/close-up-view-of-system-hacking-5380642/"></p>
        <p><span style="text-decoration: underline;"><em>Cybersecurity helps protect personal data, business assets, and national security from malicious actors.</em></span></p>
        <p>The evolving landscape of cyber threats requires constant vigilance and innovation to stay ahead of potential risks.</p>
        <h1 style="text-align: center;">THANK YOU!</h1>
        <p>&nbsp;</p>`,
      createdAt: "2025-01-03T22:00:00Z",
      updatedAt: "2025-01-03T23:00:00Z",
    },
    author: {
      enrollment: "CS202101007",
      studentName: "Emma Wilson",
      email: "emma.wilson@example.com",
      avatarUrl: "https://randomuser.me/api/portraits/women/4.jpg",
      isAuthor: true,
    },
    summary:
      "This post highlights the critical role of cybersecurity in protecting digital assets.",
    minutesRead: "7 mins",
    tags: ["Cybersecurity", "Tech", "Safety"],
    createdAt: "2025-01-03T22:00:00Z",
    updatedAt: "2025-01-03T23:00:00Z",
  },
  {
    title: "The Power of Cloud Computing",
    description:
      "Exploring the significance of cloud computing in modern business.",
    poster:
      "https://www.ingenious.co.uk/wp-content/uploads/2023/08/What-is-Cloud-Computing.jpeg",
    content: {
      _id: "5311",
      postContent: `
        <p style="text-align: center;"><span style="font-size: 36pt;"><span style="color: #8e44ad;"><strong>The Power of Cloud Computing</strong></span></span></p>
        <p>Cloud computing has transformed the way businesses operate by providing scalable and flexible computing resources.</p>
        <p style="text-align: center;"><img src="https://cdn.codecoda.com/img/blog/cloud-computing-architecture-schema.png"></p>
        <p><span style="text-decoration: underline;"><em>It enables businesses to access software, storage, and processing power without the need for heavy infrastructure investment.</em></span></p>
        <p>With the rise of cloud platforms like AWS, Google Cloud, and Microsoft Azure, companies can leverage advanced technologies without managing on-site servers.</p>
        <h1 style="text-align: center;">THANK YOU!</h1>
        <p>&nbsp;</p>`,
      createdAt: "2025-01-04T00:00:00Z",
      updatedAt: "2025-01-04T01:00:00Z",
    },
    author: {
      enrollment: "CS202101008",
      studentName: "Liam Jackson",
      email: "liam.jackson@example.com",
      avatarUrl: "https://randomuser.me/api/portraits/men/4.jpg",
      isAuthor: true,
    },
    summary:
      "This post explores the advantages and impact of cloud computing on businesses.",
    minutesRead: "6 mins",
    tags: ["Cloud Computing", "Business", "Tech"],
    createdAt: "2025-01-04T00:00:00Z",
    updatedAt: "2025-01-04T01:00:00Z",
  },
  {
    title: "The Impact of Augmented Reality",
    description:
      "A closer look at how augmented reality is changing the world.",
    poster:
      "https://www.icertglobal.com/images/The%20Impact%20of%20Augmented%20Reality%20(AR)%20on%20Digital%20Marketing.webp",
    content: {
      _id: "5312",
      postContent: `
        <p style="text-align: center;"><span style="font-size: 36pt;"><span style="color: #f39c12;"><strong>The Impact of Augmented Reality</strong></span></span></p>
        <p>Augmented reality (AR) is altering the way we interact with the world by blending virtual and physical environments.</p>
        <p style="text-align: center;"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmP8T5eAlEzpfv5sXKZn0fEJ1nTgSvRRre6Q&s" alt="Augmented reality" width="199" height="199"></p>
        <p><span style="text-decoration: underline;"><em>From gaming and entertainment to healthcare and education, AR is creating immersive experiences.</em></span></p>
        <p>The technology overlays digital elements on the real world, enhancing our perception and engagement with surroundings.</p>
        <h1 style="text-align: center;">THANK YOU!</h1>
        <p>&nbsp;</p>`,
      createdAt: "2025-01-04T02:00:00Z",
      updatedAt: "2025-01-04T03:00:00Z",
    },
    author: {
      enrollment: "CS202101009",
      studentName: "Olivia Moore",
      email: "olivia.moore@example.com",
      avatarUrl: "https://randomuser.me/api/portraits/women/5.jpg",
      isAuthor: true,
    },
    summary:
      "This post explores the transformative impact of augmented reality in various fields.",
    minutesRead: "6 mins",
    tags: ["Augmented Reality", "Innovation", "Tech"],
    createdAt: "2025-01-04T02:00:00Z",
    updatedAt: "2025-01-04T03:00:00Z",
  },
  {
    title: "Exploring the Metaverse",
    description: "An introduction to the emerging world of the metaverse.",
    poster:
      "https://www.pexels.com/photo/a-woman-in-a-tank-top-using-a-vr-headset-8721318/",
    content: {
      _id: "5313",
      postContent: `
        <p style="text-align: center;"><span style="font-size: 36pt;"><span style="color: #9b59b6;"><strong>Exploring the Metaverse</strong></span></span></p>
        <p>The metaverse is a virtual reality space where users can interact with each other and digital environments in real time.</p>
        <p style="text-align: center;"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV1Z_p3MKGMbZ-KRrV705kWZ89rSk3D9bV3A&s" alt="Metaverse logo" width="199" height="199"></p>
        <p><span style="text-decoration: underline;"><em>It promises to reshape the way we socialize, work, and even shop.</em></span></p>
        <p>The metaverse is powered by technologies like virtual reality (VR), augmented reality (AR), and blockchain, offering a decentralized and immersive experience.</p>
        <h1 style="text-align: center;">THANK YOU!</h1>
        <p>&nbsp;</p>`,
      createdAt: "2025-01-04T04:00:00Z",
      updatedAt: "2025-01-04T05:00:00Z",
    },
    author: {
      enrollment: "CS202101010",
      studentName: "Ethan Harris",
      email: "ethan.harris@example.com",
      avatarUrl: "https://randomuser.me/api/portraits/men/5.jpg",
      isAuthor: true,
    },
    summary:
      "An introduction to the metaverse and its potential impact on society.",
    minutesRead: "7 mins",
    tags: ["Metaverse", "Virtual Reality", "Tech"],
    createdAt: "2025-01-04T04:00:00Z",
    updatedAt: "2025-01-04T05:00:00Z",
  },
];

// console.log("\n");
var count = 0;

for (const post of allPosts) {
  ++count;
  // console.log(`number ${count} -> ${post.title}`);
  // console.log("\n");
}
