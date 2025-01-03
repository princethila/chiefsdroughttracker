"use client"

import React, { useState, useEffect } from 'react';
import Head from 'next/head';

interface TimeElapsed {
  years: number;
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

export default function Home() {
  const [timeElapsed, setTimeElapsed] = useState<TimeElapsed | null>(null);
  const [currentContent, setCurrentContent] = useState<Event | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const lastTrophyDate = '2015-05-09';

  const calculateTimeElapsed = () => {
    const inputDate = new Date(lastTrophyDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - inputDate.getTime());

    const totalSeconds = Math.floor(diffTime / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);
    const totalYears = Math.floor(totalDays / 365);

    setTimeElapsed({ 
      years: totalYears,
      days: totalDays,
      hours: totalHours,
      minutes: totalMinutes,
      seconds: totalSeconds
    });
  };

  useEffect(() => {
    calculateTimeElapsed();
    const interval = setInterval(calculateTimeElapsed, 1000);
    return () => clearInterval(interval);
  }, []);

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
        <meta
          name="keywords"
          content="Kaizer Chiefs, trophy drought, South African football, PSL stats, Kaizer Chiefs history"
        />
        <meta property="og:title" content="Kaizer Chiefs Trophy Drought Tracker" />
        <meta
          property="og:description"
          content="See how many days it has been since Kaizer Chiefs last won a trophy."
        />
        <meta property="og:image" content="/images/chiefs-drought.png" />
        <meta property="og:url" content="https://chiefsdroughttracker.co.za" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Kaizer Chiefs Trophy Drought Tracker" />
        <meta name="twitter:description" content="Track the drought history of Kaizer Chiefs." />
        <meta name="twitter:image" content="URL-to-your-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/images/chiefs-drought.png" />
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
            <div className="flex justify-between font-mono sm:text-base text-sm pb-4 border-black border-b-2">
              <span>LAST TROPHY DATE:</span>
              <span className="">{formatDate(lastTrophyDate)}</span>
            </div>
            <div className="flex justify-between font-mono sm:text-xl text-base">
              <span>YEARS ELAPSED:</span>
              <span className="font-bold">{timeElapsed?.years}</span>
            </div>
            
            <div className="flex justify-between font-mono sm:text-xl text-base">
              <span>DAYS ELAPSED:</span>
              <span className="font-bold">{timeElapsed?.days}</span>
            </div>

            <div className="flex justify-between font-mono sm:text-xl text-base">
              <span>HOURS ELAPSED:</span>
              <span className="font-bold">{timeElapsed?.hours}</span>
            </div>

            <div className="flex justify-between font-mono sm:text-xl text-base">
              <span>MINUTES ELAPSED:</span>
              <span className="font-bold">{timeElapsed?.minutes}</span>
            </div>

            <div className="flex justify-between font-mono sm:text-xl text-base">
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
        </div>
      </div>
    </div>
    </main>
    
  );
}
