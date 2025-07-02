import Halaman1 from "../components/Halaman1";
import Halaman2 from "../components/Halaman2";
import LandingPage from "../pages/LandingPage";

export default function LandingPageLayout(){
    return (
      <>
        <LandingPage>
          {/* Halaman 1 */}
          <Halaman1 />

          {/* Halaman 2 */}
          <Halaman2 />
        </LandingPage>
      </>
    );
}