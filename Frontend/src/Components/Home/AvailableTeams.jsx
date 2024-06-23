import React, { useState, useEffect } from 'react';
import { fetchTeamsData } from '../Home/homeService';

function AvailableTeams() {
  const [teamsData, setTeamsData] = useState([]);

  useEffect(() => {
    async function getTeams() {
      try {
        const data = await fetchTeamsData();
        setTeamsData(data);
      } catch (err) {
        console.error("Fetching the teams failed!", err);
      }
    }
    getTeams();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap -mx-2">
        {teamsData.map((group, index) => (
          <div key={index} className="w-full sm:w-1/2 p-2">
            <div className="bg-gray-100 p-4 rounded-xl shadow-md">
              <h2 className="text-3xl font-bold mb-5 text-center">{group.group}</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead className="bg-transparent">
                    <tr>
                      <th className="px-6 py-3 text-left font-bold text-black-700 uppercase tracking-wider"></th>
                      <th className="px-6 py-3 text-left font-bold text-black-700 uppercase tracking-wider">P</th>
                      <th className="px-6 py-3 text-left font-bold text-black-700 uppercase tracking-wider">W</th>
                      <th className="px-6 py-3 text-left font-bold text-black-700 uppercase tracking-wider">D</th>
                      <th className="px-6 py-3 text-left font-bold text-black-700 uppercase tracking-wider">L</th>
                      <th className="px-6 py-3 text-left font-bold text-black-700 uppercase tracking-wider">GD</th>
                      <th className="px-6 py-3 text-left font-bold text-black-700 uppercase tracking-wider">Pts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.teams.map((team, idx) => (
                      <tr key={team.teamId} className="hover:bg-blue-200 hover:shadow-md rounded-xl transition cursor-pointer">
                        <td className="px-6 py-4 whitespace-nowrap flex items-center">
                          <img src={team.teamImage} alt={team.teamName} className="w-8 h-8 mr-2 rounded-full"/>
                          <span className="text-2xl font-bold">{team.teamName}</span>
                        </td>
                        <td className="px-6 py-4">{team.played}</td>
                        <td className="px-6 py-4">{team.won}</td>
                        <td className="px-6 py-4">{team.drawn}</td>
                        <td className="px-6 py-4">{team.lost}</td>
                        <td className="px-6 py-4">{team.goalDifference}</td>
                        <td className="px-6 py-4">{team.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AvailableTeams;
