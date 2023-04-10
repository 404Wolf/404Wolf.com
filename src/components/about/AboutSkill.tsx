interface AboutSkillProps {
    name: string;
    children: React.ReactNode;
}

const AboutSkill = ({ name, children }: AboutSkillProps) => {
    return (
        <div className="flex flex-col gap-1 bg-[#dbe2ea] border-slate-400 border-2 rounded-2xl p-2">
            <div className="text-sm bg-[#bbc8d8] px-2 py-px rounded-lg">
                <h1>{name}</h1>
            </div>

            <p className="text-xs">
                {children}
            </p>
        </div>
    );
};

export default AboutSkill;
