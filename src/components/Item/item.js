import React from "react";
import SlCard from '@shoelace-style/shoelace/dist/react/card';
const Item = ({onClick,src,children})=>{
    return <SlCard>
        <img
        className="item-img"
            slot="image"
            src={src}
            alt="item"
            />
        {children}
    </SlCard>
}
export default Item;