"use client"

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"

interface TimeElapsed {
  remainingDays: number;
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}


interface Event {
  title: string;
  date: string;
  description: string;
  type: string;
}


interface TeamData {
  name: string;
  lastTrophyDate: string;
  timeElapsed: TimeElapsed | null;
  color: string;
}

export default function Home() {
  const teams: TeamData[] = [
    {
      name: "Chiefs",
      lastTrophyDate: "2014-09-20",
      timeElapsed: null,
      color: "bg-yellow-500"
    },
    {
      name: "Pirates",
      lastTrophyDate: "2024-10-05", // Example date
      timeElapsed: null,
      color: "bg-black"
    },
    {
      name: "Sundowns",
      lastTrophyDate: "2023-11-12", // Example date
      timeElapsed: null,
      color: "bg-yellow-400"
    }
  ];

  const [teamsData, setTeamsData] = useState<TeamData[]>(teams);
  const [timeElapsed, setTimeElapsed] = useState<TimeElapsed | null>(null);
  const [currentContent, setCurrentContent] = useState<Event | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const lastTrophyDate = '2014-09-20';

  const calculateTimeElapsed = (dateString: string) => {
    const inputDate = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - inputDate.getTime());
  
    const totalSeconds = Math.floor(diffTime / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);
  
    // Calculate years, months, and remaining days
    const years = Math.floor(totalDays / 365);
    const remainingDaysAfterYears = totalDays % 365;
    const months = Math.floor(remainingDaysAfterYears / 30.44); // Average days in a month
    const remainingDays = Math.floor(remainingDaysAfterYears % 30.44);
  
    return {
      remainingDays,
      years,
      months,
      days: totalDays,
      hours: totalHours,
      minutes: totalMinutes,
      seconds: totalSeconds
    };
  };
  
  // Add a new useEffect to calculate times for all teams:
  useEffect(() => {
    const updateAllTimes = () => {
      // Update individual Chiefs counter
      const chiefsTime = calculateTimeElapsed(lastTrophyDate);
      setTimeElapsed(chiefsTime);
  
      // Update all teams
      setTeamsData(prevTeams => 
        prevTeams.map(team => ({
          ...team,
          timeElapsed: calculateTimeElapsed(team.lastTrophyDate)
        }))
      );
    };
  
    updateAllTimes();
    const interval = setInterval(updateAllTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimeElapsed = (timeElapsed: TimeElapsed | null): string => {
    if (!timeElapsed) return "";
    
    const parts = [];
    
    if (timeElapsed.years > 0) {
      parts.push(`${timeElapsed.years} ${timeElapsed.years === 1 ? 'y' : 'ys'}`);
    }
    if (timeElapsed.months > 0) {
      parts.push(`${timeElapsed.months} ${timeElapsed.months === 1 ? 'm' : 'ms'}`);
    }
    if (timeElapsed.remainingDays > 0) {
      parts.push(`${timeElapsed.remainingDays} ${timeElapsed.remainingDays === 1 ? 'd' : 'ds'}`);
    }
    
    return parts.join(' ');
  };

  useEffect(() => {
    // Call the function with the required argument
    setTimeElapsed(calculateTimeElapsed(lastTrophyDate));
  
    // Use an anonymous function to pass the argument in setInterval
    const interval = setInterval(() => {
      setTimeElapsed(calculateTimeElapsed(lastTrophyDate));
    }, 1000);
  
    return () => clearInterval(interval);
  }, [lastTrophyDate]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const worldEvents = [
    {
      title: "Leicester City won the Premier League",
      date: "2016-05-02",
      description: "5000-1 outsiders Leicester City completed the most unlikely triumph in Premier League history. They then got relagated, and were promoted again.",
      type: "event"
    },
    {
      title: "COVID-19 pandemic began",
      date: "2020-03-11",
      description: "WHO declared COVID-19 a global pandemic, changing the world as we knew it.",
      type: "event"
    },
    {
      title: "Messi won the World Cup",
      date: "2022-12-18",
      description: "Lionel Messi finally claimed the one trophy that had eluded him, leading Argentina to World Cup glory.",
      type: "event"
    },
    {
      title: "Ronaldo left European football",
      date: "2023-01-01",
      description: "Cristiano Ronaldo moved to Al Nassr and made history by becoming the highest-paid footballer ever.",
      type: "event"
    },
    {
      title: "TTM and Magesi won trophies",
      date: "2021-05-08",
      description: "TTM and Magesi came from nowhere and won trophies before Kaizer Chiefs.",
      type: "event"
    },
    {
      title: "Zidane became coach, retired, came back, and retired again.",
      date: "2016-01-04",
      description: "Zinedine Zidane took charge of Real Madrid, won 3 UCLs in a row, took a sabatical, came back and won La Liga, then dissappeared again.",
      type: "event"
    },
    {
      title: "Erling Haaland debuted and scored +250 goals.",
      date: "2016-05-12",
      description: "Haaland debuted for Molde in 2016, made headlines at Dortmund, and shattered Premier League records at Manchester City.",
      type: "event"
    },
    {
      title: "Manchester City became a serious club.",
      date: "2016-02-01",
      description: "After demonstrating ambition, Manchester City hired Pep Guardiola and won the UCL before Arsenal.",
      type: "event"
    },
    {
      title: "Liverpool ended their 30-Year title Drought",
      date: "2020-07-26",
      description: "Liverpool won the Premier League in 2020, marking their first league title since 1990 and ending a painful 30-year wait.",
      type: "event"
    },
    {
      title: "Mamelodi Sundowns won 15 trophies",
      date: "2016-10-23",
      description: "Mamelodi Sundowns have dominated the league and won everything almost every season.",
      type: "event"
    },
    {
      title: "Stuart Baxter became unpopular with the fans",
      date: "2022-04-21",
      description: "After leading Amakhosi to titles between 2012 and 2015, Baxter returned, was called a plumber by the fans and got fired.",
      type: "event"
    }
  ];

  const allContent: Event[] = [...worldEvents];

  const getRandomContent = (currentItem: Event | null) => {
    let newContent;
    do {
      newContent = allContent[Math.floor(Math.random() * allContent.length)];
    } while (newContent === currentItem && allContent.length > 1);
    return newContent;
  };
  
  useEffect(() => {
    // Set initial content
    const initialContent = getRandomContent(null);
    setCurrentContent(initialContent);
    setIsVisible(true);

    const rotateContent = () => {
      setIsVisible(false);
      
      // Wait for fade out to complete before changing content
      setTimeout(() => {
        const newContent = getRandomContent(currentContent);
        setCurrentContent(newContent);
        setIsVisible(true);
      }, 500);
    };

    const interval = setInterval(rotateContent, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <main>
      <Head>
        <title>Ever wonder how long it has been since Kaizer Chiefs last won a trophy?</title>
        <meta
          name="description"
          content="Track how long it has been since Kaizer Chiefs won their last trophy. Stay updated on the drought status of South Africa's iconic football club."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Kaizer Chiefs Trophy Drought Tracker",
              "url": "https://chiefsdroughttracker.co.za",
              "description": "Track how long it has been since Kaizer Chiefs won their last trophy. Stay updated on the drought status of South Africa's iconic football club.",
              "image": "https://chiefsdroughttracker.co.za/images/chiefs-drought.png",
            }),
          }}
        />
        <meta
          name="keywords"
          content="Kaizer Chiefs, trophy drought, Mamelodi Sundowns trophies, Orlando Pirates trophies, South African football, PSL stats, Kaizer Chiefs history"
        />
        <meta property="og:title" content="Kaizer Chiefs Trophy Drought Tracker" />
        <meta
          property="og:description"
          content="See how many days it has been since Kaizer Chiefs last won a trophy."
        />
        <meta property="og:image" content="https://www.chiefsdroughttracker.co.za/images/chiefs-drought.png" />
        <meta property="og:url" content="https://chiefsdroughttracker.co.za" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Kaizer Chiefs Trophy Drought Tracker" />
        <meta name="twitter:description" content="Track the drought history of Kaizer Chiefs." />
        <meta name="twitter:image" content="https://www.chiefsdroughttracker.co.za/images/chiefs-drought.png" />
        <meta name="twitter:card" content="https://www.chiefsdroughttracker.co.za/images/chiefs-drought.png" />
        <link rel="icon" href="https://www.chiefsdroughttracker.co.za/images/chiefs-drought.png" />
      </Head>
      
      <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-2xl bg-white">
        <div>
          <h1 className="sm:text-4xl text-2xl font-black  tracking-tight">
          KAIZER CHIEFS TROPHY DROUGHT
          </h1>
          <p className="text-xs mb-8 font-blacktracking-tight">Ever wondered how long it has been since Kaizer Chiefs last won a trophy?</p>
        </div>
        
        <div className="space-y-8">
          <div className="space-y-4 border-t-2 border-black pt-4">
            <div className="flex justify-between font-mono sm:text-sm text-xs pb-4 border-black border-b-2">
              <span>LAST TROPHY DATE:</span>
              <span className="">{formatDate(lastTrophyDate)}</span>
            </div>
            <div className="flex justify-between font-mono sm:text-base text-sm">
              <span>YEARS ELAPSED:</span>
              <span className="font-bold">{timeElapsed?.years}</span>
            </div>
            
            <div className="flex justify-between font-mono sm:text-base text-sm">
              <span>DAYS ELAPSED:</span>
              <span className="font-bold">{timeElapsed?.days}</span>
            </div>

            <div className="flex justify-between font-mono sm:text-base text-sm">
              <span>HOURS ELAPSED:</span>
              <span className="font-bold">{timeElapsed?.hours}</span>
            </div>

            <div className="flex justify-between font-mono sm:text-base text-sm">
              <span>MINUTES ELAPSED:</span>
              <span className="font-bold">{timeElapsed?.minutes}</span>
            </div>

            <div className="flex justify-between font-mono sm:text-base text-sm">
              <span>SECONDS ELAPSED:</span>
              <span className="font-bold">{timeElapsed?.seconds}</span>
            </div>
          </div>

          <div className="border-t-2 border-black pt-2 ">
            <div 
              className={`p-6 border-2 border-black bg-yellow-500 transition-opacity duration-1000 font-mono ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {currentContent && currentContent.type === 'event' ? (
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-xs sm:text-sm">{currentContent.title}</span>
                    <span className="text-xs sm:text-sm">{formatDate(currentContent.date)}</span>
                  </div>
                  <p className="text-xs sm:text-sm">{currentContent.description}</p>
                </div>
              ) : (
                <div className="text-xs sm:text-sm">{currentContent?.title}</div>
              )}
            </div>
          </div>
          <div className="p-4 border-2 border-black mt-2">
  {/* <h3 className="font-bold mb-4">The big 3</h3> */}
  <Collapsible>
  <CollapsibleTrigger className="flex w-full items-center mb-2 justify-between rounded-none font-bold hover:bg-gray-50">
    <span className='font-bold text-xs sm:text-sm'>Compare the big 3</span>
    <ChevronDown className="h-4 w-4 transition-transform duration-200" />
  </CollapsibleTrigger>
  <CollapsibleContent>
    <div className="space-y-2">
      {teamsData.map((team) => (
        <div key={team.name} className="relative">
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-xs font-semibold py-1 uppercase rounded-full text-black text-center">
              {team.name}
            </span>
            <div className="flex-grow">
              <div className="overflow-hidden h-2 flex rounded bg-gray-200">
                <div
                  style={{ width: `${(team.timeElapsed?.days || 0) / 50}%` }}
                  className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${team.color}`}
                ></div>
              </div>
            </div>
            <span className="text-xs font-semibold text-black min-w-[90px] text-right">
              {formatTimeElapsed(team.timeElapsed)}
            </span>
          </div>
        </div>
      ))}
    </div>
    </CollapsibleContent>
</Collapsible>
  </div>
        </div>
      </div>
    </div>
    </main>
    
  );
}
