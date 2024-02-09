"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Interpretations{
  $id : string;
  term: string;
  interpretation: string;
}

export default function Home() {
  const [ interpretations, setInterpretations] = useState<Interpretations[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInterpretations = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/interpretations');
        if (!response.ok) {
          throw new Error("Failed to fetch interpretations");
        }
        const data = await response.json();
        setInterpretations(data);
      } catch (error) {
        console.log("Error", error);
        setError("Failed to load interpretations , Please try reloading the page")
      }finally{
        setIsLoading(false);
      }
    };
    fetchInterpretations();
    
  },[]);

  const handleDelete = async(id: string) => {
    try{
      await fetch(`/api/interpretations/${id}`,{method: "DELETE"})
      setInterpretations((prevInterpretations) => prevInterpretations?.filter((i) => i.$id != id))

    }catch(error){
      setError("Failed to delete interpretations")
    }
  };

  return (<div>
    {error && <p className="py-4 text-red-500">{error}</p>}
    {isLoading? (
    <p>Loading Interpretations</p>
    ) : (interpretations?.length ?? 0) > 0 ?(

    <div>
      {
        interpretations?.map(interpretation => (
          <div className="p-4 my-2 rounded-md border-b leading-8">
            <div   className="font-bold">{interpretation.term}</div>
            <div>
              {interpretation.interpretation}            </div>
            <div className="flex gap-4 mt-4 justify-end">
              <Link className="bg-slate-200 px-4 py-2 rounded-md uppercase text-sm
        font-bold tracking-wd"
              href={`/edit/${interpretation.$id}`} >Edit</Link>
              <button>
                <Link href="#" className="bg-red-500 px-4 py-2 rounded-md 
                uppercase text-sm font-bold tracking-wd" onClick={() => handleDelete(interpretation.$id)}>Delete</Link>

              </button>
            </div>
          </div>  
        ))}
      
    </div>)
    :(
      <p>No interpretation found</p>
    )}
  </div>
  );
}
