export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  thumbnail: string;
  images: string[];
  sku: string;
  dimensions: Dimension;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  minimumOrderQuantity: number;
}

type Dimension = {
  width: number;
  height: number;
  depth: number;
}

type Review = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string
  reviewerEmail: string;
}
