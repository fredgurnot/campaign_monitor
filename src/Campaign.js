import React from 'react';
import './Campaign.css';

const Campaign = ({priority, name, variant, segments, areas}) => {
    return (
        <tr className="campaign">
            <td className="center">{priority}</td>
            <td>{name}</td>
            <td><a href={`https://mwcm-author.prd.nytimes.com/.magnolia/admincentral#app:pages:detail;/marketing/mpc/muassets/variants/${variant}:edit`} target="_blank" rel="noopener noreferrer">{variant}</a></td>
            <td><ul  className='listbox' >
                {segments.map((segment, i)=> <li key={i} >{segment}</li> )}
            </ul>
            </td>
            <td><ul  className='listbox' >
                {areas.map((area, i)=> (
                    area.status !== 'fallthrough' ? <li key={i}
                                                        className={
                                                            area.status === 'killset' ? 'red' : 'green'

                    }>{area.areaName}</li> : null
                ))}
            </ul>
            </td>
        </tr>
    )
};

export default Campaign;