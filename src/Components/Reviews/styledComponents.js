import styled from "styled-components";

export const ReviewsContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    margin-bottom:20px;
`;

export const List = styled.li`
        list-style-type: none;
    padding: 18px;
    max-width: 600px; /* Prevents excessive width */
    width: 100%;
    border: 1px solid black;
    border-radius: 10px;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    overflow: hidden; 
`;

export const Span2 = styled.span`
    display: block;
    width: 100%;
    text-align: right;
    margin-top: 5px;
`;
export const Image = styled.img`
    width: 80px !important;
    height: 80px !important;
    border-radius: 50%;
    max-width:100%;
    
`;
