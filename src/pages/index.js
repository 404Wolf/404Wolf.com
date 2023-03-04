import Contacts from '@/components/contacts/Contacts'
import Projects from '@/components/projects/Projects'
import Image from 'next/Image'
import profileImage from "@/resources/profileMe.jpg"

const Home = () => {
    const profileSize = 180
    const buttonStyle = "bg-slate-300 px-3 py-1 m-2 rounded-xl w-24"

    return (
        <div>
            <div className="fixed right-5 bottom-5 mt-full">
                <Contacts/>
            </div>

            <Image 
                src={ profileImage } 
                width={ profileSize } 
                height={ profileSize } 
                className="float-right rounded-full"
            />

            <h1 className="text-7xl">Hi! I'm Wolf Mermelstein</h1>

            <div className="flex justify-start text-center pt-3 pb-10">
                <button className={ buttonStyle }>About Me</button>
                <button className={ buttonStyle }>Contacts</button>
                <button className={ buttonStyle }>Resume</button>
            </div>

            <div className="mr-[45%] lg:mr-[55%]">
                <Projects/>
            </div>
        </div>
    )
}

export default Home
