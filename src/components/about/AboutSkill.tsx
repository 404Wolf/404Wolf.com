interface AboutSkillProps {
    name: string;
    children: React.ReactNode;
}

const AboutSkill = ({ name, children }: AboutSkillProps) => {
    return (
        <div className="flex flex-col gap-1 bg-slate-400/50 rounded-2xl p-2">
            <div className="bg-slate-500/50 px-2 py-px rounded-xl sm:rounded-3xl">
                <h1>{name}</h1>
            </div>

            <p className="text-sm">
                {children}
            </p>
        </div>
    );
};

export default AboutSkill;
