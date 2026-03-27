export interface Campaign {
    campaignId: string;
    campaignName: string;
    campaignDescription: string;
    goalAmount: number;
    currentAmount: number;
    campaignStartDate: string;
    campaignEndDate: string;
    imageUrl: string;
    charityName: string | null;
    charityId: string;
    createdById: string;
    createdAt: string;
    isFeatured: boolean;
    isActive: boolean;
    currencyCode: string;
}


