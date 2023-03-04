import Projects from '@/components/projects/Projects'
import About from '@/components/about/About'
import Header from '@/components/header/Header'

const Home = () => {
    return (
        <div className="p-12 bg-gradient-to-tr from-[#16697a] to-[#1d4480]">
            <div className={"bg-slate-500 p-5 rounded-3xl flex flex-col gap-5"}>
                <div className="bg-slate-300 p-5 rounded-2xl">
                    <Header/>
                </div>

                <div className="mt-[-.5rem]"/>

                <div className="flex flex-col md:flex-row gap-5">
                    <div className="basis-[65%] bg-slate-300 p-5 rounded-2xl">
                        <Projects gap={ 5 }/>
                    </div>
                    <div className="basis-[35%] bg-slate-300 p-5 rounded-2xl">
                        <About/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
