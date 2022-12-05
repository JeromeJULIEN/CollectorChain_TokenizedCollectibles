import React from 'react'
import { useSelector } from 'react-redux';
import {useParams} from 'react-router-dom';
import './styles.scss';

const DaoProposal = () => {
    const {id} = useParams();

    const proposal = useSelector(state=> state.dao.proposalList[id])
    const daoList = useSelector(state => state.dao.daoList)
    console.log('proposal=>', proposal);

    return (
        <div className='daoProposal'>
            <p className="daoProposal__title">Object {proposal.name} from {daoList[proposal.daoId].name} collection</p>
            <div className="daoProposal__panel">
                <div className="panelLeft">
                    <div className="panelLeft__picture">panelLeft__picture</div>
                    <div className="panelLeft__vote">
                        <p className="panelLeft__vote__title">Voting panel</p> 
                        <div className="panelLeft__vote__value">
                            <p>Set the estimated value of the object</p>
                            <input type="text" placeholder='value in ETH'/>
                        </div>
                        <div className="panelLeft__vote__setVote">
                            <button className='panelLeft__vote__setVote--no'>Vote no</button>
                            <button className='panelLeft__vote__setVote--yes'>Vote yes</button>
                        </div>
                    </div>
                </div>
                <div className="panelRight">
                    <div className="panelRight__desc">
                        <p className="panelRight__desc--title">Object description</p>
                        <p>{proposal.desc}</p>
                    </div>
                    <div className="panelRight__doc">
                        <p className="panelRight__doc--title">Supporting documents</p> 
                        <ul>
                            <li>document 1</li>
                            <li>document 2</li>
                            <li>document 3</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DaoProposal