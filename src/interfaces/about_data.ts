export default interface AboutData {
    url: string;
    name: string;
    email: string;
    phone: string;
    location: string;
    contacts: {
        name: string;
        username: string;
        link: string;
        id: number;
    }[];
}