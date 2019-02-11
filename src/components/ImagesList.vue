<template>
  <h1>Hello world</h1>
</template>


<script>
import axios from "axios";
export default {
  mounted: async function() {
    console.log("something");
    const { data } = await axios({
      method: "post",
      url: "/graphql",
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify({
        query: `
      { 
        Images {
            Id
            Name
            Created
        }
      }
    `
      })
    });

    console.log(data);
  }
};
</script>


<style>
</style>
