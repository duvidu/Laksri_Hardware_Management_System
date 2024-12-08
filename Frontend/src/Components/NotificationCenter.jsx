import { useState } from "react";
import {
  Alert,
  AlertColor,
  Badge,
  Box,
  IconButton,
  Popper,
  Fade,
  Button,
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
  Stack,
} from "@mui/material";

import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import CheckIcon from "@mui/icons-material/Check";
import NotificationsIcon from '@mui/icons-material/Notifications';

import { useNotificationCenter } from "react-toastify/addons/use-notification-center";
import { toast, TypeOptions } from "react-toastify";

const types = ["success", "info", "warning", "error"];

export default function NotificationSystem() {
  const { notifications, clear, markAllAsRead, markAsRead, unreadCount } =
    useNotificationCenter();
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const addNotification = () => {
    
    toast("Lorem ipsum dolor sit amet, consectetur adipiscing elit", {
      type: types[2]
    });
  };

  const toggleNotificationCenter = (event) => {
    setAnchorEl(event.currentTarget);
    setIsOpen(!isOpen);
  };

  const toggleFilter = (e) => {
    setShowUnreadOnly(!showUnreadOnly);
  };

  return (
    <Box sx={{ margin: "8px" }}>
      <IconButton size="large" onClick={toggleNotificationCenter}>
        <Badge badgeContent={unreadCount} color="primary">
          <NotificationsIcon color="action" />
        </Badge>
      </IconButton>
      <button onClick={addNotification}>Add notification</button>

      <Popper open={isOpen} anchorEl={anchorEl} transition placement="bottom-end">
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box>
              <Box
                sx={{
                  background: "#666",
                  padding: "8px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h5" color="#fff">
                  Notification center
                </Typography>
                <FormGroup sx={{ color: "#fff" }}>
                  <FormControlLabel
                    control={
                      <Switch
                        color="secondary"
                        onChange={toggleFilter}
                        checked={showUnreadOnly}
                      />
                    }
                    label="Show unread only"
                  />
                </FormGroup>
              </Box>
              <Stack
                sx={{
                  height: "400px",
                  width: "min(60ch, 100ch)",
                  padding: "12px",
                  background: "#f1f1f1",
                  borderRadius: "8px",
                  overflowY: "auto",
                }}
                spacing={2}
              >
                {(!notifications.length ||
                  (unreadCount === 0 && showUnreadOnly)) && (
                  <h4>
                    Your queue is empty! you are all set{" "}
                    <span role="img" aria-label="dunno what to put">
                      🎉
                    </span>
                  </h4>
                )}
                {(showUnreadOnly
                  ? notifications.filter((v) => !v.read)
                  : notifications
                ).map((notification) => {
                  return (
                    <Alert
                      severity={(notification.type) || "info"}
                      action={
                        notification.read ? (
                          <CheckIcon />
                        ) : (
                          <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <MarkChatReadIcon />
                          </IconButton>
                        )
                      }
                    >
                      {notification.content}
                    </Alert>
                  );
                })}
              </Stack>
              <Box
                sx={{
                  background: "#666",
                  padding: "8px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Button variant="contained" onClick={clear}>
                  Clear All
                </Button>

                <Button variant="contained" onClick={markAllAsRead}>
                  Mark all as read
                </Button>
              </Box>
            </Box>
          </Fade>
        )}
      </Popper>
    </Box>
  );
}
