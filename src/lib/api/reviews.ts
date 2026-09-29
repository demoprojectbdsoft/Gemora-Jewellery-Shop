import { serverFetch } from "../core/server"

export const getReviewsByProductId = async(productId : string) =>{
    return serverFetch(`/reviews?productId=${productId}`);
}

export const getReviewsByUserId = async(userId : string) =>{
    return serverFetch(`/reviews?userId=${userId}`);
}

export const getAllReviews = async (query?: string) => {
  return serverFetch(`/reviews${query ? `?${query}` : ""}`, true);
};