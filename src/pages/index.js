import Contacts from '@/components/contacts/Contacts'
import Projects from '@/components/projects/Projects'

const Home = () => {
    return (
        <div>
            <div className="fixed float-left w-max-fit "><Contacts/></div>
            <h1 className="text-7xl text-center">Hi! I'm Wolf Mermelstein</h1>
            <Projects/>
        </div>
    )
}

export default Home
