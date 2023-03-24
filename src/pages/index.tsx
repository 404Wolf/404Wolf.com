import Projects from '@/components/projects/Projects'
import About from '@/components/about/About'
import Header from '@/components/header/Header'
import MainLayout from '@/components/layouts/MainLayout'
import Greeter from '@/components/header/Greeter'
import { worker as list_projects } from '@/pages/api/projects/listed'
import { worker as about_data } from '@/pages/api/about'
import ProjectsData from "@/interfaces/project_data"

export async function getServerSideProps() {
    const projects = await list_projects()
    const about = await about_data()

    return {
        props: {
            projects
        },
    }
}

interface HomeProps {
    projects: ProjectsData
}

const Home = ({ projects }: HomeProps) => {
    return (
        <MainLayout header={<Greeter/>} headerWidth="w-[13.5rem] sm:w-[20rem]">
            <div className="flex flex-col gap-6">
                <div className="bg-slate-300 p-5 rounded-2xl">
                    <Header/>
                </div>

                <div className="flex flex-row gap-5 sm:gap-6">
                    <div className="basis-[40%] sm:basis-[45%] lg:basis-[65%]">
                        <Projects projects={ projects }/>
                    </div>
                    <div className="basis-[60%] sm:basis-[55%] lg:basis-[35%]">
                        <About/>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default Home