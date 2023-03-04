import Projects from '@/components/projects/Projects'
import About from '@/components/about/About'
import Header from '@/components/header/Header'
import MainLayout from '@/components/layouts/MainLayout'
import Greeter from '@/components/header/Greeter'

const Home = () => {
    return (
        <MainLayout header={<Greeter/>}>
            <div className="bg-slate-300 p-5 rounded-2xl mb-10">
                <Header/>
            </div>

            <div className="flex flex-col md:flex-row gap-5">
                <div className="basis-[65%]">
                    <Projects/>
                </div>
                <div className="basis-[35%]">
                    <About/>
                </div>
            </div>
        </MainLayout>
    )
}

export default Home
