export interface WorkedWithCompany {
  id: string;
  name: string;
  url: string;
  /** path under /public; left out, the chip shows the initials */
  logo?: string;
}

/** "Worked with" strip on the homepage: companies only, products live on /portfolio */
export const WORKED_WITH: WorkedWithCompany[] = [
  { id: 'venturesea', name: 'VentureSEA Digital', url: 'https://venturesea.co', logo: '/media/companies/venturesea.png' },
  { id: 'agp', name: 'AGP Group', url: 'https://agpgroup.com', logo: '/media/companies/agp.svg' },
  { id: 'tridorian', name: 'Tridorian', url: 'https://tridorian.com', logo: '/media/companies/tridorian.png' },
  { id: 'coaifounder', name: 'Co-AI Founder', url: 'https://coaifounder.com', logo: '/media/companies/coaifounder.png' },
  { id: 'mnx', name: 'MNX.ai', url: 'https://github.com/MNX-ai', logo: '/media/companies/mnx.png' },
  { id: 'simplexity', name: 'Simplexity Legal', url: 'https://simplexitylegal.com', logo: '/media/companies/simplexity.jpg' },
  { id: 'heypico', name: 'HeyPico', url: 'https://heypico.ai', logo: '/media/companies/heypico.png' },
  { id: 'avatara', name: 'Avatara Labs', url: 'https://avataralabs.ai', logo: '/media/companies/avatara.png' },
  { id: 'sirclo', name: 'SIRCLO', url: 'https://sirclo.com', logo: '/media/companies/sirclo.png' },
  { id: 'orami', name: 'Orami', url: 'https://orami.co.id', logo: '/media/companies/orami.png' },
  { id: 'lazone', name: 'LaZone', url: 'https://lazone.id', logo: '/media/companies/lazone.svg' },
  { id: 'surd', name: 'SURD Studio', url: 'https://surd.studio', logo: '/media/companies/surd.png' },
  { id: 'jetdesigns', name: 'JetDesigns', url: 'https://jet.studio', logo: '/media/companies/jetdesigns.png' }
];
