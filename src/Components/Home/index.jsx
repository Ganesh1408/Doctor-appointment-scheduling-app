import { useEffect, useRef, useState } from "react";
import {Link} from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import {
  DoctorsList,
  List,
  SpanItem,
  Image,
  Input,
  Container,
  Button,
} from "./styledComponents";
import Reviews from "../Reviews";

function Home() {
  const [doctors, setDoctors] = useState([]);
  const [input, setInput] = useState([]);
  const inputRef = useRef();
  const fetchDoctors = async () => {
    try {
      const url = `http://localhost:3000/doctors?specialization=${input}`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("fetch failed");
      } else {
        const data = await res.json();
        // console.log(data)
        setDoctors(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  

  useEffect(() => {
    fetchDoctors();
  }, [input]);
  return (
    <Container>
      
      <SearchIcon sx={{position:'absolute',top:"30px", left:"880px"}}/>
      <Input
        type="text"
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter  specialization"
      />
      
      <DoctorsList>
        {doctors &&
          doctors.map((doc) => (
            <List key={doc.id}>
              <Image src={doc.image} alt="docter-image" />
              <SpanItem>{doc.name}</SpanItem>
              <SpanItem>{doc.specialization}</SpanItem>
              <SpanItem>{doc.experience}</SpanItem>
              <SpanItem>{doc.hospital}</SpanItem>
              
              <Link to={`/appointment/${doc.id}`} state={{doctor:doc}}><Button>Book Appointment</Button></Link>
            </List>
          ))}
      </DoctorsList>
      <Reviews doctors={doctors} />
    </Container>
  );
}

export default Home;
