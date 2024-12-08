import { useEffect, useState } from "react"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import styles from "./returnItemsNotifications.module.css"
import SearchBar from "../searchBar/searchBar"
import LinearProgress from '@mui/material/LinearProgress';



const ReturnItemsNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredNotifications, setFilteredNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetch('http://localhost:8000/returnItem');

                if (response.ok) {
                    const json = await response.json();
                    setNotifications(json);
                    setFilteredNotifications(json);
                } else {
                    console.error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false); // Set loading state to false once data fetching is complete
            }
        };

        fetchNotifications()
    }, [])

    const handleSearch = (searchTerm) => {
        setSearchQuery(searchTerm);
    };

    useEffect(() => {
        // Filter notifications based on search query
        const filtered = notifications.filter(notification =>
            notification.suppliers.some(supplier =>
                supplier.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
        setFilteredNotifications(filtered);
    }, [searchQuery, notifications]);


    const handleSendingEmail = async () => {
        try {
            const response = await fetch('http://localhost:8000/supply-management/sendMail/return-items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ notifications: filteredNotifications })
            });
            if (response.ok) {
                alert('Emails sent successfully');
            } else {
                console.error('Failed to send emails');
            }
        } catch (error) {
            console.error('Error sending emails:', error);
        }
    };

    if(loading) { return(<LinearProgress/>)}

    return (
        <div className={styles.lowStockNotificationsContainer}>
             {loading && <LinearProgress />}
            {!loading && <div style={{ display: "flex", justifyContent:"space-between", marginBottom: 10, height:45 }}>
                <div className={styles.notificationButtons}>
                    <button onClick={handleSendingEmail}>Send Email</button>
                </div>
                
                <SearchBar onSearch={handleSearch}  placeholder="Search by supplier name" />
                
            </div>}
            {filteredNotifications.map((notification) => (
                <div key={notification._id} className={styles.notificationItem}>
                    <div className={styles.notificationContent}>
                        <h4>{notification.name.name}</h4>
                        <p><strong>Serial Number:</strong> {notification.serialNumber}</p>
                        <p>Damage: {notification.returnType}</p>
                        <p>{formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}</p>
                        <p><strong>Suppliers:</strong> {notification.suppliers?.map(supplier => supplier.name).join(', ')}</p>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default ReturnItemsNotifications