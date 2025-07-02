import Navbar from "../components/Navbar"

export default function LandingPage({children}){
    return (
      <>
        <div>
          <Navbar />
          <div className="">
            <div>
              {children}
            </div>
          </div>
        </div>
      </>
    );
}