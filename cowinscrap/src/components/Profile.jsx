import React, { useEffect, useContext, useState } from 'react'
import { AuthContext } from '../Contexts/AuthProvider';
import "../css/Profile.css"
import "../css/Header.css"
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Profile() {
    const { currentUser, signout } = useContext(AuthContext);
    const [vaccinationData, setVaccinationData] = useState(null);
    const [loader, setLoader] = useState(false);

    const fetchVaccinationData = () => {
        setLoader(true);
        fetch(`/vaccination/data/${currentUser.email}`, {
            mode: "no-cors",
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data?.data);
                setVaccinationData(data?.data);
                setLoader(false);
            })
            .catch((err) => {
                console.log("Something went wrong in fetching vaccination data..");
                setLoader(false);
            })
    }


    const scheduleVaccinationData = () => {
        fetch(`/schedule/vaccination/${currentUser.email}/${currentUser.pincode}`, {
            method: "POST",
            mode: "no-cors",
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setVaccinationData(data?.data);
            })
            .catch((err) => {
                console.log("Something went wrong in cron scheduling...", err);
            })
    }

    useEffect(() => {
        // Schedule CRON job
        scheduleVaccinationData();
    }, [])

    useEffect(() => {
        const postVaccinationData = () => {
            setLoader(true);
            fetch(`/update/${currentUser.email}/${currentUser.pincode}`, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data?.data)
                    setVaccinationData(data?.data);
                    setLoader(false);
                })
                .catch((err) => {
                    console.log("Something went wrong in post vaccination...", err);
                    setLoader(false);
                })
        }

        // Fetch for first time in case the user is new, so DB would be empty
        postVaccinationData();
    }, [])

    useEffect(() => {
        console.log(vaccinationData);
    })

    const handleSignOut = () => {
        signout();
    }

    return (
        <div>
            <div className="header-section">
                <div className="h-title-section">
                    <div className="h-title-highlighted-section">
                        <div className="h-title-highlighted-name">Cowin</div>
                        <div className="h-title-highlighter"></div>
                    </div>
                    <div className="h-title-unhighlighted-section">Jankariyan</div>
                </div>
                <div style={{ width: "6rem", marginRight: "3rem", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                    <i onClick={fetchVaccinationData} style={{ fontSize: "x-large", width: "50%", color: "#2e86de" }} className="fas fa-sync"></i>
                    <i onClick={handleSignOut} style={{ fontSize: "x-large", width: "50%", color: "#2e86de" }} className="fas fa-sign-out-alt"></i>
                </div>
            </div>
            {loader ? <div className="loader"><CircularProgress /></div> :
                !vaccinationData ? null :
                    <div className="display-content">
                        <div className="main-vaccinations-display-cont">
                            <div style={{ display: "flex", height: "15%" }}>
                                <div className="dummy"></div>
                                <div className="slots-cont dates-slots-cont">
                                    {
                                        vaccinationData.vaccinationCentresData.dates.map((data, idx) => {
                                            return (
                                                <div key={idx} className="slot-section dates-slot-section"><div style={{ backgroundColor: "#dfe4ea" }}>{data.toUpperCase()}</div></div>
                                            )
                                        })
                                    }
                                </div>
                            </div>

                            <div className="vaccine-centres-info-cont">

                                {
                                    !vaccinationData.vaccinationCentresData.scrapedData ? <h1 style={{
                                        fontFamily: "Kanit,sans-serif", textAlign: "center"
                                    }}>No vaccination centres available..</h1> :
                                        vaccinationData.vaccinationCentresData.scrapedData.map((centreData, idx) => {
                                            return (
                                                <div key={idx} className="vaccine-row-cont">
                                                    <div className="vaccine-centre-info">
                                                        <div className="header-name-text">{centreData.nameHeader}</div>
                                                        <div className="locality-text">{centreData.localityAddress}</div>

                                                    </div>
                                                    <div className="vaccine-slots-info">
                                                        {centreData.dosage.map((dosageData, idx) => {
                                                            return (
                                                                dosageData
                                                                    ? (
                                                                        <div key={idx} className="slot-section header-name-text">
                                                                            <div className={dosageData.d1?"dosebox active":"dosebox inactive"}>{dosageData ? "D1" : "NA"}</div>
                                                                            <div className={dosageData.d2?"dosebox active":"dosebox inactive"}>{dosageData ? "D2" : "NA"}</div>
                                                                        </div>
                                                                    )
                                                                    : (
                                                                        <div className="slot-section header-name-text">NA</div>
                                                                    )
                                                            )
                                                        })
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        })
                                }

                            </div>
                        </div>
                    </div>
            }
        </div >

    )
}
