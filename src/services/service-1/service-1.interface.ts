export interface Service1RecommendationsProps {
    height: number;
    weight: number;
}

export interface Service1RecommendationResponse {
    statusCode: number;
    body: string;
}

export interface Service1RecommendationData {
    confidence: number;
    recommendation: string;
}
