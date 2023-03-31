import AboutSkill from "@/components/about/AboutSkill";
import InlineButton from "@/components/misc/InlineButton";
import Tile from "@/components/misc/Tile";
import MainLayout from "@/layouts/MainLayout";
import Link from "next/link";

const About = () => {
    return (
        <MainLayout header title="About">
            <div className="flex gap-5 mb-7">
                <div className="basis-1/3">
                    <Tile title="Skills" className="mb-5">
                        <div className="grid grid-cols-4 sm:grid-cols-1 gap-3 pt-1 sm:pt-2">
                            <AboutSkill name="Quick/Eager Learner">
                                Through coding, Latin, and projects, I've grown very good at picking up on content quickly, comprehending problems, and contriving solutions.
                            </AboutSkill>

                            <AboutSkill name="Fast Typist">
                                I'm able to type 90-100+WPM. This is something I've been working on consistently since middle school, and I do believe is a vital skill. I'm still improving!
                            </AboutSkill>

                            <AboutSkill name="Adobe Photoshop/Illustrator">
                                I first picked up on Illustrator all the way back in elementary school, when I was most interested in art. I played a major part in my year's yearbook design that year, and have since used Photoshop/Illustrator to contrive art, create posters, and more.
                            </AboutSkill>

                            <AboutSkill name="Python 3">
                                Since 9th grade I've been self-teaching Python through countless projects, articles, videos, and experiments. At this point, I'm quite adept in the language, and have some experience with UI design with PyQt6. I've also worked with asyncio/aiohttp/flask in the past for backend api development.
                            </AboutSkill>

                            <AboutSkill name="JavaScript/React">
                                I've been learning JS/React over the past few months to develop this website, and at this point have a fairly good grasp on the basics. I also have experience with Next.js, html, css, and tailwind css.
                            </AboutSkill>

                            <AboutSkill name="English & Latin">
                                I'm a fluent English speaker, and believe that I have a very good grasp on the language. I've also been studying Latin for 4 years, and am currently taking advanced Latin at my school. Lingua Latina optima lingua est!
                            </AboutSkill>
                        </div>
                    </Tile>
                </div>

                <div className="basis-2/3 indent-4 sm:indent-6">
                    <Tile>
                        <style>
                            {`
                            .about-bio-link a { 
                                color: rgb(10, 24, 105);
                            }
                            .about-bio-link a:hover {
                                color: rgb(45, 100, 155);
                                text-decoration: underline;
                            }
                            `}
                        </style>

                        <p className="mb-2 about-bio-link">
                            Hi! My name is Wolf Mermelstein, and I'm a student in NYC currently attending <a href="https://bhsec.bard.edu/queens/">Bard High School Early College Queens</a> student intending to major in Computer Science next year. I'm from Brooklyn, NY, and am a geeky, curious, creative, tech-loving humanoid with a passion for problem-solving, making, and exploring.
                        </p>
                            
                        <p className="mb-2">
                            I'm very self-driven, so most of my interests arise from my own exploration and experimentation, so I'm still figuring out which sector of CS interests me most. I've always loved tinkering and experimenting, and project-iation. I've undertaken personal pursuits ranging all the way from closet Basil hydroponics to sowing intricate equipment for foam-swordfighting in NYC, to brewing kombucha, to coding a complex Minecraft minigame, and more. But, since midway into high school, through eclectic coding projects, fervent internet scouring, RealPython and Stackoverflow journeys, and eager Youtube excursions I've cultivated a passion for Computer Science that I have since been engrossed in.
                        </p>
                        
                        <p className="mb-2">
                            Through project-iation, I've taught myself the intricacies of Python, and am currently exploring JS and React. Via a custom data-structures course that I helped set up at my school, I've been able to expand my computational-thinking abilities, and through my DNA-Nanotech project I've learned the importance of keeping end users in mind. The ability to contrive complex, repeatable, explicit instructions to problems, and design systems with tradeoffs like space/time complexity in mind greatly allures me, in part because of the strategic nature of it. With CS, there's always a seemingly infinite number of possible ways to solve problems, with solutions boiling down to many different weighable factors.
                        </p>

                        <p>
                            While over the past few years I've applied my coding abilities (and coasted on on-the-go self-teaching) for smaller projects like a Google Photos backup tool, and larger ones like my prior Minecraft username sniping business, my most recent endeavor has completely altered my perspective. The ability to contribute to a completely unrelated field has been magical because of how requisite it was for the task. I firmly believe that the future of science itself is code, and would love to explore additional applications.
                        </p>  
                    </Tile>
                </div>
            </div>

            <Tile title="Qualities">
                <p className="mb-2 mt-2">
                    Though my bio should give a good sense of who I am as a person, I'd like to highlight some specific qualities that I believe set me apart.
                </p>
                <ul className="list-disc ml-8">
                    <li>
                       I love problem-solving, and do think I'm good at deriving creative solutions to complex problems, but believe that my real uniqueness stems from my impulsive and insatiable need to fully comprehend solutions, and my ability to learn from past problems.
                    </li>

                    <li>
                        When it comes to code, I care as much about form as I do function. So while yes, this does sometimes lead to long deliberations over variable name is most intuitive and clear, it also fosters clarity and comprehensively, and not just blind conformity to style guides.
                    </li>

                    <li>
                        This may go without saying, but I'm very computer-literate, and am able to intuit software very readily. I'm also good at learning from documentation and experimentation, which to a large extent is what got me to where I am today.
                    </li>
                </ul>
            </Tile>
            
        </MainLayout>
    );
}
 
export default About;