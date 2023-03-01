import Image from "next/Image";

const Contact = ({ name, username, url, image }) => {
    return (
        <div>
            <Image src={ image } width={ 50 } height={ 50 } />
        </div>
    );
}
 
export default Contact;