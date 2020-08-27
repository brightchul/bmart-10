/**
 * 숫자가 request query로 넘어올때만 값을 넘기고 그외에는 undefined로 받도록 하기 위해서 만듬.
 * 원래는 parseInt(value) || undefined로 하려했으나 '0'의 경우 처리가 안되고 undefined로 넘어가서 그것을 막기위함.
 *
 * @param {string} value 파싱할 값
 */
export const parseRequestQueryToInt = (value?: string): number | undefined => {
  const result = parseInt(value as string);
  if (Number.isNaN(result)) return undefined;
  return result;
};
