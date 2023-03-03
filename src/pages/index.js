import Contacts from '@/components/Contacts'
import Projects from '@/components/Projects'

const Home = () => {
    return (
        <div className="bg-gray-200">
            <h1 className="text-2xl">Hi! I'm Wolf Mermelstein</h1>
            <Contacts className="fixed float-left h-full"/>
            <Projects/>
        </div>
    )
}

export default Home
