import Contacts from '@/components/contacts/Contacts'
import Projects from '@/components/projects/Projects'

const Home = () => {
    return (
        <div className="p-1/6 ">
            <div className="fixed float-left w-max-fit"><Contacts/></div>

            <h1 className="text-7xl text-center mb-10">Hi! I'm Wolf Mermelstein</h1>
            <div className="ml-[6rem]">
                <Projects/>
            </div>
        </div>
    )
}

export default Home
