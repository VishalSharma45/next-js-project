import CustomerHeader from '@/app/_components/CustomerHeader';
import React from 'react'

const Page = (props) => {

  const name = props.params.name;
  return (
    <div>
      <CustomerHeader />
      <div className="restaurant-page-banner">
        <h1>{decodeURI(name)}</h1>

      </div>
    </div>
  )
}

export default Page