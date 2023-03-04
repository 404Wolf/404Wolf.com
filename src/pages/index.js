import Projects from '@/components/projects/Projects'
import About from '@/components/about/About'
import Header from '@/components/header/Header'

const Home = () => {

    return (
        <div>
            <div className="bg-gradient-to-tr from-sky-500 to-indigo-500 p-5 rounded-3xl">
                <Header/>
            </div>

            <div className="p-2"/>

            <div className="bg-gradient-to-tr from-sky-500 to-indigo-500 p-5 rounded-3xl">
                <div className="flex gap-5">
                    <div className="basis-2/3"><Projects/></div>
                    <div className="basis-1/3"><About/></div>
                </div>
            </div>
        </div>
    )
}

export default Home
