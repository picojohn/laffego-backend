export enum Querys {
    GET_ROLES_BY_ID = `SELECT * FROM Roles WHERE id = '$id'`,
    GET_SUBMODULE = `SELECT * FROM SubModulos `,
    GET_MODULE = `SELECT * FROM Modulos `,
    GET_MENUPERMISSION_BY_IDROLE = `SELECT * FROM MenuPermisos WHERE idRol = $idRol`,
}
