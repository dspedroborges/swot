"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [strengths, setStrengths] = useState("");
  const [opportunities, setOpportunities] = useState("");
  const [weaknesses, setWeaknesses] = useState("");
  const [threats, setThreats] = useState("");
  const [percentual, setPercentual] = useState(0);

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
    const sum = (array: string[]) => {
      let sum = 0;
      for (let i = 0; i < array.length; i++) {
        const split = array[i].split("/");
        if (!split[1]) {
          sum += 1;
        } else {
          sum += Number(split[1].trim());
        }
      }

      return sum;
    }
    const splitStrengths = strengths.split("\n");
    const splitOpportunities = opportunities.split("\n");
    const splitWeaknesses = weaknesses.split("\n");
    const splitThreats = threats.split("\n");

    let sumPositive = sum(splitStrengths) + sum(splitOpportunities);
    let sumNegative = sum(splitWeaknesses) + sum(splitThreats);

    setPercentual((sumPositive / (sumPositive + sumNegative)) * 100);
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
      <p className="text-center mt-4 mb-2 font-bold">Você deve inserir as afirmações linha por linha. A quebra de linha é o que permite a contagem. Além disso, você pode definir pesos para cada afirmação, da seguinte forma:</p>
      <p className="text-center mb-4 font-light">"Exemplo de afirmação qualquer/3"</p>
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
