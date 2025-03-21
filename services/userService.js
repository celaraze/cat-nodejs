import {UserModel} from "../models/userModel.js";
import {Op} from "sequelize";

/**
 * Creates a new user.
 *
 * @param {Record} user - The user data to be created.
 * @returns {Promise<UserModel|null>} - The created user.
 * @throws {Error} - if the user cannot be created.
 */
const insert = async (user) => {
    try {
        return await UserModel.create(user);
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

/**
 * Gets all users.
 *
 * @returns {Promise<UserModel[]|null>} - The list of all users.
 * @throws {Error} - if the users cannot be retrieved.
 */
const selectAll = async () => {
    try {
        const conditions = {
            deletedAt: {
                [Op.eq]: null
            }
        }
        return await UserModel.findAll({where: conditions});
    } catch (error) {
        console.error('Error getting users:', error);
        throw error;
    }
};


/**
 * Get a user by id.
 *
 * @param {number} id - The id of the user to get.
 * @returns {Promise<UserModel|null>} - The user with the given id.
 * @throws {Error} - if the user cannot be found.
 */
const selectById = async (id) => {
    try {
        const conditions = {
            id: {
                [Op.eq]: id
            },
            deletedAt: {
                [Op.eq]: null
            }
        }
        return await UserModel.findOne({where: conditions});
    } catch (error) {
        console.error('Error finding user by id:', error);
        throw error;
    }
};

/**
 * Get a user by email.
 *
 * @param {string} email - The email of the user to get.
 * @returns {Promise<UserModel|null>} - The user with the given email.
 * @throws {Error} - if the user cannot be found.
 */
const selectByEmail = async (email) => {
    try {
        return await UserModel.findOne({where: {email, deletedAt: null}});
    } catch (error) {
        console.error('Error finding user by email:', error);
        throw error;
    }
};

/**
 * Updates a user.
 *
 * @param {number} id - The id of the user to update.
 * @param {Record} userData - The user data to update.
 * @returns {Promise<UserModel|null>} - The updated user.
 * @throws {Error} - if the user cannot be updated.
 */
const update = async (id, userData) => {
    try {
        const [updatedRows] = await UserModel.update(userData, {where: {id, deletedAt: null}});
        if (updatedRows > 0) {
            return await selectById(id);
        }
        return null;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

/**
 * Soft deletes a user.
 *
 * @param {number} id - The id of the user to softly delete.
 * @returns {Promise<boolean>} - True if the user was softly deleted, false otherwise.
 * @throws {Error} - if the user cannot be softly deleted.
 */
const softDelete = async (id) => {
    try {
        const updatedRows = await UserModel.update({deletedAt: new Date()}, {where: {id, deletedAt: null}});
        return updatedRows > 0;
    } catch (error) {
        console.error('Error soft deleting user:', error);
        throw error;
    }
};

export {
    insert,
    selectAll,
    selectById,
    selectByEmail,
    update,
    softDelete
}