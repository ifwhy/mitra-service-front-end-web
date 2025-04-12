import { TabAuth } from "@/components/TabAuth";
import React from "react";

const Auth = () => {
  return (
    <main className="w-full h-full lg:mt-16 flex flex-1 flex-row items-center justify-center">
      <div className="w-full h-full bg-transparent flex flex-col items-center justify-center gap-4">
        <TabAuth />
      </div>
    </main>
  );
};

export default Auth;
