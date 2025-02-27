import styled from 'styled-components'

export const Container = styled.div`
    width:100%;
    display:flex;
    flex-direction:column;
    scroll-behavior:smooth;
    

`

export const DoctorsList = styled.ul`
    display:flex;
    /* flex-wrap:wrap; */
    flex-wrap:wrap;
    justify-content:center;
    align-items:center;
`

export const Image = styled.img`
    height:80px;
    width:80px;
    border-radius:50%;
    
`
export const List = styled.div`
    list-style-type:none;
    border:1px solid grey;
    border-radius:10px;
    height:320px;
    width:300px;
    margin:10px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;


    



`
export const Input = styled.input`
   margin:10px auto;
   width:300px;
   height:40px;
   text-align:center;
   border-radius:8px;
   border:2px solid grey;
   outline:none;

   &:focus{
    border:2px solid red;
   }
   
`
export const SpanItem = styled.span`

    line-height:30px;
`
export const Button = styled.button`
    padding:18px 80px;
    margin:8px;
    border-radius:16px;
    border:none;
    font-weight:700;
`