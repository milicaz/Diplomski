import { createContext, useState } from "react";

export const TipOpremeContext = createContext()

const TipOpremeContextProvider = (props) => {

    const [tipoviOpreme, setTipoviOpreme] = useState([
        {id:'1', naziv: 'Laptop + miš 1', sifra: '101'},
        {id:'2', naziv: 'Laptop + miš 2', sifra: '102'},
        {id:'3', naziv: 'Laptop + miš 3', sifra: '103'},
        {id:'4', naziv: 'Slušalice 1', sifra: '201'},
        {id:'5', naziv: 'Slušalice 2', sifra: '202'},
        {id:'6', naziv: 'Slušalice 3', sifra: '203'},
        {id:'7', naziv: 'Džojstik 1', sifra: '301'},
        {id:'8', naziv: 'Džojstik 2', sifra: '302'},
        {id:'9', naziv: 'Džojstik 3', sifra: '303'},
        {id:'10', naziv: 'Igrica 1', sifra: '401'},
        {id:'11', naziv: 'Igrica 2', sifra: '402'},
        {id:'12', naziv: 'Igrica 3', sifra: '403'}
    ])

    return (
        <TipOpremeContext.Provider value={{tipoviOpreme}}>
            {props.children}
        </TipOpremeContext.Provider>
    )
}

export default TipOpremeContextProvider;