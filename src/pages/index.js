import Projects from '@/components/projects/Projects'
import About from '@/components/about/About'
import Header from '@/components/header/Header'
import MainLayout from '@/components/layouts/MainLayout'
import Greeter from '@/components/header/Greeter'

export async function getServerSideProps(context) {
    const url = `http://${context.req.headers.host}`

    const projects = await fetch(`${url}/api/projects/listed`)
        .then(res => res.json())
        .then(data => data.projects)

    return {
        props: {
            projects
        },
    }
}

const Home = ({ projects }) => {
    return (
        <MainLayout header={<Greeter/>} type={ false }>
            <div className="flex flex-col gap-7">
                <div className="bg-slate-300 p-5 rounded-2xl">
                    <Header/>
                </div>

                <div className="flex flex-col-reverse sm:flex-row gap-7">
                    <div className="basis-[45%] lg:basis-[65%]">
                        <Projects projects={ projects }/>
                    </div>
                    <div className="basis-[55%] lg:basis-[35%]">
                        <About/>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default Home
