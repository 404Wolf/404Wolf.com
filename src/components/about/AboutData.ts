export default interface AboutData {
    url: string;
    name: string;
    email: string;
    phone: string;
    location: string;
    booking: string;
    contacts: {
        name: string;
        username: string;
        link: string;
        id: number;
        at: boolean | undefined;
    }[];
}