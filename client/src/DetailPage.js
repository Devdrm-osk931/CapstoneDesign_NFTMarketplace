import React from "react";
import { useParams } from 'react-router-dom'

function DetailPage(props) {
    const { id } = useParams();

    return (
        <div className="component-spacing">
            <h3>
                {id}의 상세페이지입니다
                <br/>
                <img className="ipfsimg" src={props.src + "/" + id.toString() + ".png"}></img>
            </h3>
        </div>
    )
}

export default DetailPage;