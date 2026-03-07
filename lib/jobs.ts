export type Job = {
  id: string;
  title: string;
  employer: string;
  employerVerified: boolean;
  location: string;
  state: string;
  remote: boolean;
  specialty: string[];
  employmentType: 'Full-Time' | 'Part-Time' | 'PRN' | 'Travel/Contract';
  shift: string;
  onCall: boolean;
  salaryMin: number;
  salaryMax: number;
  salaryUnit: 'hr' | 'yr';
  credentialsRequired: string[];
  credentialsPreferred: string[];
  experience: string;
  equipment: string[];
  facilityType: 'Hospital' | 'Outpatient' | 'Mobile' | 'VA/Military' | 'Clinic';
  scanVolume: string;
  signOnBonus?: number;
  postedDays: number;
  featured: boolean;
  urgent: boolean;
  description: string;
  benefits: string[];
  teamSize: string;
};

export const SPECIALTIES = [
  'Abdominal',
  'OB/GYN',
  'Vascular',
  'Cardiac/Echo',
  'MSK',
  'Breast',
  'Pediatric',
  'Neurosonology',
  'Small Parts',
];

export const CREDENTIALS = [
  'RDMS (AB)',
  'RDMS (OB/GYN)',
  'RDMS (BR)',
  'RDMS (PS)',
  'RDMS (NE)',
  'RVT',
  'RDCS (AE)',
  'RDCS (PE)',
  'CCI (RCS)',
  'RMSKS',
];

export const EQUIPMENT_BRANDS = ['GE', 'Philips', 'Siemens', 'Canon', 'Mindray', 'Samsung'];

