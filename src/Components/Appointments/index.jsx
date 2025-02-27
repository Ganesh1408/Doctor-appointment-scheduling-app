import React, { useEffect, useState } from 'react';
import { AppointmentContainer, Button, Container, Error, Input, Paragraph } from './styledComponents';
import { useLocation } from 'react-router-dom';

function Appointment() {
    const [appointment, setAppointment] = useState({ date: '', time: '' });
    const location = useLocation();
    const docDetails = location.state;

    const [submit, setSubmit] = useState(false);
    const [res, setRes] = useState({});
    const [error, setError] = useState('');
    const [appData, setAppData] = useState([]);
    const [notification, setNotification] = useState('');

    

    //checking if entered time is valid

    const checkPastTime = () => {

       

        if ( !appointment.date || !appointment.time) return false;
        
        const now = new Date()
        console.log(now)
        const currentHours = now.getHours()
        const currentMin = now.getMinutes()
        const currentDay = now.getDate()
        const currentMonth = now.getMonth()+1
        
        const currentYear = now.getFullYear()
        const selectedTime = appointment.time;
        const selectedDate = appointment.date;
    
        const [selectedYear ,selectedMonth,selectedDay] = selectedDate.split("-").map(Number)
        
        const [selectedHours, selectedMinutes] = selectedTime.split(":").map(Number);

        if(selectedYear > currentYear || 
            (selectedYear === currentYear && selectedMonth > currentMonth) ||
            (selectedYear === currentYear && selectedMonth === currentMonth && selectedDay > currentDay)) {
            setError(""); // No error for future dates
            return false; // Time check is skipped
        };
    

        if ( selectedHours < currentHours || (selectedHours === currentHours && selectedMinutes < currentMin)) {
            setError("Please select a valid time");
            return true;
        } else {
            setError(""); 
            return false;
        }
    
    };

    //getting appoints from data base 

    const getAppointments = async () => {
        try {
            const url = "http://localhost:3000/Appointments";
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const appointmentData = await response.json();
            setAppData(appointmentData);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        getAppointments();
    }, []);

     // checking if the appoint already  existing at selected  date and time
    const isAppointmentTaken = (appointmentDetails) => {
        return appData.some(
            (eachApp) =>
                eachApp.name === appointmentDetails.name &&
                eachApp.specialization === appointmentDetails.specialization &&
                eachApp.date === appointmentDetails.date &&
                eachApp.time === appointmentDetails.time
        );
    };


    //submiting date and time to schedule a appointment
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(checkPastTime()){
            setError("Please select a valid time")
            return ;
        }

        const appointmentDetails = {
            name: docDetails?.doctor?.name,
            specialization: docDetails?.doctor?.specialization,
            date: appointment.date,
            time: appointment.time
        };

         if (isAppointmentTaken(appointmentDetails)) {
            setNotification("Appointment not available at the mentioned time");
            return;
        }
        setNotification('')

        try {
            const url = "http://localhost:3000/Appointments";
            const options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(appointmentDetails)
            };

            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error("Failed to schedule appointment");
            }

            const data = await response.json();
            setRes(data);
            setSubmit(true);
            setTimeout(() => setSubmit(false), 3000);
            setAppointment({ date: "", time: "" });

            getAppointments(); // Refresh appointment list after booking

        } catch (err) {
            setError(err.message);
        }
    };

    /*handling timechange to select the time with 30 min interval 
     so the there will be gap of 30 min for each appointment*/

    const handleTimeChange = (e) => {
        let time = e.target.value;
        let [hours, minutes] = time.split(":").map(Number);
    
        if (minutes % 30 !== 0) {
            setError("Please select a time in 30-minute intervals (e.g., 10:00, 10:30)");
        }else {
            setError("");
            setAppointment({ ...appointment, time });
        }
    };
    


    //returning jsx
    return (
        <Container>
            <h1>Schedule Appointment</h1>
            <form onSubmit={handleSubmit}>
                <Input
                id="dateInput"
                    type="date"
                    name="date"
                    required
                    value={appointment.date}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setAppointment({ ...appointment, date: e.target.value })}
                />
                <Input
                    type="time"
                    name="time"
                    required
                    min="10:00"
                    max="22:00"
                    id="timeInput"
                    
                    value={appointment.time}
                
                    onBlur={checkPastTime}
                
                    onChange={handleTimeChange  }
                />
                <Button type="submit">Submit</Button>
            </form>

            {error && <Error>{error}</Error>}
            {notification && <Error>{notification}</Error>}
            {submit && (
                <AppointmentContainer>
                    <Paragraph>Your Appointment has been scheduled</Paragraph>
                    <p>Doctor: <span>{res.name}</span></p>
                    <p>Specialization: <span>{res.specialization}</span></p>
                    <p>Hospital: <span>{res.specialization}</span></p>
                    <p>ON: <span>{res.date} {res.time}</span></p>
                </AppointmentContainer>
            )}
        </Container>
    );
}

export default Appointment;
