const PRE_IMG_URL = `https://bmart-10-bucket.s3.ap-northeast-2.amazonaws.com/public/img/`;

export const imgURL = (name?: string) => {
  if (!name) return;
  return `${PRE_IMG_URL}${name}`;
};
