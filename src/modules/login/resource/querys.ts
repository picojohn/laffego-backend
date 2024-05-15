export enum Querys {
    GET_ROLES = `SELECT * FROM roles`,
    GET_OPERATIONS = `select * from operations  where status = true`,
    GET_SERVICES = `select * from services  where status = true`,
    GET_OPERATIONS_BY_ID = `select * from operations  where id = '$id'`,
    GET_SERVICES_BY_ID = `select * from services  where id = '$id'`,

}
