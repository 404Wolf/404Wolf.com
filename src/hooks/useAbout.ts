import AboutData from "@/interfaces/about_data";
import about from "../../public/about.json";

const useAbout = (): AboutData => {
    return about;
}
 
export default useAbout;