export interface VolunteerOpportunity {
  volunteerTaskId: string;
  campaignId: string;
  campaignName: string;
  charityId: string;
  charityName: string;
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  maxVolunteer: number;
  joinedVolunteerCount: number;
  isApplied: boolean;
  appliedCount: number;
  remainingSlots: number;
  isFull: boolean;
  alreadyApplied: boolean;
}

export interface VolunteerOpportunityPagedData {
  items: VolunteerOpportunity[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors: string[] | null;
}