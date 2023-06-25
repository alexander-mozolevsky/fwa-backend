export interface GetRecommendationsProps {
    username: string;
}

export interface GetHistoryRecommendationsProps {
    username: string;
}

export interface RecommendationProps {
    priority: number;
    recommendation: string;
}
