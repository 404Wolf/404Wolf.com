export interface Post {
    id: string;
    title: string;
    description: string;
    markdown: string;
    covers?: string[];
    type: string;
    date: string;
    tags?: string;
    notes?: string;
}

export interface Resource {
    ref: string;
    title: string;
    filename: string;
    type: string;
    description: string;
    data: string | File;
}

export interface EditorState {
    post: Post;
    resources: Resource[];
}

export interface EditorAction {
    type: "edit" | "add" | "del" | "load";
    target: "post" | "resources";
    content: {
        field: keyof EditorState["post"];
        value: any;
        resource?: Resource;
    };
}
