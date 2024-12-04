"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Gloria_Hallelujah } from "next/font/google";
import { BsClipboard2, BsClipboard2Check } from "react-icons/bs";

const gloriaHallelujah = Gloria_Hallelujah({ weight: ["400"], subsets: ["latin"] });

export default function Home() {
  const searchParams = useSearchParams();
  let title = searchParams.get("title");
  let _strengths = searchParams.get("strengths");
  let _opportunities = searchParams.get("opportunities");
  let _weaknesses = searchParams.get("weaknesses");
  let _threats = searchParams.get("threats");
  const router = useRouter();
  const [addedClipboard, setAddedClipboard] = useState(false);
  const [strengths, setStrengths] = useState<string[]>([]);
  const [opportunities, setOpportunities] = useState<string[]>([]);
  const [weaknesses, setWeaknesses] = useState<string[]>([]);
  const [threats, setThreats] = useState<string[]>([]);
  const [percentual, setPercentual] = useState(0);
  const [currentTitle, setCurrentTitle] = useState(title || "Change the title")

  const addToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
  }

  useEffect(() => {
    if (_strengths) setStrengths(_strengths.split(";"));
    if (_opportunities) setOpportunities(_opportunities.split(";"));
    if (_weaknesses) setWeaknesses(_weaknesses.split(";"));
    if (_threats) setThreats(_threats.split(";"));
  }, [_strengths, _opportunities, _weaknesses, _threats]);

  useEffect(() => {
    router.push(`?title=${currentTitle}&strengths=${strengths.join(";")}&opportunities=${opportunities.join(";")}&weaknesses=${weaknesses.join(";")}&threats=${threats.join(";")}`);
  }, [strengths, opportunities, weaknesses, threats, currentTitle]);

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
    const sum = (array: string[] | null | undefined) => {
      if (!array) return 0;

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

    let sumPositive = sum(strengths) + sum(opportunities);
    let sumNegative = sum(weaknesses) + sum(threats);

    setPercentual((sumPositive / (sumPositive + sumNegative)) * 100);
  }, [strengths, opportunities, weaknesses, threats]);

  return (
    <>
      <input type="text" className={`bg-transparent text-blue-800 block mx-auto text-center rounded-xl text-2xl lg:text-6xl ${gloriaHallelujah.className}`} value={currentTitle} onChange={(e) => setCurrentTitle(e.target.value)} />
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
          <label htmlFor="strengths" className="cursor-pointer h-[20%] bg-green-900 hover:bg-green-800 text-white py-1 flex flex-col items-center justify-center text-center">Strengths <span className="text-xs">Características internas e positivas (no que a coisa analisada é boa ou quais os benefícios)</span></label>
          <textarea id="strengths" className="hover:bg-gray-50 w-full h-[80%] focus:outline-none border-[1px] border-gray-50 p-2" value={strengths.join("\n")} onChange={(e) => setStrengths(e.target.value.split("\n"))}></textarea>
        </div>
        <div className="h-[400px]">
          <label htmlFor="weaknesses" className="cursor-pointer h-[20%] bg-red-900 hover:bg-red-800 text-white py-1 flex flex-col items-center justify-center text-center">Weaknesses <span className="text-xs">Características internas e negativas (no que a coisa analisada precisa melhorar ou quais as limitações e dificuldades)</span></label>
          <textarea id="weaknesses" className="hover:bg-gray-50 w-full h-[80%] focus:outline-none border-[1px] border-gray-50 p-2" value={weaknesses.join("\n")} onChange={(e) => setWeaknesses(e.target.value.split("\n"))}></textarea>
        </div>
        <div className="h-[400px]">
          <label htmlFor="opportunities" className="cursor-pointer h-[20%] bg-green-900 hover:bg-green-800 text-white py-1 flex flex-col items-center justify-center text-center">Fatores externos e positivos <span className="text-xs">Fatores externos e positivos (o que você pode aproveitar)</span></label>
          <textarea id="opportunities" className="hover:bg-gray-50 w-full h-[80%] focus:outline-none border-[1px] border-gray-50 p-2" value={opportunities.join("\n")} onChange={(e) => setOpportunities(e.target.value.split("\n"))}></textarea>
        </div>
        <div className="h-[400px]">
          <label htmlFor="threats" className="cursor-pointer h-[20%] bg-red-900 hover:bg-red-800 text-white py-1 flex flex-col items-center justify-center text-center">Threats <span className="text-xs">Fatores externos e negativos (com o que você terá de lidar ou riscos e desafios)</span></label>
          <textarea id="threats" className="hover:bg-gray-50 w-full h-[80%] focus:outline-none border-[1px] border-gray-50 p-2" value={threats.join("\n")} onChange={(e) => setThreats(e.target.value.split("\n"))}></textarea>
        </div>
      </main>

      {
        addedClipboard ? (
          <BsClipboard2Check title="URL copied to clipboard" className="bg-white p-2 rounded-xl fixed bottom-2 right-2 text-green-800 text-6xl hover:scale-95 cursor-pointer" />
        ) : (
          <BsClipboard2 title="Copy URL to clipboard" className="bg-white p-2 rounded-xl fixed bottom-2 right-2 text-blue-800 text-6xl hover:scale-95 cursor-pointer" onClick={() => {
            setAddedClipboard(true);
            addToClipboard();
            setTimeout(() => {
              setAddedClipboard(false)
            }, 2000);
          }} />
        )
      }

    </>
  );
}
