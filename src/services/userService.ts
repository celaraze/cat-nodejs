import {User} from "../entities/User";
import {appDataSource} from "../dependencies/database";
import {IsNull} from "typeorm";


const insert = async (user: User) => {
    try {
        const userRepository = appDataSource.getRepository(User);
        return await userRepository.save(user);
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};


const selectAll = async () => {
    try {
        const userRepository = appDataSource.getRepository(User);
        return await userRepository.findBy({deletedAt: IsNull()});
    } catch (error) {
        console.error('Error finding users:', error);
        throw error;
    }
};


const selectById = async (id: number) => {
    try {
        const userRepository = appDataSource.getRepository(User);
        return await userRepository.findOneBy({id: id, deletedAt: IsNull()});
    } catch (error) {
        console.error('Error finding user by id:', error);
        throw error;
    }
};

const selectByUsername = async (username: string) => {
    try {
        const userRepository = appDataSource.getRepository(User);
        return await userRepository.findOneBy({username: username, deletedAt: IsNull()});
    } catch (error) {
        console.error('Error finding user by email:', error);
        throw error;
    }
};

const selectByEmail = async (email: string) => {
    try {
        const userRepository = appDataSource.getRepository(User);
        return await userRepository.findOneBy({email: email, deletedAt: IsNull()});
    } catch (error) {
        console.error('Error finding user by email:', error);
        throw error;
    }
};


const softDelete = async (id: number) => {
    try {
        const userRepository = appDataSource.getRepository(User);
        const users = await userRepository.findBy({id: id, deletedAt: IsNull()});
        return await userRepository.softRemove(users);
    } catch (error) {
        console.error('Error soft deleting users:', error);
        throw error;
    }
};

const restore = async (id: number) => {
    try {
        const userRepository = appDataSource.getRepository(User);
        const users = await userRepository.findBy({id: id, deletedAt: IsNull()});
        return await userRepository.recover(users);
    } catch (error) {
        console.error('Error restoring users:', error);
        throw error;
    }
}

export {
    insert,
    selectAll,
    selectById,
    selectByEmail,
    softDelete
}