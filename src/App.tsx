
import './App.css'
import {useEffect, useState} from "react";

function App() {
  const [onfidoToken, setOnfidoToken] = useState<any>()


  useEffect(() => {
    fetch('https://us-central1-radiologexapp.cloudfunctions.net/getOnfidoSdkConfigPublic', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({"userEmail":"dmytro.s+52@blaize.tech"})
    }).then(r => r.json()).then(r => setOnfidoToken(r))
  }, []);

  useEffect(() => {


    (async () => {
      const { init } = await import('onfido-sdk-ui');
      if(!onfidoToken) return
      init({
        token: onfidoToken.token,
        containerId: 'onfido-mount',
        customUI: {
          colorBackgroundSurfaceModal: '#17171e',
          colorBorderSurfaceModal: '#23232C',
          colorContentTitle: '#ffffff',
          colorContentSubtitle: '#ffffff',
          colorContentBody: '#707070',
          colorContentButtonPrimaryText: '#ffffff',
          colorBackgroundButtonPrimary: '#014FEF',
          colorBackgroundSelector: '#17171e',
          borderRadiusButton: '30px'
        },
        workflowRunId: onfidoToken.workflowRunId,
        onComplete: () => {
          console.log(111);
        },
        onError: () => {
          console.log(1232)
        }
      });
    })()
  }, [onfidoToken]);


  return (
    <>
      <div id={'onfido-mount'}></div>
    </>
  )
}

export default App
