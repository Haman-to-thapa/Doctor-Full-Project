import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
// import { toast } from 'react-toastify'
// import axios from 'axios'

const MyAppointments = () => {
  const { doctors } = useContext(AppContext)


  // const months = [" ", "jan", "feb", "mar", "apr", "may", "jan", "jul", "aug", "sep", "oct", "nov", "dec"]

  // const slotDateFormted = (slotDate) => {
  //   const dateArray = slotDate.split('_')
  //   return dateArray[0] + " " + months[Number(dateArray[1])] + "" + dateArray[2]
  // }

  // const {backendUrl , token} = useContext(AppContext)
  // const [appintments, setAppointments] = useState([])

  // try {
  //  const getUserAppointements = async () => {
  //   const {data} = await axios.get(backendUrl + '/api/user/appintmenst', {header: {authorization: `Bearer: ${token}`}})
  //  if(data.success) {
  //     setAppointments(data.appointments.reverse())
  //        
  //    }
  //  
  //} catch (error) {
  // console.log(error)
  //  toast.error(error.message)
  // }
  // }


  // useEffect(() => {
  //   if (token) {
  //     getuserAppoints()
  //   }
  // },[])

  // const cancelAppointment = async (appointmentId) => {
  //   try {

  //     const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { authroziation: `Bearer ${token}` })

  //     if (data.success) {
  //       toast.success(data.success)
  //       getuserAppointments()
  // getDoctorData()
  //     } else {
  //       toast.error(data.message)
  //     }

  //   } catch (error) {
  //     console.log(error)
  //     toast.error(error.message)
  //   }

  // }

  // const initPay = (order) => {
  //   const option = {
  //     key: import.meta.VITE_RAZORPAY_KEY_ID,
  //     amount: order.amount,
  //     currency: order.currency,
  //     name: "Appointment Payment",
  //     description: "Appointment payment",
  //     order_id: order.id,
  //     receipt: order.receipt,
  //     handler: async (response) => {

  //       try {

  //         const { data } = await axios.post(backendUrl + '/api/user/verifyRazorpay', response, { headers: { Authorization: `Bearer ${token}` } })

  //         if (data.success) {
  //           getUserAppoints()
  //           navigate('/my-appointments')
  //         }

  //       } catch (error) {

  //         console.log(error)
  //         toast.error(data.message)
  //       }


  //     }

  //   }
  //   const rzp = new window.Razorpay(option)
  //   rzp.open()
  // }

  // const appointmentRazorpay = async (appointmentId) => {
  //   try {

  //     const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { authrozation: `Bearer ${token}` })

  //     if (data.success) {
  //       initPay(data.order)
  //     }

  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 '>My Appointments</p>
      <div>
        {
          doctors.slice(0, 2).map((item, index) => (
            <div className='gird grid-col-[1fr, 2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
              <div>
                <img src={item.image} alt="" className='w-32 bg-indigo-100' />
              </div>
              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-800 font-semibold'>{item.name}</p>
                <p className='text-zinc-700 font-medium mt-1'>{item.speciality}</p>
                <p className='text-zinc-800 font-medium mt-1'>Address :</p>
                <p className='text-xs'>{item.address.line1}</p>
                <p className='text-xs'>{item.address.line2}</p>
                <p className='text-sm mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> 25, july, 2025 | 8:30 PM</p>
              </div>
              <div></div>
              <div className='flex flex-col gap-2 justify-end'>
                <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-green-600 hover:text-white transition-all duration-300'>Pay Online</button>
                <button className='py-2 border rounded text-stone-500 text-center sm-w-48 hover:bg-green-500 hover:text-white transition-all duration-300'>Cancel appointment</button>
              </div>

            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MyAppointments