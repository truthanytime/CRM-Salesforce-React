let windowObjectReference: Window | null = null;
let previousUrl: string | null = null;

const openAuthWindow = (url: string, name: string, listener?: (event: any) => void) => {
  // remove any existing event listeners
  listener && window.removeEventListener('message', listener);

  // window features
  const strWindowFeatures = 'toolbar=no, menubar=no, width=800, height=700, top=100, left=100, noopener=false';
  windowObjectReference = window.open(url, name, strWindowFeatures);

  if (windowObjectReference === null || windowObjectReference.closed) {
    /* if the pointer to the window object in memory does not exist
      or if such pointer exists but the window was closed */
    console.log('WINDOW NOT EXISTS');
  } else if (previousUrl !== url) {
    /* if the resource to load is different,
      then we load it in the already opened secondary window and then
      we bring such window back on top/in front of its parent window. */
    console.log('WINDOW EXISTS URL DIFFERENT', url);
    windowObjectReference = window.open(url, name, strWindowFeatures);
    windowObjectReference?.focus();
  } else {
    /* else the window reference must exist and the window
      is not closed; therefore, we can bring it back on top of any other
      window with the focus() method. There would be no need to re-create
      the window or to reload the referenced resource. */
    console.log('WINDOW EXISTS');
    windowObjectReference?.focus();
  }

  // add the listener for receiving a message from the popup
  listener && window.addEventListener('message', (event) => listener(event), false);
  // assign the previous URL
  previousUrl = url;
};

export { openAuthWindow, windowObjectReference };
