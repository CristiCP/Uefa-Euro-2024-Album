import React from 'react';

function TeamNavBar({ teamsData, onTeamClick }) {
    return (
        <div className="mt-24 bg-blue-700 text-white flex flex-wrap justify-center">
            <div>
                {teamsData.map((group, groupIndex) => (
                    group.teams.map((team, teamIndex) => (
                        <button 
                            key={team.teamId} 
                            className="team-nav-item rounded ml-3"
                            onClick={() => onTeamClick(groupIndex, teamIndex)}
                        >
                            <div>
                                <img src={team.teamImage} alt={team.teamName} className="w-8 h-8 hover:scale-105"/>
                            </div>
                        </button>
                    ))
                ))}
            </div>
        </div>
    );
}

export default TeamNavBar;
