export const getCrons = async () => {
  try {
    const data = await fetch(`/api/cron`, 
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

export const getCronByName = async (name, startDate, endDate) => {
  let urlParams = new URLSearchParams();
  startDate && urlParams.set('startTime', startDate.toISOString());
  endDate && urlParams.set('endTime', endDate.toISOString());

  try {
    const data = await fetch(`/api/cron/${name}?${urlParams}`, 
      {
        method: "GET", 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    const body = await data.json();
    return body;
  } catch (e) {

    console.error(e);
    return e;
  }
}