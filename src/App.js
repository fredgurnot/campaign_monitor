import React, {useState, useEffect} from 'react';
import Campaign from './Campaign';
import './App.css';
import Checkbox from './components/Checkbox';

const App = () => {

    const [campaignsList, setCampaignsList] = useState([]);
    const [filterName, setFilterName] = useState('');
    const [filterVariant, setFilterVariant] = useState('');
    const [filterAudience, setFilterAudience] = useState('');
    const [filterArea, setFilterArea] = useState(['barOne', 'inlineUnit', 'welcomeAd', 'dock', 'gateway', 'truncator', 'mobileTruncator']);

    const areas = ['barOne', 'inlineUnit', 'welcomeAd', 'dock', 'gateway', 'truncator', 'mobileTruncator'];
    areas.sort();

    useEffect(() => {
            fetch('https://mwcm-pub.prd.nytimes.com/.rest/mkt/mu/v1')
                .then(response => response.json())
                .then(data => setCampaignsList(data.messagingUnits))
                .catch(error => ({error}));
            getHiddenWidthRow();

        }, [filterName, filterArea, filterAudience]
    );


    const checkBoxChange = (e) => {
        let array = filterArea;
        if (e.target.checked) {
            array.push(e.target.name);
        } else {
            array.splice(array.indexOf(e.target.name), 1)
        }
        setFilterArea(array.sort());
        console.log('filterArea');
        console.log(filterArea);
    };

    const arrayIsEqual = (ar1,ar2) => {
        // check length
        if (ar1.length !== ar2.length) {return false;}
        //compare each element
        for (let i = 0; i < ar1.length; i++) {
            if (ar1[i] !== ar2[i]) {
                return false;
            }
        }
        return true;
    };

    const searchSegment = (str, strArray) => {
        for (var j=0; j<strArray.length; j++) {
            if (strArray[j].match(str)) return true;
        }
        return false
    };


    const validateArea = (areas) => {
        let currentAreas = [];
        areas.forEach((area, i) => {
            console.log('area.status: ' + area.status);
            if (area.status === "active") {
                currentAreas.push(area.areaName)
            }
        });
        currentAreas.sort();
        console.log('currentAreas');
        console.log(currentAreas);
        return true;
        return arrayIsEqual(filterArea, currentAreas);
    };

    const getHiddenWidthRow = () => {
        const firstTableRow = document.querySelector("tbody tr");
        const hiddenWidthRow = document.querySelector("#hiddenWidthRow");

        if (firstTableRow && hiddenWidthRow) {
            return [...Array(firstTableRow.cells.length).keys()].map((item, idx) => (
                <td key={item}>
                    <div
                        style={{width: firstTableRow.cells[idx].offsetWidth - 2}}
                    />
                </td>
            ));
        }
    };

    return (
        <div className="app">
            <div className="app-container">

                <table className="app-header">

                    <thead>
                    <tr>
                        <th><h2>Priority</h2></th>
                        <th>Campaign Name<br/>
                            <input value={filterName} placeholder={"filter"} onChange={(e) => setFilterName(e.target.value)}/>
                        </th>
                        <th>Variant<br/>
                            <input value={filterVariant} placeholder={"filter"} onChange={(e) => setFilterVariant(e.target.value)}/>
                        </th>
                        <th>Audiences<br/>
                            <input value={filterAudience} placeholder={"filter"} onChange={(e) => setFilterAudience(e.target.value)}/>
                        </th>
                        <th>Areas<br/>
                        | <span className="green">active</span>  | <span className="red">killset</span> | <span className="grey">(fallthrough hidden)</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        campaignsList.map((campaign, i) => {
                            if (
                                campaign.properties.campaignName.includes(filterName)
                                &&
                                campaign.name.includes(filterVariant)
                                &&
                                searchSegment(filterAudience, campaign.segments)
                                &&
                                validateArea(campaign.areas)
                            ) {
                                return (
                                    <Campaign
                                        key={i}
                                        priority={i + 1}
                                        name={campaign.properties.campaignName}
                                        variant={campaign.name}
                                        segments={campaign.segments}
                                        areas={campaign.areas}
                                    />
                                )
                            } else {
                                return null;
                            }

                        })

                    }
                    <tr id="hiddenWidthRow" className="hiddenRow">
                    </tr>
                    </tbody>
                </table>

            <div className="filter-areas">
                <h4>Filter by asset</h4>
                <div>
                    {areas.map((name, i) => (
                        <div key={i}>
                            <Checkbox
                                name={name}
                                checked={true}
                                onCheckboxChange={checkBoxChange}
                            /></div>
                    ))}

                </div>
            </div>
        </div>
        </div>
    );
};

export default App;
