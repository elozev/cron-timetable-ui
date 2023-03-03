import { CRONTIMETABLE_SERVICE } from "./constants"

export const getCrons = async () => {
  try {
    const data = await fetch(`${CRONTIMETABLE_SERVICE}/cron`, 
      {
        method: "GET", 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }
    );
    const body = await data.json();
    return body;
  } catch (e) {

    console.error(e);
    return e;
  }
}

export const getCronByName = async (name) => {
  try {
    const data = await fetch(`${CRONTIMETABLE_SERVICE}/cron/${name}`, 
      {
        method: "GET", 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }
    );
    const body = await data.json();
    return body;
  } catch (e) {

    console.error(e);
    return e;
  }
}