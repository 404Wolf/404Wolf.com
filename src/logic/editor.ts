export type EditorAction = {
    type: string;
    target: string;
    content: {
        field?: string;
        value?: any;
    };
};

export type EditorState = {
    post: {
        title: string;
        type: string;
        id: string;
        tags: string[];
        covers: string[];
        description: string;
        markdown: string;
        notes: string;
        resources: {
            images: string;
        };
    };
    version: {
        id: string;
        name: string;
        notes: string;
    };
};

const editorReducer = (state: EditorState, action: EditorAction) => {
    switch (action.type) {
        case "post": {
            switch (action.target) {
                case "edit": {
                    const field = action.content.field as keyof EditorState["post"];
                    if (state.post.hasOwnProperty(field)) {
                        state.post[field] = action.content.value;
                    }
                    return state
                }
                case "save": {
                    
                }
            }
        }
    }
};

export default editorReducer;
