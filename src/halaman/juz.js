import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {Card, Col, Row} from "react-bootstrap";

const JuzComp=()=>{
    const {id} =useParams()
    const [ayatJuz, setAyatjuz]=useState([]);
    const [artiJuz, setArtiJuz]=useState([]);
    const [audioJuz, setAudioJuz]=useState([]);

    useEffect(()=>{
        axios.get("https://api.quran.com/api/v4/quran/verses/uthmani?juz_number=" + id)
            .then((res)=>{
                setAyatjuz(res.data.verses)
            })
            .catch((error)=>{
                console.log(error, ' error handle ayat juz')
            })
        axios.get("https://api.quran.com/api/v4/quran/translations/134?juz_number=" +id)
            .then((res)=>{
                setArtiJuz(res.data.translations)
            })
            .catch((error)=>{
                console.log(error, 'error handle arti juz')
            })
        axios.get("https://api.quran.com/api/v4/recitations/7/by_juz/" +id + "?per_page=999999999" )
            .then((res)=>{
                setAudioJuz(res.data.audio_files)
            })
            .catch((error)=>{
                console.log(error, "error handle audio ayat")
            })
    },[id])
    return (
        <div>
            <div className='p-5 text-center' style={{backgroundColor:"#FF85B3", marginTop:"55px"}}>
                <h1 className='mb-3' style={{color:"#4700D8"}}>JUZ {id}</h1>
            </div>

            {ayatJuz.map((ayatitem, index)=>{
                return(
                    <Card key={index} className="mt-1" style={{marginBottom:"80px",}}>
                        <Card.Body>
                            <Row>
                                <Col sm={1}>
                                    <span style={{color:"#4700D8", fontSize:"15px"}} className="badge rounded-pill ">{ayatitem.verse_key}</span>
                                </Col>
                                <Col sm={11}>

                                    <p className="text-end fs-4"> {ayatitem.text_uthmani}</p>
                                    {artiJuz.length? <p className="text-md-end fst-italic" dangerouslySetInnerHTML={{__html:artiJuz[index].text}} />:null}
                                    {audioJuz.length? <audio  className="h-10 mt-2   text-end float-end" src={"https://verses.quran.com/" + audioJuz[index].url} controls />:null}
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                )
            })}

        </div>
    );
}

export default JuzComp;