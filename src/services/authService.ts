import {User} from "../entities/User";
import {Role} from "../entities/Role";
import {encrypt} from "../utils/bcrypt";
import {insert as insertUser} from "./userService";
import {insert as insertRole} from "./roleService";


const createSuperuser = async () => {
    try {
        const role = new Role()
        role.name = "superuser";
        const role_inserted = insertRole(role);

        const user = new User()
        user.name = "admin";
        user.username = "admin";
        user.password = encrypt("admin");
        user.email = "admin@localhost";
        user.roles = [role_inserted];
        const user_inserted = insertUser(user);

    }
}