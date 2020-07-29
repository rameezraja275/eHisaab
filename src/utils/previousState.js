import React, { useEffect, useRef } from "react";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.state = value;
  });
  return ref.state;
}

export default usePrevious;
