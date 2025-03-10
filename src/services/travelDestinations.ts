
// Sample destinations with some tourism tips
export const destinations = {
  "London": {
    country: "United Kingdom",
    tips: "make sure you visit Harrods while you're out there",
    region: "Europe"
  },
  "Paris": {
    country: "France",
    tips: "don't miss the iconic Eiffel Tower and the Louvre Museum",
    region: "Europe"
  },
  "Dubai": {
    country: "United Arab Emirates",
    tips: "visit the Burj Khalifa, the world's tallest building",
    region: "Middle East"
  },
  "New York": {
    country: "United States",
    tips: "take a stroll through Central Park and visit Times Square",
    region: "North America"
  }
} as const;

export type Destination = keyof typeof destinations;
