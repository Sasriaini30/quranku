import React, {useEffect, useState} from 'react';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link, NavLink} from "react-router-dom";
import axios from "axios";
import "./style.css"

const NavbarComp=()=>{
    const [juz, setJuz] = useState([]);
    const [surah, setSurah]=useState([]);

    useEffect(()=>{
        axios.get("https://api.quran.com/api/v4/juzs")
            .then((res )=>{
                setJuz(res.data.juzs)
            })
            .catch((error)=>{
                console.log(error, "error handle juz")
            })
        axios.get("https://api.quran.com/api/v4/chapters/")
            .then((res)=>{
                setSurah(res.data.chapters)
            })
            .catch((error)=>{
                console.log(error, 'error handle surah')
            })

    },[]);

    return (
        <div>
            <Navbar collapseOnSelect className="justify-content-end text-success" variant="dark" fixed="top"  expand="lg"  style={{backgroundColor:"#4700D8", color:"#FF85B3"}}>
                <Container>
                    <Navbar.Brand  ><Link to="/" className="text-decoration-none " style={{color:"#FF85B3"}}> Al-Quran'an Digital</Link></Navbar.Brand>
                    {/*<Navbar.Toggle aria-controls="responsive-navbar-nav" />*/}
                    {/*<Navbar.Collapse id="responsive-navbar-nav">*/}
                    {/*    <Nav className="me-auto ">*/}
                    {/*        <Nav.Link> <NavLink className="text-decoration-none user-select-auto text-white " to="/" >Home</NavLink></Nav.Link>*/}
                    {/*        <NavDropdown className="text-primary navbar-light" title="Juz" id="collasible-nav-dropdown"    >*/}
                    {/*            {juz.map((juzItem, index)=>(*/}
                    {/*                <NavDropdown.Item className="overflowScroll" key={index} ><NavLink  to={"/juz/" + juzItem.id} className="text-decoration-none" style={{color:"#4700D8"}} >Juz {juzItem.id}</NavLink></NavDropdown.Item>*/}
                    {/*            ))}*/}
                    {/*        </NavDropdown>*/}
                    {/*        <NavDropdown title="Surah"  id="collasible-nav-dropdown">*/}
                    {/*            {surah.map((surahItem, index)=>(*/}
                    {/*                <NavDropdown.Item key={index} ><NavLink to={"/surah/" + surahItem.id} className="text-decoration-none" style={{color:"#4700D8"}}>{surahItem.name_complex}</NavLink></NavDropdown.Item>*/}
                    {/*            ))}*/}
                    {/*        </NavDropdown>*/}
                    {/*    </Nav>*/}
                    {/*</Navbar.Collapse>*/}
                </Container>
            </Navbar>
        </div>
    );
}

export default NavbarComp;