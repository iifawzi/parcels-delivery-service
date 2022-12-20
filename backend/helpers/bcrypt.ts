import * as bcrypt from "bcrypt";

export const comparePassword = async (password: string, encrypted: string) => {
    const isSamePassword = await bcrypt.compare(password, encrypted);
    return isSamePassword;
};