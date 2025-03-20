import {DataTypes} from 'sequelize';
import {sequelize} from '../app.js';
import {User} from './userModel.js';
import UserHasRole from './userHasRoleModel.js';

const Role = sequelize.define('Role', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    scopes: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
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

Role.belongsToMany(User, {through: UserHasRole});

const createRole = async (role) => {
    try {
        const newRole = await Role.create(role);
        return newRole;
    } catch (error) {
        console.error('Error creating role:', error);
        throw error;
    }
};

const getRoles = async () => {
    try {
        const allRoles = await Role.findAll({where: {deletedAt: null}});
        return allRoles;
    } catch (error) {
        console.error('Error getting roles:', error);
        throw error;
    }
};

const findRoleById = async (id) => {
    try {
        const role = await Role.findOne({where: {id, deletedAt: null}});
        return role;
    } catch (error) {
        console.error('Error finding role by id:', error);
        throw error;
    }
};

const updateRole = async (id, roleData) => {
    try {
        const [updatedRows] = await Role.update(roleData, {where: {id, deletedAt: null}});
        if (updatedRows > 0) {
            return await findRoleById(id);
        }
        return null;
    } catch (error) {
        console.error('Error updating role:', error);
        throw error;
    }
};

const softDeleteRole = async (id) => {
    try {
        const updatedRows = await Role.update({deletedAt: new Date()}, {where: {id, deletedAt: null}});
        if (updatedRows > 0) {
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error soft deleting role:', error);
        throw error;
    }
};

export {
    Role,
    createRole,
    getRoles,
    findRoleById,
    updateRole,
    softDeleteRole
};
    