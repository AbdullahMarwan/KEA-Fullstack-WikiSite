import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const PersonDetails = () => {
  const { id } = useParams<{ id: string }>(); // Get the person's id from the URL
  const [person, setPerson] = useState<{ name: string; profile_path: string; biography: string } | null>(null);

  useEffect(() => {
    const fetchPersonDetails = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/person/${id}?api_key=475f7c6aa70e55fd5a97a138977bb3cc`);
        const data = await response.json();
        setPerson({ name: data.name, profile_path: data.profile_path, biography: data.biography });
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
      {person.profile_path && (
        <img
          src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
          alt={`${person.name}'s profile`}
          style={{ width: "200px", height: "auto" }}
        />
      )}
      <p><b>Name:</b> {person.name}</p>
      <p><b>Biography:</b> {person.biography || "No biography available."}</p>
    </div>
  );
};

export default PersonDetails;