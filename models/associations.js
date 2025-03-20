import {User} from './userModel.js';
import {Role} from './roleModel.js';
import UserHasRole from './userHasRoleModel.js';

User.belongsToMany(Role, {through: UserHasRole});
Role.belongsToMany(User, {through: UserHasRole});