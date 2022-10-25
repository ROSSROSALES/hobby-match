import React, { useState, useEffect } from "react";

const anime_array = []
function response() {
  fetch("https://api.jikan.moe/v4/top/anime")
  .then(response => response.json())
  .then(function(result) {
    console.log('Result', result.data.length)
    for (var i=0; i<result.data.length; i++) {
      anime_array.push(result.data[i])
    }
    console.log("Words", anime_array)
  })
  .catch(error => console.error(error));
  return anime_array
  };

export default response;
