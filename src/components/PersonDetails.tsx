import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const PersonDetails = () => {
  const { id } = useParams<{ id: string }>(); // Get the person's id from the URL
  const [person, setPerson] = useState<{ id: number; name: string } | null>(null);

  useEffect(() => {
    const fetchPersonDetails = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/person/${id}?api_key=475f7c6aa70e55fd5a97a138977bb3cc`);
        const data = await response.json();
        setPerson({ id: data.id, name: data.name });
      } catch (error) {
        console.error("Error fetching person details:", error);
      }
    };

    fetchPersonDetails();
  }, [id]);

  if (!person) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Person Details</h1>
      <p><b>ID:</b> {person.id}</p>
      <p><b>Name:</b> {person.name}</p>
    </div>
  );
};

export default PersonDetails;