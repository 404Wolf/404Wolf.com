import Projects from '@/components/projects/Projects'
import About from '@/components/about/About'
import Header from '@/components/header/Header'

const Home = () => {

    return (
        <div>
            <div className="bg-gray-400 p-5 rounded-xl">
                <div className="bg-gray-300 p-5 rounded-xl">
                    <div className="bg-gray-350 p-5 rounded-[24px]">
                        <Header/>
                    </div>
                </div>

                <div className="p-2"/>

                <div className="bg-gray-300 p-5 rounded-xl">
                    <div className="flex gap-5">
                        <div className="basis-2/3 bg-gray-350 p-5 rounded-[24px]"><Projects/></div>
                        <div className="basis-1/3 bg-gray-350 p-5 rounded-[24px]"><About/></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
