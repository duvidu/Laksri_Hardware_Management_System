import { Link } from "react-router-dom"

import formatDistanceToNow from 'date-fns/formatDistanceToNow'


const Notifications = ({ notification }) => {
  return (
    <Link to={`/supply-management/notifications/${notification._id}`}>
      <div>
        <h4>{notification.name}</h4>
        <p>
          <strong>Category:</strong> {notification.category}
        </p>
        <p>{notification.quantity} items remaining</p>
        <p>
          {formatDistanceToNow(new Date(notification.createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>
    </Link>
  );
};

export default Notifications;
