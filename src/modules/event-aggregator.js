import Event from '../models/event';

const eventAggregator = (() => {
  let events = [];

  const getEvent = (eventName) => {
    let event = events.filter((event) => {
      return event.name == eventName;
    })[0];

    if (!event) {
      event = new Event(eventName);
      events.push(event);
    }

    return event;
  }

  const publish = (eventName, eventArgs) => {
    let event = getEvent(eventName);

    event.fire(eventArgs);
  }

  const subscribe = (eventName, handler) => {
    let event = getEvent(eventName);
    event.addHandler(handler);
  }

  return {
    publish,
    subscribe
  };
})();

export default eventAggregator;
