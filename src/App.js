import React, {useState, useEffect} from 'react';
import Campaign from './Campaign';
import './App.css';

const App = () => {

    const [campaignsList, setCampaignsList] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        console.log(filter);
            fetch('./api.json')
                .then(response => response.json())
                .then(data => setCampaignsList(data.messagingUnits))
                .catch(error => ({error}));

        }, [filter]
    );

    return (
        <div className="App">
            <table className="App-header">

                <thead>
                <tr>
                    <th>Priority</th>
                    <th>Campaign Name<br/>Filter <input value={filter} onChange={(e) => setFilter(e.target.value)}/></th>
                    <th>Variant</th>
                    <th>Audiences</th>
                </tr>
                </thead>
                <tbody>
                {
                    campaignsList.map((campaign, i) => {
                        if (campaign.properties.campaignName.includes(filter)) {
                            return (
                                <Campaign
                                    key={i}
                                    priority={i+1}
                                    name={campaign.properties.campaignName}
                                    variant={campaign.name}
                                    segments={campaign.segments}
                                />
                            )
                        }

                    })

                }
                </tbody>
            </table>
            }
        </div>
    );
};

export default App;
