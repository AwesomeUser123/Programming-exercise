import mysql from "mysql"

export const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"CEB3301HKE@#d",
    database:"webdev"
})