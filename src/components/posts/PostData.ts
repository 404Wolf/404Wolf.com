export default interface PostData {
    id: string;
    name: string;
    tags: string[];
    flags: {
        featured: boolean;
        hidden: boolean;
    }
    date: string;
    covers: string[];
    description: string;
    type: string;
    path: string;
}
