import {DataTypes} from 'sequelize';

const up = async ({context: queryInterface}) => {
    await queryInterface.createTable('Roles', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        scopes: {
            type: DataTypes.JSON,
            allowNull: false
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        }
    });
}

const down = async ({context: queryInterface}) => {
    await queryInterface.dropTable('Roles');
}

export {up, down}