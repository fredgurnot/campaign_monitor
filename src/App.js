import React, {useState, useEffect} from 'react';
import Campaign from './Campaign';
import './App.css';

const App = () => {

    const [campaignsList, setCampaignsList] = useState([]);
    const [filterName, setFilterName] = useState('');

    useEffect(() => {
            fetch('./api.json')
                .then(response => response.json())
                .then(data => setCampaignsList(data.messagingUnits))
                .catch(error => ({error}));

        }, [filterName]
    );

    return (
        <div className="App">
            <table className="App-header">

                <thead>
                <tr>
                    <th>Priority</th>
                    <th>Campaign Name<br/>Filter <input value={filterName} onChange={(e) => setFilterName(e.target.value)}/></th>
                    <th>Variant</th>
                    <th>Audiences</th>
                </tr>
                </thead>
                <tbody>
                {
                    campaignsList.map((campaign, i) => {
                        if (campaign.properties.campaignName.includes(filterName)) {
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
