export interface Service2RecommendationsProps {
    height: number;
    weight: number;
    dob: number;
}

export interface Service2RecommendationResponse {
    statusCode: number;
    body: string;
}

export interface Service2RecommendationData {
    priority: number;
    title: string;
    details: string;
}
