import Projects from '@/components/projects/Projects'
import About from '@/components/about/About'
import Header from '@/components/header/Header'
import MainLayout from '@/components/layouts/MainLayout'
import Greeter from '@/components/header/Greeter'

const Home = () => {
    return (
        <MainLayout header={<Greeter/>} type={ false }>
            <div className="flex flex-col gap-7">
                <div className="bg-slate-300 p-5 rounded-2xl">
                    <Header/>
                </div>

                <div className="flex flex-col-reverse md:flex-row gap-7">
                    <div className="basis-[65%]">
                        <Projects/>
                    </div>
                    <div className="basis-[35%]">
                        <About/>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default Home
