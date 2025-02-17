import { createContext, useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'


export const AdminContext = createContext()


const AdminContextProvider = (props) => {


  const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : "");

  const [doctors, setDoctors] = useState([])

  const backendUrl = import.meta.env.VITE_BACKEND_URL


  const getAllDoctors = async (docId) => {

    try {

      const { data } = await axios.post(backendUrl + "/api/admin/all-doctors", { docId }, { headers: { Authorization: `Bearer ${aToken}` } })
      console.log(data)

      if (data.success) {
        setDoctors(data.doctors);
        console.log("doctors", data.doctors)
      } else {
        toast.error(error.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const changeAvailaability = async (docId) => {
    try {
      // const { data } = await axios.post(
      //   backendUrl + '/api/admin/change-availability',
      //   { docId },
      //   { headers: { Authorization: `Bearer ${aToken}` } }
      // );

      const { data } = await axios.post(backendUrl + '/api/admin/change-availability', { docId }, {
        headers: {
          Authorization: `Bearer ${aToken}` // Correct way to pass token in headers
        }
      })

      if (data.success) {
        toast.success(data.message)
        getAllDoctors()

      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  '/api/admin/change-availability'


  const value = {
    aToken, setAToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailaability,
  }

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  )
}

export default AdminContextProvider;