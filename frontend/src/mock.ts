const advertiseMockData = [
  {
    imageURL:
      "https://user-images.githubusercontent.com/38618187/90112691-4b324600-dd8b-11ea-83cf-d387131713dd.jpg",
  },
  {
    imageURL:
      "https://user-images.githubusercontent.com/38618187/90112683-49688280-dd8b-11ea-8c03-d693e9a9fd1f.jpg",
  },
  {
    imageURL:
      "https://user-images.githubusercontent.com/38618187/90112698-4cfc0980-dd8b-11ea-90a9-a4342fc1086e.gif",
  },
];

type ImageUrl = { imageURL: string };
export const getAdsData = (): Array<ImageUrl> => {
  return advertiseMockData;
};
