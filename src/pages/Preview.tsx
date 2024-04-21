import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Profile } from "../models/Model";
import profileService from "../services/ProfileService";
import * as echarts from "echarts";
import { ChartOption } from '../models/ChartOption';

export const Preview = () => {
  const [profiles, setProfiles] = useState<Array<Profile>>([]);
  const navigate = useNavigate();
  
  const chartOptions: ChartOption = {
    title: {
      text: ''
    },
    tooltip: {},
    legend: {
      orient: 'vertical',
      top: '10',
      right: 0,
      data: ['Sleep Duration in (Hours)']
    },
    xAxis: {
      // type: "category",
      data: []
    },
    yAxis: {},
    series: []
  };

  const fetchData = useCallback(async () => {
    profileService.fetchData().then((results: Array<Profile>) => {
      if (results.length) {
        setProfiles(results);
      }
    })
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  const displayChart = (index: number) => {
    const profile = profiles[index] as Profile;
    if(!profile) return;
    
    let dates = [] as Array<string>;
    let sleepTimeDurations = [] as Array<number>;
    profile.durations.forEach(duration => {
      dates.push(duration.date);
      sleepTimeDurations.push(duration.sleepTimeDuration)
    });
    
    chartOptions.title.text = `Sleep Monitor: ${profile.name} - ${profile.gender}`;
    chartOptions.xAxis.data = dates;
    chartOptions.series = [];
    chartOptions.series.push({
      name: 'Sleep Duration in (Hours)',
      type: 'bar',
      data: sleepTimeDurations
    });
    
    const myChart = echarts.init(document.getElementById('main'));
    myChart.setOption(chartOptions); 
  }
  
  return (
    <div className="container mx-auto">
      <div className="columns-1 py-5">
        <button className="border px-3 py-2 text-sm font-semibold leading-6 text-gray-900"
          onClick={() => navigate('/')}>Return to Home</button>


        <div className="space-y-6">
          <div className="mt-10 border-b border-gray-900/10 pb-6">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Preview Details</h2>
            {/* <p className="mt-1 text-sm leading-6 text-gray-600">Please fill the form below</p> */}
          </div>
          
          <div className='border-b border-gray-900/10 pb-12'>
            <table className='border-collapse border border-slate-400 w-full '>
              <thead>
                <tr>
                  <th className="border border-slate-300">S/N</th>
                  <th className="border border-slate-300">Name</th>
                  <th className="border border-slate-300">Gender</th>
                  <th className="border border-slate-300">No of Rows</th>
                </tr>
              </thead>
              <tbody>
                {
                  profiles.map((profile: Profile, index: number) => (
                    <tr className='cursor-pointer hover:bg-slate-400' 
                      onClick={() => displayChart(index)} key={index.toString()}>
                      <td className="text-center border border-slate-300">{index + 1}</td>
                      <td className="text-center border border-slate-300">{profile.name}</td>
                      <td className="text-center border border-slate-300">{profile.gender}</td>
                      <td className="text-center border border-slate-300">{profile.durations.length}</td>
                    </tr>
                  ))
                }
              </tbody>

            </table>
          </div>

          <div id="main" style={{ width: '600px', height: '400px' }}></div>
        </div>
      </div>
    </div>
  )
}