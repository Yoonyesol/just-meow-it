import React from "react";

export default function Loader() {
    return (
        <div className="fixed top-16 left-0 w-full h-full bg-gray-900/70 z-50 flex justify-center items-center">
            <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
        </div>
    );
}