import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { ImageList } from '../ImageList'
import { Modal } from '../../components/modal'
import { Survey } from '../../survey/views/main'

export function App() {
  const [modalChild, setModalChild] = useState<JSX.Element | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  /**
   * Let's assume that on load of the site, we make a web call to our server
   * and we receive a response that says that the user has a survey to fill in.
   */
  useEffect(() => {
    // Here we made the call and we got informed of the survey
    if (true) {
      setShowModal(true);
      setModalChild(Survey);
    }
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Welcome to the Blog</h1>
      </header>
      <section>
        <ImageList />
      </section>
      <Modal open={showModal}>
        {modalChild}  
      </Modal>
    </div>
  )
}
