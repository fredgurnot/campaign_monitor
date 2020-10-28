import React, {useState, useEffect} from "react";

const Checkbox = ({name, checked, onCheckboxChange}) => {

    const [ischecked, setIsChecked] = useState(checked);

    const toggleCheckBox = e => {
        setIsChecked(!ischecked);
        onCheckboxChange(e);
    };


    return (<div className='form-check'>
        <label>
            <input
                type="checkbox"
                name={name}
                checked={ischecked}
                onChange={e => toggleCheckBox(e)}
                className="form-check-input"
            />
            {name}
        </label>
    </div>
)
};

export default Checkbox;