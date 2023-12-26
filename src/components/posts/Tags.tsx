import TagsInput from "react-tagsinput";

interface TagsProps {
    tags: string[];
    readOnly?: boolean;
    setTags?: (newTags: string[]) => void;
}

const Tags = ({
                  tags, readOnly = false, setTags = () => {
    }
              }: TagsProps) => {
    return (
        <TagsInput
            value={tags || []}
            disabled={readOnly}
            onChange={(newTags) => setTags(newTags)}
            maxTags={8}
            inputProps={
                readOnly
                    ? {className: "hidden", placeholder: ""}
                    : {
                        className: "react-tagsinput-input",
                        placeholder: "Add tag",
                    }
            }
        />
    );
};

export default Tags;
