import {DataTypes} from 'sequelize';
import {sequelize} from '../app.js';
import {Role} from './roleModel.js';
import UserHasRole from './userHasRoleModel.js';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    }
}, {
    paranoid: true,
    timestamps: true
});

User.belongsToMany(Role, {through: UserHasRole});

const createUser = async (user) => {
    try {
        const newUser = await User.create(user);
        return newUser;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

const getUsers = async () => {
    try {
        const allUsers = await User.findAll({where: {deletedAt: null}});
        return allUsers;
    } catch (error) {
        console.error('Error getting users:', error);
        throw error;
    }
};

const findUserById = async (id) => {
    try {
        const user = await User.findOne({where: {id, deletedAt: null}});
        return user;
    } catch (error) {
        console.error('Error finding user by id:', error);
        throw error;
    }
};

const findUserByEmail = async (id) => {
    try {
        const user = await User.findOne({where: {email, deletedAt: null}});
        return user;
    } catch (error) {
        console.error('Error finding user by email:', error);
        throw error;
    }
};

const updateUser = async (id, userData) => {
    try {
        const [updatedRows] = await User.update(userData, {where: {id, deletedAt: null}});
        if (updatedRows > 0) {
            return await findUserById(id);
        }
        return null;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

const softDeleteUser = async (id) => {
    try {
        const updatedRows = await User.update({deletedAt: new Date()}, {where: {id, deletedAt: null}});
        return updatedRows > 0;

    } catch (error) {
        console.error('Error soft deleting user:', error);
        throw error;
    }
};

export {
    User,
    createUser,
    getUsers,
    findUserById,
    findUserByEmail,
    updateUser,
    softDeleteUser
};
    