import { PrismaClient } from "@prisma/client";
import { addResource, checkResource, resourceUrl } from "../aws";
import { EditorAction, EditorState } from "@/logic/editor/types";
import { uploadPost } from "@/logic/editor/posts";

const prisma = new PrismaClient();

const editorReducer = (state: EditorState, action: EditorAction) => {
    switch (action.type) {
        case "edit": {
            const field = action.content.field;
            if (field && field in state[action.target]) {
                state.post[field] = action.content.value;
            }
        }
        case "add": {
            switch (action.target) {
                case "post": {
                    prisma.post.findUnique({ where: { id: state.post.id } }).then((results) => {
                        if (results === null) uploadPost(state.post);
                    });
                }
                case "resources": {
                    const resource = action.content.resource;
                    if (resource) {
                        checkResource(resource.filename).then((resourceExists) => {
                            if (!resourceExists) {
                                addResource(resource.filename, resource.data);
                            }
                        });
                    }
                }
            }
        }
    }
};

export default editorReducer;
