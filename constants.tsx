
import React from 'react';
import { Project, Skill } from './types';

import amazfitGtr4 from './images/amazfit gtr 4.jpg';
import ribsUmbrella from './images/12 ribs umbrella.jpg';
import culturalNight from './images/culturalnight.jpg';
import concert from './images/concert.jpg';
import bangladeshVsHongKong from './images/bangladesh vs hong kong match day.jpg';
import appleAirTag from './images/apple airtag.jpg';
import bplFootball from './images/bashundhara kings vs mohammedan bpl football 2024 2025.jpg';
import bplRound2 from './images/mohammedan sc vs bashundhara kings bpl round 2 match day.jpg';
import ramadanWork from './images/ramadanwork.jpg';
import baseusLamp from './images/Baseus Smart Eye Series Rechargeable Folding Reading Desk Lamp Smart Light.jpg';
import amazfitBanner from './images/amazfit cheetah web banner.jpg';
import marchEvent from './images/march.jpg';
import baseusStand from './images/basues mesh portable laptop stand 15 inch.jpg';
import adCampaign from './images/ad5.jpg';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Amazfit GTR 4',
    category: ['Social Media', 'Poster'],
    tool: 'Photoshop',
    imageUrl: amazfitGtr4,
    description: 'Social media graphics for Amazfit GTR 4 smartwatch product showcase.'
  },
  {
    id: '2',
    title: '12 Ribs Umbrella',
    category: ['Social Media', 'Poster'],
    tool: 'Photoshop',
    imageUrl: ribsUmbrella,
    description: 'Social media product showcase for premium umbrella branding and marketing.'
  },
  {
    id: '3',
    title: 'Cultural Night',
    category: ['Social Media', 'Poster'],
    tool: 'Photoshop',
    imageUrl: culturalNight,
    description: 'Social media poster for cultural event showcasing multicultural diversity and traditional motifs.'
  },
  {
    id: '4',
    title: 'Concert Poster',
    category: ['Social Media', 'Poster'],
    tool: 'Photoshop',
    imageUrl: concert,
    description: 'Social media concert poster with musical elements and dynamic visual hierarchy.'
  },
  {
    id: '5',
    title: 'Bangladesh vs Hong Kong',
    category: ['Social Media', 'Poster'],
    tool: 'Photoshop',
    imageUrl: bangladeshVsHongKong,
    description: 'Social media graphics for Bangladesh vs Hong Kong cricket match tournament.'
  },
  {
    id: '6',
    title: 'Apple AirTag Product',
    category: ['Social Media', 'Poster'],
    tool: 'Illustrator',
    imageUrl: appleAirTag,
    description: 'Product showcase social media graphics for Apple AirTag with clean minimal design.'
  },
  {
    id: '7',
    title: 'BPL Football Match',
    category: ['Social Media', 'Poster'],
    tool: 'Photoshop',
    imageUrl: bplFootball,
    description: 'Social media graphics for BPL football match season 2024-2025.'
  },
  {
    id: '8',
    title: 'BPL Round 2',
    category: ['Social Media', 'Poster'],
    tool: 'Illustrator',
    imageUrl: bplRound2,
    description: 'Social media match day graphics for Mohammedan SC vs Bashundhara Kings round 2.'
  },
  {
    id: '9',
    title: 'Ramadan Campaign',
    category: ['Social Media', 'Poster'],
    tool: 'Canva',
    imageUrl: ramadanWork,
    description: 'Festive Ramadan campaign design for social media with traditional Islamic elements and modern typography.'
  },
  {
    id: '10',
    title: 'Baseus Smart Lamp',
    category: ['Social Media', 'Poster'],
    tool: 'Illustrator',
    imageUrl: baseusLamp,
    description: 'Social media product photography for Baseus smart lamp series showcase.'
  },
  {
    id: '11',
    title: 'Amazfit Cheetah Banner',
    category: 'Banner',
    tool: 'Photoshop',
    imageUrl: amazfitBanner,
    description: 'Web banner design for Amazfit Cheetah smartwatch launch campaign.'
  },
  {
    id: '12',
    title: 'March Event',
    category: ['Social Media', 'Poster'],
    tool: 'Canva',
    imageUrl: marchEvent,
    description: 'Dynamic March celebration social media poster featuring bold color schemes and energetic composition.'
  },
  {
    id: '13',
    title: 'Baseus Laptop Stand',
    category: 'Card',
    tool: 'Illustrator',
    imageUrl: baseusStand,
    description: 'Product card design for Baseus portable laptop stand marketing materials.'
  },
  {
    id: '14',
    title: 'Ad Campaign',
    category: 'Branding',
    tool: 'Photoshop',
    imageUrl: adCampaign,
    description: 'Comprehensive advertising campaign with brand identity and visual consistency.'
  }
];

export const SKILLS: Skill[] = [
  { name: 'Adobe Illustrator', level: 80, icon: 'Ai' },
  { name: 'Adobe Photoshop', level: 70, icon: 'Ps' },
  { name: 'Canva Mastery', level: 95, icon: 'Cv' },
  { name: 'UI/UX Architecture', level: 80, icon: 'UX' }
];

export const EXPERIENCE = [
  {
    role: "Designer",
    company: "Gadget Track BD",
    period: "Ongoing",
    description: [
      "Managed website content, UI updates, and product listings.",
      "Designed visually engaging graphics for marketing and social campaigns.",
      "Increased online engagement through strategic content planning.",
      "Collaborated with management to align branding and presence."
    ]
  }
];

export const EDUCATION = [
  {
    degree: "Bachelor of Science in CSE",
    institution: "University of Asia Pacific",
    period: "Completed"
  }
];

export const MILESTONES = [
  "Designed Official CSE Magazine for UAP - View Magazine",
  "Poster Design Competition: Top Position Achiever",
  "Successfully Managed Multiple Social Media Campaigns"
];
