import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'


const AllAppointments = () => {

  const { aToken, appointments, setAppointments, getAllAppoitments, } = useContext(AdminContext)

  const { calculaterAge, slotDateFormted, currency, cancelAppintment } = useContext(AppContext)


  useEffect(() => {
    if (aToken) {
      getAllAppoitments()
    }
  }, [aToken])

  return (
    <div className='w-full mx-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appoinments</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll min-h-[60vh]'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
          <p>#</p>
          <p>patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctors</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>
      </div>

      {
        appointments.map((item, index) => (
          <div key={index}
            className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b hover:bg-gray-500'
          >
            <p className='max-sm:hidden'>{index + 1}</p>
            <div>
              <img src={item.userData.image} alt=""
                className='w-8 rounded-full '
              />
              <p>{item.userData.name}</p>

            </div>

            <p>{calculaterAge(item.userData.dob)}</p>
            <p>{slotDateFormted(item.slotDate)}, {item.slotTime}</p>
            <div className='flex items-center gap-2'>
              <img src={item.docData.dob} alt=""
                className='w-8 rounded-full bg-gray-200'
              />
            </div>

            <p>{currency}{item.amount}</p>
            {
              item.cnacelled ? <p className='text-red text-sm font-medium'>Cancelled </p> :
                <img
                  onClick={() => cancelAppintment(item._id)}
                  src={assets.cancel_icon} className="w-10 cursor-pointer" />

            }


          </div>
        ))
      }

    </div>
  )
}

export default AllAppointments