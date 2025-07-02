import TemplatePage from "../pages/TemplatePage";
import Button from "../components/form-components/Button"

export default function TemplatePageLayout(){
    return (
      <TemplatePage>
        <div className="bg-gradient-to-r from-[rgb(152,156,230)] via-[#A1A4CE] to-[#4A94AE] flow-root">
          <div className="mt-20 p-5">
            <div className="bg-gray-50/20 p-10">
              <h1 className="text-3xl text-white">Templates</h1>
            </div>
            <div className="flex flex-row flex-wrap gap-10 my-10">
              {/* content card */}
              <div className="bg-gray-50 w-[350px] h-[400px] p-5 flex flex-col rounded-xl hover:scale-105 transition-all ease-in-out">
                <div className="flex justify-center">
                  {/* image */}
                  <div className="w-[300px] h-[250px] bg-gray-400"></div>
                </div>
                {/* text */}
                <div className="py-4 px-1">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Unde, rerum?
                  </p>
                  <Button className="mt-4">Pakai</Button>
                </div>
              </div>
              {/* Content card2 */}
              <div className="bg-gray-50 w-[350px] h-[400px] flex flex-col p-5 rounded-xl hover:scale-105 transition-all ease-in-out">
                <div className="flex justify-center">
                  {/* image */}
                  <div className="w-[300px] h-[250px] bg-gray-400"></div>
                </div>
                {/* text */}
                <div className="py-4 px-1">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Unde, rerum?
                  </p>
                  <Button className="mt-4">Pakai</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TemplatePage>
    );
}