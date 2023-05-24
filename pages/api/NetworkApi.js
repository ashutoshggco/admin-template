export const getTableList = async (ApibaseUrl) => {
  const token = localStorage.getItem("token");
  try {
    const requestOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(ApibaseUrl, requestOptions)
      .then((res) => {
        if (!res.ok) {
          if (res.status === 401) {
            return res.json();
          } else throw Error("Please try again after sometime");
        }
        return res.json();
      })
      .then((json) => {
        return json;
      });
    return response;
  } catch (err) {
    return err;
  }
};
export const updateTableList = async (ApibaseUrl, body, token) => {
  try {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(ApibaseUrl, requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw Error("Please try again after sometime");
        }
        return res.json();
      })
      .then((json) => {
        return json;
      });
    return response;
  } catch (err) {
    console.log(err);
  }
};
export const login = async (ApibaseUrl, body) => {
  try {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json",
      },
    };

    const response = await fetch(ApibaseUrl, requestOptions)
      .then((res) => {
        if (!res.ok) {
          // throw Error("Please try again after sometime");
          return res.json();
        }
        return res.json();
      })
      .then((json) => {
        return json;
      });
    return response;
  } catch (err) {
    console.log(err);
  }
};
