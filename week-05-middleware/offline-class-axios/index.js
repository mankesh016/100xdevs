const axios = require("axios");

async function getTodos() {
  const response = await fetch(
    "https://httpdump.app/dumps/fd29e4b5-1c76-4560-90a7-9d03a2f9a85b",
  );
  const data = await response.json();

  console.log(data.todos);
}

async function getTodos2() {
  const response = await axios.post(
    "https://httpdump.app/dumps/fd29e4b5-1c76-4560-90a7-9d03a2f9a85b",
    {
      username: "admin",
      password: "pass123",
    },
    {
      headers: {
        authentication: "Alice 123",
      },
    },
  );
  const data = response.data;

  console.log(data.todos);
}

// getTodos();
getTodos2();
