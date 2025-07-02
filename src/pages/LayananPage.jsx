import Navbar from "../components/Navbar";

export default function LayananPage({children}){
    return(
        <>
            <Navbar />
            {children}
        </>
    )
}