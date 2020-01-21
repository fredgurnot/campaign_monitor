import React from 'react';
import './Campaign.css';

const Campaign = ({priority, name, variant, segments}) => {
    return (
        <tr className="campaign">
            <td className="center">{priority}</td>
            <td>{name}</td>
            <td><a href={`https://mwcm-author.prd.nytimes.com/.magnolia/admincentral#app:pages:detail;/marketing/mpc/muassets/variants/${variant}:edit`} target="_blank" rel="noopener noreferrer">{variant}</a></td>
            <td><ul  style={{
                'maxHeight':'100px',
                'minWidth': '200px'}} >
                {segments.map((segment, i)=> <li key={i} >{segment}</li> )}
            </ul>
            </td>
        </tr>
    )
};

export default Campaign;