import React from 'react';
import logo from '../assets/KU_Logo.png'
import { IoIosNotifications } from "react-icons/io"
export default function Headbar({ title }) {
    
    return (
        <div style={styles.container}>
            <img src={logo} alt="Logo" style={styles.logoKU} />
            <h1 style={styles.title}>{title}</h1>
            <IoIosNotifications   style={styles.logoNoti} />
        </div>
    );
}

const styles = {
    container: {
        width: '100%',
        height: '90px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
    
    },
    logoNoti: {
        width: '30px',
        height: '30px',
        padding: '0px 30px 0px 0px',
    },
    logoKU: {
        width: '60px', 
        height: '70px',
        padding: '0px 0px 0px 20px',
  
    },
    title: {
        fontSize: 24, 
        color: '#147271'
    },
};
