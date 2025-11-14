import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/landingPage/Footer'
import ChatInterface from '../components/predict/ChatInterface'
import Layout from './Layout'

const PredictPage = () => {
  return (
    <div>
      <Layout>

        <ChatInterface />
      </Layout>
    </div>
  )
}

export default PredictPage