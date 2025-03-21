import {DataTypes} from 'sequelize';

const up = async ({context: queryInterface}) => {
    await queryInterface.createTable('UserHasRole', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
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
    });
}
const down = async ({context: queryInterface}) => {
    await queryInterface.dropTable('UserHasRole');
}

export {up, down}