"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ChangeEvent } from "react";

export default function EditPage({ params }: { params: { id: string } }) {
    const [formData, setFormData] = useState({ term: "", interpretation: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/interpretations/${params.id}`); // Corrected URL
                if (!response.ok) {
                    throw new Error("Failed to fetch interpretations");
                }
                const data = await response.json();
                // Handle the case when data.interpretation is undefined or null
                if (data.interpretation) {
                    setFormData({ term: data.interpretation.term, interpretation: data.interpretation.interpretation });
                } else {
                    setError("Interpretation data not found");
                }
            } catch (error) {
                setError("Failed to load interpretations.");
            }
        };

        fetchData();
    }, [params.id]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.term || !formData.interpretation) {
            setError("Please fill in all the fileds");
            return;
        }
        setError(null);
        setIsLoading(true);

        try {
            const response = await fetch(`/api/interpretations/${params.id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            if (!response.ok)
                throw new Error("Failed to update interpretations")
            router.push("/");
        } catch (error) {
            console.log(error);
            setError("Something went wrong. Please try again")
        } finally {
            setIsLoading(false);
        }

    }

    return (
        <div>
            <h2 className="text-2xl font-bold my-8">Edit Interpretation</h2>

            <form onSubmit={handleSubmit} className="flex gap-3 flex-col">
                <input
                    type="text"
                    name="term"
                    placeholder="Term"
                    className="py-1 px-4 border rounded-md"
                    value={formData.term}
                    onChange={handleInputChange}
                />

                <textarea
                    name="interpretation"
                    rows={4}
                    placeholder="Interpretation"
                    className="py-1 px-4 border rounded-md resize-none"
                    value={formData.interpretation}
                    onChange={handleInputChange}></textarea>

                <button className="bg-black text-white mt-5 my-1 px-4 rounded-md cursor-pointer">
                {isLoading ? "Updating..." : "Update Interpretation"}
                </button>
            </form>
            {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
    );
}
