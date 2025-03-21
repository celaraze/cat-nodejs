import {Role} from "../entities/Role";
import {appDataSource} from "../dependencies/database";
import {IsNull} from "typeorm";

const insert = async (role: Role) => {
    try {
        const roleRepository = appDataSource.getRepository(Role);
        return await roleRepository.save(role);
    } catch (error) {
        console.error('Error creating role:', error);
        throw error;
    }
};

const selectAll = async () => {
    try {
        const roleRepository = appDataSource.getRepository(Role);
        return await roleRepository.findBy({deletedAt: IsNull()});
    } catch (error) {
        console.error('Error finding roles:', error);
        throw error;
    }
};

const selectById = async (id: number) => {
    try {
        const roleRepository = appDataSource.getRepository(Role);
        return await roleRepository.findOneBy({id: id, deletedAt: IsNull()});
    } catch (error) {
        console.error('Error finding role by id:', error);
        throw error;
    }
};

const softDelete = async (id: number) => {
    try {
        const roleRepository = appDataSource.getRepository(Role);
        const roles = await roleRepository.findBy({id: id, deletedAt: IsNull()});
        return await roleRepository.softRemove(roles);
    } catch (error) {
        console.error('Error soft deleting roles:', error);
        throw error;
    }
};

const restore = async (id: number) => {
    try {
        const roleRepository = appDataSource.getRepository(Role);
        const roles = await roleRepository.findBy({id: id, deletedAt: IsNull()});
        return await roleRepository.recover(roles);
    } catch (error) {
        console.error('Error restoring roles:', error);
        throw error;
    }
}

export {
    insert,
    selectAll,
    selectById,
    softDelete,
    restore
}