import Projects from '@/components/projects/Projects'
import About from '@/components/about/About'
import Header from '@/components/header/Header'
import MainLayout from '@/components/layouts/MainLayout'
import Greeter from '@/components/header/Greeter'
import { worker as list_projects } from '@/pages/api/projects/listed'
import ProjectsData from "@/interfaces/project_data"
import { useState } from 'react'
import Tile from '@/components/misc/Tile'

export async function getStaticProps() {
    const projects = await list_projects()

    return {
        props: {
            projects
        },
    }
}

interface HomeProps {
    projects: ProjectsData[]
}

const Home = ({ projects }: HomeProps) => {
    return (
        <MainLayout header={<Greeter/>} headerWidth="w-[13.5rem] sm:w-[20rem]">
            <div className="flex flex-col gap-7">
                <Tile>
                    <Header/>
                </Tile>

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    <div className="hidden sm:block basis-[30%]">
                        <Tile title="Projects">
                            <Projects
                                projects={ projects } 
                                featuredOnly={ true }
                                className="pt-3 sm:pt-2 grid grid-cols-2 sm:grid-cols-1 justify-between items-center gap-4 sm:gap-5"
                            />
                        </Tile>
                    </div>
                    <div className="basis-[75%]">
                        <About/>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default Home
