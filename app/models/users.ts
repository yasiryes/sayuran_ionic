export class Users {
    id: Number;
    username: string;
    password: string;
    fullname: string;

    alamat: string;
    kecamatan: string;
    kota: string;
    login_token: string;
    pp: string;

    // alamat character varying(255),
    // kecamatan character varying(100),
    // kota character varying(100),
    // login_token character varying(100),
    // last_login timestamp without time zone,
    // last_logout timestamp without time zone,
    // pp character varying(255),
}