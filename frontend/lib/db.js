import sql from "mssql";

const config = {
    server: "localhost",
    database: "SchoolDB",
    options: {
        encrypt: false,
        trustServerCertificate: true,
    },

    authentication: {
        type: "ntlm",
        options: {
            domain: "",
            userName: "",
            password: "",
        },
    },
};

let pool;

export async function getConnection(){
    if(!pool){
        pool = await sql.connect(config);
    }
    return pool;
}
