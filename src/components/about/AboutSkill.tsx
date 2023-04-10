interface AboutSkillProps {
    name: string;
    children: React.ReactNode;
}

const AboutSkill = ({ name, children }: AboutSkillProps) => {
    return (
        <div className="p-2 bg-slate-200/75 rounded-2xl">
            <div className="mb-1">
                <h1>{name}</h1>
            </div>

            <p className="text-sm indent-5">
                {children}
            </p>
        </div>
    );
};

export default AboutSkill;
