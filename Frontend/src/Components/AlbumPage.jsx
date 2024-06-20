import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Album from '../Design/album.png';
import '../Design/album.css';
import TeamPage from './TeamPage';
import TeamNavBar from './TeamNavBar';

function AlbumPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [teamsData, setTeamsData] = useState([]);
    const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
    const [currentTeamIndex, setCurrentTeamIndex] = useState(0);

    useEffect(() => {
        async function fetchTeams() {
            try {
                const response = await axios.get(import.meta.env.VITE_TEAMS_API);
                const updatedData = response.data.map(group => ({
                    ...group,
                    temas: group.temas.sort((a, b) => {
                        if (a.points !== b.points) {
                            return b.points - a.points;
                        }
                        if (a.goalDifference !== b.goalDifference) {
                            return b.goalDifference - a.goalDifference;
                        }
                        return a.rank - b.rank;
                    })
                }));
                setTeamsData(updatedData);
            } catch (err) {
                console.error("Fetching the teams failed!", err);
            }
        }

        fetchTeams();
    }, []);

    useEffect(() => {
        if (currentGroupIndex > 0) {
            preloadTeamData(currentGroupIndex - 1, currentTeamIndex);
        }
        if (currentGroupIndex < teamsData.length - 1) {
            preloadTeamData(currentGroupIndex + 1, currentTeamIndex);
        }
    }, [currentGroupIndex, currentTeamIndex, teamsData]);

    const preloadTeamData = async (groupIndex, teamIndex) => {
        const teamToPreload = teamsData[groupIndex].temas[teamIndex];
        try {
            await axios.get(`https://compstats.uefa.com/v1/player-ranking`, {
                params: {
                    competitionId: 3,
                    limit: 30,
                    offset: 0,
                    optionalFields: 'PLAYER,TEAM',
                    order: 'DESC',
                    phase: 'TOURNAMENT',
                    seasonYear: 2024,
                    stats: 'minutes_played_official,matches_appearance,goals,assists,top_speed,distance_covered',
                    teamId: teamToPreload.teamId
                }
            });
        } catch (error) {
            console.error('Error preloading team data:', error);
        }
    };

    const handleAlbumClick = () => {
        setIsOpen(true);
    };

    const handleCloseAlbum = () => {
        setIsOpen(false);
    };

    const goToNextTeam = () => {
        if (currentTeamIndex < 3) {
            setCurrentTeamIndex(currentTeamIndex + 1);
        } else {
            if (currentGroupIndex < teamsData.length - 1) {
                setCurrentGroupIndex(currentGroupIndex + 1);
                setCurrentTeamIndex(0);
            }
        }
    };

    const goToPreviousTeam = () => {
        if (currentTeamIndex > 0) {
            setCurrentTeamIndex(currentTeamIndex - 1);
        } else {
            if (currentGroupIndex > 0) {
                setCurrentGroupIndex(currentGroupIndex - 1);
                setCurrentTeamIndex(3);
            }
        }
    };

    const handleTeamClick = (groupIndex, teamIndex) => {
        setCurrentGroupIndex(groupIndex);
        setCurrentTeamIndex(teamIndex);
        setIsOpen(true);
    };

    return (
        <div className='flex flex-col items-center'>
            {
                isOpen && <TeamNavBar teamsData={teamsData} onTeamClick={handleTeamClick} />
            }
            <div className={`mt-14 ${isOpen ? 'h-screen' : ''}`}>
                <div className={`mr-4 ml-4 ${isOpen ? 'open' : 'hidden'}`}>
                    {teamsData.length > 0 && (
                        <div>
                            <h2 className='text-white'>{teamsData[currentGroupIndex].groupName}</h2>
                            <ul>
                                {teamsData.map((group, index) => (
                                    <li key={index} style={{ display: currentGroupIndex === index ? 'block' : 'none' }}>
                                        {group.temas.map((team, idx) => (
                                            <div key={idx} style={{ display: currentTeamIndex === idx ? 'block' : 'none' }}>
                                                <TeamPage team={team} isVisible={currentGroupIndex === index && currentTeamIndex === idx} />
                                            </div>
                                        ))}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                {isOpen && (
                    <div className='buttons-container'>
                        <button className='bg-gray-300 px-4 py-2 hover:bg-gray-400 hover:scale-105 rounded-md' onClick={goToPreviousTeam} disabled={currentGroupIndex === 0 && currentTeamIndex === 0}>Previous</button>
                        <button className='bg-gray-300 px-4 py-2 hover:bg-gray-400 hover:scale-105 rounded-md ml-2' onClick={goToNextTeam} disabled={currentGroupIndex === teamsData.length - 1 && currentTeamIndex === 3}>Next</button>
                        <button className='bg-gray-300 px-4 py-2 hover:bg-gray-400 hover:scale-105 rounded-md ml-2' onClick={handleCloseAlbum}>Close</button>
                    </div>
                )}
                <img
                    src={Album}
                    alt="album"
                    className={`p-2 w-full mt-16 max-w-xl rounded-l-sm rounded-r-2xl shadow-2xl hover:scale-105 hover:cursor-pointer album-image ${isOpen ? 'hidden' : ''}`}
                    onClick={handleAlbumClick}
                />
            </div>
        </div>
    );
}

export default AlbumPage;
