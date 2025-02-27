import styled from 'styled-components'

export const Container = styled.div`
text-align:center;

`

export const Input = styled.input`
    padding:10px;
    width:300px;
    margin:10px;
    font-size:20px;
    
    


`
export const Button = styled.button`

    display:block;
    margin:30px auto;
    padding:12px 60px;
    border-radius:12px;
    border:none;
    font-size:16px;
    background-color:dodgerblue;
    color:white;
`
export const AppointmentContainer = styled.div`

    height:180px;
    width:300px;
    display:flex;
    flex-direction:column;
    /* justify-content:center; */
    /* align-items:center; */
    border:1px solid black;
    margin:10px auto;
    border-radius:16px;
    line-height:6px;
    padding:10px;

`
export const Paragraph = styled.p`
    color:green;
    font-size:18px;
    

`
export const Error = styled.p`
    color:red;
    font-size:18px;
`