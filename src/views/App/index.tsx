import React, { useState, useEffect, Suspense, LazyExoticComponent } from 'react'
import './App.css'
import { ImageList } from '../ImageList'
import { Modal } from '../../components/Modal'
import jsonForm from '../../assets/form-questions.json';
import type { FormData } from '@surveytypes';
import Cookies from 'universal-cookie';

const ModuleSurvey = window.ModuleSurvey;
const cookies = new Cookies();

export function App() {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const closeModal = () => {
    setShowModal(false);
  }

  useEffect(() => {
    if (formData) {
      if (!cookies.get(`surveydone_${formData.form.id}`)) {
        // Data might tell us to defer the modal's visiblity
        setTimeout(() => setShowModal(true), formData.form.timeBeforeVisibleInSeconds * 1000);
      }
    }
  }, [formData]);

  /**
   * Let's assume that on load of the site, we make a web call to our server
   * and we receive a response that says that the user has a survey to fill in.
   */
  useEffect(() => {
    // Here we made the call and we got informed of the survey
    if (true) {
      /**
       * JSON object had to be cast to a type as typescript was not liking this cross reference between
       * string as string literal types...
       */
      const formQuestions = (jsonForm as FormData);
      setFormData(formQuestions);
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
      <Modal open={showModal} handleClose={closeModal}>
        <ModuleSurvey data={formData ?? null} handleSubmit={closeModal} />
      </Modal>
    </div>
  )
}
