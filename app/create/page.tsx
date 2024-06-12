"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useReducer, useState } from "react"

export default function CreatePage(){
    const [formData, setFormData] = useState({ term: "", interpretation: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router =  useRouter();

    const handleInputChange = (e: ChangeEvent < HTMLInputElement | HTMLTextAreaElement>)=>{
        setFormData((prevData) =>({
                ...prevData,
                [e.target.name] : e.target.value,
            }
        ));
    }    

    const handleSubmit = async(e: React.FormEvent)=>{
        e.preventDefault();

        if(!formData.term || !formData.interpretation){
            setError("Please fill in all the fileds");
            return;
        }
        setError(null);
        setIsLoading(true);

        try{
            const response = await  fetch('/api/interpretations',{method: "POST",
        headers:{
            "Content-type": "application/json",
        },
        body:JSON.stringify(formData),
        })

        if(!response.ok)
            throw new Error("Failed to create interpretations")
            router.push("/");
        }catch(error){
            console.log(error);
            setError("Something went wrong. Please try again")
        }finally{
            setIsLoading(false);
        }

    }

 return(
     <div className="bg-gradient-to-r min-h-screen">
         <h2 className="text-xl font-semibold my-6">Add New Interpretation</h2>
        <form  onSubmit={handleSubmit} className="flex gap-3 flex-col">
            <input 
            type="text" 
            name="term" 
            placeholder="Term"
            value={formData.term}
            className="py-1 px-4 border rounded-md"
            onChange={handleInputChange}
            />

                <textarea 
                name="interpretation" 
                rows={4} 
                placeholder="Interpretation"
                className="py-1 px-4 border rounded-md resize-none"
                value={formData.interpretation}
                 onChange={handleInputChange}
                ></textarea>

                <button className="bg-black text-white mt-5 my-1 px-4 
                rounded-md cursor-pointer" type="submit" disabled={isLoading}>
                {isLoading? "Adding..." : "Add Interpretation"}
                </button>
        </form> 
            {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
    )
}