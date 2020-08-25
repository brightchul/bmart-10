import crypto from "crypto";

export const getRandomInt = () => {
  return Math.floor(Math.random() * 1_000_000_000_000);
};

/**
 * 평문 비밀번호를 암호화하고 암호화된 비밀번호와 솔트 값을 리턴
 * @param {string} password
 * @returns {Promise<{encryptedPassword : string, salt : string}>} promise
 */
export const getEncryptedPasswordAndSalt = async (
  password: string
): Promise<{ encryptedPassword: string; salt: string }> => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err: Error | null, buf: Buffer) => {
      // 64바이트 랜덤 salt 생성
      crypto.pbkdf2(
        password,
        buf.toString("base64"),
        100000,
        64,
        "sha512",
        (err, key) => {
          resolve({
            encryptedPassword: key.toString("base64"),
            salt: buf.toString("base64"),
          });
        }
      );
    });
  });
};

/**
 * 평문 비밀번호를 솔트 값으로 암호화하고 암호화된 비밀번호를 리턴
 * @param {string} password
 * @param {string} salt
 * @returns {Promise<string>} encryptedPassword  promise
 */
export const getEncryptedPasswordWithSalt = async (
  password: string,
  salt: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err: Error | null, buf: Buffer) => {
      crypto.pbkdf2(password, salt, 100000, 64, "sha512", (err, key) => {
        resolve(key.toString("base64"));
      });
    });
  });
};
