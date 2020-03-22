import React from 'react'
import './card.styles.css'



export const Card = (props) =>(
<div className="card-container">
<img alt="monster" src={`https://robohash.org/${props.monsters.id}?set=set2size=180x180`}></img>
<h2>{props.monsters.name}</h2>
<h3>{props.monsters.address.zipcode}</h3>
</div>


)