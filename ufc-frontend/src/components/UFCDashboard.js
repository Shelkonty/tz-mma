import React, { useState, useEffect, useCallback } from 'react';

const API_URL = 'http://localhost:4000/graphql';

const UFCDashboard = () => {
    const [activeTab, setActiveTab] = useState('fighters');
    const [fighters, setFighters] = useState([]);
    const [events, setEvents] = useState([]);
    const [rankings, setRankings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedWeightClass, setSelectedWeightClass] = useState(1);

    const graphqlRequest = async (query, variables = {}) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query, variables }),
            });
            const data = await response.json();
            if (data.errors) {
                throw new Error(data.errors[0].message);
            }
            return data.data;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const fetchFighters = useCallback(async () => {
        setLoading(true);
        try {
            const query = `
        query {
          fighters {
            id
            first_name
            last_name
            nationality
            wins
            losses
            weightClass {
              name
            }
          }
        }
      `;
            const data = await graphqlRequest(query);
            setFighters(data.fighters);
        } catch (err) {
            console.error('Error fetching fighters:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchEvents = useCallback(async () => {
        setLoading(true);
        try {
            const query = `
        query {
          events {
            id
            name
            date
            location
            venue
          }
        }
      `;
            const data = await graphqlRequest(query);
            setEvents(data.events);
        } catch (err) {
            console.error('Error fetching events:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchRankings = useCallback(async (weightClassId) => {
        setLoading(true);
        try {
            const query = `
        query GetRankings($weightClassId: Int!) {
          getRankings(weightClassId: $weightClassId) {
            rank
            fighter {
              id
              first_name
              last_name
              wins
              losses
            }
            updated_at
          }
        }
      `;
            const data = await graphqlRequest(query, { weightClassId });
            setRankings(data.getRankings);
        } catch (err) {
            console.error('Error fetching rankings:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (activeTab === 'fighters') {
            fetchFighters();
        } else if (activeTab === 'events') {
            fetchEvents();
        } else if (activeTab === 'rankings') {
            fetchRankings(selectedWeightClass);
        }
    }, [activeTab, selectedWeightClass, fetchFighters, fetchEvents, fetchRankings]);

    const FighterForm = () => {
        const [formData, setFormData] = useState({
            firstName: '',
            lastName: '',
            nationality: '',
            weightClassId: 1,
            team: ''
        });

        const handleSubmit = async () => {
                const mutation = `
          mutation CreateFighter($firstName: String!, $lastName: String!, $nationality: String!, $weightClassId: Int!, $team: String) {
            createFighter(
              firstName: $firstName
              lastName: $lastName
              nationality: $nationality
              weightClassId: $weightClassId
              team: $team
            ) {
              id
              first_name
              last_name
            }
          }
        `;
                await graphqlRequest(mutation, {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    nationality: formData.nationality,
                    weightClassId: formData.weightClassId,
                    team: formData.team
                });
        };

        return (
            <div style={styles.form}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>First Name</label>
                    <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Last Name</label>
                    <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Nationality</label>
                    <input
                        type="text"
                        value={formData.nationality}
                        onChange={(e) => setFormData({...formData, nationality: e.target.value})}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Weight Class ID</label>
                    <input
                        type="number"
                        value={formData.weightClassId}
                        onChange={(e) => setFormData({...formData, weightClassId: parseInt(e.target.value)})}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Team</label>
                    <input
                        type="text"
                        value={formData.team}
                        onChange={(e) => setFormData({...formData, team: e.target.value})}
                        style={styles.input}
                    />
                </div>
                <button type="button" onClick={handleSubmit} style={styles.submitButton}>
                    Create Fighter
                </button>
            </div>
        );
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>UFC Management Dashboard</h1>

            {error && (
                <div style={styles.errorAlert}>
                    {error}
                </div>
            )}

            {/* Navigation */}
            <div style={styles.tabsContainer}>
                <button
                    onClick={() => setActiveTab('fighters')}
                    style={{...styles.tab, ...(activeTab === 'fighters' ? styles.activeTab : styles.inactiveTab)}}
                >
                    Fighters
                </button>
                <button
                    onClick={() => setActiveTab('events')}
                    style={{...styles.tab, ...(activeTab === 'events' ? styles.activeTab : styles.inactiveTab)}}
                >
                    Events
                </button>
                <button
                    onClick={() => setActiveTab('rankings')}
                    style={{...styles.tab, ...(activeTab === 'rankings' ? styles.activeTab : styles.inactiveTab)}}
                >
                    Rankings
                </button>
                <button
                    onClick={() => setActiveTab('create')}
                    style={{...styles.tab, ...(activeTab === 'create' ? styles.activeTab : styles.inactiveTab)}}
                >
                    Create Fighter
                </button>
            </div>

            {/* Fighters Tab */}
            {activeTab === 'fighters' && (
                <div style={styles.card}>
                    <h2 style={styles.cardTitle}>Fighters List</h2>
                    <div style={styles.cardContent}>
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            <table style={styles.table}>
                                <thead>
                                <tr>
                                    <th style={styles.tableHeader}>Name</th>
                                    <th style={styles.tableHeader}>Nationality</th>
                                    <th style={styles.tableHeader}>Weight Class</th>
                                    <th style={styles.tableHeader}>Record</th>
                                </tr>
                                </thead>
                                <tbody>
                                {fighters.map(fighter => (
                                    <tr key={fighter.id}>
                                        <td style={styles.tableCell}>{`${fighter.first_name} ${fighter.last_name}`}</td>
                                        <td style={styles.tableCell}>{fighter.nationality}</td>
                                        <td style={styles.tableCell}>{fighter.weightClass.name}</td>
                                        <td style={styles.tableCell}>{`${fighter.wins}-${fighter.losses}`}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            )}

            {/* Events Tab */}
            {activeTab === 'events' && (
                <div style={styles.card}>
                    <h2 style={styles.cardTitle}>Upcoming Events</h2>
                    <div style={styles.cardContent}>
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            <div style={styles.grid}>
                                {events.map(event => (
                                    <div key={event.id} style={styles.eventCard}>
                                        <h3 style={styles.eventTitle}>{event.name}</h3>
                                        <p style={styles.eventDetail}><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                                        <p style={styles.eventDetail}><strong>Location:</strong> {event.location}</p>
                                        <p style={styles.eventDetail}><strong>Venue:</strong> {event.venue}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Rankings Tab */}
            {activeTab === 'rankings' && (
                <div style={styles.card}>
                    <h2 style={styles.cardTitle}>Rankings</h2>
                    <div style={styles.cardContent}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Weight Class ID</label>
                            <select
                                value={selectedWeightClass}
                                onChange={(e) => setSelectedWeightClass(parseInt(e.target.value))}
                                style={styles.select}
                            >
                                <option value={13}>Lightweight</option>
                                <option value={14}>Welterweight</option>
                                <option value={15}>Middleweight</option>
                                <option value={16}>Light Heavyweight</option>
                                <option value={17}>Heavyweight</option>
                            </select>
                        </div>

                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            <table style={styles.table}>
                                <thead>
                                <tr>
                                    <th style={styles.tableHeader}>Rank</th>
                                    <th style={styles.tableHeader}>Fighter</th>
                                    <th style={styles.tableHeader}>Record</th>
                                    <th style={styles.tableHeader}>Last Updated</th>
                                </tr>
                                </thead>
                                <tbody>
                                {rankings.map(ranking => (
                                    <tr key={ranking.rank}>
                                        <td style={styles.tableCell}>{ranking.rank}</td>
                                        <td style={styles.tableCell}>{`${ranking.fighter.first_name} ${ranking.fighter.last_name}`}</td>
                                        <td style={styles.tableCell}>{`${ranking.fighter.wins}-${ranking.fighter.losses}`}</td>
                                        <td style={styles.tableCell}>
                                            {new Date(ranking.updated_at).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            )}

        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif',
    },
    title: {
        fontSize: '28px',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: '#333',
    },
    errorAlert: {
        backgroundColor: '#fee2e2',
        color: '#991b1b',
        padding: '12px',
        borderRadius: '6px',
        marginBottom: '20px',
    },
    tabsContainer: {
        display: 'flex',
        gap: '4px',
        marginBottom: '20px',
    },
    tab: {
        padding: '10px 16px',
        borderTopLeftRadius: '6px',
        borderTopRightRadius: '6px',
        cursor: 'pointer',
        fontSize: '14px',
    },
    activeTab: {
        backgroundColor: 'white',
        borderTop: '1px solid #ccc',
        borderLeft: '1px solid #ccc',
        borderRight: '1px solid #ccc',
        borderBottom: 'none',
    },
    inactiveTab: {
        backgroundColor: '#f3f4f6',
        border: '1px solid #ccc',
        borderBottom: 'none',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        overflow: 'hidden',
    },
    cardTitle: {
        fontSize: '18px',
        fontWeight: '600',
        padding: '16px',
        borderBottom: '1px solid #e5e7eb',
        margin: 0,
    },
    cardContent: {
        padding: '16px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    },
    label: {
        fontSize: '14px',
        fontWeight: '500',
        color: '#374151',
    },
    input: {
        padding: '8px',
        border: '1px solid #d1d5db',
        borderRadius: '4px',
        fontSize: '14px',
    },
    select: {
        padding: '8px',
        border: '1px solid #d1d5db',
        borderRadius: '4px',
        fontSize: '14px',
    },
    submitButton: {
        backgroundColor: '#3b82f6',
        color: 'white',
        padding: '10px 16px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '16px',
    },
    tableHeader: {
        padding: '8px',
        border: '1px solid #e5e7eb',
        backgroundColor: '#f9fafb',
        textAlign: 'left',
    },
    tableCell: {
        padding: '8px',
        border: '1px solid #e5e7eb',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '16px',
    },
    eventCard: {
        backgroundColor: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        padding: '16px',
    },
    eventTitle: {
        fontSize: '18px',
        fontWeight: '600',
        marginBottom: '8px',
    },
    eventDetail: {
        margin: '4px 0',
        fontSize: '14px',
    },
};

export default UFCDashboard;