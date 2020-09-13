import { useRef, useEffect } from "react";

export function makeCancelable(promise) {
  let isCanceled = false;
  //wraps the promise
  const wrappedPromise = new Promise((resolve, reject) => {
    promise //since promise is called, we chain by then catch
      .then((val) => (isCanceled ? reject({ isCanceled }) : resolve(val)))
      .catch((error) => (isCanceled ? reject({ isCanceled }) : reject(error)));
  });

  return {
    promise: wrappedPromise,
    cancel() {
      isCanceled = true;
    },
  };
}

export default function useCancellablePromise(cancelable = makeCancelable) {
  const emptyPromise = Promise.resolve(true);

  // test if the input argument is a cancelable promise generator
  if (cancelable(emptyPromise).cancel === undefined) {
    throw new Error(
      "promise wrapper argument must provide a cancel() function"
    );
  }

  const promises = useRef(); //for forst time promises.current is null

  useEffect(() => {
    //this is what allows to use multiple times, we are maintaining an array
    promises.current = promises.current || [];

    return function cancel() {
      //cancel all those which are prmomises
      promises.current.forEach((p) => p.cancel());
      promises.current = [];
    };
  }, []);

  function cancellablePromise(p) {
    const cPromise = cancelable(p);
    promises.current.push(cPromise);
    return cPromise.promise;
  }

  return { cancellablePromise };
}


//takes the promise (make sure you call it )
//ex: const data = await cancellablePromise(sendRequest());
/*

 const { cancellablePromise } = useCancellablePromise();

 //inside submit handler
 ...
  try {
      const data = await cancellablePromise(sendRequest());
      //DO set state thingy here, (because if the promise gets cancels (rejects), then it
      //will raise error and go to catch block
      if (!data.success) {
        setError((state) => ({
          formError: data.error,
          inputError: state.inputError,
        }));
      } else {
        console.log({ data });
      }
    } catch (err) {
      console.log(err);
    }
*/