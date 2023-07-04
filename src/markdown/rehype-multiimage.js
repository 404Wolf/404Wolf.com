import displayTree from "@/utils/displayTree";
import { visit } from "unist-util-visit";

function rehypeMultiimage() {
    return (tree) => {
        visit(tree, (node, index, parent) => {
            console.log(node)
        });

        return tree;
    };
}

export default rehypeMultiimage;