import { useEffect, useState } from 'react'
import { Image } from "react-bootstrap"

export default function ImagePreview(props) {

    function handleRemove() {
        props.handleRemoveImage(props.index ? props.index : 0)
    }

    const [source, setSource] = useState(undefined)


    useEffect(() => {
        if (props.url) {
            setSource(props.url)
        }
        else {
            setSource((props.src) ? URL.createObjectURL(props.src) : undefined)
        }
    }, [props.src, props.url])

    return (
        <div style={{ position: 'relative' }} hidden={!source}>
            <br />
            <Image style={{ width: '100px', maxHeight: '100px' }} src={source} alt="img" />
            <div hidden={props.hideRemoveButton} onClick={handleRemove}>
                <i className="fas fa-times-circle" style={{ position: 'absolute', left: '90px', top: '20px', cursor: 'pointer', zIndex: "0" }}></i>
            </div>
        </div>
    )
}