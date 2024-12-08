import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const NotificationDetails = () => {
  const { id } = useParams();
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await fetch(
        `http://localhost:8000/supply-management/notifications/${id}`
      );
      const json = await response.json();

      if (response.ok) {
        setNotification(json);
        console.log(notification);
      }
    };

    fetchNotifications();
  }, []);

  const handleClick = () => {};

  return (
    <div className="notification-details">
      {notification && (
        <article className="notification-item">
          <h2>{notification.name}</h2>
          <p>{notification.category}</p>
          {notification.quantity && ( // Check if quantity exists
            <p>
              <strong>Quantity: </strong>
              {notification.quantity}
            </p>
          )}
          <button onClick={handleClick}>Place Order</button>
        </article>
      )}
    </div>
  );
};

export default NotificationDetails;
