import PostData from "./PostData";
import { IoMdSchool } from "react-icons/io";
import { IoPersonSharp } from "react-icons/io5";
import { BsQuestionLg } from "react-icons/bs";

const fetchPostIcon = (post: PostData) => {
    const postIconClass = "rounded-full bg-slate-600 p-2 w-9 h-9";
    const postIconStyle = { filter: "invert(100%)", width: "100%", height: "100%" };

    let postIcon;
    if (post.tags.includes("academic")) {
        postIcon = <IoMdSchool style={postIconStyle} />;
    } else if (post.tags.includes("personal")) {
        postIcon = <IoPersonSharp style={postIconStyle} />;
    } else {
        postIcon = <BsQuestionLg style={postIconStyle} />;
    }

    return <div className={postIconClass}>{postIcon}</div>;
};

export default fetchPostIcon;
