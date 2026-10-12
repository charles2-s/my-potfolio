/**
 * ==========================================================================
 *  PORTFOLIO CONTENT — THE ONLY FILE YOU NEED TO EDIT
 * ==========================================================================
 *  Every value you will want to personalise lives in this file.
 *  Each one is marked with a  TODO  comment so you can find it fast.
 *
 *  RULES
 *  - Sections whose arrays are empty are hidden automatically, so the site
 *    stays clean until you add real content.
 *  - Placeholders are labelled "PLACEHOLDER:" or "YOUR ..." — search for
 *    "TODO" to jump to each one.
 *  - Never put content in index.html; add it here instead.
 * ==========================================================================
 */

const siteData = {

  /* ------------------------------------------------------------------
   *  PERSONAL DETAILS
   * ------------------------------------------------------------------ */
  personal: {
    name: "Charles Auma",                         // TODO: your full name
    title: "Red Team Operator & Security Developer",  // TODO
    location: "Nairobi, Kenya",                   // TODO
    // TODO: your 2-3 sentence bio (also shown in the About section)
    taglines: [                           // TODO: rotating lines shown in the hero (1-3 strings)
      "Penetration testing, OSINT and threat hunting"
    ],
    // TODO: drop your photo at assets/profile.jpg (square, ~800x800 works well).
    // Until then a placeholder icon is shown automatically.
    profileImage: "assets/profile.jpg",
    profileImageFallback: "assets/profile-placeholder.svg"
  },

  /* ------------------------------------------------------------------
   *  ABOUT — shown when at least one highlight exists
   * ------------------------------------------------------------------ */
  about: {
    bio: "I'm a red team operator and security developer. I simulate real-world attacks through penetration testing, OSINT and threat hunting to show organisations where they are exposed before an attacker does. I also build custom tooling and automation to make assessments faster and more repeatable, and I have delivered security projects for clients across multiple engagements. I use AI-assisted development to build faster, and I review and test everything for security before it ships.",
    highlights: [
      "Penetration testing and red team operations",
      "OSINT and threat hunting",
      "Custom security tooling and automation"
    ]
  },

  /* ------------------------------------------------------------------
   *  SKILLS — each group is shown only when its list is non-empty
   * ------------------------------------------------------------------ */
  skills: {
    security: [                           // TODO: replace with your security skills
      "Penetration Testing (Web, Network, Infrastructure)",
      "Red Team Operations",
      "OSINT and Reconnaissance",
      "Threat Hunting",
      "Vulnerability Assessment",
      "Web Application Security (OWASP Top 10)",
      "Security Reporting and Remediation Advice"
    ],
    development: [                        // TODO: replace with your development skills
      {
        label: "Frontend",                // TODO: sub-group label
        items: [                          // TODO: tags
          "HTML5 / CSS3 / JavaScript",
          "React",
          "Responsive and Mobile-First Design"
        ]
      },
      {
        label: "Backend and Databases",   // TODO
        items: [                          // TODO
          "Python",
          "Node.js",
          "SQL",
          "MongoDB",
          "Backend and Admin Panels"
        ]
      },
      {
        label: "Workflow",                // TODO
        items: [                          // TODO
          "AI-Assisted Development (Vibe Coding)",
          "Secure Coding Practices",
          "Website Hosting and Deployment",
          "Git and GitHub"
        ]
      }
    ],
    tools: [                              // TODO: replace with your tools & platforms
      "Kali Linux",
      "Nmap",
      "Burp Suite",
      "Metasploit",
      "Wireshark",
      "Maltego",
      "Shodan",
      "Docker",
      "Git"
    ]
  },

  /* ------------------------------------------------------------------
   *  WEB PROJECTS — always shown. 6 cards.
   *  Each card: name, description, built, tech, url, code, year, image.
   *  "image" is a single path, or an array of paths for a
   *  click-to-cycle screenshot gallery.
   * ------------------------------------------------------------------ */
  webProjects: [
    {
      name: "Buchan Safari Kenya",               // TODO
      description: "Website for a Nairobi-based safari and tour company, with a searchable tour catalogue, online booking requests, airport transfer pages and an admin area for managing content.", // TODO
      built: "Full website design and development: tour listings with destination, type and duration filters, booking flow, photo and video gallery, WhatsApp and phone contact, and an admin panel.", // TODO
      tech: [                                     // TODO: replace with the real stack
        "TODO: e.g. React",
        "TODO: e.g. Node.js"
      ],
      url: "https://www.buchansafari.com",      // TODO: live URL ("" to hide the button)
      code: "",                                    // TODO: code repo URL, or "" to hide the button
      year: "TODO",                              // TODO: e.g. "2025"
      image: [                                      // TODO: screenshot(s), or [] to show a placeholder
        "assets/projects/buchan1.png",
        "assets/projects/buchan2.png"
      ]
    },
    {
      name: "D-Gas LTD",                          // TODO
      description: "Website for a cooking gas delivery company in Nairobi, with product pages for several gas brands and cylinder sizes, and WhatsApp and phone ordering.", // TODO
      built: "Responsive multi-page site (home, products, contact), deployed on Vercel.", // TODO
      tech: [                                     // TODO: replace with the real stack
        "HTML",
        "CSS",
        "Vercel"
      ],
      url: "https://dgas-ltd.vercel.app",       // TODO: live URL ("" to hide the button)
      code: "https://github.com/charles2-s/dgas-ltd", // TODO: code repo URL, or "" to hide the button
      year: "TODO",                              // TODO: e.g. "2025"
      image: "assets/projects/dgas.png"           // TODO: screenshot path, or "" to show a placeholder
    },
    {
      name: "TrailShare",                        // TODO
      description: "Travel itinerary platform where users can share trips, track destinations and keep travellers informed.", // TODO
      built: "Full-stack web app with user sign-up and login.", // TODO
      tech: [                                     // TODO: replace with the real stack
        "TODO: e.g. React",
        "TODO: e.g. Node.js"
      ],
      url: "https://tvell-ai.vercel.app",       // TODO: live URL ("" to hide the button)
      code: "",                                    // TODO: code repo URL, or "" to hide the button
      year: "TODO",                              // TODO: e.g. "2025"
      image: "assets/projects/trailshare.png"   // TODO: screenshot path, or "" to show a placeholder
    },
    {
      name: "TODO: Project name",                // TODO
      description: "TODO: 1-2 sentence description of the site and what it does.", // TODO
      built: "TODO: what you designed and built.", // TODO
      tech: ["TODO: e.g. Vue", "TODO: e.g. Django"], // TODO
      url: "",                                    // TODO
      code: "",                                    // TODO: code repo URL, or "" to hide
      year: "TODO",                               // TODO
      image: ""                                   // TODO
    },
    {
      name: "TODO: Project name",                // TODO
      description: "TODO: 1-2 sentence description of the site and what it does.", // TODO
      built: "TODO: what you designed and built.", // TODO
      tech: ["TODO: e.g. Next.js", "TODO: e.g. PostgreSQL"], // TODO
      url: "",                                    // TODO
      code: "",                                    // TODO: code repo URL, or "" to hide
      year: "TODO",                               // TODO
      image: ""                                   // TODO
    },
    {
      name: "TODO: Project name",                // TODO
      description: "TODO: 1-2 sentence description of the site and what it does.", // TODO
      built: "TODO: what you designed and built.", // TODO
      tech: ["TODO: e.g. Laravel", "TODO: e.g. MySQL"], // TODO
      url: "",                                    // TODO
      code: "",                                    // TODO: code repo URL, or "" to hide
      year: "TODO",                               // TODO
      image: ""                                   // TODO
    },
  ],

  /* ------------------------------------------------------------------
   *  SECURITY ENGAGEMENTS — always shown. 7 cards.
   *  Each card: title, sector, type, description, role, outcome, tech.
   *  NOTE: never add client names, logos or links — the sector label
   *  is all that should identify the engagement.
   * ------------------------------------------------------------------ */
  engagements: [
    // TODO: REPLACE ALL 7 PLACEHOLDER PROJECTS BELOW WITH YOUR OWN.
    // Copy the shape for each real project.
    {
      title: "TODO: Project title",                          // TODO
      sector: "Finance",                                     // TODO: sector only, e.g. Finance / Healthcare / NGO
      type: "External Penetration Test",                     // TODO: engagement type
      description: "TODO: 2-3 sentence summary of the engagement scope and approach.", // TODO
      role: "TODO: your role, e.g. lead penetration tester.", // TODO
      outcome: "TODO: measurable outcome, e.g. critical finding remediated before launch.", // TODO
      tech: ["TODO: e.g. Nmap", "TODO: e.g. Burp Suite"]   // TODO
    },
    {
      title: "TODO: Project title",                          // TODO
      sector: "Healthcare",                                  // TODO
      type: "Web Application Penetration Test",              // TODO
      description: "TODO: 2-3 sentence summary of the engagement scope and approach.", // TODO
      role: "TODO: your role",                               // TODO
      outcome: "TODO: measurable outcome",                   // TODO
      tech: ["TODO: e.g. OWASP ZAP", "TODO: e.g. SQLMap"]    // TODO
    },
    {
      title: "TODO: Project title",                          // TODO
      sector: "NGO",                                         // TODO
      type: "Red Team Operation",                            // TODO
      description: "TODO: 2-3 sentence summary of the engagement scope and approach.", // TODO
      role: "TODO: your role",                               // TODO
      outcome: "TODO: measurable outcome",                   // TODO
      tech: ["TODO: e.g. Cobalt Strike", "TODO: e.g. BloodHound"] // TODO
    },
    {
      title: "TODO: Project title",                          // TODO
      sector: "Retail",                                      // TODO
      type: "Internal Network Penetration Test",             // TODO
      description: "TODO: 2-3 sentence summary of the engagement scope and approach.", // TODO
      role: "TODO: your role",                               // TODO
      outcome: "TODO: measurable outcome",                   // TODO
      tech: ["TODO: e.g. Nessus", "TODO: e.g. CrackMapExec"] // TODO
    },
    {
      title: "TODO: Project title",                          // TODO
      sector: "Technology",                                  // TODO
      type: "Cloud Security Assessment",                     // TODO
      description: "TODO: 2-3 sentence summary of the engagement scope and approach.", // TODO
      role: "TODO: your role",                               // TODO
      outcome: "TODO: measurable outcome",                   // TODO
      tech: ["TODO: e.g. Pacu", "TODO: e.g. ScoutSuite"]     // TODO
    },
    {
      title: "TODO: Project title",                          // TODO
      sector: "Government",                                  // TODO
      type: "OSINT and Threat Intelligence Report",          // TODO
      description: "TODO: 2-3 sentence summary of the engagement scope and approach.", // TODO
      role: "TODO: your role",                               // TODO
      outcome: "TODO: measurable outcome",                   // TODO
      tech: ["TODO: e.g. Maltego", "TODO: e.g. Shodan"]      // TODO
    },
    {
      title: "TODO: Project title",                          // TODO
      sector: "Education",                                   // TODO
      type: "Social Engineering Assessment",                 // TODO
      description: "TODO: 2-3 sentence summary of the engagement scope and approach.", // TODO
      role: "TODO: your role",                               // TODO
      outcome: "TODO: measurable outcome",                   // TODO
      tech: ["TODO: e.g. GoPhish", "TODO: e.g. Kerberoast"]  // TODO
    },
  ],

  /* ------------------------------------------------------------------
   *  EXPERIENCE — hidden while empty.
   *  Each item: { role, company, period, details: ["...", "..."] }
   * ------------------------------------------------------------------ */
  experience: [
    // TODO: add your roles, e.g.
    // { role: "Security Analyst", company: "Company", period: "2023 — Present",
    //   details: ["Monitored SOC alerts", "Built detection rules"] },
  ],

  /* ------------------------------------------------------------------
   *  EDUCATION — hidden while empty.
   *  Each item: { degree, institution, period }
   * ------------------------------------------------------------------ */
  education: [
    // TODO: add your degrees, e.g.
    // { degree: "BSc Computer Science", institution: "University", period: "2019 — 2023" },
  ],

  /* ------------------------------------------------------------------
   *  CERTIFICATIONS — hidden while empty.
   *  Each item: { name, issuer, year, badge }  (badge = optional URL)
   * ------------------------------------------------------------------ */
  certifications: [
    // TODO: add yours, e.g.
    // { name: "Security+", issuer: "CompTIA", year: "2024", badge: "" },
    // { name: "CEH", issuer: "EC-Council", year: "2024", badge: "" },
  ],

  /* ------------------------------------------------------------------
   *  BLOG / WRITE-UPS — hidden while empty.
   *  Each item: { title, date, excerpt, url }
   * ------------------------------------------------------------------ */
  blog: [
    // TODO: add yours, e.g.
    // { title: "Write-up: HackTheBox Machine", date: "2024-01-15",
    //   excerpt: "How I rooted the box...", url: "writeups/htb-machine.html" },
  ],

  /* ------------------------------------------------------------------
   *  CONTACT — also powers the mailto/social links in the footer
   * ------------------------------------------------------------------ */
  contact: {
    email: "aumacharle39@gmail.com",              // TODO: your email
    github: "https://github.com/charles2-s",    // TODO: your GitHub URL
    linkedin: "https://www.linkedin.com/in/charles-auma-b1715835b/" // TODO: your LinkedIn URL
  },

  /* ------------------------------------------------------------------
   *  PAGE METADATA
   * ------------------------------------------------------------------ */
  meta: {
    title: "Charles Auma | Red Team & Security Developer", // TODO: browser tab title
    description: "Charles Auma — red team operator and security developer in Nairobi, Kenya. Penetration testing, OSINT and threat hunting.", // TODO
    ogImage: "assets/favicon.svg"         // image shown when sharing the link
  }
};

// Expose to main.js (const does not attach to window automatically).
window.siteData = siteData;
