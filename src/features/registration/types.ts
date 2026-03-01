export type ContestType = 'hackathon' | 'cybersecurity';

export interface TeamMember {
  name: string;
  email: string;
  phone: string;
}

export interface CreateRegistrationDto {
  contestType: ContestType;
  teamName: string;
  school: string;
  leaderName: string;
  leaderEmail: string;
  leaderPhone: string;
  members: TeamMember[];
}

export interface Registration extends CreateRegistrationDto {
  _id: string;
  createdAt: string;
  updatedAt: string;
}
