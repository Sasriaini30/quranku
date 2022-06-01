import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import {Badge, Button, ListGroup} from "react-bootstrap";

const SurahCom=()=>{
    const {id} = useParams();
    const [namaSurah, setNamaSurah] = useState([]);
    const [ayat, setAyat]= useState([]);
    const [artiSurah, setArti]=useState([]);
    const [audioAyat, setAudioAyat]= useState([]);
    const [audioSurah, setAudioSurah]=useState([]);

    useEffect(() => {
        axios.get("https://api.quran.com/api/v4/chapters/" + id)
            .then((res) => {
                setNamaSurah(res.data.chapter)
                // console.log(res.data.chapter)
            })
            .catch((error) => {
                console.log(error, 'error handle nama surah')
            })
        axios.get("https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=" + id)
            .then((res)=>{
                setAyat(res.data.verses)
            })
            .catch((error)=>{
                console.log(error, 'error handle ayat surah')
            })
        axios.get("https://api.quran.com/api/v4/quran/translations/134?chapter_number=" +id)
            .then((res)=>{
                setArti(res.data.translations)
            })
            .catch((error)=>{
                console.log(error, 'error handle arti surah')
            })
        axios.get("https://api.quran.com/api/v4/quran/recitations/7?chapter_number=" +id)
            .then((res)=>{
                setAudioAyat(res.data.audio_files)
            })
            .catch((error)=>{
                console.log(error, "error handle audio ayat")
            })
        axios.get("https://api.quran.com/api/v4/chapter_recitations/7/" +id)
            .then((res)=>{
                setAudioSurah(res.data.audio_file)
            })
            .catch((error)=>{
                console.log(error, "error handle audio ayat")
            })
    },[id])

    return (
        <div style={{marginBottom:"80px", marginTop:"55px"}}>
            <div className='p-5 text-center' style={{backgroundColor:"#FF85B3"}}>
                <h1 className='mb-3' style={{color:"#4700D8"}}>SURAH {namaSurah.name_simple}</h1>
                <h4 style={{color:"#4700D8"}}>{namaSurah.revelation_place}</h4>
                <Button  ><Link className=" text-decoration-none " to={"/info/" + namaSurah.id} style={{color:'#FF85B3'}}>Info surah</Link></Button>
            </div>
            <h5 style={{color:"#4700D8"}}> Full Audio</h5>
            <audio className="h-10 mt-2 w-full text-white jus" src={audioSurah.audio_url} controls />
            <ListGroup as="ol" numbered>
                {ayat.map((ayatItem, index)=>{
                    return (
                        <ListGroup.Item
                            as=""
                            className="d-flex justify-content-end"
                            key={index}
                        >
                            <div className="ms-lg-4">
                                <h4 className="text-end">
                    <span><Badge bg="dark"   pill>
                        {ayatItem.verse_key}
                    </Badge></span> {ayatItem.text_uthmani}</h4>
                                {artiSurah.length? <p className="text-end" dangerouslySetInnerHTML={{__html: artiSurah[index].text}}/>:null}
                                {audioAyat.length? <audio  className="h-10 mt-2  float-end" src={"https://verses.quran.com/" + audioAyat[index].url} controls color="primary" />:null} <br/>
                            </div>
                        </ListGroup.Item>
                    )
                })}
            </ListGroup>

        </div>
    );
}

export default SurahCom;