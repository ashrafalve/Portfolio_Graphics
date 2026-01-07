
export type ProjectCategory = 'Poster' | 'Banner' | 'Branding' | 'Card' | 'Social Media';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory | ProjectCategory[];
  imageUrl: string;
  tool: 'Illustrator' | 'Photoshop' | 'Canva';
  description: string;
}

export interface Skill {
  name: string;
  level: number;
  icon: string;
}
