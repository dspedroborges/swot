"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [strengths, setStrengths] = useState("");
  const [opportunities, setOpportunities] = useState("");
  const [weaknesses, setWeaknesses] = useState("");
  const [threats, setThreats] = useState("");
  const [percentual, setPercentual] = useState(50);

  const getBgColor = () => {
    if (percentual < 25) {
      return "red"
    } else if (percentual > 25 && percentual < 50) {
      return "orange"
    } else if (percentual > 50 && percentual < 75) {
      return "lightgreen"
    } else {
      return "green"
    }
  }

  const getQualityAndDecision = () => {
    if (percentual < 25) {
      return ["Péssimo", "Nunca"]
    } else if (percentual >= 25 && percentual < 50) {
      return ["Ruim", "Não"]
    } else if (percentual >= 50 && percentual < 75) {
      return ["Bom", "Talvez"]
    } else {
      return ["Ótimo", "Sim"]
    }
  }

  useEffect(() => {
    const sizeStrengths = strengths.split("\n").length;
    const sizeOpportunities = opportunities.split("\n").length;
    const sizeWeaknesses = weaknesses.split("\n").length;
    const sizeThreats = threats.split("\n").length;

    console.log({sizeStrengths, sizeOpportunities, sizeWeaknesses, sizeThreats})

    setPercentual(((sizeStrengths + (sizeOpportunities * 0.75)) / (sizeStrengths + (sizeOpportunities * 0.75) + sizeWeaknesses + (sizeThreats * 0.75))) * 100);


  }, [strengths, opportunities, weaknesses, threats]);

  return (
    <>
      <div className="p-2">
        <div className="flex justify-between mb-1">
          <span className="text-base font-medium text-gray-700">
            {getQualityAndDecision()[0]}/{getQualityAndDecision()[1]}
          </span>
          <span className="text-sm font-medium text-gray-700">
            {percentual.toFixed(2)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="h-2.5 rounded-full"
            style={{
              width: `${percentual}%`,
              backgroundColor: getBgColor()
            }}
          />
        </div>
      </div>
      <main className="grid grid-cols-2">
        <div className="h-[400px]">
          <label htmlFor="strengths" className="cursor-pointer h-[20%] bg-green-900 hover:bg-green-800 text-white py-1 flex flex-col items-center justify-center text-center">Strengths <span className="text-xs">Coisas boas</span></label>
          <textarea id="strengths" className="hover:bg-gray-50 w-full h-[80%] focus:outline-none border-[1px] border-gray-50 p-2" onChange={(e) => setStrengths(e.target.value)}></textarea>
        </div>
        <div className="h-[400px]">
          <label htmlFor="weaknesses" className="cursor-pointer h-[20%] bg-red-900 hover:bg-red-800 text-white py-1 flex flex-col items-center justify-center text-center">Weaknesses <span className="text-xs">Coisas ruins</span></label>
          <textarea id="weaknesses" className="hover:bg-gray-50 w-full h-[80%] focus:outline-none border-[1px] border-gray-50 p-2" onChange={(e) => setWeaknesses(e.target.value)}></textarea>
        </div>
        <div className="h-[400px]">
          <label htmlFor="opportunities" className="cursor-pointer h-[20%] bg-green-900 hover:bg-green-800 text-white py-1 flex flex-col items-center justify-center text-center">Opportunities <span className="text-xs">O que você poderá aproveitar</span></label>
          <textarea id="opportunities" className="hover:bg-gray-50 w-full h-[80%] focus:outline-none border-[1px] border-gray-50 p-2" onChange={(e) => setOpportunities(e.target.value)}></textarea>
        </div>
        <div className="h-[400px]">
          <label htmlFor="threats" className="cursor-pointer h-[20%] bg-red-900 hover:bg-red-800 text-white py-1 flex flex-col items-center justify-center text-center">Threats <span className="text-xs">Com o que você terá de lidar</span></label>
          <textarea id="threats" className="hover:bg-gray-50 w-full h-[80%] focus:outline-none border-[1px] border-gray-50 p-2" onChange={(e) => setThreats(e.target.value)}></textarea>
        </div>
      </main>
    </>
  );
}
