import Event from '../models/event';

const eventAggregator = (() => {
  let events = [];

  const getEvent = (eventName) => {
    let event = events.filter((event) => {
      return event.name == eventName;
    })[0];

    if (!event) {
      console.log("EVENT NOT EXISIST", eventName, event);
      event = new Event(eventName);
      events.push(event);
    }
    console.log("GetEvent....", eventName, event);

    return event;
  }

  const publish = (eventName, eventArgs) => {
    console.log('PUBLISH -', eventName, eventArgs);
    let event = getEvent(eventName);

    // events.push(event);
    event.fire(eventArgs);
  }

  const subscribe = (eventName, handler) => {
    console.log('SUBSCRIBE ', eventName, handler);
    let event = getEvent(eventName);
    console.log(event);
    event.addHandler(handler);
  }

  return {
    publish,
    subscribe
  };
})();

export default eventAggregator;
