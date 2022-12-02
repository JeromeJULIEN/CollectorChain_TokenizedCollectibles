import React from 'react';
import {useParams} from 'react-router-dom';

const Collection = () => {
    const {id} = useParams();

    return (
        <div>Collection {id}</div>
    )
}

export default Collection