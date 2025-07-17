import { Users } from "lucide-react";

export default function UndifinedUsers (){
    return (
      <>
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h1 className="text-xl font-semibold text-gray-700 mb-2">
              Users Undefined
            </h1>
            <p className="text-gray-500">No users data available</p>
          </div>
        </div>
      </>
    );
}