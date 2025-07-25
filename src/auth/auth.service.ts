// Database
import { sql } from "drizzle-orm";
import db from "../Drizzle/db";
import { TIUser, UsersTable } from "../Drizzle/schema";

export const createUserService = async (user: TIUser) => {
    await db.insert(UsersTable).values(user)
    return "User created successfully";
}

export const getUserByEmailService = async (email: string) => {
    return await db.query.UsersTable.findFirst({
        where: sql`${UsersTable.email} = ${email}`
    });
};

export const verifyUserService = async (email: string) => {
    await db.update(UsersTable)
        .set({ isVerified: true, verificationCode: null })
        .where(sql`${UsersTable.email} = ${email}`);
}


//login a user
export const userLoginService = async (user: TIUser) => {
    // email and password
    const { email } = user;

    return await db.query.UsersTable.findFirst({
        columns: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            password: true,
            role: true
        }, where: sql`${UsersTable.email} = ${email} `
    });
}

// get all users
export const getAllUsersService = async () => {
    return await db.query.UsersTable.findMany({
        columns: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            isVerified: true
        }
    });
}

// update user by id
export const updateUserByIdService = async (id: string, user: Partial<TIUser>) => {
    await db.update(UsersTable)
        .set(user)
        .where(sql`${UsersTable.id} = ${id}`);
    return "User updated successfully";
}

// get user by id
export const getUserByIdService = async (id: string) => {
    return await db.query.UsersTable.findFirst({
        where: sql`${UsersTable.id} = ${id}`
    });
}