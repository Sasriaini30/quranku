import React, {useEffect, useState} from 'react';
import {Card, Col, ListGroup, Row, Tab, Tabs} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";

const HomeComp=()=>{
    const [surah, setSurah]= useState([])
    const [juz, setJuz] = useState([]);

    useEffect(()=>{
        axios.get("https://api.quran.com/api/v4/chapters?language=id" )
            .then((res)=>{
                setSurah(res.data.chapters)
            })
            .catch((error)=>{
                console.log(error, 'error handle surah')
            })
        axios.get("https://api.quran.com/api/v4/juzs")
            .then((res )=>{
                setJuz(res.data.juzs)
            })
            .catch((error)=>{
                console.log(error, "error handle juz")
            })

    },[])
    return (
        <div style={{marginTop:"55px",marginBottom:"80px"}}>
            <div className='p-5 text-center' style={{backgroundColor:"#FF85B3"}}>
                <h1 className='mb-3' style={{color:"#4700D8"}}>----Welcome to QuranKu---- </h1>
                <h4 className='mb-3' style={{color:"#4700D8"}}>Insya Allah Berkah</h4>
            </div>
            <Tabs defaultActiveKey="Surah" variant="tabs" id="uncontrolled-tab-example" className="mb-3 px-lg-5 px-5 ">
                <Tab eventKey="Surah" title="Surah">
                    <>
                            <div className="card-group mx-auto px-5" >
                                {surah.map((surahitem, index)=>(
                                    <div className=" row-1 mx-auto" key={index}  >
                                        <div className="col-md-4 mb-2 col-6 col-sm-1 col-lg-6 row-cols-sm-3 " >
                                                <div  className="card table-hover float-none col-6 mw-400 " style={{width:"13rem",borderColor:"#4700D8"}}>
                                                    <Row>
                                                        <p className="text-start "> <Link to={'/surah/' + surahitem.id} className="text-decoration-none text-dark">
                                                            <span className="btn btn-sm " style={{backgroundColor:"#FF85B3"}}><strong>{surahitem.id}</strong> </span> <strong>{surahitem.name_simple}</strong>
                                                            <span className="text-end"> {surahitem.verses_count} ayat</span></Link></p>
                                                    </Row>
                                                </div>
                                        </div>
                                        <br/>
                                    </div>
                                ))}
                            </div>
                    </>
                </Tab>
                <Tab eventKey="Juz" title="Juz">
                    <div className="card-group px-5" >
                        {juz.map((juzitem, index)=>(
                            <div className=" row-1 mx-4" key={index}  >
                                <div className="col-md-4 mb-2 col-6 col-sm-1 col-lg-6 row-cols-sm-3 col-xxl-6 col-xl-6" >
                                    <div  className="card  float-none col-lg-6 mw-400 " style={{width:"8rem",borderColor:"#4700D8"}}>
                                        <Row>
                                            <p className="text-start "> <Link to={'/juz/' + juzitem.id} className="text-decoration-none text-dark">
                                                <span className="btn btn-sm " style={{backgroundColor:"#FF85B3"}}><strong>{juzitem.id}</strong> </span> <strong>{juzitem.verses_count} Ayat</strong></Link></p>
                                        </Row>
                                    </div>
                                </div>
                                <br/>
                            </div>
                        ))}
                    </div>
                </Tab>
                <Tab eventKey="About" title="About" >
                    <center>
                        <Card className="px-5 mh-100" style={{backgroundColor:"#FF85B3"}}>
                            <Card.Body>
                                <Card.Subtitle className="mb-2 text-muted" style={{color:"#4700D8"}} > ABOUT THIS APP</Card.Subtitle>
                                <br/>
                                <Card.Text className=""> Ini adalah Al-Quran Digital berbasis Web, data API yang diambil adalah dari https://quran.api-docs.io/v4.
                                    <br/>Dibuat menggunakan Framework  React Js dan Library UI BOOSTRAP</Card.Text>
                                <Card.Subtitle className="mb-2 text-muted" style={{color:"#4700D8"}} > FITUR</Card.Subtitle>
                                <br/>
                                <Card.Text className="float-center"> Pada web ini anda dapat memilih juz dan surah yang ingin anda baca
                                    <br/>Tersedia :
                                <ul>
                                    <li>Ayat Arab</li>
                                    <li>Translate Indonesia</li>
                                    <li>Audio</li>
                                </ul></Card.Text>

                                <Card.Subtitle className="mb-2 text-muted" style={{color:"#4700D8"}} > ABOUT AUTHOR</Card.Subtitle>
                                <br/>
                                <Card.Text className=""> Dibuat oleh Sasri'aini , Mahasiswa Teknik Informatika UIN Sultan Syarif Kasim Riau</Card.Text>
                            </Card.Body>
                        </Card>
                    </center>

                </Tab>
            </Tabs>


        </div>
    );
}

export default HomeComp;