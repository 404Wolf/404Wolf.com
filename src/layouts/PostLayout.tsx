import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";
import Tile from "../components/misc/Tile";
import MdImage from "../components/misc/MdImage";
import MainLayout from "./MainLayout";

interface PostLayoutProps {
    header: string;
    md: string;
    summary?: string;
    icon?: string;
}

const PostLayout = ({ header, md, summary, icon }: PostLayoutProps) => {
    return (
        <MainLayout title={ header } header={ false }>
            <div className={summary && "mt-[5px]"}>
                {summary && 
                <Tile title="Overview" className="overflow-auto" direction="right">
                    {icon && <div className="relative pointer-events-none w-3/5 sm:w-[17%] ml-2 float-right">
                        <MdImage src={ icon }/>
                    </div>}
                    <div className="markdown">
                        { summary }
                    </div>
                </Tile>}
                <div className='m-6'/>
                <Tile className="overflow-auto" title="Project" direction="right">
                    <ReactMarkdown className="markdown" rehypePlugins={[ rehypeRaw ]}>
                        { md }
                    </ReactMarkdown>
                </Tile>
            </div>
        </MainLayout>
    );
}
 
export default PostLayout;