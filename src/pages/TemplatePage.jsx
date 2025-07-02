import Navbar from "../components/Navbar";

export default function TemplatePage({children}){
    return(
        <>
            <Navbar/>
            {children}
        </>
    )
}