export const jobs: Job[] = [
  {
    id: '1',
    title: 'General Sonographer — OB/GYN & Abdominal',
    employer: 'Sunrise Women\'s Imaging Center',
    employerVerified: true,
    location: 'Orlando, FL',
    state: 'FL',
    remote: false,
    specialty: ['OB/GYN', 'Abdominal'],
    employmentType: 'Full-Time',
    shift: 'Days (Mon–Fri)',
    onCall: false,
    salaryMin: 38,
    salaryMax: 46,
    salaryUnit: 'hr',
    credentialsRequired: ['RDMS (AB)', 'RDMS (OB/GYN)'],
    credentialsPreferred: ['RVT'],
    experience: '2+ years post-registry',
    equipment: ['GE', 'Mindray'],
    facilityType: 'Outpatient',
    scanVolume: '18–22 patients/day',
    signOnBonus: 5000,
    postedDays: 2,
    featured: true,
    urgent: false,
    description: 'Join our growing women\'s imaging center in the heart of Orlando. We are a team of 4 sonographers and 1 lead who take pride in exceptional patient care. No hospital politics — just great equipment, consistent hours, and a supportive team. GE Voluson E10 for all OB work. Monday through Friday, no weekends, no call.',
    benefits: ['Health/Dental/Vision', '401(k) 4% match', 'CEU reimbursement $1,000/yr', '3 weeks PTO', '$5,000 sign-on bonus'],
    teamSize: '4 sonographers + 1 lead',
  },
  {
    id: '2',
    title: 'Vascular Sonographer — RVT Required',
    employer: 'Memorial Health System',
    employerVerified: true,
    location: 'Nashville, TN',
    state: 'TN',
    remote: false,
    specialty: ['Vascular'],
    employmentType: 'Full-Time',
    shift: 'Days, some evenings',
    onCall: true,
    salaryMin: 40,
    salaryMax: 54,
    salaryUnit: 'hr',
    credentialsRequired: ['RVT'],
    credentialsPreferred: ['RDMS (AB)'],
    experience: '3+ years vascular',
    equipment: ['Philips', 'GE'],
    facilityType: 'Hospital',
    scanVolume: '12–16 studies/day',
    signOnBonus: 8000,
    postedDays: 5,
    featured: true,
    urgent: false,
    description: 'Level II trauma center seeking an experienced RVT to join our accredited vascular lab. Perform duplex ultrasound of carotid, venous, arterial, and visceral systems. IAC-accredited lab with a collaborative vascular surgery team.',
    benefits: ['Comprehensive medical benefits', 'Pension plan', 'Tuition assistance', '4 weeks PTO', '$8,000 sign-on bonus', 'Relocation assistance'],
    teamSize: '6 vascular sonographers',
  },
  {
    id: '3',
    title: 'Travel Sonographer — Abdominal / OB',
    employer: 'SonoPro Staffing',
    employerVerified: true,
    location: 'Phoenix, AZ',
    state: 'AZ',
    remote: false,
    specialty: ['Abdominal', 'OB/GYN'],
    employmentType: 'Travel/Contract',
    shift: 'Days',
    onCall: false,
    salaryMin: 58,
    salaryMax: 72,
    salaryUnit: 'hr',
    credentialsRequired: ['RDMS (AB)'],
    credentialsPreferred: ['RDMS (OB/GYN)'],
    experience: '2+ years',
    equipment: ['GE', 'Siemens'],
    facilityType: 'Hospital',
    scanVolume: '20–25 patients/day',
    postedDays: 1,
    featured: true,
    urgent: true,
    description: '13-week travel contract at a busy Level I trauma center. Gross pay $2,320–$2,880/wk including tax-free stipends. Housing assistance available. Extension highly likely. Start ASAP — facility is critically short-staffed.',
    benefits: ['Weekly pay', 'Housing stipend $1,400/wk', 'Meal stipend $400/wk', 'Travel reimbursement', 'Health insurance day 1', 'Completion bonus $1,500'],
    teamSize: '12 sonographers (large dept)',
  },
  {
    id: '4',
    title: 'Echo Sonographer / Cardiac Sonographer',
    employer: 'Southeast Heart Institute',
    employerVerified: true,
    location: 'Atlanta, GA',
    state: 'GA',
    remote: false,
    specialty: ['Cardiac/Echo'],
    employmentType: 'Full-Time',
    shift: 'Days (Mon–Fri)',
    onCall: false,
    salaryMin: 42,
    salaryMax: 58,
    salaryUnit: 'hr',
    credentialsRequired: ['RDCS (AE)'],
    credentialsPreferred: ['CCI (RCS)'],
    experience: '2+ years echo',
    equipment: ['Philips', 'GE'],
    facilityType: 'Clinic',
    scanVolume: '14–18 studies/day',
    signOnBonus: 6000,
    postedDays: 7,
    featured: false,
    urgent: false,
    description: 'Join a premier cardiology practice performing transthoracic and stress echocardiography. We are IAC-accredited with a team of 8 cardiologists. Philips EPIQ CVx for all echo work. Excellent work-life balance — outpatient only, no call, Monday through Friday.',
    benefits: ['Health/Dental/Vision', '401(k) 6% match', 'Profit sharing', 'CEU support $1,500/yr', '$6,000 sign-on', 'Parking covered'],
    teamSize: '4 echo sonographers',
  },
  {
    id: '5',
    title: 'Breast Sonographer — Part-Time',
    employer: 'West Coast Breast Center',
    employerVerified: true,
    location: 'San Diego, CA',
    state: 'CA',
    remote: false,
    specialty: ['Breast'],
    employmentType: 'Part-Time',
    shift: 'Days, 3 days/week',
    onCall: false,
    salaryMin: 44,
    salaryMax: 52,
    salaryUnit: 'hr',
    credentialsRequired: ['RDMS (BR)'],
    credentialsPreferred: ['RDMS (AB)'],
    experience: '1+ year breast imaging',
    equipment: ['Siemens', 'GE'],
    facilityType: 'Outpatient',
    scanVolume: '10–14 studies/day',
    postedDays: 10,
    featured: false,
    urgent: false,
    description: 'Dedicated breast imaging center seeking a part-time breast sonographer for 3 days per week. Focus entirely on targeted breast ultrasound, biopsy assistance, and axillary assessment. Siemens ACUSON Sequoia. Great opportunity for work-life balance in beautiful San Diego.',
    benefits: ['Pro-rated PTO', 'CEU reimbursement', 'Flexible scheduling', 'Possible PT-to-FT conversion'],
    teamSize: '3 breast sonographers',
  },
  {
    id: '6',
    title: 'Pediatric Sonographer',
    employer: 'Children\'s National Medical Center',
    employerVerified: true,
    location: 'Washington, DC',
    state: 'DC',
    remote: false,
    specialty: ['Pediatric', 'Abdominal'],
    employmentType: 'Full-Time',
    shift: 'Days/Evenings rotating',
    onCall: true,
    salaryMin: 46,
    salaryMax: 60,
    salaryUnit: 'hr',
    credentialsRequired: ['RDMS (AB)', 'RDMS (PS)'],
    credentialsPreferred: ['RVT'],
    experience: '3+ years, pediatric preferred',
    equipment: ['GE', 'Philips'],
    facilityType: 'Hospital',
    scanVolume: '15–20 patients/day',
    signOnBonus: 10000,
    postedDays: 3,
    featured: false,
    urgent: false,
    description: 'Join a nationally recognized children\'s hospital imaging team. Perform a full spectrum of neonatal, infant, and pediatric ultrasound examinations including hip, spine, and cranial. Fellowship training available. Academic teaching environment.',
    benefits: ['Top-tier benefits package', 'Pension', 'Tuition reimbursement', 'On-site childcare', '$10,000 sign-on', 'Research opportunities'],
    teamSize: '14 pediatric imaging sonographers',
  },
  {
    id: '7',
    title: 'Mobile Ultrasound Sonographer — PRN',
    employer: 'QuickScan Mobile Imaging',
    employerVerified: false,
    location: 'Dallas, TX',
    state: 'TX',
    remote: false,
    specialty: ['Abdominal', 'Vascular', 'Small Parts'],
    employmentType: 'PRN',
    shift: 'Flexible',
    onCall: false,
    salaryMin: 52,
    salaryMax: 65,
    salaryUnit: 'hr',
    credentialsRequired: ['RDMS (AB)'],
    credentialsPreferred: ['RVT', 'RDMS (OB/GYN)'],
    experience: '2+ years',
    equipment: ['GE', 'Canon'],
    facilityType: 'Mobile',
    scanVolume: '8–15 studies/day',
    postedDays: 14,
    featured: false,
    urgent: false,
    description: 'PRN mobile sonographer needed for nursing home, hospice, and clinic visits across the DFW metroplex. Company vehicle provided. Portable GE Vscan Fusion and Canon Aplio i-series units. Pick your own schedule — minimum 2 shifts per month.',
    benefits: ['Flexible scheduling', 'Mileage reimbursement', 'Company vehicle', 'Weekly pay'],
    teamSize: 'Independent / small team',
  },
  {
    id: '8',
    title: 'Lead Sonographer — Imaging Department',
    employer: 'Banner University Medical Center',
    employerVerified: true,
    location: 'Tucson, AZ',
    state: 'AZ',
    remote: false,
    specialty: ['Abdominal', 'OB/GYN', 'Vascular'],
    employmentType: 'Full-Time',
    shift: 'Days',
    onCall: false,
    salaryMin: 50,
    salaryMax: 68,
    salaryUnit: 'hr',
    credentialsRequired: ['RDMS (AB)', 'RDMS (OB/GYN)'],
    credentialsPreferred: ['RVT', 'RDMS (BR)'],
    experience: '5+ years, leadership experience preferred',
    equipment: ['GE', 'Siemens'],
    facilityType: 'Hospital',
    scanVolume: 'Primarily supervisory',
    signOnBonus: 12000,
    postedDays: 4,
    featured: false,
    urgent: false,
    description: 'Lead a team of 10 sonographers at one of Arizona\'s top academic medical centers. Oversee scheduling, quality assurance, protocol development, and student supervision. Remain clinically active scanning 50% of the time. Growth into management available.',
    benefits: ['Management differential pay', 'Health/Dental/Vision', 'Pension', '$12,000 sign-on', 'Relocation package', 'Leadership development program'],
    teamSize: 'Lead over 10 staff sonographers',
  },
];

export function getJob(id: string): Job | undefined {
  return jobs.find((j) => j.id === id);
}

export function filterJobs(params: {
  specialty?: string;
  employmentType?: string;
  state?: string;
  facilityType?: string;
  credential?: string;
  query?: string;
}): Job[] {
  return jobs.filter((job) => {
    if (params.query) {
      const q = params.query.toLowerCase();
      if (
        !job.title.toLowerCase().includes(q) &&
        !job.employer.toLowerCase().includes(q) &&
        !job.location.toLowerCase().includes(q) &&
        !job.specialty.some((s) => s.toLowerCase().includes(q))
      ) return false;
    }
    if (params.specialty && !job.specialty.includes(params.specialty)) return false;
    if (params.employmentType && job.employmentType !== params.employmentType) return false;
    if (params.state && job.state !== params.state) return false;
    if (params.facilityType && job.facilityType !== params.facilityType) return false;
    if (params.credential && !job.credentialsRequired.includes(params.credential)) return false;
    return true;
  });
}
