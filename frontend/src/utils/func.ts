const PRE_IMG_URL = `/asset/img/`;

export const imgURL = (name?: string): string => {
  if (!name) return "";
  return `${PRE_IMG_URL}${name}`;
};
