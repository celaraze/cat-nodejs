import {DataTypes} from 'sequelize';
import {sequelize} from '../database/database.js';

const UserHasRole = sequelize.define('UserHasRole', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Roles',
            key: 'id'
        }
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE
    }
}, {
    paranoid: true,
    timestamps: true
});

export default UserHasRole;