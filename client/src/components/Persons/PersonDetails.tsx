import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Heading, Box } from "@chakra-ui/react";

const genderMap: Record<number, string> = {
  0: "Not specified",
  1: "Female",
  2: "Male",
  3: "Non-binary",
};

const PersonDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [person, setPerson] = useState<{
    name: string;
    profile_path: string;
    biography: string;
    known_for_department: string;
    gender: number;
    birthday: string;
    place_of_birth: string;
  } | null>(null);

  useEffect(() => {
    const fetchPersonDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/person/${id}?api_key=475f7c6aa70e55fd5a97a138977bb3cc`
        );
        const data = await response.json();
        setPerson({
          name: data.name,
          profile_path: data.profile_path,
          biography: data.biography,
          known_for_department: data.known_for_department,
          gender: data.gender,
          birthday: data.birthday,
          place_of_birth: data.place_of_birth,
        });
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
      {person.profile_path && (
        <Box display="flex" justifyContent="center" mb={4}>
        <img
          src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
          alt={`${person.name}'s profile`}
          style={{ width: "200px", height: "auto" }}
          />
          </Box>
      )}

      <Heading as="h2" size="xl" textAlign="center" margin={"1em"}>{person.name}</Heading>

      <div> 
        <Heading as="h3" size="md">Personal Information</Heading>

        <div>
          <Heading as="h4" size="sm">Known for</Heading>
          <p>{person.known_for_department || "No known for department available."}</p>
        </div>
        <div>
          <Heading as="h4" size="sm">Gender</Heading>
          <p>{genderMap[person.gender] || "Not specified"}</p>
        </div>
        <div>
          <Heading as="h4" size="sm">Birthday</Heading>
          <p>{person.birthday || "No known birthday available."}</p>
        </div>
      </div>

      <Heading as="h3" size="md" mt={"2em"}>Biography</Heading>
      <p>{person.biography || "No biography available."}</p>
    </div>
  );
};

export default PersonDetails;
