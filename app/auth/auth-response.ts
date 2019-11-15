export interface AuthResponse {
    users: {
        id: number,
        username: string,
        password: string,
        fullname: string,
    }
}
// id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
// username character varying(25),
// password character varying(100),
// fullname character varying(100),