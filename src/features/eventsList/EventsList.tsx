import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import {
  fetchEvents,
  selectAllEvents,
  selectEventsStatus,
  selectEventsError,
} from "./eventsSlice";
import { Spinner, ListGroup, Alert } from "react-bootstrap";

const EventsList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const events = useSelector(selectAllEvents);
  const eventsStatus = useSelector(selectEventsStatus);
  const error = useSelector(selectEventsError);

  useEffect(() => {
    if (eventsStatus === "idle") {
      dispatch(fetchEvents());
    }
  }, [eventsStatus, dispatch]);

  let content;

  if (eventsStatus === "loading") {
    content = <Spinner animation="border" />;
  } else if (eventsStatus === "succeeded") {
    content = (
      <ListGroup>
        {events.map((event: any) => (
          <ListGroup.Item key={event.id}>
            <h5>{event.title}</h5>
            <p>{event.description}</p>
            <small>{event.date}</small>
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  } else if (eventsStatus === "failed") {
    content = <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div>
      <h2>Events</h2>
      {content}
    </div>
  );
};

export default EventsList;
